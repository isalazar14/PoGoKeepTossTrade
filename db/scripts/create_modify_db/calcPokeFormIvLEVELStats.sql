-- CHECKING TIME IT TAKES TO CALCULATE STATS FOR ONE POKEMON FOR ALL LEVELS

-- SET @pokemon_id = 3;
-- SET @form_id = 1;
SET @gl_cp = 1500;
SET @ul_cp = 1500;
-- SET @atk_iv_min = 0;
-- SET @def_iv_min = 0;
-- SET @sta_iv_min = 0;

explain 
WITH
	pokemonFormBaseStats as (
		select pokemon_id, form_id, base_atk, base_def, base_sta
		from pokemon_forms
		-- where pokemon_id = @pokemon_id and form_id = @form_id
    where pokemon_id <= 10
	),
	pokemonFormIvTotalStats as (
		-- select pokemon_id, form_id, iv_id as `ivs (atk,def,sta)`, iv_percent,
    select pokemon_id, form_id, iv_id,
		(base_atk + atk_iv) as atk,
		(base_def + def_iv) as def,
		(base_sta + sta_iv) as sta
		-- SQRT((@gl_cp * 10) / ((base_atk + atk_iv) * SQRT(base_def + def_iv) * SQRT(base_sta + sta_iv)))
		-- as gl_multiplier_approx
		from pokemonFormBaseStats
    cross join iv_combos
	),
	levelMultipliers as (
		select `level`, multiplier
		from levels
    where level <= 41
	),
	pokemonFormIvLevels as (
		select *
		from pokemonFormIvTotalStats
    cross join levelMultipliers
	),
	pokemonFormIvLevelStats as (
		select pokemon_id, form_id, iv_id, level,
			FLOOR(GREATEST( 10, ( (atk) * SQRT(def) * SQRT(sta) * POWER(multiplier, 2) )/10 ) )
				AS cp,
			floor( sta * multiplier )
				as hp,
			round((round(atk *multiplier,2) * round(def *multiplier,2) * floor(sta *multiplier))/1000,3)
				as stat_product
		from pokemonFormIvLevels
-- 		order by pokemon_id, form_id, iv_id desc, level desc
		order by stat_product desc
	)
select 
	*
-- pokemon_id, form_id, iv_id, level, cp, hp, max(stat_product) as stat_product,
-- 			RANK() OVER(PARTITION BY pokemon_id, form_id ORDER BY gl_stat_product desc) AS gl_rank,
-- 			round(PERCENT_RANK() OVER(PARTITION BY pokemon_id, form_id ORDER BY gl_stat_product) * 100,3) AS gl_tile_rank
from pokemonFormIvLevelStats
-- where cp <= @gl_cp
-- group by iv_id
-- having stat_product = max(stat_product)
-- order by stat_product desc
; 

-- Select 	pokemon_id, form_id, `ivs (atk,def,sta)`, iv_percent, 
-- 				gl_level, gl_cp, gl_stat_product, gl_rank, gl_tile_rank
-- from pokemonFormIvLeagueStats
-- ;