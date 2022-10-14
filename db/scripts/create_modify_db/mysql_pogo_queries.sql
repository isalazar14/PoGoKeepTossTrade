-- SELECT * FROM pokemon
-- LEFT JOIN families using(family_id)
-- -- LEFT JOIN pokemon USING(pokemon_id)
-- -- LEFT JOIN forms using(form_id)
-- -- LEFT JOIN base_stats using(stats_id)

-- alter table pokemon_forms ADD base_atk TINYINT(6);
-- alter table pokemon_forms ADD base_def TINYINT(6);
-- alter table pokemon_forms ADD base_sta TINYINT(6);


-- add pokemon to pokemon_forms table
INSERT INTO pokemon.pokemon_forms(pokemon_id, form_id, base_atk, base_def, base_sta, type1, type2, types)
VALUES
(1, 1, 118, 111, 128, 10, 14, 'Grass,Poison'),
select * FROM pokemon_forms;


-- make pokemon-iv combos, copy into pokemon_forms_ivs table
insert into pokemon_forms_ivs(pokemon_id, form_id, iv_id)
SELECT pokemon_id, form_id, iv_id
FROM pokemon_forms
CROSS JOIN ivs
where pokemon_id = 1 and form_id=1;

DROP PROCEDURE IF EXISTS testProc;

DELIMITER //

-- CREATE PROCEDURE testProc(IN pokemon_id SMALLINT, IN form_id TINYINT )
CREATE PROCEDURE testProc(IN pokemon_id SMALLINT )

BEGIN
	-- SET form_id = IFNULL(form_id, 1);
	SELECT name
    FROM pokemon
    WHERE pokemon.pokemon_id = pokemon_id;
END //

DELIMITER ;

CALL testProc(2);


1 cross join 2;
select * FROM Select 1 CROSS JOIN Select 2 CROSS JOIN Select 3;

CROSS JOIN 


    
    create procedure propagatePokemon
-- create temp table to use as reference for pokemon_forms_ivs calculations, for all iterations of a given pokemon_form_iv
  -- get base stats of pokemon with given pID (pokemon_id) fID (form_id)
    -- v1
    set @pID = 1;
    set @fID = 1;
    SELECT @atk:=base_atk, @def:=base_def, @sta:=base_sta FROM pokemon_forms
    WHERE pokemon_id=@pID and form_id=@fID;

    -- v2
    set @pID = 1;
    set @fID = 1;
    SELECT base_atk as atk, base_def as def, base_sta as sta
    FROM pokemon_forms
    WHERE pokemon_id=@pID and form_id=@fID;


UPDATE pokemon
SET ()


CREATE TEMPORARY TABLE(
  
)

-- same as above, but as view instead of temp table
CREATE VIEW DietDB.Servings_All        -- pick an appropriate name
AS 
SELECT s.*,
       CAST((fi.kcal * s.units) / 100 AS UNSIGNED INT) AS kcal 
FROM DietDB.Servings AS s 
  LEFT JOIN DietDB.FoodItems AS fi 
    ON s.FoodItem_id = fi.id ; 

