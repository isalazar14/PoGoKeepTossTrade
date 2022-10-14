SET @pokemon_id = 3;
SET @form_id = 1;
SET @gl_cp = 1500;
SET @atk_iv_min = 10;
SET @def_iv_min = 10;
SET @sta_iv_min = 10;

WITH
	pokemonFormBaseStats as (
		select pokemon_id, form_id, base_atk, base_def, base_sta
		from pokemon_forms
		where pokemon_id = @pokemon_id and form_id = @form_id
	),
	ivCombos as (
		select *
		from ivs
		where atk_iv >= @atk_iv_min and def_iv >= @def_iv_min and sta_iv >= @sta_iv_min
	),
	pokemonFormIvsTotalStats as (
		select pokemon_id, form_id, iv_id as `ivs (atk,def,sta)`, iv_percent,
		(base_atk + atk_iv) as atk,
		(base_def + def_iv) as def,
		(base_sta + sta_iv) as sta,
		SQRT((@gl_cp * 10) / ((base_atk + atk_iv) * SQRT(base_def + def_iv) * SQRT(base_sta + sta_iv)))
		as gl_multiplier_approx
		from pokemonFormBaseStats
		CROSS JOIN
		ivCombos
	),
	gl_levelMultipliers as (
		select `level` as gl_level, multiplier as gl_multiplier
		from levels
	),
	pokemonFormIvsLevelMultipliers as (
		select *,
		FLOOR(GREATEST( 10, ( (atk) * SQRT(def) * SQRT(sta) * POWER(gl_multiplier, 2) )/10 ) )
			AS gl_cp,
		round((round(atk *gl_multiplier,2) * round(def *gl_multiplier,2) * floor(sta *gl_multiplier))/1000,3)
			as gl_stat_product
		from pokemonFormIvsTotalStats
		Inner join gl_levelMultipliers
		on (gl_multiplier = (
			select gl_multiplier
			from gl_levelMultipliers
			where gl_multiplier <= gl_multiplier_approx
			Order by gl_multiplier desc
			limit 1		
		))
	),
	pokemonFormIvLeagueStats as (
		select *,
			RANK() OVER(PARTITION BY pokemon_id, form_id ORDER BY gl_stat_product desc) AS gl_rank,
			round(PERCENT_RANK() OVER(PARTITION BY pokemon_id, form_id ORDER BY gl_stat_product) * 100,3) AS gl_tile_rank
		from pokemonFormIvsLevelMultipliers
		order by pokemon_id, form_id, gl_rank
	),
	gl_LevelMinMax as (
		Select 	pokemon_id, form_id,
						min(gl_level) gl_level_min,
						max(gl_level) gl_level_max
		from pokemonFormIvsLevelMultipliers
	),
	gl_SummaryStatsByLevel as (
		select pokemon_id, form_id, gl_level,
		count(*) as count
		from pokemonFormIvsLevelMultipliers
		group by gl_level
		order by gl_level desc
	)
select * from gl_SummaryStatsByLevel;

Select 	pokemon_id, form_id, `ivs (atk,def,sta)`, iv_percent, 
				gl_level, gl_cp, gl_stat_product, gl_rank, gl_tile_rank
from pokemonFormIvLeagueStats
;
