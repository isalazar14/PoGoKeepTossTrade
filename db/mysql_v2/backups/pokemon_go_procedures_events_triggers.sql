CREATE DATABASE  IF NOT EXISTS `pokemon_go` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pokemon_go`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pokemon_go
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping events for database 'pokemon_go'
--

--
-- Dumping routines for database 'pokemon_go'
--
/*!50003 DROP FUNCTION IF EXISTS `getCP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getCP`(
	atk SMALLINT, 	-- base_atk + atk_iv
  def SMALLINT, 	-- base_def + def_iv
  sta SMALLINT, 	-- base_sta + sta_iv
  multiplier DOUBLE) RETURNS smallint unsigned
    DETERMINISTIC
BEGIN
  DECLARE cp SMALLINT UNSIGNED;
  SET cp =  (
    SELECT FLOOR(GREATEST( 10, ( (atk) * (SQRT(def)) * (SQRT(sta) * POWER(multiplier,2) )/10 ) ))
  );
  RETURN cp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getCP_fromTotatStats` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getCP_fromTotatStats`(
  atk SMALLINT, 	-- base_atk + atk_iv
  def SMALLINT, 	-- base_def + def_iv
  sta SMALLINT, 	-- base_sta + sta_iv
  multiplier DOUBLE
) RETURNS smallint unsigned
    DETERMINISTIC
BEGIN
  DECLARE cp SMALLINT UNSIGNED;
  SET cp =  (
    SELECT FLOOR(GREATEST( 10, ( (atk) * (SQRT(def)) * (SQRT(sta) * POWER(multiplier,2) )/10 ) ))
  );
  RETURN cp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getCP_fromTrueStats` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`dell` FUNCTION `getCP_fromTrueStats`(
	atk SMALLINT, 	-- (base_atk + atk_iv) * level multiplier
  def SMALLINT, 	-- (base_def + def_iv) * level multiplier
  sta SMALLINT 	-- (base_sta + sta_iv)
) RETURNS smallint unsigned
    DETERMINISTIC
