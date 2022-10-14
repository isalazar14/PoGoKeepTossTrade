# drop temporary table if exists current_analysis;
# set @userId = 1; -- for manual testing. set WHERE on line 18 to = @u_id

# create temporary table current_analysis -- temp table will be created with result of select query below
# (index (idx, evo_rel_stage, evo_branch), index (evo_pf_id, iv_id)) 
# # engine=MyISAM
# engine=MEMORY

# explain format = json
# explain
with recursive -- need recursive to drill through evo chains
upload as ( -- get given upload dataset
	SELECT
		idx, p_id, pokemon_name as pg_pokemon, form_name, gender
	, `level`
	, cp, hp, atk_iv, def_iv, sta_iv
	, lucky, shadow_purified, favorite 
	, catch_date
	from upload_data u
	# where user_id = userId
  where user_id = @userId
)
, upload_db_ids as ( -- add db ids for further manipulation/analysis
	select u.*
	# , iv_id
	, f_id # as f_id
	, pf_id # as pf_id
	, family_id, rel_stage as pg_rel_stage
    # , multiplier, dust_cost, candy_cost
	# , total_dust as current_dust, total_candy as current_candy
	from upload u
  # from upload_purifiedMons u
		left join pokemon p using (p_id)
		left join forms f using (form_name)
		left join pokemon_forms pf using (p_id, f_id)
		# left join levels l using (`level`)
# 		left join iv_combos using (atk_iv, def_iv, sta_iv)
)
, upload_potentialEvos as ( -- add all later evo stages for each entry, including ones not technically possible (non-viable ones removed later)
	select 
		idx, u.pf_id, pg_pokemon, form_name, gender
	, family_id, pg_rel_stage
	, `level` 
	# , multiplier, dust_cost, candy_cost
	# , total_dust, total_candy
	# , current_dust, current_candy
	, atk_iv, def_iv, sta_iv
	# , iv_id
	, u.pf_id as evo_pf_id, pre.evo_criterium, pre.evo_criterium_value, is_trade_evo -- new from join
	, lucky, shadow_purified, favorite 
	, catch_date
	from upload_db_ids u
		left join pf_prev_evos pre on ( pre.pf_id = u.pf_id ) -- start evo chain with current pokemon, BUT joining on itself to avoid duplicate entries for branching evos
	union all -- drill through evo chains via recursive calls
		select 
			idx, u1.pf_id, pg_pokemon, form_name, gender
		, family_id, pg_rel_stage
		, `level`
        # , multiplier, dust_cost, candy_cost
        # , total_dust, total_candy
		# , current_dust, current_candy
		, atk_iv, def_iv, sta_iv
		# , iv_id
		, pre1.pf_id as evo_pf_id, pre1.evo_criterium, pre1.evo_criterium_value, pre1.is_trade_evo -- new from join
		, lucky, shadow_purified, favorite 
		, catch_date
		from upload_potentialEvos u1
			inner join pf_prev_evos pre1 on ( pre1.prev_pf_id = u1.evo_pf_id )
)
, upload_allowedEvos_details as ( -- remove non-viable evos, join details for evos
	select
		idx, t.pf_id, pg_pokemon, t.form_name, gender
	, t.family_id, pg_rel_stage
	, `level`
    # , multiplier, dust_cost, candy_cost
    # , total_dust, total_candy
	# , current_dust, current_candy
	, atk_iv, def_iv, sta_iv
	# , iv_id
	, evo_pf_id
	, pf.base_atk as evo_base_atk, pf.base_def as evo_base_def, pf.base_sta as evo_base_sta
	, p.pokemon_name as evo_pokemon, f.form_name as evo_form, p.rel_stage, p.branch as evo_branch
	# , evo_criterium, evo_criterium_value
	, is_trade_evo
	, lucky, shadow_purified, favorite
	, catch_date
  from ( -- nested select to be able to user alias/computed column in WHERE clause of outer select (to filter by is_allowed_evo)
		select u.*
			, (case when (evo_pf_id = u.pf_id or evo_criterium is null)
					then 1 -- set current pokemon and non-criteria pokemon as allowable
					else case evo_criterium -- otherwise check criterium type
						when 1 then if(gender = evo_criterium_value, true, false)  -- handle gender-based evo
						when 2 then -- handle stat-based evo
							-- option A, isMaxStat function (looks cleaner, but might be slower, not sure)
							isMaxStat(evo_criterium_value, atk_iv, def_iv, sta_iv)
            
# 							-- option B, case/if statements
# 								case evo_criterium_value
# 									when 'atk' then if(atk_iv = greatest(atk_iv, def_iv, sta_iv), true, false)
# 									when 'def' then if(def_iv = greatest(atk_iv, def_iv, sta_iv), true, false)
# 									when 'sta' then if(sta_iv = greatest(atk_iv, def_iv, sta_iv), true, false)
# 									-- no 'else' case, won't catch when evo_criterium_value missing
# 								end -- end case evo_criterium = 2
							-- no 'else' case for evo_criterium not null
					end -- end case evo_criterium cases
				end) as is_allowed_evo 
		from upload_potentialEvos u ) t
	join pokemon_forms pf on (t.evo_pf_id = pf.pf_id)
	join pokemon p using (p_id)
	join forms f using (f_id)
  where is_allowed_evo = 1 -- keep only allowed evos
)
, shadowMons as (
	select *
	from upload_allowedEvos_details
	where shadow_purified = 1
)
, purifiedMons as (
	select
			idx, pf_id, pg_pokemon, form_name, gender
		, family_id, pg_rel_stage
		, 25 as `level`
			# , multiplier, dust_cost, candy_cost
			# , total_dust, total_candy
			# , current_dust, current_candy
		, least(atk_iv + 2, 15) as atk_iv, least(def_iv + 2, 15) as def_iv, least(sta_iv + 2, 15) as sta_iv
    # , iv_id
		, evo_pf_id
		, evo_base_atk, evo_base_def, evo_base_sta
		, evo_pokemon, evo_form, rel_stage as evo_rel_stage, evo_branch
		# , evo_criterium, evo_criterium_value
		, is_trade_evo
		, lucky, 2 as shadow_purified, favorite
		, catch_date
		# , evo_candy_cost, trade_candy_discount
	from shadowMons
)
, upload_allowedEvos_purified as (
	select 
			idx, pf_id, pg_pokemon, form_name, gender
		, family_id, pg_rel_stage
		, `level`
			# , multiplier, dust_cost, candy_cost
			# , total_dust, total_candy
			# , current_dust, current_candy
		, atk_iv, def_iv, sta_iv
    # , iv_id
		, evo_pf_id
		, evo_base_atk, evo_base_def, evo_base_sta
		, evo_pokemon, evo_form, rel_stage as evo_rel_stage, evo_branch
		# , evo_criterium, evo_criterium_value
		, is_trade_evo
		, lucky, shadow_purified, favorite
		, catch_date
		# , evo_candy_cost, trade_candy_discount
    ,  false as isShadow -- nonsense flag, just all mons where isShadow doesn't apply
    from upload_allowedEvos_details
    union all
			select *
				, true as isShadow -- marking purified derivatives of current shadow mons, to distinguish from already purified mons
      from purifiedMons
)
, upload_allowedEvos_evoCosts_currDustCandy as (
	select u.*
  , iv_id
	, (case -- adjusting evo_candy_cost for purified mons
			when shadow_purified = 2 then cast(floor(evo_candy_total * 0.9) as signed)
      else evo_candy_total end
		- first_value(evo_candy_total) over(partition by idx order by evo_rel_stage)
    ) as evo_candy_cost
	, purify_dust_cost, purify_candy_cost
  , if(is_trade_evo = true, c.prev_candy_cost, null) as trade_candy_discount
  , case shadow_purified
				when 0 then total_dust
				when 1 then total_dust_shadow
				when 2 then total_dust_purified 
		end as current_dust
	, case shadow_purified
				when 0 then total_candy
				when 1 then total_candy_shadow
				when 2 then total_candy_purified 
		end as current_candy
  from upload_allowedEvos_purified u
  left join families f using (family_id)
  left join evo_costs c on (f.evo_cost_seq_id = c.evo_cost_seq_id and u.evo_rel_stage = c.rel_stage)
	left join ivs using (atk_iv, def_iv, sta_iv)
  left join levels using (`level`)
)
, upload_allowedEvos_dustCandyCosts as (
	select 
			# u.*
		idx, u.pf_id, pg_pokemon, form_name, gender
	, family_id , pg_rel_stage
	# , u.`level`
	# , multiplier, dust_cost, candy_cost
	# , current_dust, current_candy
	# , atk_iv, def_iv, sta_iv
	, u.iv_id
	, evo_pf_id
	# , pf.base_atk as evo_base_atk, pf.base_def as evo_base_def, pf.base_sta as evo_base_sta -- only needed if calculating stats on the fly
	, evo_pokemon, evo_form, evo_rel_stage, evo_branch
	# , evo_criterium, evo_criterium_value
	, is_trade_evo
	, lucky, shadow_purified, favorite
  , isShadow
	, catch_date
  , u.`level`
  # , current_dust, current_candy
		-- gl stats, costs
		, if(gl.level < u.`level`, null, gl_rank) as gl_rank
    , if(gl.level < u.`level`, null, `gl_rank_%`) as `gl_rank_%`
    , if(gl.level < u.`level`, null, `gl_sp_%`) as `gl_sp_%`
    , if(gl.level < u.`level`, null, gl.level) as gl_level
    , if(gl.level < u.`level`, null, gl_cp) as gl_cp
    , if(gl.level < u.`level`, null, gl_hp) as gl_hp
		# , gl.total_dust as gl_total_dust, gl.total_candy as gl_total_candy
    # , if(gl.level < u.`level`, null, gl.total_dust_shadow) as total_dust_shadow
    # , if(gl.level < u.`level`, null, gl.total_candy_shadow) as total_candy_shadow
    , if(gl.level < u.`level`, null
				, cast(	(	(case shadow_purified
										when 0 then gl.total_dust
										when 1 then gl.total_dust_shadow
										when 2 then gl.total_dust_purified 
																+ if(isShadow = true, purify_dust_cost, 0)
										end) 
									- current_dust)
								* if(lucky = true, 0.5, 1) as signed)
                ) as gl_dust_cost
		
    , if(gl.level < u.`level`, null
				-- total candy as single number
        , (	(	case shadow_purified
								when 0 then gl.total_candy
								when 1 then gl.total_candy_shadow
                when 2 then gl.total_candy_purified
														+ if(isShadow = true, purify_candy_cost, 0)
							end) 
						- current_candy 
						+ ifnull(evo_candy_cost, 0))
					) as gl_candy_cost
				-- total candy cost as string "total (upgrade + evo - trade discount)"
# 				, if(evo_candy_cost is null, cast(gl.total_candy - current_candy as char)
# 						, concat((gl.total_candy - current_candy + evo_candy_cost), " (", (gl.total_candy - current_candy), " + ", evo_candy_cost, ")"))) as gl_candy_cost
    -- ul stats, costs
    , if(ul.level < u.`level`, null, ul_rank) as ul_rank
    , if(ul.level < u.`level`, null, `ul_rank_%`) as `ul_rank_%`
    , if(ul.level < u.`level`, null, `ul_sp_%`) as `ul_sp_%`
    , if(ul.level < u.`level`, null, ul.level) as ul_level
    , if(ul.level < u.`level`, null, ul_cp) as ul_cp
    , if(ul.level < u.`level`, null, ul_hp) as ul_hp
		# , ul.total_dust as ul_total_dust, ul.total_candy as ul_total_candy
    , if(ul.level < u.`level`, null
				# , cast((ul.total_dust - current_dust) * if(lucky = true, 0.5, 1) as signed)) as ul_dust_cost
#         , cast((case shadow_purified
# 									when 0 then ul.total_dust - current_dust
# 									when 1 then ul.total_dust_shadow - current_dust
# 									else (ul.total_dust - current_dust) * 0.9 
# 								end)
				, cast(((case shadow_purified
									when 0 then ul.total_dust
                  when 1 then ul.total_dust_shadow
                  when 2 then ul.total_dust_purified
															+ if(isShadow = true, purify_candy_cost, 0)
								end) 
                - current_dust)
							* if(lucky = true, 0.5, 1) as signed)) as ul_dust_cost
    , if(ul.level < u.`level`, null
				-- total candy as single number
        , ((case shadow_purified
									when 0 then ul.total_candy
                  when 1 then ul.total_candy_shadow
                  when 2 then ul.total_candy_purified
															+ if(isShadow = true, purify_candy_cost, 0)
								end) 
							- current_candy 
							+ ifnull(evo_candy_cost, 0))
						) as ul_candy_cost
				-- total candy cost as string "total (upgrade + evo - trade discount)"
# 				, if(evo_candy_cost is null, cast(ul.total_candy - current_candy as char)
# 						, concat((ul.total_candy - current_candy + evo_candy_cost), " (", (ul.total_candy - current_candy), " + ", evo_candy_cost, ")"))) as ul_candy_cost
  from upload_allowedEvos_evoCosts_currDustCandy u
  left join pvp_rank_stats_m pvp on (u.evo_pf_id = pvp.pf_id and u.iv_id = pvp.iv_id)
  left join levels gl on (gl_level = gl.level)
  left join levels ul on (ul_level = ul.level)
)
select u.*
# from upload_allowedEvos_details u;
# from shadowMons u;
# from purifiedMons u;
# from upload_allowedEvos_purified u;
# from upload_allowedEvos_evoCosts_currDustCandy u
from upload_allowedEvos_dustCandyCosts u
# where family_id in (49, 143, 228, 229) -- check all families with evo criteria
# where idx in (select idx from purifiedMons)
order by 
	family_id, pg_rel_stage,
	 idx, shadow_purified
	, evo_rel_stage, evo_branch
;

select * from current_analysis
# where idx = 1051
# where shadow_purified = 2
# and level >= 25
# order by 
# 	family_id, pg_rel_stage,
# 	 idx, shadow_purified
# 	, evo_rel_stage, evo_branch
;

-- check which upload entries are not in final result
# select * from upload
# where idx not in (select idx from upload_allowedEvos_evoCosts_currDustCandy)
# ;