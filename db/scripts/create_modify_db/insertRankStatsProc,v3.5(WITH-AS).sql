# -- INSERT POKEMON_FORM_IVS WITH STAT PRODUCTS AND GL/UL RANKINGS

# delimiter //
# create procedure _createLeagueStatsForSelection (
# 	in maxCP smallint,
#   in maxLevel float
# )
# comment
# 'calculates rankings and stats for selection, inserts into table gl_ul_rank_stats_i.
# REQUIRES exisiting temp table "pf_selection" with cols "p_id" (pokemon id) and "f_id" (form id).
# This procedure should be called from a wrapping procedure which creates the temp table before calling this procedure, and drops the temp table afterward'
-- example
# drop temporary table if exists pf_selection
# create temporary table pf_selection (
# 	p_id smallint unsigned,
#   f_id tinyint unsigned,
# 	index (p_id, f_id)
# )

# begin

SET @pokemon_form_count = 20;
SET @p_id = 3;
SET @f_id = 2;
SET @ll_cpLimit = 500.9999999;
SET @gl_cpLimit = 1500.9999999;
SET @ul_cpLimit = 2500.9999999;
SET @maxLevel = 30;
set @maxLevelCpm = (select multiplier from levels where level = @maxLevel);
set @ivFloor = 0;

drop temporary table if exists filteredLevels1;
create temporary table filteredLevels1 like levels;
insert into filteredLevels1 select * from levels where level <= @maxLevel order by level desc;

drop temporary table if exists filteredLevels2;
create temporary table filteredLevels2 like levels;
insert into filteredLevels2 select * from levels where level <= @maxLevel order by level desc;

drop temporary table if exists filteredLevels3;
create temporary table filteredLevels3 like levels;
insert into filteredLevels3 select * from levels where level <= @maxLevel order by level desc;

# insert into gl_ul_rank_stats_i ( -- uncomment to insert 
# 		pf_id, iv_id
#   , gl_rank, `gl_rank_%`, gl_sp, `gl_sp_%`, gl_level, gl_cp, gl_hp
#   , ul_rank, `ul_rank_%`, ul_sp, `ul_sp_%`, ul_level, ul_cp, ul_hp
# )

# explain format = json
WITH recursive

