select p.pokemon_id as number, p.name, t1.type, t2.type, d.attack, d.defense, d.stamina, f.name as family, s.stage_name as stage, p.branch
from pokemon p
left join pokemon_forms d using(pokemon_id)
left join forms using(form_id)
left join types t1 on d.type1_id = t1.type_id
left join types t2 on d.type2_id = t2.type_id
left join families f using (family_id)
left join evolution_stages s on p.evolution_stage_id = s.stage_id;
