# Check MY cp/hp calcs against known cp/hp values
# works with values from pokeGenie csv export file OR manually entered data

WITH
manualPokeList as (
	select * 
	from ( values -- add/remove rows as needed
			row(345,1,699,104,15,14,15,19),
			row(88,2,755,122,10,14,15,20),
			row(371,1,369,66,5,15,15,12),
			row(425,1,783,140,15,15,13,23),
			row(66,1,1017,130,15,15,13,28),
			row(265,1,512,106,14,15,14,33),
			row(387,1,209,55,3,15,13,7),
			row(276,1,501,88,0,15,7,27),
			row(133,1,723,113,0,7,14,28),
			row(198,1,778,98,1,13,15,19),
			row(390,1,541,83,15,15,12,20),
			row(276,1,657,98,15,14,13,31),
			row(86,1,732,122,13,15,14,27),
			row(137,1,1212,123,1,14,15,27),
			row(559,1,576,78,12,15,15,15),
			row(213,1,319,70,15,3,15,28),
			row(498,1,848,124,13,15,13,28),
			row(506,1,507,85,12,14,15,20),
			row(233,1,1316,119,4,15,13,18),
			row(397,1,652,93,5,13,14,19),
			row(133,1,465,86,0,13,7,18),
			row(220,1,602,106,15,14,11,29),
			row(66,1,251,69,0,10,13,8),
			row(498,1,939,130,14,14,12,32),
			row(557,1,603,87,4,13,14,19),
			row(59,1,1494,125,1,14,12,18.5),
			row(102,1,921,118,14,14,12,28),
			row(276,1,493,88,0,12,8,27),
			row(4,1,468,73,3,13,9,19),
			row(130,1,1494,124,2,11,13,16.5),
			row(371,1,828,99,1,14,13,28),
			row(349,1,150,58,14,13,13,20),
			row(304,1,1057,107,13,15,12,29),
			row(63,1,465,51,5,12,14,13),
			row(111,1,197,59,0,11,14,5),
			row(349,1,150,57,14,14,12,20),
			row(92,1,549,62,0,10,8,18),
			row(371,1,773,96,3,12,13,26),
			row(133,1,867,114,14,13,13,29),
			row(279,1,1496,118,2,7,15,27),
			row(143,1,1499,188,1,11,2,18),
			row(334,1,1500,138,1,10,10,29.5),
			row(133,1,893,116,13,14,13,30),
			row(529,1,1069,118,12,14,13,28),
			row(13,1,408,101,14,13,13,35),
			row(92,1,504,61,1,10,14,16),
			row(88,1,764,120,12,15,12,20),
			row(228,1,596,82,1,10,14,19),
			row(133,1,897,113,15,14,9,30),
			row(340,1,1492,178,2,14,13,27.5)
		) 
    as t (pokemon_id,form_id,cp,hp,atk_iv,def_iv,sta_iv,level)
	inner join levels
	using (level)
)
, csvData as ( -- requires a table called pokeGenieData, containing pokeGenie csv file data
	select *
  from pokeGenieData
  inner join forms
  using (form_name)
  inner join levels
	on (level=level_min)
)
, pokeFormStats_multipliers as (
	select 
-- 		*
  pokemon_form_id, pokemon_id
  -- , form_id
  , cp, hp
  , level, level_id, multiplier
  , base_atk, base_def, base_sta
  , atk_iv, def_iv, sta_iv
  , (base_atk + atk_iv) as atk_total,
		(base_def + def_iv) as def_total,
		(base_sta + sta_iv) as sta_total
	# ---------------------
	### CHOOSE ONE, comment out the other
	from manualPokeList
  -- from csvData
  # ---------------------
	inner join pokemon_forms 
	using (pokemon_id, form_id)
)
	, calcCpHp as (
    select *
		, getCP(atk_total,def_total,sta_total,multiplier) as calc_cp
    , getHP(sta_total,multiplier) as calc_hp
		from pokeFormStats_multipliers
	)
  , calcCheck as (
		select *
    , cp=calc_cp as cp_match
    , hp=calc_hp as hp_match
    from calcCpHp
  )
  , calcCpErrors as (
		select * 
		from calcCheck
-- 		where cp_match = 0 or hp_match = 0
  )
  , calcCpErrors_pokemon as (
		select *
    from calcCpErrors
    inner join pokemon
    using (pokemon_id)
  )
select *
    , calc_cp-cp as cp_diff
    , calc_hp-hp as hp_diff
from calcCpErrors_pokemon
order by pokemon_form_id, cp_match