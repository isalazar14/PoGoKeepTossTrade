-- how to get summary of poke_form_iv_level_stats, using "max(stat_product) group by..."

explain
with 
	gl_sp_ranked as (
		SELECT stat_product_id, pokemon_id, form_id, iv_id, level, stat_product,
			-- max(stat_product) over (partition by pokemon_id, form_id, iv_id) as sp_max,
      rank() over (partition by pokemon_id, form_id, iv_id order by stat_product desc) as iv_sp_rank
		FROM pokemon_form_iv_level_stats
		where 
			-- pokemon_id = 3 and 
      cp <= 1500
      order by pokemon_id, form_id, stat_product desc
-- 		group by pokemon_id, form_id, iv_id
		-- order by pokemon_id, form_id, iv_id, iv_sp_rank
	)
  select *
  from gl_sp_ranked
  where iv_sp_rank = 1;

------------------------------------------------------------

explain
with 
	gl_sp_ranked as (
		SELECT stat_product_id, pokemon_id, form_id, iv_id, level, stat_product,
			-- max(stat_product) over (partition by pokemon_id, form_id, iv_id) as sp_max,
      rank() over (partition by pokemon_id, form_id, iv_id order by stat_product desc) as iv_sp_rank
		FROM pokemon_form_iv_level_stats
		where 
			-- pokemon_id = 3 and 
      cp <= 1500
		order by pokemon_id, form_id, stat_product desc
-- 		group by pokemon_id, form_id, iv_id
		-- order by pokemon_id, form_id, iv_id, iv_sp_rank
	)
--   select *
--   from gl_sp_ranked
--   where iv_sp_rank = 1;
  
  select * from
  from pokemon_form_iv_level_stats as main
	inner join gl_sp_ranked
  on (main.stat_product_id = gl_sp_ranked.stat_product_id, iv_sp_rank=1)
 --  on (t1.pokemon_id = t2.pokemon_id,
-- 			t1.form_id = t2.form_id,
--       t1.iv_id = t2.iv_id,
--       t1.stat_product = t2.sp_max)
;


-- pokemon_form_ivs
CREATE TABLE `pokemon_form_ivs` (
  `pokemon_form_iv_id` int NOT NULL AUTO_INCREMENT,
  `pokemon_form_id` smallint NOT NULL,
  `iv_id` smallint NOT NULL,
  `gl_multiplier` double DEFAULT NULL,
  `gl_level` float(3,1) DEFAULT NULL,
  `gl_stat_product` double DEFAULT NULL,
  `gl_cp` smallint DEFAULT NULL,
  `gl_hp` smallint DEFAULT NULL,
  `gl_rank` smallint DEFAULT NULL,
  `gl_percent_rank` float(6,3) DEFAULT NULL,
  `gl_percent_sp` float(4,2) DEFAULT NULL,
  `ul_multiplier` double DEFAULT NULL,
  `ul_level` float(3,1) DEFAULT NULL,
  `ul_stat_product` double DEFAULT NULL,
  `ul_cp` smallint DEFAULT NULL,
  `ul_hp` smallint DEFAULT NULL,
  `ul_rank` smallint DEFAULT NULL,
  `ul_percent_rank` float(6,3) DEFAULT NULL,
  `ul_percent_sp` float(4,2) DEFAULT NULL,
  PRIMARY KEY (`pokemon_form_iv_id`),
  KEY `fk_pokemon_forms_has_iv_combos_iv_combos1_idx` (`iv_id`),
  KEY `fk_pokemon_forms_has_iv_combos_pokemon_forms1_idx` (`pokemon_form_id`),
  CONSTRAINT `fk_pokemon_forms_has_iv_combos_iv_combos1` FOREIGN KEY (`iv_id`) REFERENCES `iv_combos` (`iv_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pokemon_forms_has_iv_combos_pokemon_forms1` FOREIGN KEY (`pokemon_form_id`) REFERENCES `pokemon_forms` (`pokemon_form_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8


-- pokemon_form_iv_levels
CREATE TABLE `pokemon_form_iv_levels` (
  `pokemon_form_iv_level_id` int NOT NULL AUTO_INCREMENT,
  `pokemon_form_iv_id` int NOT NULL,
  `level_id` tinyint NOT NULL,
  `cp` smallint DEFAULT NULL,
  `hp` smallint DEFAULT NULL,
  `stat_product` int DEFAULT NULL,
  PRIMARY KEY (`pokemon_form_iv_level_id`),
  KEY `fk_pokemon_form_ivs_has_levels_levels1_idx` (`level_id`),
  KEY `fk_pokemon_form_ivs_has_levels_pokemon_form_ivs1_idx` (`pokemon_form_iv_id`),
  CONSTRAINT `fk_pokemon_form_ivs_has_levels_levels1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`level_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pokemon_form_ivs_has_levels_pokemon_form_ivs1` FOREIGN KEY (`pokemon_form_iv_id`) REFERENCES `pokemon_form_ivs` (`pokemon_form_iv_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8