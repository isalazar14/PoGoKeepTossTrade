-- select single pokemon to compare my calculated values against pokegenie/stadiumgaming.gg

set @pokemon_id = 558;
set @form_id = 1;
set @atk_iv = 15;
set @def_iv = 15;
set @sta_iv = 14;

with selection as (
 select *
 from pokemon_forms
 where pokemon_id = @pokemon_id and form_id = @form_id
)
, selected_iv as (
	select *
  from iv_combos
  where atk_iv = @atk_iv and def_iv = @def_iv and sta_iv = @sta_iv
)
, pokeFormIv as (
	select * 
  from selection 
  cross join selected_iv
)
, pokemonFormIvRanks as (
	select *
	FROM pokeFormIv
	inner join pokemon_form_ivs
	using (pokemon_form_id, iv_id)
)
, pokeFormIvGL as (
	SELECT pokemon_form_id, iv_str,
	level as gl_level, gl_cp, gl_hp, gl_stat_product, gl_rank, gl_percent_rank,
  ul_level_id, ul_cp, ul_hp, ul_stat_product, ul_rank, ul_percent_rank
from pokemonFormIvRanks
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
-- from pokemonFormIvRanks
-- from pokeFormIvGL
from pokeFormIvGLUL
;

-- count pokemon_form_iv entries for specific pokemon form
select count(*) from pokemon_form_ivs where pokemon_form_id = (select pokemon_form_id from pokemon_forms where pokemon_id = 558 and form_id=1)
-- and ul_rank is not null -- uncomment to count NON-NULL entries
;
