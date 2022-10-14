/*
'Loads PokeGenie export data from local file; for building/testing db
File must be in C:\ProgramData\MySQL\MySQL Server 8.0\pokemon_go\csvData\
File name must be "poke_genie_export.csv" (or alter script to match filename)'
*/

drop temporary table if exists pgCsvData;

create temporary table pgCsvData(
	idx smallint primary key,
	pokemon varchar(20),
	form varchar(10),
	pokemon_id smallint,
	gender char(1),
	cp smallint,
	hp smallint,
	atk_iv tinyint,
	def_iv tinyint,
	sta_iv tinyint,
	`iv_%` float,
# 	level_min float,
# 	level_max float,
  `level` float,
	quick_move varchar(20),
	charge_move varchar(20),
	charge_move_2 varchar(20),
# 	scan_date datetime,
# 	original_scan_date datetime,
	catch_date date,
# 	weight_kg float,
# 	height_m float,
	lucky tinyint,
	shadow_purified tinyint,
	favorite tinyint,
	dust smallint,
	`gl_rank_%` float,
	gl_rank smallint,
	`gl_sp_%` float,
	gl_dust_cost mediumint,
	gl_candy_cost smallint,
	gl_pokemon varchar(20),
	gl_form varchar(10),
	gl_sha_pur tinyint,
	`ul_rank_%` float,
	ul_rank smallint,
	`ul_sp_%` float,
	ul_dust_cost mediumint,
	ul_candy_cost smallint,
	ul_pokemon varchar(20),
	ul_form varchar(10),
	ul_sha_pur tinyint,
	marked_for_pvp_use tinyint,
  index (idx), index (pokemon_id, atk_iv, def_iv, sta_iv, catch_date)
);

load data infile "pokemon_go\\csvData\\poke_genie_export.csv" -- double backslashes bc backslashes need to be escaped
into table pgCsvData
fields terminated by ","
ignore 1 rows -- skip headers
 (
	idx, pokemon, form, pokemon_id, @gender
	, cp, hp, atk_iv, def_iv, sta_iv, `iv_%`
  , @level_min, @level_max
	, quick_move, charge_move, charge_move_2
	, @scan_date, @original_scan_date, @catch_date
	, @weight_kg, @height_m -- setting as variables, but not including in 'SET' below will skip these cols
	, lucky,shadow_purified,favorite
	, dust
	, @gl_rank_percent, gl_rank, @gl_sp_percent, gl_dust_cost, gl_candy_cost, gl_pokemon, gl_form, gl_sha_pur
	, @ul_rank_percent, ul_rank, @ul_sp_percent, ul_dust_cost, ul_candy_cost, ul_pokemon, ul_form, ul_sha_pur
  , marked_for_pvp_use
)

set
  gender = (
		case @gender
			when "♂" then "m"
			when "♀" then "f"
			else NULL
		end)
# 	, scan_date = str_to_date(@scan_date, "%Y-%m-%d %H:%i")
#   , original_scan_date = str_to_date(@original_scan_date, "%Y-%m-%d %H:%i")
	, catch_date = str_to_date(@catch_date, "%m/%d/%Y")
  # , weight_kg = cast(replace(@weight_kg, "kg", "") as float)
  # , height_m = cast(replace(@height_m, "m", "") as float)
  , `level` = cast(if(@level_min = @level_max, @level_min, null) as float)
	, `gl_rank_%` = cast(replace(@gl_rank_percent, "%", "") as float)
	, `gl_sp_%` = cast(replace(@gl_sp_percent, "%", "") as float)
  , `ul_rank_%` = cast(replace(@ul_rank_percent, "%", "") as float)
	, `ul_sp_%` = cast(replace(@ul_sp_percent, "%", "") as float)
;

select * from pgCsvData;