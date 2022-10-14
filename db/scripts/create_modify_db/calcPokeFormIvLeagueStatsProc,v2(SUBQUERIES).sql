USE pokemon;

DROP PROCEDURE IF EXISTS calcPokeFormIvStats;

DELIMITER $$

CREATE PROCEDURE calcPokeFormIvStats(
	IN pokemonId SMALLINT,
  IN formId TINYINT,
  IN lvl TINYINT
)

  BEGIN
    /* get level multipliers for lvl and buddylvl*/
    SELECT multiplier
    FROM levels
    WHERE `level` = lvl
    INTO @levelMultiplier;
    
    SELECT multiplier
    FROM levels
    WHERE `level` = lvl + 1
    INTO @buddyLevelMultiplier;

    /* delete existing pokemon_form_iv combo entries */
    DELETE FROM
      pokemon_form_ivs
    WHERE
      pokemon_id = pokemonId AND form_id = formId;    
    
    /* create pokemon_form_iv combos, WITH CALCULATIONS and add to pokemon_form_id table */
    INSERT INTO 
      pokemon_form_ivs (pokemon_id, form_id, iv_id, cp_max, cp_max_buddy, hp_max, hp_max_buddy)
    SELECT pokemon_id, form_id, iv_id, 
      FLOOR(GREATEST( 10, ( (base_atk + atk_iv) * SQRT(base_def + def_iv) * SQRT(base_sta + sta_iv) * POWER(@levelMultiplier, 2) )/10 ) ),
        -- AS cp_max,
      FLOOR(GREATEST( 10, ( (base_atk + atk_iv) * SQRT(base_def + def_iv) * SQRT(base_sta + sta_iv) * POWER(@buddyLevelMultiplier, 2) )/10 ) ),
        -- AS cp_max_buddy,
      FLOOR( (base_sta + sta_iv) * @levelMultiplier ) AS hp_max,
      FLOOR( (base_sta + sta_iv) * @buddyLevelMultiplier ) AS hp_max_buddy
    FROM pokemon_forms
    CROSS JOIN
      ivs
    WHERE pokemon_id = pokemonId AND form_id = formId
    ORDER BY iv_id DESC;

    /* Finally select/show all iv combos for current pokemon_form */
    SELECT * 
    FROM pokemon_form_ivs
    WHERE pokemon_id = pokemonId AND form_id = formId
    ORDER BY cp_max DESC;
    
  END $$

DELIMITER ;

/* test proc with venasaur at level 40 */
CALL calcPokeFormIvStats(3,1, 40);


/* adding additional calculation columns */
set @levelMultiplier = 0.7903;
set @buddyLevelMultiplier = 0.7953;
set @gl_cp = 1500;
set @ul_cp = 2500;
set @gl_rank = 0;

select *,
  (@gl_rank := @gl_rank+1) as gl_rank
from
(
  SELECT *,
    FLOOR(GREATEST( 10, ( (atk) * SQRT(def) * SQRT(sta) * POWER(gl_multiplier, 2) )/10 ) )
        AS gl_cp,
      round((round(atk *gl_multiplier,2) * round(def *gl_multiplier,2) * floor(sta *gl_multiplier))/1000,3)
        as gl_stat_product
  FROM (
    SELECT *,
      (base_atk + atk_iv) as atk,
      (base_def + def_iv) as def,
      (base_sta + sta_iv) as sta,
      -- SQRT((@gl_cp * 10) / ((base_atk + atk_iv) * SQRT(base_def + def_iv) * SQRT(base_sta + sta_iv)))
      SQRT((@gl_cp * 10) / ((base_atk + atk_iv) * SQRT(base_def + def_iv) * SQRT(base_sta + sta_iv)))
        as gl_multiplier_approx
  --     (select multiplier
  --       from levels
  --       where multiplier = (select max(multiplier) from levels where multiplier <= gl_multiplier_approx))
  --       as gl_multiplier
    FROM (select pokemon_id, form_id, base_atk, base_def, base_sta from pokemon_forms where pokemon_id = 3 and form_id=1) base_stats
    CROSS JOIN
      ivs
    -- ORDER BY iv_id DESC
  ) league_multiplier
  inner join
  (select multiplier as gl_multiplier, `level` as gl_level
    from levels
    -- order by multiplier desc
  ) levelMultipliers
  -- on gl_multiplier > gl_multiplier_approx
  on gl_multiplier = (select max(multiplier) from levels where multiplier <= gl_multiplier_approx)
  
) t3
Order by gl_stat_product desc;



/* ADDING RANK AND PERCENT RANK COLUMNS TO pokemon_form_ivs TABLE */
select pokemon_id, form_id, iv_id, cp_max_buddy, 
	RANK() OVER(PARTITION BY pokemon_id, form_id ORDER BY cp_max_buddy desc) AS ml_rank,
    round(PERCENT_RANK() OVER(PARTITION BY pokemon_id, form_id ORDER BY cp_max_buddy) * 100,3) AS ml_tile_rank
from pokemon_form_ivs
order by pokemon_id, form_id, ml_tile_rank desc;