BEGIN
  DECLARE cp SMALLINT UNSIGNED;
  SET cp =  (
    SELECT GREATEST( 10, FLOOR(( (atk) * SQRT(def) * SQRT(sta) )/10 ) )
  );
  RETURN cp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getHP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getHP`(
	sta smallint,
  multiplier double
) RETURNS smallint unsigned
    DETERMINISTIC
begin
		declare hp smallint unsigned;
    set hp = floor( sta * multiplier );
    return hp;
  end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getStatProd` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getStatProd`(
	atk SMALLINT, 
  def SMALLINT, 
  sta SMALLINT, 
  multiplier DOUBLE) RETURNS double
    DETERMINISTIC
BEGIN
  DECLARE sp double;
  SET sp =  (atk*multiplier) * (def *multiplier) * floor(sta*multiplier)/1000;
  RETURN sp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `isMaxStat` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`dell` FUNCTION `isMaxStat`(
	targetStat char(3),
  atk tinyint,
  def tinyint,
  sta tinyint
) RETURNS tinyint(1)
    DETERMINISTIC
begin
declare result boolean;
with stats as (
	select stat from (
  values
		row('atk', atk),
		row('def', def),
		row('sta', sta)
  ) as t (stat, val)
  where val=greatest(atk, def, sta)
)
select count(stat) 
from stats 
where stat=targetStat
into result;
return (result);

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addUploadData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addUploadData`(
	in uploadId int unsigned
  # , in tempTableName varchar(30)
)
begin 
		if uploadId > 0 then 
		insert into upload_data (
		`index`, pokemon_name, form_name, pokemon_id, gender, 
		cp, hp, atk_iv, def_iv, sta_iv, iv_percent,
        # level_min, level_max,
		`level`,
		quick_move, charge_move_1, charge_move_2,
		scan_date, original_scan_date, catch_date,
		weight_kg, height_m,
		lucky, shadow_purified, favorite, dust, 
		gl_rank_percent, gl_rank, gl_stat_prod_percent, gl_dust_cost, gl_candy_cost, gl_name, gl_form, gl_sha_pur,
		ul_rank_percent, ul_rank, ul_stat_prod_percent, ul_dust_cost, ul_candy_cost, ul_name, ul_form, ul_sha_pur,
		marked_for_pvp_use, upload_id )
		select *, uploadId
		from pokeGenieData;
		end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `calcRankStats_byLeagueMaxLevel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `calcRankStats_byLeagueMaxLevel`(
	# in pId smallint,
#   in fId tinyInt,
	in league char(1), -- must be a league_id from leagues table
  in maxLevel float,
  in ivFloor tinyint
)
    COMMENT 'calculates rankings and stats for all pokeForms, for a given league, max level, and iv floor; creates temporary table "leageLevelRankStats"'
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
# set @maxLevelCpm = (select multiplier from levels where level = @maxLevel);
# SET @cpLimit = (select cp_limit from leagues where league_id = @leagueId) + 0.9999999; -- NEED @cpLimit + 0.999999 to capture cases where cp would be floored

-- only needed if using filteredLevels to get max true cpm
# drop temporary table if exists filteredLevels;
# create temporary table filteredLevels like levels;
# insert into filteredLevels select * from levels where level <= @maxLevel order by level desc;

-- this was for inserting directly into destination table, instead of just selecting result set
# insert into pvp_rank_stats_tabular ( -- uncomment to insert 
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

drop temporary table if exists leagueLevelRankStats;
create temporary table leagueLevelRankStats 
# ( index idx_full (pf_id, sp , atk , hp , cp , sta_iv )
# , index idx_pf_sp (pf_id, sp))
# engine = memory

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
# select 
# 	/*+	
# 			set_var(internal_tmp_mem_storage_engine = MEMORY)
# 			set_var(tmp_table_size = 1073741824)
# 			set_var(max_heap_table_size = 1073741824)
# 	*/

# * from calcultedCpmLimits
# * from trueMaxCPMsWithLevelStats
# * from rankings
# * from rankStats
-- final select
select * from rankStats_colsToInsert
# where (p_id, f_id) = (@p_id, @f_id)
# limit 1
;

-- export results to file
# into outfile 'pokemon_go/exports/rankStats.csv'
# 	fields terminated by ','
#   lines terminated by '\n'
# ;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `calcRankStats_byLeagueMaxLevel_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `calcRankStats_byLeagueMaxLevel_insert`(
	# in pId smallint,
#   in fId tinyInt,
	in league char(1), -- must be a league_id from leagues table
  in maxLevel float,
  in ivFloor tinyint
)
    COMMENT 'calculates rankings and stats for all pokeForms, for a given league, max level, and iv floor; creates temporary table "leageLevelRankStats"'
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
# set @maxLevelCpm = (select multiplier from levels where level = @maxLevel);
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

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createGlUlStatsForOne` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createGlUlStatsForOne`(
 in pokemonFormId smallint
)
begin
		insert into gl_ul_stats (pokemon_form_id, iv_id)
		select pokemon_form_id, iv_id 
		from (select pokemonFormId as pokemon_form_id) pID
		cross join iv_combos 
		order by pokemon_form_id, iv_id;
  end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createGlUlStatsForRange` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `createGlUlStatsForRange`(
	in pokemonFormId_start smallint,
  in pokemonFormId_end smallint
  )
begin
		set @current_pokemonFormId = pokemonFormId_start;
		while @current_pokemonFormId <= pokemonFormId_end do
			call createGLUlStatsForOne(@current_pokemonFormId);
			set @current_pokemonFormId = @current_pokemonFormId + 1;
		end while;
	end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getEvosForUploadById_wd` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`dell` PROCEDURE `getEvosForUploadById_wd`( -- "wd" = with details (from joins), as opposed to just ids
	in userId int unsigned -- upload_id of target upload
)
    READS SQL DATA
    COMMENT 'Gets all viable evolutions for all recognized entries in a specified upload dataset; includes details (names, stats, family info, etc)\nDev note: Uses temporary table evosTemp created by _getEvosForUploadById_wd_intoTempTable. This procedure drops evosTemp it runs.'
