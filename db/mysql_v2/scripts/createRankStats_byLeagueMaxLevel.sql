/* INSERT RANK STATS INTO pvp_rank_stats_tabular
	derived from 'calcPokeFormIvLeagueStatsProc,v3.5(WITH-AS)' which was used for pvp_rank_stats, which was pivoted (cols for gl stats and ul_stats)
*/

delimiter //
# create procedure _createRankStats_byLeagueMaxLevel (
create procedure calcRankStats_byLeagueMaxLevel_insert (
	# in pId smallint,
#   in fId tinyInt,
	in league char(1), -- must be a league_id from leagues table
  in maxLevel float,
  in ivFloor tinyint
)
comment
'calculates rankings and stats for all pokeForms, for a given league, max level, and iv floor; creates temporary table "leageLevelRankStats"' 
# 'calculates rankings and stats for selection, inserts into table pvp_rank_stats_tabular.'
-- next bit was part of comment for when procedure was for multiple pokeform
# REQUIRES exisiting temp table "pf_selection" with cols "p_id" (pokemon id) and "f_id" (form id).
# This procedure should be called from a wrapping procedure which creates the temp table before calling this procedure, and drops the temp table afterward'
-- example
# drop temporary table if exists pf_selection
# create temporary table pf_selection (
# 	p_id smallint unsigned,
#   f_id tinyint unsigned,
# 	index (p_id, f_id)
# )
begin
-- should create error handler for invalid cp limits / league
-- should create error handler for missing pf_selection temp table
# SET @p_id = pId;
# SET @f_id = fId;
SET @leagueId = league;
SET @maxLevel = maxLevel;
set @ivFloor = ivFloor;
set @maxLevelCpm = (select multiplier from levels where level = least(maxLevel, 51));
SET @cpLimit = (select cp_limit from leagues where league_id = league) + 0.9999999; -- NEED @cpLimit + 0.999999 to capture cases where cp would be above limit + 1 (i.e. floored back to limit)

-- for testing
# SET @pokemon_form_count = 100;
# SET @p_id = 6;
# SET @f_id = 59;
# set @leagueId = 'G';
# SET @maxLevel = 41;
# set @ivFloor = 0;
# set @maxLevelCpm = (select multiplier from levels where level = least(maxLevel, 51));
# SET @cpLimit = (select cp_limit from leagues where league_id = @leagueId) + 0.9999999; -- NEED @cpLimit + 0.999999 to capture cases where cp would be floored

-- only needed if using filteredLevels to get max true cpm
# drop temporary table if exists filteredLevels;
# create temporary table filteredLevels like levels;
# insert into filteredLevels select * from levels where level <= @maxLevel order by level desc;

-- this was for inserting directly into destination table, instead of just selecting result set
insert into pvp_rank_stats_tabular
# (
# # 		pf_id
# #   , gl_rank, `gl_rank_%`, gl_sp, `gl_sp_%`, gl_level, gl_cp, gl_hp
# #   , ul_rank, `ul_rank_%`, ul_sp, `ul_sp_%`, ul_level, ul_cp, ul_hp
# 		-- -------
#       p_id, f_id, league_id, max_level
# 		, iv_id
# 		, level, cp
#     , `rank_%`, `rank`
#     , `sp_%`, sp
#  )

# drop temporary table if exists leagueLevelRankStats;
# create temporary table leagueLevelRankStats 
# # ( index idx_full (pf_id, sp , atk , hp , cp , sta_iv )
# # , index idx_pf_sp (pf_id, sp))
# # engine = memory

# explain format = json
	WITH
