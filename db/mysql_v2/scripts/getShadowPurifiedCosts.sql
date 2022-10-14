/* adding upgrade/total costs for shadow, purified, and lucky mons */
with sha_pur_costs as (
	select * 
		, cast(if(level >= 8, ceil(dust_cost * 1.2), 0) as signed) as dust_cost_shadow
		, if(level >= 8, ceil(candy_cost * 1.2), 0) as candy_cost_shadow
		, if(level >= 40, ceil(xl_candy_cost * 1.2), 0) as xl_candy_cost_shadow
    , cast(if(level >= 25, dust_cost * 0.9, 0) as signed) as dust_cost_purified
		, if(level >= 25, ceil(candy_cost * 0.9), 0) as candy_cost_purified
		, if(level >= 40, ceil(xl_candy_cost * 0.9), 0) as xl_candy_cost_purified
	from levels
)
, sha_pur_total_costs as (
	select *
		, ifnull(sum(dust_cost_shadow) over allPrior, 0) as total_dust_shadow
		, ifnull(sum(candy_cost_shadow) over allPrior, 0) as total_candy_shadow
    , ifnull(sum(xl_candy_cost_shadow) over allPrior, 0) as total_xl_candy_shadow
    , ifnull(sum(dust_cost_purified) over allPrior, 0) as total_dust_purified
    , ifnull(sum(candy_cost_purified) over allPrior, 0) as total_candy_purified
    , ifnull(sum(xl_candy_cost_purified) over allPrior, 0) as total_xl_candy_purified
  from sha_pur_costs
  window allPrior as (order by `level` rows between unbounded preceding and 1 preceding)
)
select # * 
		level
  ,	dust_cost, total_dust
  ,	dust_cost_shadow, total_dust_shadow
  ,	dust_cost_purified, total_dust_purified
  ,	candy_cost, total_candy
  ,	candy_cost_shadow, total_candy_shadow
  ,	candy_cost_purified, total_candy_purified
  ,	xl_candy_cost, total_xl_candy
  ,	xl_candy_cost_shadow, total_xl_candy_shadow
  ,	xl_candy_cost_purified, total_xl_candy_purified
from sha_pur_total_costs