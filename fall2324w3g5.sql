-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: fall2324w3g5
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `collection_id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'public',
  PRIMARY KEY (`collection_id`),
  KEY `FK_collection_user` (`user_id`),
  CONSTRAINT `FK_collection_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (3,'2023-12-30 11:00:04','2023-12-30 11:00:04','Hello',14,0,'public');
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection_collection`
--

DROP TABLE IF EXISTS `collection_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection_collection` (
  `collection_collection_id` int NOT NULL AUTO_INCREMENT,
  `collection_id_1` int NOT NULL,
  `collection_id_2` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_collection_id`),
  KEY `FK_collection_collection_collection_1` (`collection_id_1`),
  KEY `FK_collection_collection_collection_2` (`collection_id_2`),
  CONSTRAINT `FK_collection_collection_collection_1` FOREIGN KEY (`collection_id_1`) REFERENCES `collection` (`collection_id`),
  CONSTRAINT `FK_collection_collection_collection_2` FOREIGN KEY (`collection_id_2`) REFERENCES `collection` (`collection_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_collection`
--

LOCK TABLES `collection_collection` WRITE;
/*!40000 ALTER TABLE `collection_collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection_pen`
--

DROP TABLE IF EXISTS `collection_pen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection_pen` (
  `collection_pen_id` int NOT NULL AUTO_INCREMENT,
  `collection_id` int NOT NULL,
  `pen_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_pen_id`),
  KEY `fk_colletion_pen_pen` (`pen_id`),
  KEY `fk_colletion_pen_collection` (`collection_id`),
  CONSTRAINT `fk_colletion_pen_collection` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`collection_id`),
  CONSTRAINT `fk_colletion_pen_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_pen`
--

LOCK TABLES `collection_pen` WRITE;
/*!40000 ALTER TABLE `collection_pen` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection_pen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_table`
--

DROP TABLE IF EXISTS `comment_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_table` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `collection_id` int DEFAULT NULL,
  `pen_id` int DEFAULT NULL,
  `comment` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pen',
  PRIMARY KEY (`comment_id`),
  KEY `FK_comment_table_user` (`user_id`),
  KEY `FK_comment_table_pen` (`pen_id`),
  KEY `FK_comment_table_collection` (`collection_id`),
  CONSTRAINT `FK_comment_table_collection` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`collection_id`),
  CONSTRAINT `FK_comment_table_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  CONSTRAINT `FK_comment_table_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_table`
--

LOCK TABLES `comment_table` WRITE;
/*!40000 ALTER TABLE `comment_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow_table`
--

DROP TABLE IF EXISTS `follow_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_table` (
  `follow_id` int NOT NULL,
  `user_id_1` int NOT NULL,
  `user_id_2` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`follow_id`),
  KEY `fk_like_user_1` (`user_id_1`),
  KEY `fk_like_user_2` (`user_id_2`),
  CONSTRAINT `fk_like_user_1` FOREIGN KEY (`user_id_1`) REFERENCES `user` (`user_id`),
  CONSTRAINT `fk_like_user_2` FOREIGN KEY (`user_id_2`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_table`
--

LOCK TABLES `follow_table` WRITE;
/*!40000 ALTER TABLE `follow_table` DISABLE KEYS */;
INSERT INTO `follow_table` VALUES (2,6,8,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(4,3,4,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(6,4,6,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(9,5,4,'2023-11-15 02:11:58','2023-11-15 02:11:58');
/*!40000 ALTER TABLE `follow_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_table`
--

DROP TABLE IF EXISTS `like_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_table` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `collection_id` int DEFAULT NULL,
  `pen_id` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pen',
  PRIMARY KEY (`like_id`),
  KEY `FK_like_table_user` (`user_id`),
  KEY `FK_like_table_pen` (`pen_id`),
  KEY `FK_like_table_collection` (`collection_id`),
  CONSTRAINT `FK_like_table_collection` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`collection_id`),
  CONSTRAINT `FK_like_table_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  CONSTRAINT `FK_like_table_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_table`
--

LOCK TABLES `like_table` WRITE;
/*!40000 ALTER TABLE `like_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `like_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pen`
--

DROP TABLE IF EXISTS `pen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pen` (
  `pen_id` int NOT NULL AUTO_INCREMENT,
  `html_code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `js_code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `css_code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'public',
  `type_css` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'css',
  PRIMARY KEY (`pen_id`),
  KEY `FK_pen_user` (`user_id`),
  CONSTRAINT `FK_pen_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pen`
--

LOCK TABLES `pen` WRITE;
/*!40000 ALTER TABLE `pen` DISABLE KEYS */;
INSERT INTO `pen` VALUES (18,'hehe','','','Untitled','2023-12-30 11:00:17','2023-12-30 11:00:17',14,0,'public','css'),(19,'hehe','','','Hic','2023-12-30 11:00:39','2023-12-30 11:00:39',14,0,'public','css');
/*!40000 ALTER TABLE `pen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pin`
--

DROP TABLE IF EXISTS `pin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pin` (
  `pin_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `collection_id` int DEFAULT NULL,
  `pen_id` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pen',
  PRIMARY KEY (`pin_id`),
  KEY `FK_pin_user` (`user_id`),
  KEY `FK_pin_pen` (`pen_id`),
  KEY `FK_pin_collection` (`collection_id`),
  CONSTRAINT `FK_pin_collection` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`collection_id`),
  CONSTRAINT `FK_pin_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  CONSTRAINT `FK_pin_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pin`
--

LOCK TABLES `pin` WRITE;
/*!40000 ALTER TABLE `pin` DISABLE KEYS */;
/*!40000 ALTER TABLE `pin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `avatar_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `user_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gmail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `links` json DEFAULT NULL,
  `location` text COLLATE utf8mb4_general_ci,
  `bio` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,NULL,'User3','user3@gmail.com','password3','2023-09-13 10:35:13','2023-09-13 10:35:13','',NULL,NULL,NULL),(4,NULL,'User4','user4@gmail.com','password4','2023-09-13 10:35:13','2023-09-13 10:35:13','',NULL,NULL,NULL),(5,NULL,'User5','user5@gmail.com','password5','2023-09-13 10:35:13','2023-09-13 10:35:13','',NULL,NULL,NULL),(6,NULL,'User6','user6@gmail.com','password6','2023-09-13 10:35:13','2023-09-13 10:35:13','',NULL,NULL,NULL),(7,NULL,'User7','user7@gmail.com','password7','2023-09-13 10:35:13','2023-09-13 10:35:13','',NULL,NULL,NULL),(8,NULL,'User8','user8@gmail.com','password8','2023-09-13 10:35:13','2023-09-13 10:35:13','',NULL,NULL,NULL),(9,NULL,'User9','user9@gmail.com','password9','2023-09-13 10:35:13','2023-09-13 10:35:13','',NULL,NULL,NULL),(10,NULL,'User10','user10@gmail.com','password10','2023-09-13 10:35:13','2023-09-13 10:35:13','',NULL,NULL,NULL),(11,NULL,'fawef','khang12345@gmail.com','Khang11082003!','2023-09-20 20:06:48','2023-09-20 20:06:48','fawf',NULL,NULL,NULL),(12,NULL,'găge','khang123145@gmail.com','Khang11082003!','2023-09-20 20:30:40','2023-09-20 20:30:40','fawef',NULL,NULL,NULL),(13,NULL,'ăefef','khan1g12345@gmail.com','Khang11082003!','2023-09-20 20:31:28','2023-09-20 20:31:28','fawge',NULL,NULL,NULL),(14,NULL,'username1','user1@gmail.cpm','Username_1','2023-12-30 10:59:31','2023-12-30 11:01:34','Diễm Quỳnh','\"[null,null,null]\"',NULL,'UETer');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `view_table`
--

DROP TABLE IF EXISTS `view_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `view_table` (
  `view_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `collection_id` int DEFAULT NULL,
  `pen_id` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pen',
  PRIMARY KEY (`view_id`),
  KEY `FK_view_table_user` (`user_id`),
  KEY `FK_view_table_pen` (`pen_id`),
  KEY `FK_view_table_collection` (`collection_id`),
  CONSTRAINT `FK_view_table_collection` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`collection_id`),
  CONSTRAINT `FK_view_table_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  CONSTRAINT `FK_view_table_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `view_table`
--

LOCK TABLES `view_table` WRITE;
/*!40000 ALTER TABLE `view_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `view_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-30 20:59:03
