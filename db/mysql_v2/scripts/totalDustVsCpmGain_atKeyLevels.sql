# create view total_dust_vs_cpm_gain_at_key_levels as
# explain format = json
select
	vsLevel, fl.level, fl.multiplier as cpm
, round(fl.multiplier / l.multiplier * 100, 2) as `cpm_%_of_vsLevel`
, fl.total_dust
, round(fl.total_dust / l.total_dust * 100, 2) as `total_dust_%_of_vsLevel`
, fl.total_dust_shadow
, round(fl.total_dust_shadow / l.total_dust_shadow * 100, 2) as `total_dust_shadow_%_of_vsLevel`
, fl.total_dust_purified
, round(fl.total_dust_purified / l.total_dust_purified * 100, 2) as `total_dust_purified_%_of_vsLevel`
from ( values
	row(30),
	row(35),
  row(40),
  row(50) 
) vsLevels (vsLevel)
join (select * from levels where level between 30 and 50) fl
join levels l on (l.level = vsLevel) 
order by vsLevel, level
;