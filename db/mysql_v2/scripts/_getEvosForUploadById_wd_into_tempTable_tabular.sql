drop temporary table if exists current_analysis;
set @userId = 1; -- for manual testing. set WHERE on line 18 to = @u_id

create temporary table current_analysis -- temp table will be created with result of select query below
(index(id), index (idx, evo_rel_stage, evo_branch), index (evo_p_id, evo_f_id, iv_id), index(traded))
# # engine=MyISAM
engine=MEMORY

# explain format = json
# explain
with recursive -- need recursive to drill through evo chains
upload as ( -- get given upload dataset
	SELECT
		idx, p_id, pokemon_name as pg_pokemon, form_name, gender
	, `level`
	, cp, hp, atk_iv, def_iv, sta_iv
	, traded, lucky, shadow_purified, favorite
	, catch_date
	from upload_data u
	# where user_id = userId
  where user_id = @userId
		# and (p_id) = (150) -- mewtwo: 1 entry without evolution
    # and (p_id) = (99) -- kingler: 1 entry without evolution, just over 1500; check trade outcomes under 1500
		# and (p_id) = (447) -- riolu: 1 entry that evolves
    and (p_id, form_name) = (74,'Alola')-- geodude alola: 3 entries that evolve; also 3 entries with trade evos
    # and (p_id) = (1) -- bulbasaur: 10 entries that evolve
)
, upload_db_ids as ( -- add db ids for further manipulation/analysis
	select u.*
	# , iv_id
	, f_id # as f_id
	# , pf_id # as pf_id
	, family_id, rel_stage as pg_rel_stage
    # , multiplier, dust_cost, candy_cost
	# , total_dust as current_dust, total_candy as current_candy
	from upload u
  # from upload_purifiedMons u
		left join pokemon p using (p_id)
		left join forms f using (form_name)
		# left join pokemon_forms pf using (p_id, f_id)
		# left join levels l using (`level`)
# 		left join iv_combos using (atk_iv, def_iv, sta_iv)
)
, upload_potentialEvos as ( -- add all later evo stages for each entry, including ones not technically possible (non-viable ones removed later)
	select 
		idx
	# , u.pf_id
  , u.p_id, u.f_id
  , pg_pokemon, form_name, gender
	, family_id, pg_rel_stage
	, `level` 
	# , multiplier, dust_cost, candy_cost
	# , total_dust, total_candy
	# , current_dust, current_candy
	, atk_iv, def_iv, sta_iv
	# , iv_id
	, u.p_id as evo_p_id, u.f_id as evo_f_id, pre.evo_criterium, pre.evo_criterium_value, is_trade_evo -- new from join
	, traded, lucky, shadow_purified, favorite
	, catch_date
	from upload_db_ids u
		left join pf_prev_evos pre using ( p_id, f_id ) -- start evo chain with current pokemon, BUT joining on itself to avoid duplicate entries for branching evos
	union all -- drill through evo chains via recursive calls
		select 
			idx
		# , u.pf_id
    , u.p_id, u.f_id
    , pg_pokemon, form_name, gender
		, family_id, pg_rel_stage
		, `level`
        # , multiplier, dust_cost, candy_cost
        # , total_dust, total_candy
		# , current_dust, current_candy
		, atk_iv, def_iv, sta_iv
		# , iv_id
		, pre.p_id as evo_p_id, pre.f_id as evo_f_id, pre.evo_criterium, pre.evo_criterium_value, pre.is_trade_evo -- new from join
		, traded, lucky, shadow_purified, favorite
		, catch_date
		from upload_potentialEvos u
			inner join pf_prev_evos pre on ( pre.prev_p_id = u.evo_p_id and pre.prev_f_id = u.evo_f_id )
)
, upload_allowedEvos_details as ( -- remove non-viable evos, join details for evos
	select
		idx
	, t.p_id, t.f_id
	, pg_pokemon, t.form_name, gender
	, t.family_id, pg_rel_stage
	, `level`
    # , multiplier, dust_cost, candy_cost
    # , total_dust, total_candy
	# , current_dust, current_candy
	, atk_iv, def_iv, sta_iv
	# , iv_id
	, evo_p_id, evo_f_id
	# , pf.base_atk as evo_base_atk, pf.base_def as evo_base_def, pf.base_sta as evo_base_sta
	, p.pokemon_name as evo_pokemon, f.form_name as evo_form, p.rel_stage, p.branch as evo_branch
	# , evo_criterium, evo_criterium_value
	, is_trade_evo
	, traded, lucky, shadow_purified, favorite
	, catch_date
  from ( -- nested select to be able to user alias/computed column in WHERE clause of outer select (to filter by is_allowed_evo)
		select u.*
			, (case when ((evo_p_id = u.p_id and evo_f_id = u.f_id) or evo_criterium is null)
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
	# join pokemon_forms pf on (pf.p_id = t.evo_p_id)
	inner join pokemon p on (p.p_id = t.evo_p_id)
	inner join forms f on (f.f_id = t.evo_f_id)
  where is_allowed_evo = 1 -- keep only allowed evos
)
, shadowMons as (
	select *
	from upload_allowedEvos_details
	where shadow_purified = 1
)
, purifiedMons as (
	select
			idx
		, p_id, f_id
    , pg_pokemon, form_name, gender
		, family_id, pg_rel_stage
		, 25 as `level`
			# , multiplier, dust_cost, candy_cost
			# , total_dust, total_candy
			# , current_dust, current_candy
		, least(atk_iv + 2, 15) as atk_iv, least(def_iv + 2, 15) as def_iv, least(sta_iv + 2, 15) as sta_iv
    # , iv_id
		# , evo_pf_id
    , evo_p_id, evo_f_id
		# , evo_base_atk, evo_base_def, evo_base_sta
		, evo_pokemon, evo_form, rel_stage as evo_rel_stage, evo_branch
		# , evo_criterium, evo_criterium_value
		, is_trade_evo
		, lucky, 2 as shadow_purified, favorite, traded
		, catch_date
		# , evo_candy_cost, trade_candy_discount
	from shadowMons
)
, upload_allowedEvos_purified as (
	select 
			idx
		, p_id, f_id
    , pg_pokemon, form_name, gender
		, family_id, pg_rel_stage
		, `level`
			# , multiplier, dust_cost, candy_cost
			# , total_dust, total_candy
			# , current_dust, current_candy
		, atk_iv, def_iv, sta_iv
    # , iv_id
		# , evo_pf_id
    , evo_p_id, evo_f_id
		# , evo_base_atk, evo_base_def, evo_base_sta
		, evo_pokemon, evo_form, rel_stage as evo_rel_stage, evo_branch
		# , evo_criterium, evo_criterium_value
		, is_trade_evo
		, traded, lucky, shadow_purified, favorite
		, catch_date
		# , evo_candy_cost, trade_candy_discount
    ,  false as needs_purification -- nonsense flag, just all mons where needs_purification doesn't apply
    from upload_allowedEvos_details
    union all
			select *
				, true as needs_purification -- marking purified derivatives of current shadow mons, to distinguish from already purified mons
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
	, if(needs_purification = true, purify_dust_cost, 0) as purify_dust_cost
  , if(needs_purification = true, purify_candy_cost, 0) as purify_candy_cost
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
, upload_allowedEvos_pvpRankStats_costs as (
	select 
			# u.*
		idx
	, u.p_id, u.f_id, u.iv_id, catch_date
  , pg_pokemon, form_name, gender
	, family_id , pg_rel_stage
	# , u.`level`
	# , multiplier, dust_cost, candy_cost
	# , current_dust, current_candy
	# , atk_iv, def_iv, sta_iv
	
	# , evo_pf_id
	, evo_p_id, evo_f_id
	# , pf.base_atk as evo_base_atk, pf.base_def as evo_base_def, pf.base_sta as evo_base_sta -- only needed if calculating stats on the fly
	, evo_pokemon, evo_form, evo_rel_stage, evo_branch
	# , evo_criterium, evo_criterium_value
	, is_trade_evo
	, traded, lucky, shadow_purified, favorite
  , needs_purification
  , purify_dust_cost, purify_candy_cost
  , evo_candy_cost, trade_candy_discount
	
  , u.`level` as level
  # , current_dust, current_candy
		-- league stats, costs
    , league_id, max_level
		, if(pvp.level < u.`level`, null, pvp.level) as league_level
    , if(pvp.level < u.`level`, null, cp) as cp
		, if(pvp.level < u.`level`, null, `rank`) as `rank`
    , if(pvp.level < u.`level`, null, `rank_%`) as `rank_%`
    , if(pvp.level < u.`level`, null, sp) as sp
    , if(pvp.level < u.`level`, null, `sp_%`) as `sp_%`
    # , if(l.level < u.`level`, null, hp) as hp
		# , l.total_dust as total_dust, l.total_candy as total_candy
    # , if(l.level < u.`level`, null, l.total_dust_shadow) as total_dust_shadow
    # , if(l.level < u.`level`, null, l.total_candy_shadow) as total_candy_shadow
    , if(pvp.level < u.`level`, null
				, cast(	(	(case shadow_purified
										when 0 then l.total_dust
										when 1 then l.total_dust_shadow
										when 2 then l.total_dust_purified 
																+ if(needs_purification = true, purify_dust_cost, 0)
										end) 
									- current_dust)
								* if(lucky = true, 0.5, 1) as signed)
                ) as dust_cost
		
    , if(pvp.level < u.`level`, null
				-- total candy as single number
        , (	(	case shadow_purified
								when 0 then l.total_candy
								when 1 then l.total_candy_shadow
                when 2 then l.total_candy_purified
														+ if(needs_purification = true, purify_candy_cost, 0)
							end) 
						- current_candy 
						+ ifnull(evo_candy_cost, 0))
					) as candy_cost
				-- total candy cost as string "total (upgrade + evo - trade discount)"
# 				, if(evo_candy_cost is null, cast(l.total_candy - current_candy as char)
# 						, concat((l.total_candy - current_candy + evo_candy_cost), " (", (l.total_candy - current_candy), " + ", evo_candy_cost, ")"))) as candy_cost
  from upload_allowedEvos_evoCosts_currDustCandy u
  left join pvp_rank_stats_tabular pvp on (pvp.p_id = u.evo_p_id and pvp.f_id = u.evo_f_id and pvp.iv_id = u.iv_id and pvp.max_level in (40, 41, 50, 51))
  left join levels l on (l.level = if(pvp.level in (41, 51), pvp.level -1, pvp.level))
#   where
# 		pvp.max_level in (40, 41) -- max_level can either go in the join pvp_rank_stats_tabular above, in this where clause, or the final/outer where clause
# 		# and (pvp.league_id = 'G' or pvp.league_id = 'U')
    
)
select /*+	
			set_var(internal_tmp_mem_storage_engine = MEMORY)
			set_var(tmp_table_size = 1G)
			set_var(max_heap_table_size = 1G)
      set_var(sort_buffer_size = 1G)
		*/
row_number() over() as id, u.*
# from upload_allowedEvos_details u;
# from shadowMons u;
# from purifiedMons u;
# from upload_allowedEvos_purified u;
# from upload_allowedEvos_evoCosts_currDustCandy u
from upload_allowedEvos_pvpRankStats_costs u
# where family_id in (49, 143, 228, 229) -- check all families with evo criteria
# where idx in (select idx from purifiedMons)
# where idx = 1051
# where (p_id, f_id) = (1,1)
where trade_candy_discount is not null
# order by -- ordering makes the query take 2-3x longer
# 	family_id, pg_rel_stage,
# 	 idx, shadow_purified
#    , league_id, max_level
#    , shadow_purified
# 	, evo_rel_stage, evo_branch, evo_f_id
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