begin

call _getEvosForUploadById_wd_into_tempTable(userId);
select * from current_analysis;
drop temporary table if exists current_analysis;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertRankStats_byLeagueMaxLevel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`dell` PROCEDURE `insertRankStats_byLeagueMaxLevel`(
	# in pId smallint,
#   in fId tinyInt,
	in league char(1), -- must be a league_id from leagues table
  in maxLevel float,
  in ivFloor tinyint
)
    COMMENT 'calculates rankings and stats for selection, inserts into table pvp_rank_stats_tabular.'
begin
-- should create error handler for invalid cp limits / league
-- should create error handler for missing pf_selection temp table
# SET @p_id = pId;
# SET @f_id = fId;
SET @leagueId = league;
SET @maxLevel = maxLevel;
set @ivFloor = ivFloor;
set @maxLevelCpm = (select multiplier from levels where level = maxLevel);
SET @cpLimit = (select cp_limit from leagues where league_id = league) + 0.9999999; -- NEED @cpLimit + 0.999999 to capture cases where cp would be above limit + 1 (i.e. floored back to limit)

-- for testing
# SET @pokemon_form_count = 20;
# SET @p_id = 26;
# SET @f_id = 2;
# set @leagueId = 'G';
# SET @maxLevel = 40;
# set @ivFloor = 0;
# set @maxLevelCpm = (select multiplier from levels where level = @maxLevel);
# SET @cpLimit = (select cp_limit from leagues where league_id = @leagueId) + 0.9999999; -- NEED @cpLimit + 0.999999 to capture cases where cp would be floored

drop temporary table if exists filteredLevels;
create temporary table filteredLevels like levels;
insert into filteredLevels select * from levels where level <= @maxLevel order by level desc;

-- this was for inserting directly into destination table, instead of just selecting result set
insert into pvp_rank_stats_tabular ( -- uncomment to insert 
# 		pf_id
			p_id, f_id, league_id, max_level
		, iv_id
#   , gl_rank, `gl_rank_%`, gl_sp, `gl_sp_%`, gl_level, gl_cp, gl_hp
#   , ul_rank, `ul_rank_%`, ul_sp, `ul_sp_%`, ul_level, ul_cp, ul_hp
		, level, cp
    , `rank_%`, `rank`
    , `sp_%`, sp
 )

