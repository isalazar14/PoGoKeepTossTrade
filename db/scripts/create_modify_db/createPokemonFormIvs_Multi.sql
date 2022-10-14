-- create pokemon_form / iv combos for RANGE of pokemon_form_id, insert into pokemon_form_ivs table

delimiter $$
create procedure createPokemonFormIvs_Multi (
	in pokemonFormId_start smallint,
  in pokemonFormId_end smallint
  )
  begin
		set @current_pokemonFormId = pokemonFormId_start;
		while @current_pokemonFormId <= pokemonFormId_end do
			call createPokemonFormIvs(@current_pokemonFormId);
			set @current_pokemonFormId = @current_pokemonFormId + 1;
		end while;
	end $$
delimiter ;