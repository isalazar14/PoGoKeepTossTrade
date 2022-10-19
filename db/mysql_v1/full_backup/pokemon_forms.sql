-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pokemon
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `form_id` tinyint(4) NOT NULL,
  `form` varchar(10) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`form_id`),
  UNIQUE KEY `form_id_UNIQUE` (`form_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
INSERT INTO `forms` VALUES (1,NULL,'2020-07-05 01:40:46','2020-07-05 01:40:46'),(2,'Alola','2020-07-05 01:40:46','2020-07-05 01:40:46'),(3,'Galarian','2020-07-05 01:40:46','2020-07-05 01:40:46'),(4,'Armored','2020-07-05 01:40:46','2020-07-05 01:40:46'),(5,'Plant','2020-07-05 01:40:46','2020-07-05 01:40:46'),(6,'Sandy','2020-07-05 01:40:46','2020-07-05 01:40:46'),(7,'Trash','2020-07-05 01:40:46','2020-07-05 01:40:46'),(8,'Overcast','2020-07-05 01:40:46','2020-07-05 01:40:46'),(9,'Sunny','2020-07-05 01:40:46','2020-07-05 01:40:46'),(10,'East','2020-07-05 01:40:46','2020-07-05 01:40:46'),(11,'West','2020-07-05 01:40:46','2020-07-05 01:40:46'),(12,'Fan','2020-07-05 01:40:46','2020-07-05 01:40:46'),(13,'Frost','2020-07-05 01:40:46','2020-07-05 01:40:46'),(14,'Heat','2020-07-05 01:40:46','2020-07-05 01:40:46'),(15,'Mow','2020-07-05 01:40:46','2020-07-05 01:40:46'),(16,'Wash','2020-07-05 01:40:46','2020-07-05 01:40:46'),(17,'Altered','2020-07-05 01:40:46','2020-07-05 01:40:46'),(18,'Origin','2020-07-05 01:40:46','2020-07-05 01:40:46'),(19,'Land','2020-07-05 01:40:46','2020-07-05 01:40:46'),(20,'Sky','2020-07-05 01:40:46','2020-07-05 01:40:46'),(21,'Bug','2020-07-05 01:40:46','2020-07-05 01:40:46'),(22,'Dark','2020-07-05 01:40:46','2020-07-05 01:40:46'),(23,'Dragon','2020-07-05 01:40:46','2020-07-05 01:40:46'),(24,'Electric','2020-07-05 01:40:46','2020-07-05 01:40:46'),(25,'Fairy','2020-07-05 01:40:46','2020-07-05 01:40:46'),(26,'Fighting','2020-07-05 01:40:46','2020-07-05 01:40:46'),(27,'Fire','2020-07-05 01:40:46','2020-07-05 01:40:46'),(28,'Flying','2020-07-05 01:40:46','2020-07-05 01:40:46'),(29,'Ghost','2020-07-05 01:40:46','2020-07-05 01:40:46'),(30,'Grass','2020-07-05 01:40:46','2020-07-05 01:40:46'),(31,'Ground','2020-07-05 01:40:46','2020-07-05 01:40:46'),(32,'Ice','2020-07-05 01:40:46','2020-07-05 01:40:46'),(33,'Normal','2020-07-05 01:40:46','2020-07-05 01:40:46'),(34,'Poison','2020-07-05 01:40:46','2020-07-05 01:40:46'),(35,'Psychic','2020-07-05 01:40:46','2020-07-05 01:40:46'),(36,'Rock','2020-07-05 01:40:46','2020-07-05 01:40:46'),(37,'Steel','2020-07-05 01:40:46','2020-07-05 01:40:46'),(38,'Water','2020-07-05 01:40:46','2020-07-05 01:40:46'),(39,'Zen','2020-07-05 01:40:46','2020-07-05 01:40:46'),(40,'Autumn','2020-07-05 01:40:46','2020-07-05 01:40:46'),(41,'Spring','2020-07-05 01:40:46','2020-07-05 01:40:46'),(42,'Summer','2020-07-05 01:40:46','2020-07-05 01:40:46'),(43,'Winter','2020-07-05 01:40:46','2020-07-05 01:40:46'),(44,'Therian','2020-07-05 01:40:46','2020-07-05 01:40:46'),(45,'Black','2020-07-05 01:40:46','2020-07-05 01:40:46'),(46,'White','2020-07-05 01:40:46','2020-07-05 01:40:46'),(47,'Ordinary','2020-07-05 01:40:46','2020-07-05 01:40:46'),(48,'Resolute','2020-07-05 01:40:46','2020-07-05 01:40:46'),(49,'Aria','2020-07-05 01:40:46','2020-07-05 01:40:46'),(50,'Pirouette','2020-07-05 01:40:46','2020-07-05 01:40:46'),(51,'Burn','2020-07-05 01:40:46','2020-07-05 01:40:46'),(52,'Chill','2020-07-05 01:40:46','2020-07-05 01:40:46'),(53,'Douse','2020-07-05 01:40:46','2020-07-05 01:40:46'),(54,'Shock','2020-07-05 01:40:46','2020-07-05 01:40:46');
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-12 10:53:28