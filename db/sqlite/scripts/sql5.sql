-- explain query plan
WITH args0 as  (
 select
	100	as pokemon_form_count,
	3	as p_id,
	2	as f_id,
	'G'	as leagueId,
	40	as maxLevel,
	0	as ivFloor 
)
, args as (
	select *
	, (select cp_limit from leagues where league_id = leagueId) + 0.9999999 as cpLimit
	, (select multiplier from levels where level = min(maxLevel, 51)) as maxLevelCpm
	from args0
)
-- select * from args;
, pf_selection as (
	select pf.*
  from pokemon_forms as pf, args
  where pf.p_id = args.p_id and pf.f_id = args.f_id  -- comment out to run calculations for all pokemon
--   where pf_id <= args.pokemon_form_count
  -- where (p_id, f_id, args.leagueId, args.maxLevel) not in (select p_id, f_id, league_id, max_level from pvp_rank_stats_tabular)
)
, ivsAboveFloor as ( -- technically 
	select ivs.* 
	from ivs, args
	where ivs.iv_floor >= args.ivFloor
)
, maxCpms as (
  select 
	pf.*, ivs.*
	-- p_id, f_id, iv_id
	-- , base_atk, base_def, base_sta
	, (base_atk + atk_iv) as tAtk
	, (base_def + def_iv) as tDef
	, (base_sta + sta_iv) as tSta
	-- , sqrt((args.cpLimit) * 10 / ( (base_atk + atk_iv) * SQRT((base_def + def_iv) * (base_sta + sta_iv)) )) as cpmLimit
	, ( select multiplier from levels 
					where multiplier <= sqrt(args.cpLimit * 10 / ( (base_atk + atk_iv) * SQRT((base_def + def_iv) * (base_sta + sta_iv)) )) -- calcCpLimit 
		order by multiplier desc limit 1
				) as multiplier
	-- , sta_iv -- for rank tie-breaking
	from pf_selection pf, args
	cross join ivsAboveFloor ivs
	-- cross join ivs where ivs.iv_floor >= args.ivFloor
	
)
, trueMaxCPMsWithLevelStats as ( -- look level for each iv_id by finding multiplier closest to calculated cpm new. 1500cp and 2500cp [join on (multiplier <= calculated cpm limit 1)]; calculate cp
	select
			r.*
		, l.level
    -- , l.multiplier
-- 		pf_id
--     , iv_id
--     , iv_str
--     , sta_iv -- needed for ranking later
--     -- , atk, def -- base + iv stats
--     , sta -- need it for CP calc (i.e. NOT sta * multiplier)
--     -- , cpmLimit -- for debugging level and cp results
    , max( 10, FLOOR(( (tAtk) * SQRT(tDef * tSta) * POWER(l.multiplier, 2) )/10 ) ) AS cp -- NEED FLOOR!!
    , tAtk * l.multiplier as ATK -- needed for ranking later
-- 		, def * multiplier as DEF
    , floor(tSta * l.multiplier) as hp -- needed for ranking later
    , round((tAtk * l.multiplier) * (tDef * l.multiplier) * floor(tSta * l.multiplier)) as sp
--     , level as level
--     , multiplier as multiplier
--     , dust_cost, candy_cost, total_dust, total_candy
	from maxCpms r, args
	inner join levels l 
		on (l.multiplier = iif(args.leagueId = 'M',
								/* if true */ args.maxLevelCpm, 
								/* else */ min(args.maxLevelCpm,
												-- (select multiplier from levels where multiplier <= r.cpmLimit order by multiplier desc limit 1) 
													/* applying max level via min of [args.maxLevelCpm] or [true cpm] (found in place)
													select 100 pf -> 27.2 sec duration, 1.6 sec fetch */
												r.multiplier 
													/* applying max level via trueMaxCpms established in ) 
													select 100 pf -> 16.15 sec duration / 1.6 sec fetch
													select 100 pf into memory table -> 29.3 sec duration */
												
			)))
)
, rankings as (
  select *
		-- pf_id, iv_id, level, cp, sp -- , hp
		, cast(rank () over(pokeForm order by sp desc, ATK desc, hp desc, cp desc, sta_iv desc) as signed) as rank_
		, max(sp) over(pokeForm) as max_sp
    from trueMaxCPMsWithLevelStats -- 37.000 sec / 5.938 sec
														-- 36.938 sec / 6.125 sec
		-- from leagueLevelRankStats 
    window pokeForm as (partition by pf_id)
    -- order by rank_
)
, rankStats as (
	select *
			-- pf_id, iv_id, iv_str
		-- , rank_, sp, level, cp, hp
    , round((4096-rank_)/4095 * 100, 3) AS `rank_%`
    -- , max_sp
    , round(sp / max_sp * 100, 3) as `sp_%`
  from rankings
  -- order by rank_
)
, rankStats_colsToInsert as (
	select -- *
		rs.p_id, rs.f_id, cast(args.leagueId as char(1)) as league_id, args.maxLevel as max_level, iv_id, level, cp, `rank_%`, rank_, `sp_%`, sp
	-- for inserting into pvp_rank_stats_i/m -----
	-- pf_id, iv_id
--   , rank_, `rank_%`, sp, `sp_%`, level, cp, hp
	from rankStats rs, args
	-- order by 
--   -- pf_id, iv_id
--   rank_
)
-- test intermediates
select 
	/*+	
			set_var(internal_tmp_mem_storage_engine = MEMORY)
			set_var(tmp_table_size = 1G)
			set_var(max_heap_table_size = 1G)
      set_var(sort_buffer_size = 1G)
	*/
-- * from maxCpms
-- * from trueMaxCPMsWithLevelStats
-- * from rankings
-- * from rankStats
-- final select
* from rankStats_colsToInsert
-- where (p_id, f_id) = (args.p_id, args.f_id)
-- limit 1
;

-- export results to file
-- into outfile 'pokemon_go/exports/rankStats.csv'
-- 	fields terminated by ','
--   lines terminated by '\n'
-- ;