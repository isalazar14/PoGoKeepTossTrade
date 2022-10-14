-- adding league rank stats and costs to current_analysis evos

# DELIMITER $$
# CREATE DEFINER=`root`@`dell` PROCEDURE `getLeagueRankStatsForUserMons`( 
# 	in userId int unsigned -- user_id of target user
# )
#     READS SQL DATA
#     COMMENT 'Gets rank stats for all recognized pokemon for given user .\nDev note: Uses temporary table current_analysis created by _getEvosForUploadById_wd_intoTempTable. This procedure drops current_analysis it runs.'
# begin

call _getEvosForUploadById_wd_into_tempTable(1);
select * from current_analysis;
# explain
with userMonsEvosRankStats as (
	select 
			# c.*
		idx, c.pf_id, pg_pokemon, form_name, gender
	, family_id # , pg_rel_stage
	# , c.`level`
	# , multiplier, dust_cost, candy_cost
	# , current_dust, current_candy
	# , atk_iv, def_iv, sta_iv
	, c.iv_id
	, evo_pf_id
	# , pf.base_atk as evo_base_atk, pf.base_def as evo_base_def, pf.base_sta as evo_base_sta -- only needed if calculating stats on the fly
	, evo_pokemon, evo_form, evo_rel_stage, evo_branch
	# , evo_criterium, evo_criterium_value
	, is_trade_evo
	, lucky, shadow_purified, favorite
	, catch_date
  , c.`level`, current_dust, current_candy
		-- gl stats, costs
		, if(gl.level < c.`level`, null, gl_rank) as gl_rank
    , if(gl.level < c.`level`, null, `gl_rank_%`) as `gl_rank_%`
    , if(gl.level < c.`level`, null, `gl_sp_%`) as `gl_sp_%`
    , if(gl.level < c.`level`, null, gl.level) as gl_level
    , if(gl.level < c.`level`, null, gl_cp) as gl_cp
    , if(gl.level < c.`level`, null, gl_hp) as gl_hp
		, gl.total_dust as gl_total_dust, gl.total_candy as gl_total_candy
    , if(gl.level < c.`level`, null
				# , cast((gl.total_dust - current_dust) * if(lucky = true, 0.5, 1) as signed)) as gl_dust_cost
        , cast((gl.total_dust - current_dust) * (case
						when lucky = true then 0.5
            when shadow_purified = 1 then 1.2
            when shadow_purified = 2 then 0.9
            else 1
					end) as signed)) as gl_dust_cost
    , if(gl.level < c.`level`, null
				-- total candy as single number
        , (gl.total_candy - current_candy + ifnull(evo_candy_cost, 0))) as gl_candy_cost
				-- total candy cost as string "total (upgrade + evo - trade discount)"
# 				, if(evo_candy_cost is null, cast(gl.total_candy - current_candy as char)
# 						, concat((gl.total_candy - current_candy + evo_candy_cost), " (", (gl.total_candy - current_candy), " + ", evo_candy_cost, ")"))) as gl_candy_cost
    -- ul stats, costs
    , if(ul.level < c.`level`, null, ul_rank) as ul_rank
    , if(ul.level < c.`level`, null, `ul_rank_%`) as `ul_rank_%`
    , if(ul.level < c.`level`, null, `ul_sp_%`) as `ul_sp_%`
    , if(ul.level < c.`level`, null, ul.level) as ul_level
    , if(ul.level < c.`level`, null, ul_cp) as ul_cp
    , if(ul.level < c.`level`, null, ul_hp) as ul_hp
		, ul.total_dust as ul_total_dust, ul.total_candy as ul_total_candy
    , if(ul.level < c.`level`, null
				# , cast((ul.total_dust - current_dust) * if(lucky = true, 0.5, 1) as signed)) as ul_dust_cost
        , cast((ul.total_dust - current_dust) * (case
						when lucky = true then 0.5
            when shadow_purified = 1 then 1.2
            when shadow_purified = 2 then 0.9
            else 1
					end) as signed)) as ul_dust_cost
    , if(ul.level < c.`level`, null
				-- total candy as single number
        , (ul.total_candy - current_candy + ifnull(evo_candy_cost, 0))) as ul_candy_cost
				-- total candy cost as string "total (upgrade + evo - trade discount)"
# 				, if(evo_candy_cost is null, cast(ul.total_candy - current_candy as char)
# 						, concat((ul.total_candy - current_candy + evo_candy_cost), " (", (ul.total_candy - current_candy), " + ", evo_candy_cost, ")"))) as ul_candy_cost
  from current_analysis c
  left join pvp_rank_stats_m pvp on (c.evo_pf_id = pvp.pf_id and c.iv_id = pvp.iv_id)
  left join levels gl on (gl_level = gl.level)
  left join levels ul on (ul_level = ul.level)
)
select * from userMonsEvosRankStats
# where shadow_purified = 1;
# drop temporary table if exists current_analysis;

# end$$
# DELIMITER ;
