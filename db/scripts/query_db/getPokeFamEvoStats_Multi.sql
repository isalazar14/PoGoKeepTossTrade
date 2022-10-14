-- count pokemon_form_iv entries for specific pokemon form
-- select count(*) from pokemon_form_ivs where pokemon_form_id = (select pokemon_form_id from pokemon_forms where pokemon_id = @pokemon_id and form_id = @form_id)
-- and ul_rank is not null -- uncomment to count NON-NULL entries
-- ;
-- select single pokemon to compare my calculated values against pokegenie/stadiumgaming.gg

with pgEntries as (
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
, pgEntriesIds as (		
    -- select *
		select pg_id, pokemon_name, iv_str, pokemon_form_id, pokemon_id, form_id, family_id, branch, stage_id, iv_id
		from pgEntries pg
		inner join pokemon p
    using (pokemon_id)
    inner join pokemon_forms pf
    using (pokemon_id, form_id)
    inner join iv_combos
    using (atk_iv, def_iv, sta_iv)
)
, pgEntries_pokeFormsToCheck as (
--		-- human friendly version, for testing
-- 		select pg_id, pg.pokemon_name as pg_pokemon,
-- 			p.pokemon_name as pokemon_to_check, pf.pokemon_form_id, pf.pokemon_id, pf.form_id, p.family_id, p.branch, p.stage_id, iv_id, iv_str

		-- computer friendly version
    select pg_id, pf.pokemon_form_id 
    
		from pgEntriesIds pg 
    inner join pokemon p 
    on (pg.family_id = p.family_id and p.stage_id >= pg.stage_id)
    inner join pokemon_forms pf
    on (pf.pokemon_id = p.pokemon_id and pf.form_id = pg.form_id)
)
, distinctPokeFormsToCheck as (
		select distinct pokemon_form_id
    from pgEntries_pokeFormsToCheck
)
, distinctPokeForm_ivRanks as (
	select *
  from distinctPokeFormsToCheck
  inner join pokemon_form_ivs
  using (pokemon_form_id)
)
, pgEntries_pokeFormsToCheck_ivRanks as (
		-- select *
    select pg_id, i.iv_id as pg_iv_id, r.*
    from pgEntries_pokeFormsToCheck pg
    inner join pgEntriesIds i
    using (pg_id)
    inner join distinctPokeForm_ivRanks r
    on (pg.pokemon_form_id = r.pokemon_form_id and i.iv_id = r.iv_id )
)
-- , pgEntries
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
    -- from selectionIvIds s
    -- inner join pokemon p
    -- using (family_id)
    where p.stage_id >= s.stage_id
)
, pokeFamFormIv as (
		select f.*, i.iv_id
		from selectionFamForm f
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
-- from distinctPokeForm_ivs
from pgEntries_pokeFormsToCheck_ivRanks
-- from selectionIvIds
-- from selectionFamIvIds
-- from selectionFam
-- from selectionFormFam
-- from pokeFamFormIv
-- from pokeFamFormIvRanks
-- from pokeFormIvGL
-- from pokeFormIvGLUL

order by 
	pg_id
  ,
  pokemon_form_id desc
  ,
  gl_rank	
;