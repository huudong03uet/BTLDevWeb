-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: fall2324w3g5
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
-- Current Database: `fall2324w3g5`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `fall2324w3g5` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `fall2324w3g5`;

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
  `name` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `status` varchar(100) COLLATE utf8mb4_general_ci DEFAULT 'public',
  PRIMARY KEY (`collection_id`),
  KEY `FK_collection_user` (`user_id`),
  CONSTRAINT `FK_collection_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
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
INSERT INTO `follow_table` VALUES (1,1,2,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(2,6,8,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(3,2,3,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(4,3,4,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(5,8,1,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(6,4,6,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(7,1,4,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(8,7,1,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(9,5,4,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(10,1,4,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(11,1,8,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(12,1,3,'2023-11-15 02:11:58','2023-11-15 02:11:58'),(13,1,5,'2023-11-15 02:11:58','2023-11-15 02:11:58');
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
  `html_code` text COLLATE utf8mb4_general_ci,
  `js_code` text COLLATE utf8mb4_general_ci,
  `css_code` text COLLATE utf8mb4_general_ci,
  `name` text COLLATE utf8mb4_general_ci,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `status` varchar(100) COLLATE utf8mb4_general_ci DEFAULT 'public',
  `type_css` varchar(100) COLLATE utf8mb4_general_ci DEFAULT 'css',
  PRIMARY KEY (`pen_id`),
  KEY `FK_pen_user` (`user_id`),
  CONSTRAINT `FK_pen_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pen`
--

LOCK TABLES `pen` WRITE;
/*!40000 ALTER TABLE `pen` DISABLE KEYS */;
INSERT INTO `pen` VALUES (1,'<section class=\"light-theme\" aria-label=\"Radio group demo in light theme\">\n	<div class=\"wrapper\">\n		<fieldset class=\"radio-group\">\n			<legend class=\"heading\">Your favorite code editor?</legend>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r11\" type=\"radio\" name=\"group1\" value=\"vscode\" checked />\n				<label for=\"r11\" class=\"radio\"><span></span>Visual Studio Code</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r12\" type=\"radio\" name=\"group1\" value=\"webstorm\" />\n				<label for=\"r12\" class=\"radio\"><span></span>JetBrains WebStorm</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r13\" type=\"radio\" name=\"group1\" value=\"vim\" />\n				<label for=\"r13\" class=\"radio\"><span></span>Vim</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r14\" type=\"radio\" name=\"group1\" value=\"sublimetext\" />\n				<label for=\"r14\" class=\"radio\"><span></span>Sublime Text</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r15\" type=\"radio\" name=\"group1\" value=\"notepad++\" />\n				<label for=\"r15\" class=\"radio\"><span></span>Notepad++</label>\n			</div>\n		</fieldset>\n\n		<fieldset class=\"radio-group\">\n			<legend class=\"heading\">Your favorite programming language?</legend>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r21\" type=\"radio\" name=\"group2\" value=\"python\" />\n				<label for=\"r21\" class=\"radio\"><span></span>Python</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r22\" type=\"radio\" name=\"group2\" value=\"javascript\" checked />\n				<label for=\"r22\" class=\"radio\"><span></span>JavaScript</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r23\" type=\"radio\" name=\"group2\" value=\"c-c++\" />\n				<label for=\"r23\" class=\"radio\"><span></span>C/C++</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r24\" type=\"radio\" name=\"group2\" value=\"rust\" />\n				<label for=\"r24\" class=\"radio\"><span></span>Rust</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r25\" type=\"radio\" name=\"group2\" value=\"go\" />\n				<label for=\"r25\" class=\"radio\"><span></span>Go</label>\n			</div>\n		</fieldset>\n	</div>\n</section>\n<section class=\"dark-theme\" aria-label=\"Radio group demo in dark theme\">\n	<div class=\"wrapper\">\n		<fieldset class=\"radio-group\">\n			<legend class=\"heading\">Your favorite online coding platform?</legend>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r41\" type=\"radio\" name=\"group4\" value=\"Glitch\" />\n				<label for=\"r41\" class=\"radio\"><span></span>Glitch</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r42\" type=\"radio\" name=\"group4\" value=\"CodePen\" checked />\n				<label for=\"r42\" class=\"radio\"><span></span>CodePen</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r43\" type=\"radio\" name=\"group4\" value=\"CodeSandbox\" />\n				<label for=\"r43\" class=\"radio\"><span></span>CodeSandbox</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r44\" type=\"radio\" name=\"group4\" value=\"JSFiddle\" />\n				<label for=\"r44\" class=\"radio\"><span></span>JSFiddle</label>\n			</div>\n		</fieldset>\n\n		<fieldset class=\"radio-group\">\n			<legend class=\"heading\">Your favorite music artist/band?</legend>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r31\" type=\"radio\" name=\"group3\" value=\"owlcity\" checked />\n				<label for=\"r31\" class=\"radio\"><span></span>Owl City</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r32\" type=\"radio\" name=\"group3\" value=\"1D\" />\n				<label for=\"r32\" class=\"radio\"><span></span>One Direction</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r33\" type=\"radio\" name=\"group3\" value=\"maroon5\" />\n				<label for=\"r33\" class=\"radio\"><span></span>Maroon 5</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r34\" type=\"radio\" name=\"group3\" value=\"taylorswift\" />\n				<label for=\"r34\" class=\"radio\"><span></span>Taylor Swift</label>\n			</div>\n\n			<div class=\"radio-wrapper\">\n				<input id=\"r35\" type=\"radio\" name=\"group3\" value=\"jimyosef\" />\n				<label for=\"r35\" class=\"radio\"><span></span>Jim Yosef</label>\n			</div>\n		</fieldset>\n	</div>\n</section>','','/*\n * 26 April 2023\n * CSS Radio Group with Subtle Animation\n * tested on Firefox v112.0.1/x64 and Chrome v114.0.5720.4-dev/x64\n */\n\n/* === makefawefawef your customizations here === */\n:root {\n	--outline-focus: 2px solid;\n	--outline-offset: 0.875rem;\n}\n\n.radio-group {\n	--offset-radio-box: -0.25rem;\n	--size-radio-box: 1.5rem;\n	--gap-radio-text: 0.75rem;\n	--opacity-radio: 0.75;\n	--spacing-radio: 0.8rem;\n	--spacing-heading: 1.25rem;\n	--size-font: 1rem;\n	--size-font-heading: 1.5rem;\n	--duration-radio: 200ms;\n	--delay-radio: 100ms;\n}\n\n.wrapper {\n	gap: 4rem;\n}\n\nsection {\n	padding: 4rem 2rem;\n}\n\n.light-theme {\n	color: hsl(250, 100%, 2.5%);\n	--background: #fff;\n	--color-heading: hsl(250, 100%, 2.5%);\n	--color-radio: hsl(250, 100%, 2.5%);\n	--color-radio-checked: hsl(239, 100%, 61%);\n	--color-outline: rgba(0, 0, 0, 0.4);\n}\n\n.dark-theme {\n	color: #fff;\n	--background: #090b10;\n	--color-heading: hsl(174, 42%, 65%);\n	--color-radio: #fff;\n	--color-radio-checked: hsl(174, 42%, 65%);\n	--color-outline: #fff;\n}\n\n.dark-theme .heading {\n	text-shadow: 0 0.125rem 0.625rem hsla(174, 42%, 65%, 0.3);\n}\n\n/* === presentation === */\nhtml,\nbody {\n	width: 100%;\n	height: 100%;\n}\n\nbody {\n	font-family: \"Comfortaa\", Ubuntu, Arial, Helvetica, sans-serif;\n	font-weight: 700;\n	display: grid;\n	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n}\n\nsection {\n	background-color: var(--background);\n	display: grid;\n	place-items: center;\n}\n\n.wrapper {\n	display: flex;\n	justify-content: center;\n	flex-direction: column;\n}\n\nsection ::selection {\n	background-color: var(--color-radio-checked);\n	color: var(--background);\n}\n\nfieldset,\nlegend,\nlabel {\n	all: unset;\n	position: relative;\n}\n\nlabel,\nlegend {\n	display: block;\n}\n\n/* === relevant portion === */\n.heading {\n	color: var(--color-heading);\n	margin-bottom: var(--spacing-heading);\n	font-size: var(--size-font-heading);\n	line-height: 125%;\n}\n\n.radio {\n	color: currentColor;\n}\n\n.radio-wrapper {\n	font-size: 0;\n}\n\n.radio-wrapper input[type=\"radio\"] {\n	width: calc(var(--size-radio-box) + var(--gap-radio-text));\n	height: calc(var(--size-radio-box) + var(--gap-radio-text));\n}\n\n.radio {\n	font-size: var(--size-font);\n	font-weight: inherit;\n	opacity: var(--opacity-radio);\n	transition: all ease var(--duration-radio) var(--delay-radio);\n	position: relative;\n	top: calc(var(--offset-radio-box) * -1);\n	user-select: none;\n	cursor: pointer;\n	display: inline-flex;\n	place-items: flex-start;\n}\n\n.radio:hover {\n	opacity: 1;\n}\n\n.radio span {\n	position: relative;\n	top: var(--offset-radio-box, 0);\n	min-width: var(--size-radio-box);\n	min-height: var(--size-radio-box);\n	margin-right: var(--gap-radio-text);\n	border-radius: 50%;\n	overflow: hidden;\n	display: inline-block;\n}\n\n.radio span::before {\n	top: 0;\n	width: 100%;\n	height: 100%;\n	border: max(2px, var(--size-radio-box) * 0.1) solid\n		var(--color, var(--color-radio));\n	transition: all ease var(--duration-radio) var(--delay-radio);\n}\n\n.radio span::after {\n	bottom: 0%;\n	width: 50%;\n	height: 50%;\n	background-color: var(--color, var(--color-radio));\n	transform: translate(-50%, 50%);\n	transition: all cubic-bezier(0.18, 0.89, 0.32, 1.28) var(--duration-radio)\n		var(--delay-radio);\n}\n\n.radio span::before,\n.radio span::after {\n	content: \"\";\n	position: absolute;\n	left: 0%;\n	border-radius: 50%;\n	display: block;\n}\n\n.radio-wrapper input:checked ~ .radio span::after {\n	left: 50%;\n	bottom: 50%;\n}\n\n.radio-wrapper input:checked ~ .radio {\n	--color: var(--color-radio-checked);\n	opacity: 1;\n}\n\n.radio::before {\n	content: \"\";\n	position: absolute;\n	left: 50%;\n	top: 50%;\n	transform: translate(-50%, -50%) translateY(var(--offset-radio-box));\n	width: calc(100% + var(--outline-offset));\n	height: calc(100% + var(--outline-offset));\n	border: var(--outline-focus);\n	border-color: var(--color-outline);\n	border-radius: 3px;\n	opacity: 0;\n}\n\n.radio-wrapper input:focus-visible ~ .radio::before {\n	opacity: 1;\n}\n\n.radio-group .radio-wrapper {\n	margin-bottom: var(--spacing-radio);\n}\n\n.radio-group .radio-wrapper:last-of-type {\n	margin-bottom: 0;\n}\n\n@media (prefers-reduced-motion: reduce) {\n	.radio span::after {\n		transition: none;\n	}\n}\n\n/* === reset === */\n*,\n*::before,\n*::after {\n	padding: 0;\n	margin: 0;\n	box-sizing: border-box;\n	position: relative;\n}\n\n.radio-wrapper input {\n	position: absolute;\n	left: 0;\n	top: 0;\n	clip: rect(1px, 1px, 1px, 1px);\n	clip-path: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);\n	padding: 0;\n	border: 0;\n	height: 1px;\n	width: 1px;\n	overflow: hidden;\n	opacity: 0.2;\n}\n',NULL,'2023-09-30 09:08:26','2023-12-28 07:57:56',1,0,'public','css'),(2,'<h1> hello <h1>','fawef','h1 {\n  color: red\n}',NULL,'2023-09-30 09:10:45','2023-12-28 07:58:04',1,0,'public','css'),(3,'fawef','','fawef',NULL,'2023-09-30 09:13:59','2023-12-28 07:58:08',1,0,'public','css'),(4,'','','',NULL,'2023-11-17 11:10:34','2023-12-28 07:58:15',1,0,'public','css'),(5,'','','',NULL,'2023-11-17 11:12:52','2023-12-28 07:58:19',1,0,'public','css'),(6,'fawefdà','','fawef',NULL,'2023-11-17 11:18:06','2023-12-28 07:58:24',1,0,'public','css'),(7,'','','',NULL,'2023-11-18 09:44:07','2023-12-28 07:58:41',1,0,'public','css'),(8,'','','',NULL,'2023-11-18 09:45:32','2023-12-28 07:58:46',1,0,'public','css'),(9,'1341','12341','4124',NULL,'2023-11-18 09:46:06','2023-12-28 07:58:50',2,0,'public','css'),(10,'1341','12341','4124',NULL,'2023-11-18 09:46:39','2023-12-28 07:58:56',2,0,'public','css'),(11,'','','',NULL,'2023-11-18 09:46:46','2023-12-28 07:58:59',2,0,'public','css'),(12,'','','',NULL,'2023-11-18 09:46:49','2023-12-28 07:59:02',2,0,'public','css'),(13,'1341c','12341','4124',NULL,'2023-11-18 09:46:55','2023-12-28 07:59:04',2,0,'public','css'),(14,'','','',NULL,'2023-11-18 10:05:49','2023-12-28 07:59:08',2,0,'public','css'),(15,'','','',NULL,'2023-11-18 10:06:58','2023-12-28 07:59:12',2,0,'public','css'),(16,'1341','12341','4124',NULL,'2023-11-18 10:07:35','2023-12-28 07:59:14',2,0,'public','css'),(17,'1341','12341','4124',NULL,'2023-11-18 10:13:39','2023-12-28 07:59:16',2,0,'public','css');
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
  `avatar_path` text COLLATE utf8mb4_general_ci,
  `user_name` text COLLATE utf8mb4_general_ci NOT NULL,
  `gmail` text COLLATE utf8mb4_general_ci,
  `password` text COLLATE utf8mb4_general_ci,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'User1','user1@gmail.com','password1','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(2,NULL,'User2','user2@gmail.com','password2','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(3,NULL,'User3','user3@gmail.com','password3','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(4,NULL,'User4','user4@gmail.com','password4','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(5,NULL,'User5','user5@gmail.com','password5','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(6,NULL,'User6','user6@gmail.com','password6','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(7,NULL,'User7','user7@gmail.com','password7','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(8,NULL,'User8','user8@gmail.com','password8','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(9,NULL,'User9','user9@gmail.com','password9','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(10,NULL,'User10','user10@gmail.com','password10','2023-09-13 10:35:13','2023-09-13 10:35:13',''),(11,NULL,'fawef','khang12345@gmail.com','Khang11082003!','2023-09-20 20:06:48','2023-09-20 20:06:48','fawf'),(12,NULL,'găge','khang123145@gmail.com','Khang11082003!','2023-09-20 20:30:40','2023-09-20 20:30:40','fawef'),(13,NULL,'ăefef','khan1g12345@gmail.com','Khang11082003!','2023-09-20 20:31:28','2023-09-20 20:31:28','fawge');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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

-- Dump completed on 2023-12-29 23:36:32
