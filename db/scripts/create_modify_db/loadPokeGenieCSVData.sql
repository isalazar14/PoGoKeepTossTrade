drop temporary table if exists pokeGenieData;
create temporary table pokeGenieData(
	`index` smallint,
	pokemon_name varchar(20) NULL,
	form_name varchar(10) NULL,
	pokemon_id smallint NULL,
	gender char(1) NULL,
	cp smallint NULL,
	hp smallint NULL,
	atk_iv tinyint NULL,
	def_iv tinyint NULL,
	sta_iv tinyint NULL,
	iv_percent float NULL,
	level_min float NULL,
	level_max float NULL,
	quick_move varchar(20) NULL,
	charge_move_1 varchar(20) NULL,
	charge_move_2 varchar(20) NULL,
	scan_date datetime NULL,
	original_scan_date datetime NULL,
	catch_date date NULL,
	weight_kg float NULL,
	height_m float NULL,
	lucky tinyint NULL,
	shadow_purified tinyint NULL,
	favorite tinyint NULL,
	dust smallint NULL,
	gl_rank_percent float NULL,
	gl_rank smallint NULL,
	gl_stat_prod_percent float NULL,
	gl_dust_cost mediumint NULL,
	gl_candy_cost smallint NULL,
	gl_name varchar(20) NULL,
	gl_form varchar(10) NULL,
	gl_sha_pur tinyint NULL,
	ul_rank_percent float NULL,
	ul_rank smallint NULL,
	ul_stat_prod_percent float NULL,
	ul_dust_cost mediumint NULL,
	ul_candy_cost smallint NULL,
	ul_name varchar(20) NULL,
	ul_form varchar(10) NULL,
	ul_sha_pur tinyint NULL,
	marked_for_pvp_use char(1) NULL
);

-- system variable sql-mode MUST BE "" (i.e. not in STRICT) for upload to work, so that empty fields are skipped during import
load data infile '../Uploads/poke_genie_export_sample_full.csv'
into table pokeGenieData
fields 
	optionally enclosed by '"'
	terminated by ","
ignore 1 rows
 ( -- column names
	`index`, @pokemon_name, @form_name, @pokemon_id, @gender,
	@cp, @hp, @atk_iv, @def_iv, @sta_iv, @iv_percent, @level_min, @level_max, 
	@quick_move, @charge_move_1, @charge_move_2,
	@scan_date, @original_scan_date, @catch_date,
	@weight_kg, @height_m,
	@lucky, @shadow_purified, @favorite,
	@dust,
	@gl_rank_percent, @gl_rank, @gl_stat_prod_percent, @gl_dust_cost, @gl_candy_cost, @gl_name, @gl_form, @gl_sha_pur,
	@ul_rank_percent, @ul_rank, @ul_stat_prod_percent, @ul_dust_cost, @ul_candy_cost, @ul_name, @ul_form, @ul_sha_pur,
  @marked_for_pvp_use
)
set	-- data transformations
	pokemon_id = if(@pokemon_id="", null, @pokemon_id), pokemon_name = if(@pokemon_name="", null, @pokemon_name), 
	cp = if(@cp="", null, @cp), hp = if(@hp="", null, @hp), 
  atk_iv = if(@atk_iv="", null, @atk_iv), def_iv = if(@def_iv="", null, @def_iv), sta_iv = if(@sta_iv="", null, @sta_iv), 
  level_min = if(@level_min="", null, @level_min), level_max = if(@level_max="", null, @level_max),
  quick_move = if(@quick_move="", null, @quick_move), charge_move_1 = if(@charge_move_1="", null, @charge_move_1), charge_move_2 = if(@charge_move_2="", null, @charge_move_2), 
  lucky = if(@lucky="", null, @lucky), shadow_purified = if(@shadow_purified="", null, @shadow_purified), favorite = if(@favorite="", null, @favorite), 
  dust = if(@dust="", null, @dust),
  favorite = if(@favorite="", null, @favorite), 
  gl_rank = if(@gl_rank="", null, @gl_rank), gl_dust_cost = if(@gl_dust_cost="", null, @gl_dust_cost), gl_candy_cost = if(@gl_candy_cost="", null, @gl_candy_cost), gl_name = if(@gl_name="", null, @gl_name), gl_name = if(@gl_name="", null, @gl_name), gl_sha_pur = if(@gl_sha_pur="", null, @gl_sha_pur),
  ul_rank = if(@ul_rank="", null, @ul_rank), ul_dust_cost = if(@ul_dust_cost="", null, @ul_dust_cost), ul_candy_cost = if(@ul_candy_cost="", null, @ul_candy_cost), ul_name = if(@ul_name="", null, @ul_name), ul_name = if(@ul_name="", null, @ul_name), ul_sha_pur = if(@ul_sha_pur="", null, @ul_sha_pur), 
  marked_for_pvp_use = if(@marked_for_pvp_use="", null, @marked_for_pvp_use),
  # ---------------------------------------------------
	form_name = if(@form_name = "Normal", "", @form_name),
	gender = if(@gender="♂", "m", if(@gender="♀", "f", NULL)),
  iv_percent = if(@iv_percent="", null, @iv_percent/100),
  level_min = if(@level_min != "" and @level_min = @level_max, level_min, NULL),
	scan_date = str_to_date(@scan_date, '%Y-%m-%d %H:%i'),
  original_scan_date = str_to_date(@original_scan_date, '%Y-%m-%d %H:%i'),
	catch_date = str_to_date(@catch_date, '%m/%e/%Y'),
  weight_kg = if(@weight_kg = "", null, replace(@weight_kg, "kg", "")),
  height_m = if(@weight_kg = "", null, replace(@height_m, "kg", "")),
	gl_rank_percent = replace(@gl_rank_percent, "%", "")/100,
	gl_stat_prod_percent = replace(@gl_stat_prod_percent, "%", "")/100,
  gl_form = if(@gl_form = "Normal", "", @gl_form),
  ul_rank_percent = replace(@ul_rank_percent, "%", "")/100,
	ul_stat_prod_percent = replace(@ul_stat_prod_percent, "%", "")/100,
  ul_form = if(@ul_form = "Normal", "", @ul_form)
;
select *
from pokeGenieData
;