baseStats as (
	select pf_id, p_id, f_id, base_atk, base_def, base_sta
	from pokemon_forms
	where p_id = @p_id and f_id = @f_id  -- comment out to run calculations for all pokemon
	# where pf_id <= @pokemon_form_count
	# where pf_id in (158,263,501)
	# where pf_id in (
# 			SELECT distinct pf_id
# 				# , p_id, f_id 
# 			FROM pokemon_go.upload_data 
# 			join forms using (form_name)
# 			join pokemon_forms using (p_id, f_id)
# 			where upload_id = 1		
# 			order by pf_id
# 		)
)
, ivsAboveFloor as (
	select * 
	from ivs
	where atk_iv >= @ivFloor and def_iv >= @ivFloor and sta_iv >= @ivFloor
)
, totalStatsByIv as (
	-- select p_id, f_id, iv_id as `ivs (atk,def,sta)`, iv_percent,
	select pf_id, p_id, f_id, iv_id
	, iv_str
	, (base_atk + atk_iv) as atk
	, (base_def + def_iv) as def
	, (base_sta + sta_iv) as sta
	, sta_iv -- for rank tie-breaking
	from baseStats
	# join ivsAboveFloor
  join ivs
)
/* get best lvl and related stats for each IV combo (using equivalent of Excel index/match: calculate theoretical CPM at CP caps (1500/2500),
then find the max cpm/multiplier below to the theoretical cpm)
-> avoids calculating stats and ranking for 300k+ rows, and filtering by cp under league caps */
, calcultedMaxCPMs as (
	select *
		, sqrt((@ll_cpLimit) * 10 / ( atk * SQRT(def * sta) )) as ll_cpmLimit -- NEED @cpLimit + 0.999999 to capture cases where cp would be floored
		, sqrt((@gl_cpLimit) * 10 / ( atk * SQRT(def * sta) )) as gl_cpmLimit
    , sqrt((@ul_cpLimit) * 10 / ( atk * SQRT(def * sta) )) as ul_cpmLimit
	from totalStatsByIv
)
, trueMaxCPMsWithLevelStats as ( -- look level for each iv_id by finding multiplier closest to calculated cpm @ 1500cp and 2500cp [join on (multiplier <= calculated cpm limit 1)]; calculate cp
	select # *
		pf_id, p_id, f_id
    , iv_id
    , iv_str
    , sta_iv -- needed for ranking later
#     , atk, def -- base + iv stats
    , sta -- need it for CP calc (i.e. NOT sta * multiplier)
    -- little leage ------------------------
    , GREATEST( 10, FLOOR(( (atk) * SQRT(def *sta) * POWER(ll.multiplier, 2) )/10 ) ) AS ll_cp -- NEED FLOOR!!
    , atk * ll.multiplier as ll_Atk -- needed for ranking later
# 		, def * ll.multiplier as ll_Def
    , floor(sta * ll.multiplier) as ll_hp -- needed for ranking later
    , round((atk * ll.multiplier) * (def * ll.multiplier) * floor(sta * ll.multiplier), 0) as ll_sp -- sp WITH rounding
    # , ((atk * ll.multiplier) * (def * ll.multiplier) * floor(sta * ll.multiplier)) as ll_sp -- sp WITHOUT rounding (doesn't help any rank tie breaking)
    -- great league ------------------------
#     , gl_calcCpm, ul_calcCpm -- for debugging level and cp results
    , GREATEST( 10, FLOOR(( (atk) * SQRT(def *sta) * POWER(gl.multiplier, 2) )/10 ) ) AS gl_cp -- NEED FLOOR!!
    , atk * gl.multiplier as gl_Atk -- needed for ranking later
# 		, def * gl.multiplier as gl_Def
    , floor(sta * gl.multiplier) as gl_hp -- needed for ranking later
    , round((atk * gl.multiplier) * (def * gl.multiplier) * floor(sta * gl.multiplier), 0) as gl_sp
    # , ((atk * gl.multiplier) * (def * gl.multiplier) * floor(sta * gl.multiplier)) as gl_sp
    -- ultra league ------------------------
		, GREATEST( 10, FLOOR(( (atk) * SQRT(def * sta) * POWER(ul.multiplier, 2) )/10 ) ) AS ul_cp
    , atk * ul.multiplier as ul_Atk -- needed for ranking later
# 		, def * ul.multiplier as ul_Def
    , floor(sta * ul.multiplier) as ul_hp -- needed for ranking later
		, round((atk * ul.multiplier) * (def * ul.multiplier) * floor(sta * ul.multiplier), 0) as ul_sp
    # , ((atk * ul.multiplier) * (def * ul.multiplier) * floor(sta * ul.multiplier)) as ul_sp
    , ll.level as ll_level
#     , gl.level_id as gl_level_id
    , gl.level as gl_level
#     , gl.multiplier as gl_multiplier
#     , gl.dust_cost as gl_dust_cost, gl.candy_cost as gl_candy_cost, gl.total_dust_used as gl_total_dust, gl.total_candy_used as gl_total_candy
#     , ul.level_id as ul_level_id
    , ul.level as ul_level
#     , ul.multiplier as ul_multiplier
#     , ul.dust_cost as ul_dust_cost, ul.candy_cost as ul_candy_cost, ul.total_dust_used as ul_total_dust, ul.total_candy_used as ul_total_candy
	from calcultedMaxCPMs r
  -- join levels using temp tables for subquery ; joins a bit faster than using main levels table, AND makes rankings 2x as fast for some reason
	left join levels ll on ((p_id, f_id) in (select * from little_league_mons) and ll.multiplier = (select multiplier from filteredLevels1 fl1 where fl1.multiplier <= r.ll_cpmLimit order by fl1.multiplier desc limit 1))
  join levels gl on (gl.multiplier = (select multiplier from filteredLevels2 fl2 where fl2.multiplier <= r.gl_cpmLimit order by fl2.multiplier desc limit 1))
  join levels ul on (ul.multiplier = (select multiplier from filteredLevels3 fl3 where fl3.multiplier <= r.ul_cpmLimit order by fl3.multiplier desc limit 1))
  -- join levels using main levels table for subquery
#   left join levels ll on ((p_id, f_id) in (select * from little_league_mons) and ll.multiplier = least((select multiplier from levels where multiplier <= r.ll_cpmLimit order by multiplier desc limit 1), @maxLevelCpm))
#   join levels gl on (gl.multiplier = least((select multiplier from levels where multiplier <= r.gl_cpmLimit order by multiplier desc limit 1), @maxLevelCpm))
# 	join levels ul on (ul.multiplier = least((select multiplier from levels where multiplier <= r.ul_cpmLimit order by multiplier desc limit 1), @maxLevelCpm))
)
, rankings as (
  select *
			# pf_id, iv_id, gl_level_id, gl_cp, gl_sp # , gl_hp
		# , rank () over(pokeForm order by ll_sp desc, ll_atk desc) as ll_rank
    , if(ll_sp is null, null, rank () over(pokeForm order by ll_sp desc, ll_atk desc, ll_hp desc, ll_cp desc, sta_iv desc)) as ll_rank
		, if(ll_sp is null, null, max(ll_sp) over(pokeForm)) as ll_max_sp
    # -----------
    # , rank () over(pokeForm order by gl_sp desc, gl_atk desc) as gl_rank
		, rank () over(pokeForm order by gl_sp desc, gl_atk desc, gl_hp desc, gl_cp desc, sta_iv desc) as gl_rank
		, max(gl_sp) over(pokeForm) as gl_max_sp
    # -----------
    # , rank () over(pokeForm order by ul_sp desc, ul_atk desc) as ul_rank
    , rank () over(pokeForm order by ul_sp desc, ul_atk desc, ul_hp desc, ul_cp desc, sta_iv desc) as ul_rank
		, max(ul_sp) over(pokeForm) as ul_max_sp
    from trueMaxCPMsWithLevelStats -- 37.000 sec / 5.938 sec
														-- 36.938 sec / 6.125 sec
		window pokeForm as (partition by pf_id) -- named window, used in all window functions above
)
, rankStats as (
	select # *
			pf_id
		, p_id, f_id
		, iv_id, iv_str
		, ll_rank, ll_sp, ll_level, ll_cp, ll_hp
		, gl_rank, gl_sp, gl_level, gl_cp, gl_hp
		, ul_rank, ul_sp, ul_level, ul_cp, ul_hp
    , if(ll_sp is null, null, round((4096-ll_rank)/4095 * 100, 3)) as `ll_rank_%`
    # , ll_max_sp
    , if(ll_sp is null, null, round(ll_sp / ll_max_sp * 100, 3)) as `ll_sp_%`
    # -----------
    , round((4096-gl_rank)/4095 * 100, 3) as `gl_rank_%`
    # , gl_max_sp
    , round(gl_sp / gl_max_sp * 100, 3) as `gl_sp_%`
    # -----------
    , round((4096-ul_rank)/4095 * 100, 3) as `ul_rank_%`
    # , ul_max_sp
    , round(ul_sp / ul_max_sp * 100, 3) as `ul_sp_%`
  from rankings
)
, rankStats_colsToInsert as (
	select
		pf_id
	, p_id, f_id
  , iv_id
	, ll_rank, `ll_rank_%`, ll_sp, `ll_sp_%`, ll_level, ll_cp, ll_hp
  , gl_rank, `gl_rank_%`, gl_sp, `gl_sp_%`, gl_level, gl_cp, gl_hp
  , ul_rank, `ul_rank_%`, ul_sp, `ul_sp_%`, ul_level, ul_cp, ul_hp
	from rankStats
	order by pf_id, iv_id
)
-- test intermediates
# select * from baseStats
# select * from calcultedMaxCPMs
select * from trueMaxCPMsWithLevelStats
# select * from rankings -- this is the expensive part
# select * from rankStats
-- final select
# select * from rankStats_colsToInsert
where p_id = @p_id and f_id = @f_id # order by gl_rank
;

-- export results to file
# into outfile 'pokemon_go/exports/rankStats.csv'
# 	fields terminated by ','
#   lines terminated by '\n'
# ;

drop temporary table if exists filteredLevels1;
drop temporary table if exists filteredLevels2;
drop temporary table if exists filteredLevels3;

# end
# delimiter ;