-- create pokemon_form / iv combos for one pokemon_form_id, insert into pokemon_form_ivs table

delimiter $$

create procedure createPokemonFormIvs(
 in pokemonFormId smallint
)
	begin
		insert into pokemon_form_ivs (pokemon_form_id, iv_id)
		select pokemon_form_id, iv_id 
		from (select pokemonFormId as pokemon_form_id) pID
		cross join iv_combos 
		order by pokemon_form_id, iv_id;
  end $$
  
  delimiter ;