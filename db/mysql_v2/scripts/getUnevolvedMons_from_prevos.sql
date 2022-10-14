# create or replace view get_unvolved_mons_1 as
# explain format = JSON 
-- v2 (using self join)
with baseMons as (
select distinct pre1.prev_pf_id as pf_id
from pf_prev_evos pre1
left join pf_prev_evos pre2 on (pre1.prev_pf_id = pre2.pf_id)
where pre2.prev_pf_id is null
)
select 	pf_id
			, pokemon_name as pokemon
			, form_name as form
from baseMons b
join pokemon_forms using (pf_id)
join pokemon using (p_id)
join forms using (f_id)
join families using (family_id)
order by family_id;


-- v1 (using 'not in' subquery)
select 	pf_id 
			, pokemon_name as pokemon
			, form_name as form
from (
	select distinct prev_pf_id as pf_id   
	from pf_prev_evos
	where prev_pf_id not in (select pf_id from pf_prev_evos)
  ) baseMons
join pokemon_forms pf using (pf_id)
join pokemon using (p_id)
join forms using (f_id)
join families using (family_id)
order by family_id;