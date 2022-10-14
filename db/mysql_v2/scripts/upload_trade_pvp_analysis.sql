/* trade factors
sending/receiving trainer level, pokemon level 
	-> new level
friendship level 
	-> iv floor, trade cost, 
pokemon category (mythical, shadow, already lucky / previously traded) 
	-> trade eligibility
pokemon age
	-> lucky trade chance
post trade lucky status 
	-> upgrade dust cost
*/
/* outcomes of interest
1. n/% better rank/rank%/sp/sp%
2. min/max new rank/rank%/sp/sp%
3. min/max candy/dust cost
#s 1, 2, and 3 for each of these slices
	overall
	above stat (rank/rank%/sp%) threshold
  below dust cost threshold
  above stat threshold AND below dust cost threshold
  % LL/GL/UL eligible
*/
/* current_analysis colums
				id, idx
# 		, c.p_id, c.f_id
# 		, pg_pokemon, form_name, gender
# 		, family_id , pg_rel_stage
# 		, evo_p_id, evo_f_id
# 		, evo_pokemon, evo_form, evo_rel_stage, evo_branch
# 		, is_trade_evo, lucky, shadow_purified, needs_purification, favorite
# 		, catch_date
# 		, level
#     , c.iv_id as cur_iv_id
		-- league stats, costs
#     , league_id, max_level
# 		, league_level, cp, `rank`, `rank_%`, `sp_%`
#     , dust_cost, candy_cost
*/

set @trainerLevel = 34;
set @partnerLevel = 33;
# set @friendshipLevel = 'LUCKY';
# set @ivFloor = (select iv_floor from friendship_levels where friendship_level = @friendshipLevel);
set @ivFloor = 5;
set @thresholdStat = 'rank';
set @thresholdValue = 500;
set @glMaxDust = 16000;
set @ulMaxDust = 100000;

# drop temporary table if exists trade_pvp_rank_stats;
# create temporary table trade_pvp_rank_stats
# ( index idLeagueMaxLevelIsBetter using btree (id, league_id, max_level, isBetter) )
# engine = memory