pf_selection as (
	select *
  from pokemon_forms
  # where p_id = @p_id and f_id = @f_id  -- comment out to run calculations for all pokemon
  # where pf_id <= @pokemon_form_count
  # where (p_id, f_id, @leagueId, @maxLevel) not in (select p_id, f_id, league_id, max_level from pvp_rank_stats_tabular)
)
, ivsAboveFloor as ( -- technically 
	select * 
	from ivs
	where atk_iv >= @ivFloor and def_iv >= @ivFloor and sta_iv >= @ivFloor
)
, calcultedCpmLimits as (
  select 	*
				# p_id, f_id, iv_id
				# , base_atk, base_def, base_sta
				, (base_atk + atk_iv) as tAtk
				, (base_def + def_iv) as tDef
				, (base_sta + sta_iv) as tSta
				# , sqrt((@cpLimit) * 10 / ( (base_atk + atk_iv) * SQRT((base_def + def_iv) * (base_sta + sta_iv)) )) as cpmLimit
        , ( select multiplier from levels 
						where multiplier <= sqrt((@cpLimit) * 10 / ( (base_atk + atk_iv) * SQRT((base_def + def_iv) * (base_sta + sta_iv)) )) -- calcCpLimit 
            order by multiplier desc limit 1
					) as multiplier
				# , sta_iv -- for rank tie-breaking
	from pf_selection pf
  # cross join ivs
  cross join ivsAboveFloor
)
, trueMaxCPMsWithLevelStats as ( -- look level for each iv_id by finding multiplier closest to calculated cpm @ 1500cp and 2500cp [join on (multiplier <= calculated cpm limit 1)]; calculate cp
	select
			r.*
		, l.level
    # , l.multiplier
# 		pf_id
#     , iv_id
#     , iv_str
#     , sta_iv -- needed for ranking later
#     # , atk, def -- base + iv stats
#     , sta -- need it for CP calc (i.e. NOT sta * multiplier)
#     # , cpmLimit -- for debugging level and cp results
    , GREATEST( 10, FLOOR(( (tAtk) * SQRT(tDef * tSta) * POWER(l.multiplier, 2) )/10 ) ) AS cp -- NEED FLOOR!!
    , tAtk * l.multiplier as ATK -- needed for ranking later
# 		, def * multiplier as DEF
    , floor(tSta * l.multiplier) as hp -- needed for ranking later
    , round((tAtk * l.multiplier) * (tDef * l.multiplier) * floor(tSta * l.multiplier)) as sp
#     , level as level
#     , multiplier as multiplier
#     , dust_cost, candy_cost, total_dust, total_candy
	from calcultedCpmLimits r
	inner join levels l on (l.multiplier = 
		-- applying max level via filteredLevels temp table; a bit faster than line below
			-- select 100 pf -> 36.5 sec duration, 1.6 sec fetch
      -- select 100 pf into memory table -> 36.5 sec duration
		# if(@leagueId = 'M', @maxLevelCpm, (select multiplier from filteredLevels fl where fl.multiplier <= r.cpmLimit order by fl.multiplier desc limit 1))
		-- applying max level via least of [@maxLevelCpm] or [true cpm] (found in place) 
			-- select 100 pf -> 27.2 sec duration, 1.6 sec fetch
		# least((select multiplier from levels where multiplier <= r.cpmLimit order by multiplier desc limit 1), @maxLevelCpm)
    -- applying max level via least of [@maxLevelCpm] or [true cpm] (from trueMaxCpms above) 
			-- select 100 pf -> 16.15 sec duration / 1.6 sec fetch
      -- select 100 pf into memory table -> 29.3 sec duration
		if(@leagueId = 'M', @maxLevelCpm, least(r.multiplier, @maxLevelCpm))
	)
)
, rankings as (
  select *
		# pf_id, iv_id, level, cp, sp # , hp
		, cast(rank () over(pokeForm order by sp desc, ATK desc, hp desc, cp desc, sta_iv desc) as signed) as `rank`
		, max(sp) over(pokeForm) as max_sp
    from trueMaxCPMsWithLevelStats -- 37.000 sec / 5.938 sec
														-- 36.938 sec / 6.125 sec
		# from leagueLevelRankStats 
    window pokeForm as (partition by pf_id)
    # order by `rank`
)
, rankStats as (
	select *
			# pf_id, iv_id, iv_str
		# , `rank`, sp, level, cp, hp
    , round((4096-`rank`)/4095 * 100, 3) AS `rank_%`
    # , max_sp
    , round(sp / max_sp * 100, 3) as `sp_%`
  from rankings
  # order by `rank`
)
, rankStats_colsToInsert as (
	select # *
		p_id, f_id, cast(@leagueId as char(1)) as league_id, @maxLevel as max_level, iv_id, level, cp, `rank_%`, `rank`, `sp_%`, sp
	-- for inserting into pvp_rank_stats_i/m -----
	# pf_id, iv_id
#   , `rank`, `rank_%`, sp, `sp_%`, level, cp, hp
	from rankStats
	# order by 
#   # pf_id, iv_id
#   `rank`
)
-- test intermediates
select 
	/*+	
			set_var(internal_tmp_mem_storage_engine = MEMORY)
			set_var(tmp_table_size = 1G)
			set_var(max_heap_table_size = 1G)
      set_var(sort_buffer_size = 1G)
	*/
# * from calcultedCpmLimits
# * from trueMaxCPMsWithLevelStats
# * from rankings
# * from rankStats
-- final select
* from rankStats_colsToInsert
# where (p_id, f_id) = (@p_id, @f_id)
# limit 1
;

-- export results to file
# into outfile 'pokemon_go/exports/rankStats.csv'
# 	fields terminated by ','
#   lines terminated by '\n'
# ;

end //
delimiter ;