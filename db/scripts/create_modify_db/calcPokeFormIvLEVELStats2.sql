-- INSERT ALL POKEMON_FORM_IVS WITH STAT PRODUCTS AND GL/UL RANKINGS

-- SET @pokemon_form_count = 100;
SET @pokemon_id = 150;
SET @form_id = 1;
SET @gl_cp_min = 1450;
SET @gl_cp_max = 1500;
SET @ul_cp_min = 2450;
SET @ul_cp_max = 2500;

-- insert into pokemon_form_ivs		-- uncomment to insert 
-- explain
WITH
	BaseStats as (
		select pokemon_form_id, base_atk, base_def, base_sta
		from pokemon_forms
 		where pokemon_id = @pokemon_id and form_id = @form_id  -- comment out to run calculations for all pokemon
    -- where pokemon_form_id <= @pokemon_form_count
	)
	, TotalStats as (
		-- select pokemon_id, form_id, iv_id as `ivs (atk,def,sta)`, iv_percent,
    select pokemon_form_id, iv_id, iv_str,
		(base_atk + atk_iv) as atk,
		(base_def + def_iv) as def,
		(base_sta + sta_iv) as sta
		from BaseStats
    cross join iv_combos
	)
  , levelMultipliers as (
		select level_id, multiplier
		from levels
    where level <= 41
	)
	, IvLevelCPs as (
    select *
			, FLOOR(GREATEST( 10, ( (atk) * SQRT(def) * SQRT(sta) * POWER(multiplier, 2) )/10 ) ) AS cp
			, floor( sta * multiplier ) as hp
		from TotalStats
    cross join levelMultipliers
	)
  , GL_candidatesStatProds as (
		select pokemon_form_id, iv_id, level_id as gl_level_id, cp as gl_cp, hp as gl_hp
			, round((round(atk *multiplier,2) * round(def *multiplier,2) * floor(sta *multiplier)) /1000,2) as gl_stat_product
    from IvLevelCPs
    where cp between @gl_cp_min and @gl_cp_max
  )
	, GL_candidatesPartitionedByIv as (
		select *
			, rank () over(partition by pokemon_form_id, iv_id order by gl_stat_product desc) as gl_candidate_rank
		from GL_candidatesStatProds
	)
	, GL_IvsRankedBasic as (
		select pokemon_form_id, iv_id, gl_level_id, gl_cp, gl_hp, gl_stat_product
			, rank () over(partition by pokemon_form_id order by gl_stat_product desc) as gl_rank
      , round(PERCENT_RANK() OVER(PARTITION BY pokemon_form_id ORDER BY gl_stat_product) * 100,3) AS gl_percent_rank
      , max(gl_stat_product) Over(partition by pokemon_form_id) as gl_max_sp
		from GL_candidatesPartitionedByIv
    where gl_candidate_rank = 1
	)
  , GL_IvsRankedAdvanced as (
	select pokemon_form_id, iv_id, gl_level_id, gl_cp, gl_hp, gl_stat_product, gl_rank, gl_percent_rank
		, round(gl_stat_product / gl_max_sp * 100, 3) as `gl_%_max_sp`
	from GL_IvsRankedBasic
	)
  , UL_candidatesStatProds as (
		select pokemon_form_id, iv_id, level_id as ul_level_id, cp as ul_cp, hp as ul_hp
			, round((round(atk *multiplier,2) * round(def *multiplier,2) * floor(sta *multiplier)) /1000,2) as ul_stat_product
    from IvLevelCPs
    where cp between @ul_cp_min and @ul_cp_max
  )
	, UL_candidatesPartitionedByIv as (
		select *
			, rank () over(partition by pokemon_form_id, iv_id order by ul_stat_product desc) as ul_candidate_rank
		from UL_candidatesStatProds
	)
	, UL_IvsRankedBasic as (
		select pokemon_form_id, iv_id, ul_level_id, ul_cp, ul_hp, ul_stat_product
			, rank () over(partition by pokemon_form_id order by ul_stat_product desc) as ul_rank
      , round(PERCENT_RANK() OVER(PARTITION BY pokemon_form_id ORDER BY ul_stat_product) * 100,3) AS ul_percent_rank
      , max(ul_stat_product) Over(partition by pokemon_form_id) as ul_max_sp
		from UL_candidatesPartitionedByIv
    where ul_candidate_rank = 1
	)
  , UL_IvsRankedAdvanced as (
	select pokemon_form_id, iv_id, ul_level_id, ul_cp, ul_hp, ul_stat_product, ul_rank, ul_percent_rank
		, round(ul_stat_product / ul_max_sp * 100, 3) as `ul_%_max_sp`
	from UL_IvsRankedBasic
	)
  , GL_UL_IvRankings as (
	select pokemon_form_id, iv_id, gl_level_id, gl_cp, gl_hp, gl_stat_product, gl_rank, gl_percent_rank, ul_level_id, ul_cp, ul_hp, ul_stat_product, ul_rank, ul_percent_rank
--   from GL_IvsRankedAdvanced
--   left join UL_IvsRankedAdvanced
	from GL_IvsRankedBasic
  left join UL_IvsRankedBasic
  using (pokemon_form_id, iv_id)
  )
  , GL_UL_IvRankingsPretty as (
		select pokemon_name as pokemon, iv_str, gl.level as gl_level, gl_cp, gl_hp, gl_stat_product, gl_rank, gl_percent_rank, ul.level as ul_level, ul_cp, ul_hp, ul_stat_product, ul_rank, ul_percent_rank, pokemon_form_id
		from GL_UL_IvRankings
		inner join pokemon_forms using (pokemon_form_id)
		inner join pokemon using (pokemon_id)
		inner join levels as gl on (gl_level_id = gl.level_id)
		left join levels as ul on (ul_level_id = ul.level_id)
		inner join iv_combos using (iv_id)
		order by pokemon_form_id, gl_rank
    )
    -- pretty/readable version
    select * from GL_UL_IvRankingsPretty
    order by pokemon_form_id, gl_rank
    
--     -- version to insert into pokemon_form_ivs
--     select * from GL_UL_IvRankings
--     order by pokemon_form_id, iv_id
;