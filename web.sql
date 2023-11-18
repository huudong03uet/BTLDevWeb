-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: btl_web
-- ------------------------------------------------------
-- Server version	8.0.34

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
  `name` varchar(1000) NOT NULL,
  PRIMARY KEY (`collection_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_pen`
--

LOCK TABLES `collection_pen` WRITE;
/*!40000 ALTER TABLE `collection_pen` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection_pen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection_user`
--

DROP TABLE IF EXISTS `collection_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection_user` (
  `collection_user_id` int NOT NULL AUTO_INCREMENT,
  `collection_id` int NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_user_id`),
  KEY `fk_colletion_user_colletion` (`collection_id`),
  KEY `fk_colletion_user_user` (`user_id`),
  CONSTRAINT `fk_colletion_user_colletion` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`collection_id`),
  CONSTRAINT `fk_colletion_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_user`
--

LOCK TABLES `collection_user` WRITE;
/*!40000 ALTER TABLE `collection_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_table`
--

DROP TABLE IF EXISTS `comment_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_table` (
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `pen_id` int NOT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_user` (`user_id`),
  KEY `fk_comment_pen` (`pen_id`),
  CONSTRAINT `fk_comment_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_table`
--

LOCK TABLES `follow_table` WRITE;
/*!40000 ALTER TABLE `follow_table` DISABLE KEYS */;
INSERT INTO `follow_table` VALUES (1,1,2,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(2,6,8,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(3,2,3,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(4,3,4,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(5,8,1,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(6,4,6,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(7,1,4,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(8,7,1,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(9,5,4,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(10,1,4,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(11,1,8,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(12,1,3,'2023-11-15 09:11:58','2023-11-15 09:11:58'),(13,1,5,'2023-11-15 09:11:58','2023-11-15 09:11:58');
/*!40000 ALTER TABLE `follow_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_table`
--

DROP TABLE IF EXISTS `like_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_table` (
  `like_id` int NOT NULL,
  `user_id` int NOT NULL,
  `pen_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  KEY `fk_like_user` (`user_id`),
  KEY `fk_like_pen` (`pen_id`),
  CONSTRAINT `fk_like_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  CONSTRAINT `fk_like_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_table`
--

LOCK TABLES `like_table` WRITE;
/*!40000 ALTER TABLE `like_table` DISABLE KEYS */;
INSERT INTO `like_table` VALUES (1,1,1,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(2,6,1,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(3,2,1,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(4,3,1,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(5,8,1,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(6,4,1,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(7,1,2,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(8,7,1,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(9,5,1,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(10,4,2,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(11,2,2,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(12,5,2,'2023-11-15 08:52:27','2023-11-15 08:52:27'),(13,3,2,'2023-11-15 08:52:27','2023-11-15 08:52:27');
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
  `html_code` text,
  `js_code` text,
  `css_code` text,
  `name` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pen_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pen`
--

LOCK TABLES `pen` WRITE;
/*!40000 ALTER TABLE `pen` DISABLE KEYS */;
INSERT INTO `pen` VALUES (1,'<h1>Hello</h1>','12341','H1 {\n  color: white;\n  background-color: red;\n}',NULL,'2023-09-30 16:08:26','2023-11-18 17:41:56'),(2,'<h1> hello <h1>','fawef','h1 {\n  color: red\n}',NULL,'2023-09-30 16:10:45','2023-11-16 13:27:30'),(3,'fawef','','fawef',NULL,'2023-09-30 16:13:59','2023-09-30 16:14:20');
/*!40000 ALTER TABLE `pen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `avatar_path` text,
  `user_name` text NOT NULL,
  `gmail` text,
  `password` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `full_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'User1','user1@gmail.com','password1','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(2,NULL,'User2','user2@gmail.com','password2','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(3,NULL,'User3','user3@gmail.com','password3','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(4,NULL,'User4','user4@gmail.com','password4','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(5,NULL,'User5','user5@gmail.com','password5','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(6,NULL,'User6','user6@gmail.com','password6','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(7,NULL,'User7','user7@gmail.com','password7','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(8,NULL,'User8','user8@gmail.com','password8','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(9,NULL,'User9','user9@gmail.com','password9','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(10,NULL,'User10','user10@gmail.com','password10','2023-09-13 17:35:13','2023-09-13 17:35:13',''),(11,NULL,'fawef','khang12345@gmail.com','Khang11082003!','2023-09-21 03:06:48','2023-09-21 03:06:48','fawf'),(12,NULL,'găge','khang123145@gmail.com','Khang11082003!','2023-09-21 03:30:40','2023-09-21 03:30:40','fawef'),(13,NULL,'ăefef','khan1g12345@gmail.com','Khang11082003!','2023-09-21 03:31:28','2023-09-21 03:31:28','fawge');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_pen`
--

DROP TABLE IF EXISTS `user_pen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_pen` (
  `user_pen_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `pen_id` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_pen_id`),
  KEY `user_pen_ibfk_1` (`user_id`),
  KEY `user_pen_ibfk_2` (`pen_id`),
  CONSTRAINT `user_pen_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_pen_ibfk_2` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_pen`
--

LOCK TABLES `user_pen` WRITE;
/*!40000 ALTER TABLE `user_pen` DISABLE KEYS */;
INSERT INTO `user_pen` VALUES (1,1,1,'2023-11-15 18:07:33','2023-11-15 18:07:33'),(2,2,2,'2023-11-15 18:07:33','2023-11-15 18:07:33'),(3,3,3,'2023-11-15 18:07:33','2023-11-15 18:07:33');
/*!40000 ALTER TABLE `user_pen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `view_table`
--

DROP TABLE IF EXISTS `view_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `view_table` (
  `views_id` int NOT NULL,
  `user_id` int NOT NULL,
  `pen_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`views_id`),
  KEY `fk_views_user` (`user_id`),
  KEY `fk_views_pen` (`pen_id`),
  CONSTRAINT `fk_views_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  CONSTRAINT `fk_views_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2023-11-19  0:48:13