# explain
# explain format=json
with 
ivsAboveFloor as (select iv_id, iv_str, iv_floor from ivs where iv_floor >= @ivFloor), 
tradeEligible_newLevel_curDustCandy as (
	select 
			id
		, c.p_id, c.f_id
    # , traded
    , c.evo_p_id, c.evo_f_id
		, is_trade_evo, lucky, shadow_purified, needs_purification, favorite
		, nl.level -- new level after trade (current level adjusted (in join statement) for case when receiving trainer level < pokemon level)
    , purify_dust_cost, purify_candy_cost
		, evo_candy_cost, trade_candy_discount
		-- league stats, costs
    , league_id, max_level
		, league_level, cp, `rank`, `rank_%`, `sp_%`
		, case shadow_purified
				when 0 then total_dust
				# when 1 then total_dust_shadow
				when 2 then total_dust_purified 
			end as current_dust
		, case shadow_purified
				when 0 then total_candy
				# when 1 then total_candy_shadow
				when 2 then total_candy_purified 
		end as current_candy
  from current_analysis c
  inner join levels nl on (nl.level = if(@partnerLevel < c.level
																		, least(floor(c.level), @partnerLevel + 2)
																		, floor(c.level))
													)
  where traded = false and shadow_purified != 1 # and not mythical
   /* TODO: add mythical / legendary status (classification? tier? category? rarity?) */ 
),
tradePvpRankStatsCosts as (
	select	
			id
		# , traded, shadow_purified
    # , ivs.iv_str, ivs.iv_floor
		, pvp.iv_id, pvp.league_id, pvp.max_level
    , if(pvp.level < c.level, null, pvp.level) as level
    , if(pvp.level < c.level, null, pvp.`rank`) as `rank`
    , if(pvp.level < c.level, null, pvp.`rank_%`) as `rank_%`
    , if(pvp.level < c.level, null, pvp.`sp_%`) as `sp_%`
    , if(pvp.level < c.level, null, ifnull(if(pvp.`rank` < c.rank, true, false), true)) as isBetter
    
    , if(pvp.level < c.`level`, null
				, cast(	(	(case shadow_purified
										when 0 then pl.total_dust
										# when 1 then l.total_dust_shadow 
										when 2 then pl.total_dust_purified 
																# + if(needs_purification = true, purify_dust_cost, 0) owner must purify before trade
										end) 
									- current_dust)
								* if(@friendshipLevel = 'BEST' or @ivFloor = 12, 0.5, 1) as signed)
                ) as dust_cost
		
    , if(pvp.level < c.level, null
				-- total candy as single number
        , (	(	case shadow_purified
								when 0 then pl.total_candy
								# when 1 then l.total_candy_shadow
                when 2 then pl.total_candy_purified
														# + if(needs_purification = true, purify_candy_cost, 0)
							end) 
						- current_candy 
						+ ifnull(evo_candy_cost, 0))
            - if(is_trade_evo = true, trade_candy_discount, 0)
					) as candy_cost

  from tradeEligible_newLevel_curDustCandy c
  join ivsAboveFloor ivs
  # join ivs
	join pvp_rank_stats_tabular pvp
		# using (p_id, f_id, league_id, max_level)
    on (pvp.p_id = c.evo_p_id and pvp.f_id = c.evo_f_id and pvp.league_id = c.league_id and pvp.max_level = c.max_level and pvp.iv_id = ivs.iv_id)
	left join levels pl on (pl.level = if(pvp.level in (41, 51), pvp.level -1, pvp.level))
  # where iv_floor >= @ivFloor #  and traded = false and shadow_purified != 1
)
/*, tradeSummary_windows as (
# 	select id
#      , min(tPvp.`rank`) over (idLeagueMaxLevel) as best_Rank
#      , max(tPvp.`rank`) over (idLeagueMaxLevel) as worst_Rank
# 	from tradePvpRankStatsCosts tPvp
#   window idLeagueMaxLevel as (partition by id, tPvp.league_id, tPvp.max_level)

	select id
    , min(tPvp.`rank`) over (leagueMaxLevel_id) as best_Rank
    , max(tPvp.`rank`) over (leagueMaxLevel_id) as worst_Rank
	from tradePvpRankStatsCosts tPvp
  window leagueMaxLevel_id as (partition by tPvp.league_id, tPvp.max_level, id)
) */
, tradeSummary_all as (
select 
		id, league_id, max_level
    , 'All' as slice
#   , count(*) as n_outcomes
#   , count(level) as n_eligible
  , if(count(level) > 0, round(count(level)  / count(*) * 100, 2), null) as `eligible_%`
	, min(`rank`) as best_rank
	, max(`rank`) as worst_rank
  , max(`rank_%`) as `rank_%_high`
	, min(`rank_%`) as `rank_%_low`
  # , sum(isBetter) as n_better
  , if(count(level) > 0, round(sum(isBetter) / count(*) * 100, 2), null) as `better_%`
  , min(dust_cost) as dust_cost_low
	, max(dust_cost) as dust_cost_high
  , round(avg(dust_cost), 0) as dust_cost_avg
  , min(candy_cost) as candy_cost_low
	, max(candy_cost) as candy_cost_high
  , round(avg(candy_cost), 0) as candy_cost_avg
  # , count(dust_cost < @maxDust or null) as n_below_dust_limit
  , if(count(level) > 0, round(count(dust_cost <= (case league_id when 'G' then @glMaxDust when 'U' then @ulMaxDust end)  or null) / count(*) * 100, 2), null) as `below_dust_limit_%`
from tradePvpRankStatsCosts tPvp
group by id, league_id, max_level
)
, tradeSummary_belowDustLimit as (
select 
		id, league_id, max_level
    , 'Dust Limit' as slice
#   , power(16 - @ivFloor, 3) as n_outcomes
#   , count(level) as n_eligible
  , if(count(level) > 0, round(count(level)  / power(16 - @ivFloor, 3) * 100, 2), null) as `eligible_%`
	, min(`rank`) as best_rank
	, max(`rank`) as worst_rank
  , max(`rank_%`) as `rank_%_high`
	, min(`rank_%`) as `rank_%_low`
  # , sum(isBetter) as n_better
  , if(count(level) > 0, round(sum(isBetter) / power(16 - @ivFloor, 3) * 100, 2), null) as `better_%`
  , min(dust_cost) as dust_cost_low
	, max(dust_cost) as dust_cost_high
  , round(avg(dust_cost), 0) as dust_cost_avg
  , min(candy_cost) as candy_cost_low
	, max(candy_cost) as candy_cost_high
  , round(avg(candy_cost), 0) as candy_cost_avg
  # , count(dust_cost < @maxDust or null) as n_below_dust_limit
  , 100.00 as `below_dust_limit_%`
from tradePvpRankStatsCosts tPvp
where dust_cost <= (case league_id when 'G' then @glMaxDust when 'U' then @ulMaxDust end)
group by id, league_id, max_level
)
, tradeSummary_aboveRank as (
select 
		id, league_id, max_level
    , 'Above Rank/%' as slice
#   , count(*) as n_outcomes
#   , count(level) as n_eligible
  , if(count(level) > 0, round(count(level)  / power(16 - @ivFloor, 3) * 100, 2), null) as `eligible_%`
	, min(`rank`) as best_rank
	, max(`rank`) as worst_rank
  , max(`rank_%`) as `rank_%_high`
	, min(`rank_%`) as `rank_%_low`
  , sum(isBetter) as n_better
  , if(count(level) > 0, round(sum(isBetter) / power(16 - @ivFloor, 3) * 100, 2), null) as `better_%`
  , min(dust_cost) as dust_cost_low
	, max(dust_cost) as dust_cost_high
  , round(avg(dust_cost), 0) as dust_cost_avg
  , min(candy_cost) as candy_cost_low
	, max(candy_cost) as candy_cost_high
  , round(avg(candy_cost), 0) as candy_cost_avg
  # , count(dust_cost < @maxDust or null) as n_below_dust_limit
  , if(count(level) > 0, round(count(dust_cost <= (case league_id when 'G' then @glMaxDust when 'U' then @ulMaxDust end)  or null) / power(16 - @ivFloor, 3) * 100, 2), null) as `below_dust_limit_%`
from tradePvpRankStatsCosts tPvp
where case @thresholdStat 
					when 'rank' then `rank` <= @thresholdValue
          when 'rank_%' then `rank_%` >= @thresholdValue
				end
group by id, league_id, max_level
)
, tradeSummary_belowDustLimit_aboveRank as (
select 
		id, league_id, max_level
    , 'Dust Limit, Above Rank/%' as slice
#   , count(*) as n_outcomes
#   , count(level) as n_eligible
  , if(count(level) > 0, round(count(level)  / power(16 - @ivFloor, 3) * 100, 2), null) as `eligible_%`
	, min(`rank`) as best_rank
	, max(`rank`) as worst_rank
  , max(`rank_%`) as `rank_%_high`
	, min(`rank_%`) as `rank_%_low`
  # , sum(isBetter) as n_better
  , if(count(level) > 0, round(sum(isBetter) / power(16 - @ivFloor, 3) * 100, 2), null) as `better_%`
  , min(dust_cost) as dust_cost_low
	, max(dust_cost) as dust_cost_high
  , round(avg(dust_cost), 0) as dust_cost_avg
  , min(candy_cost) as candy_cost_low
	, max(candy_cost) as candy_cost_high
  , round(avg(candy_cost), 0) as candy_cost_avg
  # , count(dust_cost < @maxDust or null) as n_below_dust_limit
  , 100.00 as `below_dust_limit_%`
from tradePvpRankStatsCosts tPvp
where dust_cost <= (case league_id when 'G' then @glMaxDust when 'U' then @ulMaxDust end)
	and case @thresholdStat 
						when 'rank' then `rank` <= @thresholdValue
						when 'rank_%' then `rank_%` >= @thresholdValue
					end
group by id, league_id, max_level
)
, tradeSummary_union as (
	select * from tradeSummary_all
		union all
	select * from tradeSummary_belowDustLimit
		union all
	select * from tradeSummary_aboveRank
		union all
	select * from tradeSummary_belowDustLimit_aboveRank
)
select /*+	
			set_var(internal_tmp_mem_storage_engine = MEMORY)
			set_var(tmp_table_size = 1G)
			set_var(max_heap_table_size = 1G)
      set_var(sort_buffer_size = 1G)
		*/