# drop temporary table if exists rankStats;
# create temporary table rankStats
# explain format = json
WITH
pf_selection as (
	select *
  from pokemon_forms
  # where p_id = @p_id and f_id = @f_id  -- comment out to run calculations for all pokemon
  # where pf_id <= @pokemon_form_count
  where (p_id, f_id, @leagueId, @maxLevel) not in (select p_id, f_id, league_id, max_level from pvp_rank_stats_tabular)
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
				, sqrt((@cpLimit) * 10 / ( (base_atk + atk_iv) * SQRT((base_def + def_iv) * (base_sta + sta_iv)) )) as cpmLimit 
				# , sta_iv -- for rank tie-breaking
	from pf_selection pf
  # join ivs
  join ivsAboveFloor
)
, trueMaxCPMsWithLevelStats as ( -- look level for each iv_id by finding multiplier closest to calculated cpm @ 1500cp and 2500cp [join on (multiplier <= calculated cpm limit 1)]; calculate cp
	select 
			r.*
		, l.level, l.multiplier
# 		pf_id
#     , iv_id
#     , iv_str
#     , sta_iv -- needed for ranking later
#     # , atk, def -- base + iv stats
#     , sta -- need it for CP calc (i.e. NOT sta * multiplier)
#     # , cpmLimit -- for debugging level and cp results
    , GREATEST( 10, FLOOR(( (tAtk) * SQRT(tDef * tSta) * POWER(multiplier, 2) )/10 ) ) AS cp -- NEED FLOOR!!
    , tAtk * multiplier as ATK -- needed for ranking later
# 		, def * multiplier as DEF
    , floor(tSta * multiplier) as hp -- needed for ranking later
    , round((tAtk * multiplier) * (tDef * multiplier) * floor(tSta * multiplier)) as sp
#     , level as level
#     , multiplier as multiplier
#     , dust_cost, candy_cost, total_dust, total_candy
	from calcultedCpmLimits r
	join levels l on (l.multiplier = (select multiplier from filteredLevels fl where fl.multiplier <= r.cpmLimit order by fl.multiplier desc limit 1)) -- a bit faster than line below
  # join levels l on (l.multiplier = least((select multiplier from levels where multiplier <= r.cpmLimit order by multiplier desc limit 1), @maxLevelCpm))
)
, rankings as (
  select *
		# pf_id, iv_id, level, cp, sp # , hp
		, rank () over(pokeForm order by sp desc, atk desc, hp desc, cp desc, sta_iv desc) as `rank`
		, max(sp) over(pokeForm) as max_sp
    from trueMaxCPMsWithLevelStats -- 37.000 sec / 5.938 sec
														-- 36.938 sec / 6.125 sec
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
		p_id, f_id, @leagueId, @maxLevel, iv_id, level, cp, `rank_%`, `rank`, `sp_%`, sp
	-- for inserting into pvp_rank_stats_i/m -----
	# pf_id, iv_id
#   , `rank`, `rank_%`, sp, `sp_%`, level, cp, hp
	from rankStats
	# order by 
#   # pf_id, iv_id
#   `rank`
)
-- test intermediates
# select * from calcultedCpmLimits
# select * from trueMaxCPMsWithLevelStats
# select * from rankings
# select * from rankStats
-- final select
select * from rankStats_colsToInsert
# where (p_id, f_id) = (@p_id, @f_id)
;

-- export results to file
# into outfile 'pokemon_go/exports/rankStats.csv'
# 	fields terminated by ','
#   lines terminated by '\n'
# ;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `isMaxStat` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`dell` PROCEDURE `isMaxStat`(
	in targetStat char(3),
  in atk tinyint,
  in def tinyint,
  in sta tinyint
)
begin

with stats as (
	select stat from (
  values
		row('atk', atk),
		row('def', def),
		row('sta', sta)
  ) as t (stat, val)
  where val=greatest(atk, def, sta)
)
select count(stat) as result from stats where stat=targetStat;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `strToRows` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`dell` PROCEDURE `strToRows`(in tableName varchar(64), in delim varchar(3), in skipBlanks boolean, in str varchar(65535))
    DETERMINISTIC
begin

set @dropTemp = concat("drop temporary table if exists ", tableName, ";");
prepare dropTemp from @dropTemp;
execute dropTemp;
deallocate prepare dropTemp;

set @delimLen = length(delim);

set @s = concat("create temporary table ", tableName, " (n int primary key, val varchar (65535))
with recursive
vals as (
	select 	
					@n := 1 as n
				, @curVal := trim(substring_index('", str,"', '", delim, "', 1)) as val
        , @shiftLen := length(@curVal) + ", @delimLen, " + 1 as shiftLen
				, substring('", str,"', @shiftLen) as nextStr
	union all
  select 	@n := n+1 as n
				, @curVal := trim(substring_index(nextStr, '", delim, "', 1)) as val
        , @shiftLen := length(@curVal) + ", @delimLen, " + 1 as shiftLen
				, substring(nextStr, @shiftLen) as nextStr
  from vals where n = @n and trim(nextStr) != '' and trim(nextStr) != '", delim,"'
)
select n, val from vals", if(skipBlanks = true, " where val != ''", ''),";"
);

