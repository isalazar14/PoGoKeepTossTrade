# -- count pokemon_form_iv entries for specific pokemon form
# -- select count(*) from pokemon_form_ivs where pokemon_form_id = (select pokemon_form_id from pokemon_forms where pokemon_id = @pokemon_id and form_id = @form_id)
# -- and ul_rank is not null -- uncomment to count NON-NULL entries
-- ;
-- select single pokemon to compare my calculated values against pokegenie/stadiumgaming.gg

set @uploadId=1;
-- explain
with pgEntriesManual as (
	-- create sample pokegenie data
	select * 
  from (
		values
			row(1, 77, 1, 20, 15, 15, 14),
			row(2, 74, 1, 17, 15, 14, 15),
			row(3, 30, 1, 21, 12, 15, 12),  -- mid-evolved 
			row(4, 27, 2, 20, 15, 14, 13),  -- form_id != 1
			row(5, 27, 2, 20, 14, 11, 11),	-- repeat pokeForm
			row(6, 557, 1, 20, 15,15, 14)
		) as pg (pg_id, pokemon_id, form_id, level, atk_iv, def_iv, sta_iv)
)
, pgEntries as ( -- requires a table called pokeGenieData, containing pokeGenie csv file data
	-- select *
	select `index` as pg_id, pokemon_id, form_name, level_min as level, atk_iv, def_iv, sta_iv
  from upload_data
  where upload_id = @uploadId
  limit 100
)
, pgEntries_forms_levels as (
	-- select *
  select pg_id, pokemon_id, form_name, form_id, level as pg_lvl, level_id as pg_lvl_id, atk_iv, def_iv, sta_iv, total_dust_used as dust_current, total_candy_used as candy_current
  from pgEntries
  inner join forms
  using (form_name)
  inner join levels
	using (level)
)
, pgEntriesIds as (
    -- select *
		select pg_id, p.pokemon_name as pg_pokemon, iv_str, pokemon_form_id, pokemon_id, form_id, family_id, branch, stage_id, iv_id
    , pg_lvl, pg_lvl_id
		, dust_current, candy_current
		from pgEntries_forms_levels pg
		inner join pokemon p
    using (pokemon_id)
    inner join pokemon_forms pf
    using (pokemon_id, form_id)
    inner join iv_combos
    using (atk_iv, def_iv, sta_iv)
    
)
, pgEntries_pokeFormsToCheck as ( #
		### human friendly version, for testing
		select pg_id, pg_pokemon,
			p.pokemon_name as target_pokemon, pf.pokemon_form_id, pf.pokemon_id, pf.form_id, p.family_id, p.branch, p.stage_id, iv_id
    , iv_str
    , pg_lvl, pg_lvl_id
		, dust_current, candy_current

		### computer friendly version
--     select pg_id, pf.pokemon_form_id
-- 		, pg_lvl_id
    
		from pgEntriesIds pg 
    inner join pokemon p 
    on (pg.family_id = p.family_id and p.stage_id >= pg.stage_id)
    inner join pokemon_forms pf
    on (pf.pokemon_id = p.pokemon_id and pf.form_id = pg.form_id)
)
, distinctPokeFormsToCheck as (
-- 		-- select *
--     select 
-- 			distinct  # only necessary if not using 'group by'
--       pg.pokemon_form_id
		select pg.pg_pokemon, pg.target_pokemon, pg.pokemon_form_id, pg.pokemon_id, pg.form_id, pg.family_id, pg.branch, pg.stage_id, pg.iv_id
    , pg.iv_str
    , pg.pg_lvl, pg.pg_lvl_id
		, pg.dust_current, pg.candy_current
    , min(pg_lvl_id) as pg_min_lvl_id  # min lvl/lvl_id only needed for 'where' clause in distinctPokeForm_leagueStats, disable due to performance penalty
    , min(pg_lvl) as pg_min_lvl
    from pgEntries_pokeFormsToCheck pg
    group by (pokemon_form_id)
)
, distinctPokeForm_leagueStats as ( 
-- 	select *
  ### human friendly version, for testing
	select 
		-- pg_id,
    pg.pg_pokemon, pg.family_id
		, pg.target_pokemon, s.*
  from distinctPokeFormsToCheck as pg
  inner join pokemon_form_ivs as s
--   using (pokemon_form_id)
--   -- where pg_min_lvl_id >= gl_level_id # seems like this hurts cost and time performance
  on (pg.pokemon_form_id = s.pokemon_form_id and s.gl_level_id >= pg.pg_min_lvl_id) ## !!! RAN OUT OF MEMORY (when run at ~11/16 GB utilized)
)
, pgEntries_distinctPokeFormsToCheck_leagueStats as ( 
		-- select *
    select 
			pg.pg_pokemon,
			-- , pg_id
			pg.family_id, pg.target_pokemon, pg.pokemon_form_id
--     , i.iv_id as pg_iv_id
    , s.*
    , pg.pg_lvl_id
    , pg.dust_current, pg.candy_current
    
    from pgEntries_pokeFormsToCheck as pg
    -- inner join pgEntriesIds i
    -- using (pg_id)
--     inner join distinctPokeForm_leagueStats as ls 				# returns only given iv_id of pokeGenie entry + evos
--     on (pg.pokemon_form_id,i.iv_id) = (ls.pokemon_form_id, ls.iv_id )
    -- using (pokemon_form_id,iv_id)
    inner join distinctPokeForm_leagueStats as s
    using (pokemon_form_id)
)
, pgEntries_pokeFormsToCheck_leagueStats as (
	-- select *
  ### human friendly version, for testing
		select pg_id, pg.pg_pokemon, pg.family_id, pg.target_pokemon
-- 			, s.pokemon_form_id
      -- , pf.pokemon_id, pf.form_id, p.family_id, p.branch, p.stage_id
--       , s.iv_id
			, iv_str
			, pg_lvl, pg_lvl_id
			, dust_current, candy_current
			, s.*
  from pgEntries_pokeFormsToCheck as pg
  inner join pokemon_form_ivs as s
  on (pg.pokemon_form_id = s.pokemon_form_id and s.gl_level_id >= pg.pg_lvl_id)
  -- using (pokemon_form_id)
)
, pgEntries_pokeFormsToCheck_leagueStats_costs as ( # candy costs DO NOT account for evolutions
	select pg.*
		, if(pg.pg_lvl_id < gl_level_id, (gl_lvl.total_dust_used - pg.dust_current), null) as gl_dust_cost
    , if(pg.pg_lvl_id < gl_level_id, (gl_lvl.total_candy_used - pg.candy_current), null) as gl_candy_cost 
    , if(pg.pg_lvl_id < ul_level_id, (ul_lvl.total_dust_used - pg.dust_current), null) as ul_dust_cost
    , if(pg.pg_lvl_id < ul_level_id, (ul_lvl.total_candy_used - pg.candy_current), null) as ul_candy_cost 
	## ----- CHOOSE ONE (all vs distinct) -----
  from pgEntries_pokeFormsToCheck_leagueStats as pg
  -- from pgEntries_distinctPokeFormsToCheck_leagueStats as pg
  ## ----------------------------------------
  inner join levels as gl_lvl
		on (gl_lvl.level_id = gl_level_id)
	left join levels as ul_lvl
		on (ul_lvl.level_id = ul_level_id)
)
, pgEntries_pokeFormsToCheck_leagueStats_costs as (
	select *
		, min(gl_dust_cost)
  from pgEntries_pokeFormsToCheck_leagueStats_costs
)
, selectionFormFam as (
		-- select *
		select f.pokemon_name, f.pokemon_form_id, f.pokemon_id, p.family_id, p.stage_id, p.branch
    from selectionFam f
    inner join pokemon_forms pf
    using (pokemon_form_id)
)
, selected_iv as (
		select *
		from iv_combos
		where atk_iv = @atk_iv and def_iv = @def_iv and sta_iv = @sta_iv
    -- where (atk_iv, def_iv, sat_iv) in selection
)
, selectionIvIds as (
-- 		select * 
-- 		select s.*, i.iv_id, i.iv_str
    select pg_id, pokemon_name, iv_str, pokemon_form_id, pokemon_id, family_id, stage_id, branch, iv_id
		from selection s
    inner join iv_combos i
    using (atk_iv, def_iv, sta_iv)
)
, selectionFamIvIds as (
		select *
    -- select pg_id, pokemon_name, iv_str, pokemon_form_id, pokemon_id, family_id, stage_id, branch, iv_id
    from selectionIvIds s
    -- inner join pokemon p
    -- using (family_id)
    where p.stage_id >= s.stage_id
)
, pokeFamFormIv as (
		select f.*, i.iv_id
		from selectionFormFam f
		cross join selected_iv i
)
, pokeFamFormIvRanks as (
		select * 
		FROM pokeFamFormIv
		inner join pokemon_form_ivs
		using (pokemon_form_id, iv_id)
)
, pokeFormIvGL as (
		SELECT pokemon_form_id, iv_str,
		level as gl_level, gl_cp, gl_hp, gl_stat_product, gl_rank, gl_percent_rank,
		ul_level_id, ul_cp, ul_hp, ul_stat_product, ul_rank, ul_percent_rank
		from pokeFamFormIvRanks
		inner join levels
		on (gl_level_id = level_id)
)
, pokeFormIvGLUL as (
		SELECT pokemon_form_id, iv_str,
		level as gl_level, gl_cp, gl_hp, gl_stat_product, gl_rank, gl_percent_rank,
		level as ul_level, ul_cp, ul_hp, ul_stat_product, ul_rank, ul_percent_rank
		from pokeFormIvGL
		inner join levels
		on (ul_level_id = level_id)
)
select *
-- from pgEntries
-- from pgEntriesIds
-- from pgEntries_pokeFormsToCheck
-- from distinctPokeFormsToCheck
-- from distinctPokeForm_leagueStats
-- from pgEntries_distinctPokeFormsToCheck_leagueStats
-- from pgEntries_pokeFormsToCheck_leagueStats
from pgEntries_pokeFormsToCheck_leagueStats_costs  ## switch source in query (all pf stats vs distinct pf stats)
-- from selectionIvIds
-- from selectionFamIvIds
-- from selectionFam
-- from selectionFormFam
-- from pokeFamFormIv
-- from pokeFamFormIvRanks
-- from pokeFormIvGL
-- from pokeFormIvGLUL

-- group by family_id, pokemon_form_id
-- order by 
-- 	family_id
-- 	,
-- 	pg_id
--   ,
--   pokemon_form_id
--   ,
--   gl_rank

-- limit 100
-- ;