* 
from 
# ivsAboveFloor
# tradeEligible_newLevel_curDustCandy
# tradePvpRankStatsCosts
# tradeSummary_windows
tradeSummary_all
# tradeSummary_belowDustLimit
# tradeSummary_aboveRank
# tradeSummary_belowDustLimit_aboveRank
# tradeSummary_union
;
/*
select * from trade_pvp_rank_stats
# where id = 47
;

select id, league_id, max_level, iv_id
	# , count(*) as `# ineligible for pvp`
from 
	# current_analysis
	trade_pvp_rank_stats
# where id = 31
where level is null
# group by id, league_id, max_level
order by id, league_id, max_level
;

# explain
select 
		id, league_id, max_level
	, min(tPvp.`rank`) as best_Rank
	, max(tPvp.`rank`) as worst_Rank
from trade_pvp_rank_stats tPvp # use index(idx)
group by id, league_id, max_level
;

 -- testing with/select using temp table in multiple CTEs
# explain
# with summary_overall as (
select 
		id, league_id, max_level
	, min(tPvp.`rank`) as best_Rank
	, max(tPvp.`rank`) as worst_Rank
  , round(sum(isBetter) / power((16 - @ivFloor), 3) * 100, 2) as `better_%`
from trade_pvp_rank_stats tPvp # ignore index(idx)
group by id, league_id, max_level
# )
# select *
# from summary_overall