prepare stmt1 from @s;
# execute stmt1 using @tableName;
execute stmt1 ;
deallocate prepare stmt1;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `_createRankStats_byLeagueMaxLevel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`dell` PROCEDURE `_createRankStats_byLeagueMaxLevel`(
	in pId smallint,
  in fId tinyInt,
	in league char(1), -- must be a league_id from leagues table
  in maxLevel float,
  in ivFloor tinyint
)
    COMMENT 'calculates rankings and stats for selection, inserts into table pvp_rank_stats_tabular.'
begin
-- should create error handler for invalid cp limits / league
-- should create error handler for missing pf_selection temp table
SET @p_id = pId;
SET @f_id = fId;
SET @league_id = league;
SET @maxLevel = maxLevel;
set @ivFloor = ivFloor;
set @maxLevelCpm = (select multiplier from levels where level = maxLevel);
SET @cpLimit = (select cp_limit from leagues where league_id = league) + 0.9999999; -- NEED @cpLimit + 0.999999 to capture cases where cp would be above limit + 1 (i.e. floored back to limit)

-- for testing
# SET @pokemon_form_count = 20;
# SET @p_id = 26;
# SET @f_id = 2;
# set @league_id = 'G';
# SET @maxLevel = 40;
# set @ivFloor = 0;
# set @maxLevelCpm = (select multiplier from levels where level = @maxLevel);
# SET @cpLimit = (select cp_limit from leagues where league_id = league) + 0.9999999; -- NEED @cpLimit + 0.999999 to capture cases where cp would be floored

drop temporary table if exists filteredLevels;
create temporary table filteredLevels like levels;
insert into filteredLevels select * from levels where level <= @maxLevel order by level desc;

/* this was for inserting directly into destination table, instead of just selecting result set
# insert into gl_ul_rank_stats_i ( -- uncomment to insert 
# 		pf_id, iv_id
#   , gl_rank, `gl_rank_%`, gl_sp, `gl_sp_%`, gl_level, gl_cp, gl_hp
#   , ul_rank, `ul_rank_%`, ul_sp, `ul_sp_%`, ul_level, ul_cp, ul_hp
# ) 
*/

# explain format = json
WITH
pf_selection as (
	select *
  from pokemon_forms
  where p_id = @p_id and f_id = @f_id  -- comment out to run calculations for all pokemon
  # where pf_id <= @pokemon_form_count
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
				, sqrt((@cpLimit) * 10 / ( (base_atk + atk_iv) * SQRT((base_def + def_iv) * (base_sta + sta_iv)) )) as cpmLimit 
				# , sta_iv -- for rank tie-breaking
	from pf_selection pf
  # join ivs
  join ivsAboveFloor
)
, trueMaxCPMsWithLevelStats as ( -- look level for each iv_id by finding multiplier closest to calculated cpm @ 1500cp and 2500cp [join on (multiplier <= calculated cpm limit 1)]; calculate cp
	select 
			r.*
		, l.level, l.multiplier
# 		pf_id
#     , iv_id
#     , iv_str
#     , sta_iv -- needed for ranking later
#     # , atk, def -- base + iv stats
#     , sta -- need it for CP calc (i.e. NOT sta * multiplier)
#     # , cpmLimit -- for debugging level and cp results
    , GREATEST( 10, FLOOR(( (tAtk) * SQRT(tDef * tSta) * POWER(multiplier, 2) )/10 ) ) AS cp -- NEED FLOOR!!
    , tAtk * multiplier as ATK -- needed for ranking later
# 		, def * multiplier as DEF
    , floor(tSta * multiplier) as hp -- needed for ranking later
    , round((tAtk * multiplier) * (tDef * multiplier) * floor(tSta * multiplier)) as sp
#     , level as level
#     , multiplier as multiplier
#     , dust_cost, candy_cost, total_dust, total_candy
	from calcultedCpmLimits r
	join levels l on (l.multiplier = (select multiplier from filteredLevels fl where fl.multiplier <= r.cpmLimit order by fl.multiplier desc limit 1)) -- a bit faster than line below
  # join levels l on (l.multiplier = least((select multiplier from levels where multiplier <= r.cpmLimit order by multiplier desc limit 1), @maxLevelCpm))
)
, rankings as (
  select *
		# pf_id, iv_id, level, cp, sp # , hp
		, rank () over(pokeForm order by sp desc, atk desc, hp desc, cp desc, sta_iv desc) as `rank`
		, max(sp) over(pokeForm) as max_sp
    from trueMaxCPMsWithLevelStats -- 37.000 sec / 5.938 sec
														-- 36.938 sec / 6.125 sec
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
)
, rankStats_colsToInsert as (
	select # *
		p_id, f_id, iv_id
	, @leagueId as league_id
  , `rank`, `rank_%`, sp, `sp_%`, level, cp, hp
	from rankStats
	order by 
  # pf_id, iv_id
  `rank`
	
)
-- test intermediates
# select * from calcultedCpmLimits
# select * from trueMaxCPMsWithLevelStats
# select * from rankings
select * from rankStats
-- final select
# select * from rankStats_colsToInsert
# where (p_id, f_id) = (@p_id, @f_id)
;

-- export results to file
# into outfile 'pokemon_go/exports/rankStats.csv'
# 	fields terminated by ','
#   lines terminated by '\n'
# ;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `_getEvosForUploadById_wd_into_tempTable` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`dell` PROCEDURE `_getEvosForUploadById_wd_into_tempTable`( -- "wd" = with details (from joins), as opposed to just ids
	in userId int unsigned -- user_id of target user
)
    READS SQL DATA
    COMMENT 'Creates temporary table ("current_analysis") with all viable evolutions for all recognized entries in a specified upload dataset; includes details (names, stats, family info, etc). \nThe temporary table can be used outside of this procedure'
begin

drop temporary table if exists current_analysis;

create temporary table current_analysis -- temp table will be created with result of select query below
(index (idx, rel_stage, evo_branch), index (evo_pf_id, iv_id))
# set @u_id = 1; -- for manual testing. set WHERE on line 18 to = @u_id
with recursive -- need recursive to drill through evo chains
	upload as ( -- get given upload dataset
	SELECT
		idx, p_id, pokemon_name as pg_pokemon, form_name, gender
	# , level_min as `level`
    , `level`
    , cp, hp, atk_iv, def_iv, sta_iv
	, lucky, shadow_purified, favorite 
	, catch_date
	FROM pokemon_go.upload_data u
	where user_id = userId
)
, upload_db_bridge as ( -- add db ids for further manipulation/analysis
	select u.*
	, iv_id
	, f_id # as f_id
	, pf_id # as pf_id
	, family_id, rel_stage as pg_rel_stage
    # , multiplier, dust_cost, candy_cost
    , total_dust as current_dust, total_candy as current_candy
	from upload u
		left join pokemon p using (p_id)
		left join forms f using (form_name)
		left join pokemon_forms pf using (p_id, f_id)
		left join levels l using (`level`)
		left join ivs using (atk_iv, def_iv, sta_iv)
)
, upload_with_all_evos as ( -- add all later evo stages for each entry, including ones not technically possible (non-viable ones removed later)
	select 
		idx, u.pf_id, pg_pokemon, form_name, gender
	, family_id, pg_rel_stage
	, `level` 
	# , multiplier, dust_cost, candy_cost
    # , total_dust, total_candy
    , current_dust, current_candy
	, atk_iv, def_iv, sta_iv
    , iv_id
	, u.pf_id as evo_pf_id, pre.evo_criterium, pre.evo_criterium_value, is_trade_evo -- new from join
	, lucky, shadow_purified, favorite 
	, catch_date
	from upload_db_bridge u
		left join pf_prev_evos pre on ( pre.pf_id = u.pf_id ) -- start evo chain with current pokemon, BUT joining on itself to avoid duplicate entries for branching evos
	union all -- drill through evo chains via recursive calls
		select 
			idx, u1.pf_id, pg_pokemon, form_name, gender
		, family_id, pg_rel_stage
		, `level`
        # , multiplier, dust_cost, candy_cost
        # , total_dust, total_candy
        , current_dust, current_candy
		, atk_iv, def_iv, sta_iv
        , iv_id
		, pre1.pf_id as evo_pf_id, pre1.evo_criterium, pre1.evo_criterium_value, pre1.is_trade_evo -- new from join
		, lucky, shadow_purified, favorite 
		, catch_date
		from upload_with_all_evos u1
			inner join pf_prev_evos pre1 on ( pre1.prev_pf_id = u1.evo_pf_id )
)
, upload_with_allowed_evos_details as ( -- remove non-viable evos, join details for evos
	select
		idx, t.pf_id, pg_pokemon, t.form_name, gender
	, t.family_id, pg_rel_stage
	, `level`
    # , multiplier, dust_cost, candy_cost
    # , total_dust, total_candy
    , current_dust, current_candy
	, atk_iv, def_iv, sta_iv
    , iv_id
	, evo_pf_id
	, pf.base_atk as evo_base_atk, pf.base_def as evo_base_def, pf.base_sta as evo_base_sta
	, p.pokemon_name as evo_pokemon, f.form_name as evo_form, p.rel_stage, p.branch as evo_branch
	# , evo_criterium, evo_criterium_value
	, is_trade_evo
	, lucky, shadow_purified, favorite
	, catch_date
  from (
		-- nested select to be able to user alias/computed column in WHERE clause of outer select (to filter by is_allowed_evo)
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

-- add is_allowed_evo column using ifs instead of case
# 		, case when (evo_pf_id != pf_id and evo_criterium is not null)
# 						then if(evo_criterium=1
# 									, if(gender=evo_criterium_value, true, false) -- gender based evo check
# 									, if(evo_criterium=2 -- stat based evo check
# 											, if(evo_criterium_value = 'atk'
# 												, if(atk_iv = greatest(atk_iv, def_iv, sta_iv), true, false)
# 												, if(evo_criterium_value = 'def'
# 													, if(def_iv = greatest(atk_iv, def_iv, sta_iv), true, false)
# 													, if(evo_criterium_value = 'sta'
# 														, if(sta_iv = greatest(atk_iv, def_iv, sta_iv), true, false)
# 														, null )
# 														)
# 													) -- !!! null as fallback, will not catch/alert problematic entries !!!
# 											, null
# 											)
# 										) 
# 			end as is_allowed_evo
		from upload_with_all_evos u ) t
	join pokemon_forms pf on (t.evo_pf_id = pf.pf_id)
	join pokemon p using (p_id)
	join forms f using (f_id)
  where is_allowed_evo = 1 -- keep only allowed evos
)
# , upload_with_allowed_evos_details as ( -- moved steps to previous section (formerly called upload_with_allowed_evos) to make it easier to order the columns
# 	select u.* 
# 		, pf.base_atk as evo_base_atk, pf.base_def as evo_base_def, pf.base_sta as evo_base_sta
#     , p.pokemon_name as evo_pokemon, f.form_name as evo_form, p.stage_id as evo_stage_id, p.branch as evo_branch
# 	from upload_with_allowed_evos u
# 	join pokemon_forms pf on (u.evo_pf_id = pf.pf_id)
# 	join pokemon p using (p_id)
# 	join forms f using (f_id)
# )
, upload_with_allowed_evos_details_evo_costs as (
	select u.*
	, evo_candy_total - (first_value(evo_candy_total) over(partition by idx order by rel_stage)) as evo_candy_cost
    , if(is_trade_evo = true, c.prev_candy_cost, null) as trade_candy_discount
  from upload_with_allowed_evos_details u
  left join families using (family_id)
  left join evo_costs c using (evo_cost_seq_id, rel_stage)
)
select u.*
from upload_with_allowed_evos_details_evo_costs u
# where family_id in (select family_id from family_fork_stages where family_name!="Eevee") -- check eevee evos
# where family_id in (49, 143, 228, 229) -- check all families with evo criteria
order by 
	family_id, pg_rel_stage,
	 idx
	, rel_stage, evo_branch
;
  
-- check which upload entries are not in final result
# select * from upload
# where idx not in (select idx from upload_db_bridge)
# ;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-16  8:40:21
