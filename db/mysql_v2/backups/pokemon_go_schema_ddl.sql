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
-- Table structure for table `evo_cost_seqs`
--

DROP TABLE IF EXISTS `evo_cost_seqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evo_cost_seqs` (
  `evo_cost_seq_id` tinyint NOT NULL,
  `evo_cost_seq_label` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`evo_cost_seq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evo_costs`
--

DROP TABLE IF EXISTS `evo_costs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evo_costs` (
  `evo_cost_seq_id` tinyint NOT NULL,
  `rel_stage` tinyint NOT NULL,
  `evo_candy_cost` smallint DEFAULT NULL,
  `prev_candy_cost` smallint DEFAULT NULL,
  `evo_candy_total` smallint DEFAULT NULL,
  PRIMARY KEY (`evo_cost_seq_id`,`rel_stage`),
  CONSTRAINT `evo_costs_ibfk_1` FOREIGN KEY (`evo_cost_seq_id`) REFERENCES `evo_cost_seqs` (`evo_cost_seq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evo_criteria`
--

DROP TABLE IF EXISTS `evo_criteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evo_criteria` (
  `criteria_id` tinyint NOT NULL,
  `criteria_name` varchar(20) NOT NULL,
  `is_user_controllable` tinyint NOT NULL,
  PRIMARY KEY (`criteria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evo_stages`
--

DROP TABLE IF EXISTS `evo_stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evo_stages` (
  `stage_id` tinyint NOT NULL,
  `stage_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`stage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `families`
--

DROP TABLE IF EXISTS `families`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `families` (
  `family_id` smallint NOT NULL,
  `family_name` varchar(20) NOT NULL,
  `candy_distance` tinyint DEFAULT NULL,
  `trade_evolve` tinyint(1) DEFAULT NULL,
  `evo_cost_seq_id` tinyint DEFAULT NULL,
  `purify_dust_cost` smallint GENERATED ALWAYS AS ((`candy_distance` * 1000)) VIRTUAL,
  `purify_candy_cost` tinyint GENERATED ALWAYS AS ((`candy_distance` * 1)) VIRTUAL,
  PRIMARY KEY (`family_id`),
  KEY `idx_families_evo_cost_seq_id` (`evo_cost_seq_id`),
  CONSTRAINT `families_ibfk_1` FOREIGN KEY (`evo_cost_seq_id`) REFERENCES `evo_cost_seqs` (`evo_cost_seq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `family_branch_stages`
--

DROP TABLE IF EXISTS `family_branch_stages`;
/*!50001 DROP VIEW IF EXISTS `family_branch_stages`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `family_branch_stages` AS SELECT 
 1 AS `family_id`,
 1 AS `family_name`,
 1 AS `fork_stage_id`,
 1 AS `fork_stage_pokemon_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `form_types`
--

DROP TABLE IF EXISTS `form_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_types` (
  `form_type_id` tinyint NOT NULL AUTO_INCREMENT,
  `form_type` varchar(20) NOT NULL,
  PRIMARY KEY (`form_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `f_id` tinyint NOT NULL,
  `form_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`f_id`),
  UNIQUE KEY `idx_forms_form_name` (`form_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `forms_has_form_types`
--

DROP TABLE IF EXISTS `forms_has_form_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms_has_form_types` (
  `f_id` tinyint NOT NULL,
  `form_type_id` tinyint NOT NULL,
  PRIMARY KEY (`f_id`,`form_type_id`),
  KEY `fk_forms_has_form_types_form_types1_idx` (`form_type_id`),
  KEY `fk_forms_has_form_types_forms1_idx` (`f_id`),
  CONSTRAINT `fk_forms_has_form_types_form_types1` FOREIGN KEY (`form_type_id`) REFERENCES `form_types` (`form_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friendship_levels`
--

DROP TABLE IF EXISTS `friendship_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship_levels` (
  `friendship_id` tinyint NOT NULL,
  `friendship_level` varchar(5) DEFAULT NULL,
  `iv_floor` tinyint DEFAULT NULL,
  PRIMARY KEY (`friendship_id`),
  KEY `friendship_level` (`friendship_level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `iv_combos_view`
--

DROP TABLE IF EXISTS `iv_combos_view`;
/*!50001 DROP VIEW IF EXISTS `iv_combos_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `iv_combos_view` AS SELECT 
 1 AS `iv_id`,
 1 AS `atk_iv`,
 1 AS `def_iv`,
 1 AS `sta_iv`,
 1 AS `iv_str`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ivs`
--

DROP TABLE IF EXISTS `ivs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ivs` (
  `iv_id` smallint NOT NULL,
  `atk_iv` smallint DEFAULT NULL,
  `def_iv` smallint DEFAULT NULL,
  `sta_iv` smallint DEFAULT NULL,
  `iv_str` char(8) DEFAULT NULL,
  `iv_floor` tinyint DEFAULT NULL,
  PRIMARY KEY (`iv_id`),
  UNIQUE KEY `idx_iv_atk_iv_def_iv_sta_iv` (`atk_iv`,`def_iv`,`sta_iv`),
  KEY `idx_ivs_iv_floor` (`iv_floor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `leagues`
--

DROP TABLE IF EXISTS `leagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leagues` (
  `league_id` char(1) NOT NULL,
  `league_name` varchar(10) DEFAULT NULL,
  `cp_limit` smallint DEFAULT NULL,
  PRIMARY KEY (`league_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `level` float NOT NULL,
  `multiplier` double NOT NULL,
  `dust_cost` smallint DEFAULT NULL,
  `candy_cost` tinyint DEFAULT NULL,
  `xl_candy_cost` tinyint DEFAULT NULL,
  `total_dust` mediumint DEFAULT NULL,
  `total_candy` smallint DEFAULT NULL,
  `total_xl_candy` smallint DEFAULT NULL,
  `total_dust_shadow` mediumint DEFAULT NULL,
  `total_candy_shadow` smallint DEFAULT NULL,
  `total_xl_candy_shadow` smallint DEFAULT NULL,
  `total_dust_purified` mediumint DEFAULT NULL,
  `total_candy_purified` smallint DEFAULT NULL,
  `total_xl_candy_purified` smallint DEFAULT NULL,
  PRIMARY KEY (`level`),
  UNIQUE KEY `levels_multiplier` (`multiplier`),
  UNIQUE KEY `levels_multiplier_desc` (`multiplier` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `levels_cost_totals`
--

DROP TABLE IF EXISTS `levels_cost_totals`;
/*!50001 DROP VIEW IF EXISTS `levels_cost_totals`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `levels_cost_totals` AS SELECT 
 1 AS `level`,
 1 AS `cpm`,
 1 AS `dust_cost`,
 1 AS `candy_cost`,
 1 AS `xl_candy_cost`,
 1 AS `total_dust`,
 1 AS `total_candy`,
 1 AS `total_xl_candy`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `little_league_mons`
--

DROP TABLE IF EXISTS `little_league_mons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `little_league_mons` (
  `p_id` smallint NOT NULL,
  `f_id` tinyint NOT NULL,
  PRIMARY KEY (`p_id`,`f_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `next_evo_with_names`
--

DROP TABLE IF EXISTS `next_evo_with_names`;
/*!50001 DROP VIEW IF EXISTS `next_evo_with_names`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `next_evo_with_names` AS SELECT 
 1 AS `family_id`,
 1 AS `family`,
 1 AS `pf_id`,
 1 AS `branching_pokemon`,
 1 AS `form`,
 1 AS `next_pf_id`,
 1 AS `next_pokemon`,
 1 AS `next_form`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pf_prev_evos`
--

DROP TABLE IF EXISTS `pf_prev_evos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pf_prev_evos` (
  `pf_id` smallint NOT NULL,
  `p_id` smallint DEFAULT NULL,
  `f_id` tinyint DEFAULT NULL,
  `prev_pf_id` smallint NOT NULL,
  `prev_p_id` smallint DEFAULT NULL,
  `prev_f_id` tinyint DEFAULT NULL,
  `evo_criterium` tinyint DEFAULT NULL,
  `evo_criterium_value` varchar(20) DEFAULT NULL,
  `is_trade_evo` tinyint DEFAULT NULL,
  PRIMARY KEY (`pf_id`,`prev_pf_id`),
  KEY `fk_pf_prev_evos_evo_criteria1` (`evo_criterium`),
  KEY `fk_pf_prev_evos_p_id_f_id1_idx` (`p_id`,`f_id`),
  KEY `fk_pf_prev_evos_prev_p_id_prev_f_id1_idx` (`prev_p_id`,`prev_f_id`),
  CONSTRAINT `fk_pf_prev_evos_evo_criteria1` FOREIGN KEY (`evo_criterium`) REFERENCES `evo_criteria` (`criteria_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_pf_prev_evos_p_id_f_id1` FOREIGN KEY (`p_id`, `f_id`) REFERENCES `pokemon_forms` (`p_id`, `f_id`),
  CONSTRAINT `fk_pf_prev_evos_prev_p_id_prev_f_id1` FOREIGN KEY (`prev_p_id`, `prev_f_id`) REFERENCES `pokemon_forms` (`p_id`, `f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon` (
  `p_id` smallint NOT NULL,
  `pokemon_name` varchar(20) DEFAULT NULL,
  `family_id` smallint NOT NULL,
  `stage_id` tinyint NOT NULL,
  `branch` tinyint NOT NULL DEFAULT '1',
  `rel_stage` tinyint DEFAULT NULL,
  PRIMARY KEY (`p_id`),
  KEY `fk_pokemon_evolution_stages1_idx` (`stage_id`),
  KEY `fk_pokemon_families1_idx` (`family_id`),
  CONSTRAINT `fk_pokemon_evolution_stages1` FOREIGN KEY (`stage_id`) REFERENCES `evo_stages` (`stage_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_pokemon_families1` FOREIGN KEY (`family_id`) REFERENCES `families` (`family_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `pokemon_evo_costs`
--

DROP TABLE IF EXISTS `pokemon_evo_costs`;
/*!50001 DROP VIEW IF EXISTS `pokemon_evo_costs`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pokemon_evo_costs` AS SELECT 
 1 AS `p_id`,
 1 AS `evo_candy_cost`,
 1 AS `prev_candy_cost`,
 1 AS `evo_candy_total`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pokemon_forms`
--

DROP TABLE IF EXISTS `pokemon_forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_forms` (
  `pf_id` smallint NOT NULL AUTO_INCREMENT,
  `p_id` smallint NOT NULL,
  `f_id` tinyint NOT NULL,
  `base_atk` smallint NOT NULL,
  `base_def` smallint NOT NULL,
  `base_sta` smallint NOT NULL,
  PRIMARY KEY (`pf_id`),
  UNIQUE KEY `idx_pokemon_forms_p_id_f_id` (`p_id`,`f_id`),
  KEY `fk_pokemon_forms_forms1_idx` (`f_id`),
  KEY `fk_pokemon_forms_pokemon1_idx` (`p_id`),
  CONSTRAINT `fk_pokemon_forms_forms1` FOREIGN KEY (`f_id`) REFERENCES `forms` (`f_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_pokemon_forms_pokemon1` FOREIGN KEY (`p_id`) REFERENCES `pokemon` (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `prev_evo_with_names`
--

DROP TABLE IF EXISTS `prev_evo_with_names`;
/*!50001 DROP VIEW IF EXISTS `prev_evo_with_names`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `prev_evo_with_names` AS SELECT 
 1 AS `family_id`,
 1 AS `pf_id`,
 1 AS `pokemon`,
 1 AS `form`,
 1 AS `prev_pf_id`,
 1 AS `prev_pokemon`,
 1 AS `prev_form`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `pvp_rank_statcalcs`
--

DROP TABLE IF EXISTS `pvp_rank_statcalcs`;
/*!50001 DROP VIEW IF EXISTS `pvp_rank_statcalcs`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pvp_rank_statcalcs` AS SELECT 
 1 AS `pf_id`,
 1 AS `iv_id`,
 1 AS `gl_rank`,
 1 AS `gl_rank_%`,
 1 AS `gl_sp`,
 1 AS `gl_sp_%`,
 1 AS `gl_level`,
 1 AS `gl_cp`,
 1 AS `gl_hp`,
 1 AS `ul_rank`,
 1 AS `ul_rank_%`,
 1 AS `ul_sp`,
 1 AS `ul_sp_%`,
 1 AS `ul_level`,
 1 AS `ul_cp`,
 1 AS `ul_hp`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pvp_rank_stats`
--

DROP TABLE IF EXISTS `pvp_rank_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pvp_rank_stats` (
  `pf_id` smallint NOT NULL,
  `iv_id` smallint NOT NULL,
  `gl_rank_%` decimal(12,2) DEFAULT NULL,
  `gl_sp_%` decimal(16,2) DEFAULT NULL,
  `ul_rank_%` decimal(12,2) DEFAULT NULL,
  `ul_sp_%` decimal(16,2) DEFAULT NULL,
  PRIMARY KEY (`pf_id`,`iv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pvp_rank_stats_i`
--

DROP TABLE IF EXISTS `pvp_rank_stats_i`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pvp_rank_stats_i` (
  `pf_id` smallint NOT NULL,
  `iv_id` smallint NOT NULL,
  `gl_rank` smallint DEFAULT NULL,
  `gl_rank_%` float(5,2) DEFAULT NULL,
  `gl_sp` int DEFAULT NULL,
  `gl_sp_%` float(5,2) DEFAULT NULL,
  `gl_level` float DEFAULT NULL,
  `gl_cp` smallint DEFAULT NULL,
  `gl_hp` smallint DEFAULT NULL,
  `ul_rank` smallint DEFAULT NULL,
  `ul_rank_%` float(5,2) DEFAULT NULL,
  `ul_sp` int DEFAULT NULL,
  `ul_sp_%` float(5,2) DEFAULT NULL,
  `ul_level` float DEFAULT NULL,
  `ul_cp` smallint DEFAULT NULL,
  `ul_hp` smallint DEFAULT NULL,
  PRIMARY KEY (`pf_id`,`iv_id`),
  KEY `fk_pokemon_forms_has_iv_combos_iv_combos3_idx` (`iv_id`),
  CONSTRAINT `fk_pokemon_forms_has_iv_combos_iv_combos3` FOREIGN KEY (`iv_id`) REFERENCES `ivs` (`iv_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_pokemon_forms_has_iv_combos_pokemon_forms3` FOREIGN KEY (`pf_id`) REFERENCES `pokemon_forms` (`pf_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pvp_rank_stats_m`
--

DROP TABLE IF EXISTS `pvp_rank_stats_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pvp_rank_stats_m` (
  `pf_id` smallint NOT NULL,
  `iv_id` smallint NOT NULL,
  `gl_rank` smallint DEFAULT NULL,
  `gl_rank_%` decimal(12,2) DEFAULT NULL,
  `gl_sp` int DEFAULT NULL,
  `gl_sp_%` decimal(16,2) DEFAULT NULL,
  `gl_level` float DEFAULT NULL,
  `gl_cp` smallint DEFAULT NULL,
  `gl_hp` smallint DEFAULT NULL,
  `ul_rank` smallint DEFAULT NULL,
  `ul_rank_%` decimal(12,2) DEFAULT NULL,
  `ul_sp` int DEFAULT NULL,
  `ul_sp_%` decimal(16,2) DEFAULT NULL,
  `ul_level` float DEFAULT NULL,
  `ul_cp` smallint DEFAULT NULL,
  `ul_hp` smallint DEFAULT NULL,
  PRIMARY KEY (`pf_id`,`iv_id`),
  KEY `idx_pvp_rank_stats_m_gl_rank` (`gl_rank`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pvp_rank_stats_tabular`
--

DROP TABLE IF EXISTS `pvp_rank_stats_tabular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pvp_rank_stats_tabular` (
  `p_id` smallint NOT NULL,
  `f_id` tinyint NOT NULL,
  `league_id` char(1) NOT NULL,
  `max_level` float NOT NULL,
  `iv_id` smallint NOT NULL,
  `level` float DEFAULT NULL,
  `cp` smallint DEFAULT NULL,
  `rank_%` float(5,2) DEFAULT NULL,
  `rank` smallint DEFAULT NULL,
  `sp_%` float(5,2) DEFAULT NULL,
  `sp` int DEFAULT NULL,
  PRIMARY KEY (`p_id`,`f_id`,`league_id`,`max_level`,`iv_id`),
  KEY `max_level` (`max_level`),
  KEY `leagueId_maxLevel` (`league_id`,`max_level`),
  KEY `idx_pId_fId_ivId_maxLevel1` (`p_id`,`f_id`,`iv_id`,`max_level`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `pvp_rank_stats_tabular_contents`
--

DROP TABLE IF EXISTS `pvp_rank_stats_tabular_contents`;
/*!50001 DROP VIEW IF EXISTS `pvp_rank_stats_tabular_contents`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pvp_rank_stats_tabular_contents` AS SELECT 
 1 AS `league_id`,
 1 AS `max_level`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pvp_ranks`
--

DROP TABLE IF EXISTS `pvp_ranks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pvp_ranks` (
  `pf_id` smallint NOT NULL,
  `iv_id` smallint NOT NULL,
  `gl_rank` smallint DEFAULT NULL,
  `gl_sp` int DEFAULT NULL,
  `gl_level` float DEFAULT NULL,
  `gl_cp` smallint DEFAULT NULL,
  `gl_hp` smallint DEFAULT NULL,
  `ul_rank` smallint DEFAULT NULL,
  `ul_sp` int DEFAULT NULL,
  `ul_level` float DEFAULT NULL,
  `ul_cp` smallint DEFAULT NULL,
  `ul_hp` smallint DEFAULT NULL,
  PRIMARY KEY (`pf_id`,`iv_id`),
  KEY `fk_pokemon_forms_has_iv_combos_iv_combos2` (`iv_id`),
  CONSTRAINT `fk_pokemon_forms_has_iv_combos_iv_combos2` FOREIGN KEY (`iv_id`) REFERENCES `ivs` (`iv_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pokemon_forms_has_iv_combos_pokemon_forms2` FOREIGN KEY (`pf_id`) REFERENCES `pokemon_forms` (`pf_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `total_dust_vs_cpm_gain_at_key_levels`
--

DROP TABLE IF EXISTS `total_dust_vs_cpm_gain_at_key_levels`;
/*!50001 DROP VIEW IF EXISTS `total_dust_vs_cpm_gain_at_key_levels`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `total_dust_vs_cpm_gain_at_key_levels` AS SELECT 
 1 AS `vsLevel`,
 1 AS `level`,
 1 AS `cpm`,
 1 AS `cpm_%_of_vsLevel`,
 1 AS `total_dust`,
 1 AS `total_dust_%_of_vsLevel`,
 1 AS `total_dust_shadow`,
 1 AS `total_dust_shadow_%_of_vsLevel`,
 1 AS `total_dust_purified`,
 1 AS `total_dust_purified_%_of_vsLevel`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `trade_types_tabular`
--

DROP TABLE IF EXISTS `trade_types_tabular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trade_types_tabular` (
  `trade_id` tinyint NOT NULL,
  `friendship_id` tinyint DEFAULT NULL,
  `new` tinyint(1) NOT NULL,
  `legendary_or_shiny` tinyint(1) NOT NULL,
  `cost` int NOT NULL,
  PRIMARY KEY (`trade_id`),
  KEY `friendship_id` (`friendship_id`),
  CONSTRAINT `trade_types_tabular_ibfk_1` FOREIGN KEY (`friendship_id`) REFERENCES `friendship_levels` (`friendship_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `type_id` tinyint NOT NULL AUTO_INCREMENT,
  `type_name` varchar(10) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `unevolved_mons_via_prevos`
--

DROP TABLE IF EXISTS `unevolved_mons_via_prevos`;
/*!50001 DROP VIEW IF EXISTS `unevolved_mons_via_prevos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `unevolved_mons_via_prevos` AS SELECT 
 1 AS `pf_id`,
 1 AS `pokemon`,
 1 AS `form`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `unevolved_mons_via_stage`
--

DROP TABLE IF EXISTS `unevolved_mons_via_stage`;
/*!50001 DROP VIEW IF EXISTS `unevolved_mons_via_stage`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `unevolved_mons_via_stage` AS SELECT 
 1 AS `pf_id`,
 1 AS `pokemon`,
 1 AS `form`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `upload_data`
--

DROP TABLE IF EXISTS `upload_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `idx` smallint NOT NULL,
  `pokemon_name` varchar(20) DEFAULT NULL,
  `form_name` varchar(10) DEFAULT NULL,
  `p_id` smallint DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `cp` smallint DEFAULT NULL,
  `hp` smallint DEFAULT NULL,
  `atk_iv` tinyint DEFAULT NULL,
  `def_iv` tinyint DEFAULT NULL,
  `sta_iv` tinyint DEFAULT NULL,
  `iv_percent` float DEFAULT NULL,
  `level` float DEFAULT NULL,
  `quick_move` varchar(20) DEFAULT NULL,
  `charge_move_1` varchar(20) DEFAULT NULL,
  `charge_move_2` varchar(20) DEFAULT NULL,
  `scan_date` datetime DEFAULT NULL,
  `original_scan_date` datetime DEFAULT NULL,
  `catch_date` date DEFAULT NULL,
  `weight_kg` float DEFAULT NULL,
  `height_m` float DEFAULT NULL,
  `lucky` tinyint DEFAULT NULL,
  `shadow_purified` tinyint DEFAULT NULL,
  `favorite` tinyint DEFAULT NULL,
  `dust` smallint DEFAULT NULL,
  `gl_rank_percent` float DEFAULT NULL,
  `gl_rank` smallint DEFAULT NULL,
  `gl_stat_prod_percent` float DEFAULT NULL,
  `gl_dust_cost` mediumint DEFAULT NULL,
  `gl_candy_cost` smallint DEFAULT NULL,
  `gl_name` varchar(20) DEFAULT NULL,
  `gl_form` varchar(10) DEFAULT NULL,
  `gl_sha_pur` tinyint DEFAULT NULL,
  `ul_rank_percent` float DEFAULT NULL,
  `ul_rank` smallint DEFAULT NULL,
  `ul_stat_prod_percent` float DEFAULT NULL,
  `ul_dust_cost` mediumint DEFAULT NULL,
  `ul_candy_cost` smallint DEFAULT NULL,
  `ul_name` varchar(20) DEFAULT NULL,
  `ul_form` varchar(10) DEFAULT NULL,
  `ul_sha_pur` tinyint DEFAULT NULL,
  `marked_for_pvp_use` char(1) DEFAULT NULL,
  `traded` tinyint DEFAULT '0',
  `shiny` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `upload_data_ibfk_1_idx` (`user_id`),
  CONSTRAINT `fk_upload_data_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2009 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_uploads`
--

DROP TABLE IF EXISTS `user_uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_uploads` (
  `upload_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `note` varchar(2555) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`upload_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `family_branch_stages`
--

/*!50001 DROP VIEW IF EXISTS `family_branch_stages`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `family_branch_stages` AS with `branchedevos` as (select `pokemon`.`p_id` AS `p_id`,`pokemon`.`pokemon_name` AS `pokemon_name`,`pokemon`.`family_id` AS `family_id`,`pokemon`.`stage_id` AS `stage_id`,`pokemon`.`branch` AS `branch` from `pokemon` where (`pokemon`.`branch` = 2)), `branchingfams` as (select `branchedevos`.`family_id` AS `family_id`,`branchedevos`.`p_id` AS `p_id`,`branchedevos`.`pokemon_name` AS `pokemon_name`,`branchedevos`.`stage_id` AS `stage_id`,`branchedevos`.`branch` AS `branch`,`families`.`family_name` AS `family_name`,`families`.`candy_distance` AS `candy_distance` from (`branchedevos` join `families` on((`branchedevos`.`family_id` = `families`.`family_id`)))), `firstbranchstage` as (select `branchingfams`.`family_id` AS `family_id`,`branchingfams`.`p_id` AS `p_id`,`branchingfams`.`pokemon_name` AS `pokemon_name`,`branchingfams`.`stage_id` AS `stage_id`,`branchingfams`.`branch` AS `branch`,`branchingfams`.`family_name` AS `family_name`,`branchingfams`.`candy_distance` AS `candy_distance`,min(`branchingfams`.`stage_id`) OVER (PARTITION BY `branchingfams`.`family_id` )  AS `first_branch_stage` from `branchingfams`), `forkstageids` as (select distinct `firstbranchstage`.`family_id` AS `family_id`,`firstbranchstage`.`family_name` AS `family_name`,(`firstbranchstage`.`first_branch_stage` - 1) AS `fork_stage_id` from `firstbranchstage`), `result` as (select `f`.`family_id` AS `family_id`,`f`.`family_name` AS `family_name`,`f`.`fork_stage_id` AS `fork_stage_id`,`p`.`pokemon_name` AS `fork_stage_pokemon_name` from (`forkstageids` `f` left join `pokemon` `p` on(((`f`.`family_id` = `p`.`family_id`) and (`f`.`fork_stage_id` = `p`.`stage_id`))))) select `result`.`family_id` AS `family_id`,`result`.`family_name` AS `family_name`,`result`.`fork_stage_id` AS `fork_stage_id`,`result`.`fork_stage_pokemon_name` AS `fork_stage_pokemon_name` from `result` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `iv_combos_view`
--

/*!50001 DROP VIEW IF EXISTS `iv_combos_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`dell` SQL SECURITY DEFINER */
/*!50001 VIEW `iv_combos_view` AS with recursive `ivs` as (select 0 AS `iv` union all select (`ivs`.`iv` + 1) AS `iv` from `ivs` where (`ivs`.`iv` < 15)), `iv_combos` as (select row_number() OVER (ORDER BY `a`.`iv`,`d`.`iv`,`s`.`iv` )  AS `iv_id`,`a`.`iv` AS `atk_iv`,`d`.`iv` AS `def_iv`,`s`.`iv` AS `sta_iv`,concat_ws('-',convert(lpad(`a`.`iv`,2,0) using utf8mb4),convert(lpad(`d`.`iv`,2,0) using utf8mb4),convert(lpad(`s`.`iv`,2,0) using utf8mb4)) AS `iv_str` from ((`ivs` `a` join `ivs` `d`) join `ivs` `s`)) select `iv_combos`.`iv_id` AS `iv_id`,`iv_combos`.`atk_iv` AS `atk_iv`,`iv_combos`.`def_iv` AS `def_iv`,`iv_combos`.`sta_iv` AS `sta_iv`,`iv_combos`.`iv_str` AS `iv_str` from `iv_combos` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `levels_cost_totals`
--

/*!50001 DROP VIEW IF EXISTS `levels_cost_totals`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`dell` SQL SECURITY DEFINER */
/*!50001 VIEW `levels_cost_totals` AS select `levels`.`level` AS `level`,`levels`.`multiplier` AS `cpm`,`levels`.`dust_cost` AS `dust_cost`,`levels`.`candy_cost` AS `candy_cost`,`levels`.`xl_candy_cost` AS `xl_candy_cost`,ifnull(sum(`levels`.`dust_cost`) OVER (ORDER BY `levels`.`level` ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) ,0) AS `total_dust`,ifnull(sum(`levels`.`candy_cost`) OVER (ORDER BY `levels`.`level` ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) ,0) AS `total_candy`,ifnull(sum(`levels`.`xl_candy_cost`) OVER (ORDER BY `levels`.`level` ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) ,0) AS `total_xl_candy` from `levels` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `next_evo_with_names`
--

/*!50001 DROP VIEW IF EXISTS `next_evo_with_names`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `next_evo_with_names` AS select `p2`.`family_id` AS `family_id`,`fam`.`family_name` AS `family`,`pre`.`prev_pf_id` AS `pf_id`,`p2`.`pokemon_name` AS `branching_pokemon`,`f2`.`form_name` AS `form`,`pre`.`pf_id` AS `next_pf_id`,`p1`.`pokemon_name` AS `next_pokemon`,`f1`.`form_name` AS `next_form` from (((((((`pf_prev_evos` `pre` join `pokemon_forms` `pf1` on((`pf1`.`pf_id` = `pre`.`pf_id`))) join `pokemon_forms` `pf2` on((`pf2`.`pf_id` = `pre`.`prev_pf_id`))) join `pokemon` `p1` on((`pf1`.`p_id` = `p1`.`p_id`))) join `pokemon` `p2` on((`pf2`.`p_id` = `p2`.`p_id`))) join `forms` `f1` on((`pf1`.`f_id` = `f1`.`f_id`))) join `forms` `f2` on((`pf2`.`f_id` = `f2`.`f_id`))) join `families` `fam` on((`p1`.`family_id` = `fam`.`family_id`))) order by `p1`.`family_id`,`p1`.`rel_stage` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pokemon_evo_costs`
--

/*!50001 DROP VIEW IF EXISTS `pokemon_evo_costs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pokemon_evo_costs` AS select `pokemon`.`p_id` AS `p_id`,`evo_costs`.`evo_candy_cost` AS `evo_candy_cost`,`evo_costs`.`prev_candy_cost` AS `prev_candy_cost`,`evo_costs`.`evo_candy_total` AS `evo_candy_total` from ((`pokemon` join `families` on((`pokemon`.`family_id` = `families`.`family_id`))) left join `evo_costs` on(((`pokemon`.`rel_stage` = `evo_costs`.`rel_stage`) and (`families`.`evo_cost_seq_id` = `evo_costs`.`evo_cost_seq_id`)))) order by `pokemon`.`p_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `prev_evo_with_names`
--

/*!50001 DROP VIEW IF EXISTS `prev_evo_with_names`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `prev_evo_with_names` AS select `p1`.`family_id` AS `family_id`,`pre`.`pf_id` AS `pf_id`,`p1`.`pokemon_name` AS `pokemon`,`f1`.`form_name` AS `form`,`pre`.`prev_pf_id` AS `prev_pf_id`,`p2`.`pokemon_name` AS `prev_pokemon`,`f2`.`form_name` AS `prev_form` from ((((((`pf_prev_evos` `pre` join `pokemon_forms` `pf1` on((`pf1`.`pf_id` = `pre`.`pf_id`))) join `pokemon_forms` `pf2` on((`pf2`.`pf_id` = `pre`.`prev_pf_id`))) join `pokemon` `p1` on((`pf1`.`p_id` = `p1`.`p_id`))) join `pokemon` `p2` on((`pf2`.`p_id` = `p2`.`p_id`))) join `forms` `f1` on((`pf1`.`f_id` = `f1`.`f_id`))) join `forms` `f2` on((`pf2`.`f_id` = `f2`.`f_id`))) order by `p1`.`family_id`,`p1`.`rel_stage` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pvp_rank_statcalcs`
--

/*!50001 DROP VIEW IF EXISTS `pvp_rank_statcalcs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`dell` SQL SECURITY DEFINER */
/*!50001 VIEW `pvp_rank_statcalcs` AS select `pvp_ranks`.`pf_id` AS `pf_id`,`pvp_ranks`.`iv_id` AS `iv_id`,`pvp_ranks`.`gl_rank` AS `gl_rank`,round((((4096 - `pvp_ranks`.`gl_rank`) / 4095) * 100),2) AS `gl_rank_%`,`pvp_ranks`.`gl_sp` AS `gl_sp`,round(((`pvp_ranks`.`gl_sp` / max(`pvp_ranks`.`gl_sp`) OVER (PARTITION BY `pvp_ranks`.`pf_id` ) ) * 100),2) AS `gl_sp_%`,`pvp_ranks`.`gl_level` AS `gl_level`,`pvp_ranks`.`gl_cp` AS `gl_cp`,`pvp_ranks`.`gl_hp` AS `gl_hp`,`pvp_ranks`.`ul_rank` AS `ul_rank`,round((((4096 - `pvp_ranks`.`ul_rank`) / 4095) * 100),2) AS `ul_rank_%`,`pvp_ranks`.`ul_sp` AS `ul_sp`,round(((`pvp_ranks`.`ul_sp` / max(`pvp_ranks`.`ul_sp`) OVER (PARTITION BY `pvp_ranks`.`pf_id` ) ) * 100),2) AS `ul_sp_%`,`pvp_ranks`.`ul_level` AS `ul_level`,`pvp_ranks`.`ul_cp` AS `ul_cp`,`pvp_ranks`.`ul_hp` AS `ul_hp` from `pvp_ranks` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pvp_rank_stats_tabular_contents`
--

/*!50001 DROP VIEW IF EXISTS `pvp_rank_stats_tabular_contents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pvp_rank_stats_tabular_contents` AS select `pvp_rank_stats_tabular`.`league_id` AS `league_id`,`pvp_rank_stats_tabular`.`max_level` AS `max_level` from `pvp_rank_stats_tabular` group by `pvp_rank_stats_tabular`.`league_id`,`pvp_rank_stats_tabular`.`max_level` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `total_dust_vs_cpm_gain_at_key_levels`
--

/*!50001 DROP VIEW IF EXISTS `total_dust_vs_cpm_gain_at_key_levels`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `total_dust_vs_cpm_gain_at_key_levels` AS select `vslevels`.`vsLevel` AS `vsLevel`,`fl`.`level` AS `level`,`fl`.`multiplier` AS `cpm`,round(((`fl`.`multiplier` / `l`.`multiplier`) * 100),2) AS `cpm_%_of_vsLevel`,`fl`.`total_dust` AS `total_dust`,round(((`fl`.`total_dust` / `l`.`total_dust`) * 100),2) AS `total_dust_%_of_vsLevel`,`fl`.`total_dust_shadow` AS `total_dust_shadow`,round(((`fl`.`total_dust_shadow` / `l`.`total_dust_shadow`) * 100),2) AS `total_dust_shadow_%_of_vsLevel`,`fl`.`total_dust_purified` AS `total_dust_purified`,round(((`fl`.`total_dust_purified` / `l`.`total_dust_purified`) * 100),2) AS `total_dust_purified_%_of_vsLevel` from (((values row(30),row(35),row(40),row(50)) `vslevels` (`vsLevel`) join (select `levels`.`level` AS `level`,`levels`.`multiplier` AS `multiplier`,`levels`.`dust_cost` AS `dust_cost`,`levels`.`candy_cost` AS `candy_cost`,`levels`.`xl_candy_cost` AS `xl_candy_cost`,`levels`.`total_dust` AS `total_dust`,`levels`.`total_candy` AS `total_candy`,`levels`.`total_xl_candy` AS `total_xl_candy`,`levels`.`total_dust_shadow` AS `total_dust_shadow`,`levels`.`total_candy_shadow` AS `total_candy_shadow`,`levels`.`total_xl_candy_shadow` AS `total_xl_candy_shadow`,`levels`.`total_dust_purified` AS `total_dust_purified`,`levels`.`total_candy_purified` AS `total_candy_purified`,`levels`.`total_xl_candy_purified` AS `total_xl_candy_purified` from `levels` where (`levels`.`level` between 30 and 50)) `fl`) join `levels` `l` on((`l`.`level` = `vslevels`.`vsLevel`))) order by `vslevels`.`vsLevel`,`fl`.`level` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `unevolved_mons_via_prevos`
--

/*!50001 DROP VIEW IF EXISTS `unevolved_mons_via_prevos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`dell` SQL SECURITY DEFINER */
/*!50001 VIEW `unevolved_mons_via_prevos` AS with `basemons` as (select distinct `pre1`.`prev_pf_id` AS `pf_id` from (`pf_prev_evos` `pre1` left join `pf_prev_evos` `pre2` on((`pre1`.`prev_pf_id` = `pre2`.`pf_id`))) where ((`pre2`.`prev_pf_id` is null) and (`pre1`.`pf_id` <> 777))) select `b`.`pf_id` AS `pf_id`,`pokemon`.`pokemon_name` AS `pokemon`,`forms`.`form_name` AS `form` from ((((`basemons` `b` join `pokemon_forms` on((`b`.`pf_id` = `pokemon_forms`.`pf_id`))) join `pokemon` on((`pokemon_forms`.`p_id` = `pokemon`.`p_id`))) join `forms` on((`pokemon_forms`.`f_id` = `forms`.`f_id`))) join `families` on((`pokemon`.`family_id` = `families`.`family_id`))) order by `pokemon`.`family_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `unevolved_mons_via_stage`
--

/*!50001 DROP VIEW IF EXISTS `unevolved_mons_via_stage`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `unevolved_mons_via_stage` AS select distinct `pokemon_forms`.`pf_id` AS `pf_id`,`pokemon`.`pokemon_name` AS `pokemon`,`forms`.`form_name` AS `form` from (((`pokemon` join `pokemon_forms` on((`pokemon`.`p_id` = `pokemon_forms`.`p_id`))) join `forms` on((`pokemon_forms`.`f_id` = `forms`.`f_id`))) join (select `pokemon`.`family_id` AS `family_id`,max(`pokemon`.`rel_stage`) AS `max_stage` from `pokemon` group by `pokemon`.`family_id`) `t` on((`pokemon`.`family_id` = `t`.`family_id`))) where ((`pokemon`.`rel_stage` = 0) and (`t`.`max_stage` > 0)) order by `pokemon`.`family_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-15  8:34:10
