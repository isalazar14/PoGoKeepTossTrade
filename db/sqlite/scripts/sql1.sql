-- drop table if exists currentRankStats;
-- create table currentRankStats as 
-- 	select * from pvp_rank_stats_tabular;

-- for testing
drop view if exists calcRankStats_byLeagueMaxLevel;
create view `calcRankStats_byLeagueMaxLevel` as
select 
1 as pokemon_form_count,
1 as p_id,
1 as f_id,
'' as leagueId,
1 as maxLevel,
0 as ivFloor
-- (select multiplier from levels where level = min(maxLevel, 51)) as maxLevelCpm,
-- (select cp_limit from leagues where league_id = leagueId) + 0.9999999 as cpLimit
;

-- select * from calcRankStats_byLeagueMaxLevel;

drop trigger if exists calcRankStats_byLeagueMaxLevel_insert;
create TRIGGER calcRankStats_byLeagueMaxLevel_insert INSTEAD OF INSERT ON calcRankStats_byLeagueMaxLevel
BEGIN
-- only needed if using filteredLevels to get max true cpm
-- drop temporary table if exists filteredLevels;
-- create temporary table filteredLevels like levels;
-- insert into filteredLevels select * from levels where level <= new.maxLevel order by level desc;

-- this was for inserting directly into destination table, instead of just selecting result set
-- insert into pvp_rank_stats_tabular
-- -- (
-- -- -- 		pf_id
-- -- --   , gl_rank, `gl_rank_%`, gl_sp, `gl_sp_%`, gl_level, gl_cp, gl_hp
-- -- --   , ul_rank, `ul_rank_%`, ul_sp, `ul_sp_%`, ul_level, ul_cp, ul_hp
-- -- 		-- -------
-- --       p_id, f_id, league_id, max_level
-- -- 		, iv_id
-- -- 		, level, cp
-- --     , `rank_%`, `rank`
-- --     , `sp_%`, sp
-- --  )

-- drop temporary table if exists leagueLevelRankStats;
-- PRAGMA temp_store = 2;
-- create temporary table leagueLevelRankStats AS
-- ( index idx_full (pf_id, sp , atk , hp , cp , sta_iv )
-- , index idx_pf_sp (pf_id, sp))
-- engine = memory

