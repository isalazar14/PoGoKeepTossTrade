-- spot checking cp/hp calcs
-- add rows to 'pokeList' as needed

WITH
pokeList as (
	select *
    from (
		values
			row(75,1,13,3,7,26.5),
			row(339,1,4,8,7,28)
		) t(pokemon_id,form_id,aIV,`dIV`,sIV,level)
    inner join pokemon_forms
    using (pokemon_id,form_id)
)
, pokeFormStats_multipliers as (
	select pokemon_form_id, level, level_id, multiplier
  , (base_atk + aIV) as atk,
		(base_def + `dIV`) as def,
		(base_sta + sIV) as sta
	from pokeList
	inner join levels
	using (level)
)
	, calcCpHp as (
    select *
-- 			, FLOOR(GREATEST( 10, ( (atk) * SQRT(def) * SQRT(sta) * POWER(multiplier, 2) )/10 ) ) AS calc_cp
-- 			, floor( sta * multiplier ) as calc_hp
		, getCP(atk,def,sta,multiplier) as calc_cp
    , getHP(sta,multiplier) as calc_hp
		from pokeFormStats_multipliers
	)
select * 
from calcCpHp