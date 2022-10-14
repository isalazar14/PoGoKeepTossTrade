-- get league stas for current pokemon and all possible evos

set @pokemon_id = 2;
set @form_id = 1;
Select family_id, branch, evolution_stage_id
from pokemon
where pokemon_id = @pokemon_id and branch
into @family_id, @branch, @stage_id;
-- select @pokemon_id, @form_id, @family_id, @branch, @stage_id;

-- explain
with
  pokemonFamily as (
		set @family_id=1;
    set @stage_id=3;
    -- explain
		select *
    from pokemon
    where family_id = @family_id and evolution_stage_id >= @stage_id /* and branch = if(@stage_id */
  ),
  pokemonFamLeagueStats as (
		select *
    from pokemonFamily
    inner join pokemon_form_ivs
    using (pokemon_id)
    where form_id = @form_id
  )
  select * from pokemonFamLeagueStats;