insert into currentRankStats
-- explain format = json
WITH
pf_selection as (
	select *
  from pokemon_forms
  where p_id = new.p_id and f_id = new.f_id  -- comment out to run calculations for all pokemon
  -- where pf_id <= new.pokemon_form_count
  -- where (p_id, f_id, new.leagueId, new.maxLevel) not in (select p_id, f_id, league_id, max_level from pvp_rank_stats_tabular)
)
, ivsAboveFloor as ( -- technically 
	select * 
	from ivs
	where atk_iv >= new.ivFloor and def_iv >= new.ivFloor and sta_iv >= new.ivFloor
)
, calcultedCpmLimits as (
  select 	*
				-- p_id, f_id, iv_id
				-- , base_atk, base_def, base_sta
				, (base_atk + atk_iv) as tAtk
				, (base_def + def_iv) as tDef
				, (base_sta + sta_iv) as tSta
				-- , sqrt((new.cpLimit) * 10 / ( (base_atk + atk_iv) * SQRT((base_def + def_iv) * (base_sta + sta_iv)) )) as cpmLimit
        , ( select multiplier from levels 
						where multiplier <= sqrt(((select cp_limit from leagues where league_id = new.leagueId) + 0.9999999) * 10 / ( (base_atk + atk_iv) * SQRT((base_def + def_iv) * (base_sta + sta_iv)) )) -- calcCpLimit 
            order by multiplier desc limit 1
					) as multiplier
				-- , sta_iv -- for rank tie-breaking
	from pf_selection pf
  -- cross join ivs
  cross join ivsAboveFloor
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
	from calcultedCpmLimits r
	inner join levels l on (l.multiplier = 
		-- applying max level via filteredLevels temp table; a bit faster than line below
			-- select 100 pf -> 36.5 sec duration, 1.6 sec fetch
      -- select 100 pf into memory table -> 36.5 sec duration
		-- iif(new.leagueId = 'M', new.maxLevelCpm, (select multiplier from filteredLevels fl where fl.multiplier <= r.cpmLimit order by fl.multiplier desc limit 1))
		-- applying max level via min of [new.maxLevelCpm] or [true cpm] (found in place) 
			-- select 100 pf -> 27.2 sec duration, 1.6 sec fetch
		-- min((select multiplier from levels where multiplier <= r.cpmLimit order by multiplier desc limit 1), new.maxLevelCpm)
    -- applying max level via min of [new.maxLevelCpm] or [true cpm] (from trueMaxCpms above) 
			-- select 100 pf -> 16.15 sec duration / 1.6 sec fetch
      -- select 100 pf into memory table -> 29.3 sec duration
		iif(new.leagueId = 'M', (select multiplier from levels where level = min(new.maxLevel, 51)), min(r.multiplier, (select multiplier from levels where level = min(new.maxLevel, 51))))
	)
)
, rankings as (
  select *
		-- pf_id, iv_id, level, cp, sp -- , hp
		, cast(rank () over(pokeForm order by sp desc, ATK desc, hp desc, cp desc, sta_iv desc) as signed) as `rank`
		, max(sp) over(pokeForm) as max_sp
    from trueMaxCPMsWithLevelStats -- 37.000 sec / 5.938 sec
														-- 36.938 sec / 6.125 sec
		-- from leagueLevelRankStats 
    window pokeForm as (partition by pf_id)
    -- order by `rank`
)
, rankStats as (
	select *
			-- pf_id, iv_id, iv_str
		-- , `rank`, sp, level, cp, hp
    , round((4096-`rank`)/4095 * 100, 3) AS `rank_%`
    -- , max_sp
    , round(sp / max_sp * 100, 3) as `sp_%`
  from rankings
  -- order by `rank`
)
, rankStats_colsToInsert as (
	select -- *
		p_id, f_id, cast(new.leagueId as char(1)) as league_id, new.maxLevel as max_level, iv_id, level, cp, `rank_%`, `rank`, `sp_%`, sp
	-- for inserting into pvp_rank_stats_i/m -----
	-- pf_id, iv_id
--   , `rank`, `rank_%`, sp, `sp_%`, level, cp, hp
	from rankStats
	-- order by 
--   -- pf_id, iv_id
--   `rank`
)
-- test intermediates
select 
	/*+	
			set_var(internal_tmp_mem_storage_engine = MEMORY)
			set_var(tmp_table_size = 1G)
			set_var(max_heap_table_size = 1G)
      set_var(sort_buffer_size = 1G)
	*/
-- * from calcultedCpmLimits
-- * from trueMaxCPMsWithLevelStats
-- * from rankings
-- * from rankStats
-- final select
* from rankStats_colsToInsert
-- where (p_id, f_id) = (new.p_id, new.f_id)
-- limit 1
;

-- export results to file
-- into outfile 'pokemon_go/exports/rankStats.csv'
-- 	fields terminated by ','
--   lines terminated by '\n'
-- ;
END;

-- select * from calcRankStats_byLeagueMaxLevel ;
-- 
-- INSERT into calcRankStats_byLeagueMaxLevel VALUES(2, 2, 2, 2, 2, 2);
-- 
-- select * from calcRankStats_byLeagueMaxLevel ;

INSERT into calcRankStats_byLeagueMaxLevel -- (pokemon_form_count, p_id, f_id, leagueId, maxLevel, ivFloor) 
VALUES(
100, -- pokemon_form_count,
6, -- p_id,
2, -- f_id,
'G', -- leagueId,
41, -- maxLevel,
0 -- ivFloor 
-- (select multiplier from levels where level = min(new.maxLevel, 51)), -- as maxLevelCpm
-- (select cp_limit from leagues where league_id = new.leagueId) + 0.9999999,  as cpLimit; -- NEED @cpLimit + 0.999999 to capture cases where cp would be floored
);

select * from currentRankStats;