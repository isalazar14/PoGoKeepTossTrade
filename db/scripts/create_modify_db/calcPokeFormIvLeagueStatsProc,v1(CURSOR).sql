/*
for each pokemon form, create iv combos, calculate statprods
1 stored proc input : pokemon id, form id
2 get base atk/def/sta for given pokeform
3 make pokeform-iv combos (4096 rows)
4 calculate gl_level, gl_stat_product, ul_level, ul_stat_product -> stored procedure 3? user function1?
5 calculate gl_rank/%-tile, ul_rank/%-tile -> stored procedure ?
*/

USE pokemon;

DROP PROCEDURE IF EXISTS CreatePokeFormIvCombosWithLeagueStats;

DELIMITER $$

CREATE PROCEDURE CreatePokeFormIvCombosWithLeagueStats(
	IN pokemonId SMALLINT,
    IN formId TINYINT,
    IN maxLevel TINYINT
)

  BEGIN
	/* variables to store base stats */
    DECLARE atk, def, sta SMALLINT;

    /* data and control variables for cursor */
    DECLARE ivID CHAR(8);
    DECLARE atkIV, defIV, staIV TINYINT;
    DECLARE done BOOLEAN DEFAULT 0;
    
    /* declare cursor */
    DECLARE IVs CURSOR FOR
	  SELECT iv_id, atk_iv, def_iv, sta_iv
      FROM ivs;
	
    /* continue handler for cursor not found */
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    /* get base atk, def, sta for given pokemon_form */
    SELECT
      base_atk, base_def, base_sta INTO atk, def, sta
    FROM 
      pokemon_forms
    WHERE
      pokemon_id = pokemonId AND form_id = formId;
	
    /* get level multipliers for maxLevel and buddyMaxLevel*/
    SELECT multiplier
    FROM levels
    WHERE level = maxLevel
    INTO @levelMultipler;
      
    SELECT multiplier
    FROM levels
    WHERE level = maxLevel + 1
    INTO @buddyLevelMultiplier;

    /* delete existing pokemon_form_iv combo entries */
    DELETE FROM
      pokemon_form_ivs
    WHERE
      pokemon_id = pokemonId AND form_id = formId;

	/* create pokemon_form_iv combos and add to pokemon_form_id table */
    INSERT INTO 
      pokemon_form_ivs (pokemon_id, form_id, iv_id)
    SELECT
	  pokemon_id, form_id, iv_id
    FROM 
      ( SELECT pokemonId as pokemon_id, formId as form_id ) t
      CROSS JOIN
        ivs
	  ORDER BY atk_iv DESC, def_iv DESC, sta_iv DESC;
    
    /* start cursor iteration */
    OPEN IVs;
      calculateLeagueStats: LOOP
        FETCH IVs INTO ivID, atkIV, defIV, staIV;
        IF done
          THEN LEAVE calculateLeagueStats;
        END IF;
        
        /* update pokemon_form_iv entry with calculated fields */
        UPDATE pokemon_form_ivs
        SET 
          cp_max = getCP(atk, def, sta, atkIV, defIV, staIV, @levelMultiplier ),
          cp_max_buddy = getCP(atk, def, sta, atkIV, defIV, staIV, @buddyLevelMultiplier )
        WHERE pokemon_id = pokemonId AND form_id = formID AND iv_id = ivID;
      END LOOP calculateLeagueStats;
	  CLOSE IVs;

	/* Finally select/show all iv combos for current pokemon_form */
    SELECT * 
	  FROM pokemon_form_ivs
    WHERE pokemon_id = pokemonId AND form_id = formId
    ORDER BY max_cp DESC;
    
  END $$

DELIMITER ;

CALL CreatePokeFormIvCombosWithLeagueStats(3,1, 40);

/*
trigger CreatePokeFormIvCombosWithLeagueStats when pokeform added / updated
*/

/*
trigger remove all pokeform-iv combos/calculations when pokeform removed
OR set ON DELETE CASCADE for foreign key (https://www.mysqltutorial.org/mysql-on-delete-cascade/)
*/