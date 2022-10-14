# create or replace view get_unvolved_mons_2 as
select 
		distinct pf_id
	, pokemon_name as pokemon
  , form_name as form
from pokemon
join pokemon_forms using (p_id)
join forms using (f_id)
join (select family_id, max(rel_stage) as max_stage from pokemon group by family_id) t
	using (family_id)
where rel_stage = 0 and max_stage > 0
order by family_id