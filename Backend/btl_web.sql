-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2023 at 03:47 AM
-- Server version: 10.4.28-MariaDB-log
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `btl_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment_table`
--

CREATE TABLE `comment_table` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pen_id` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `like_table`
--

CREATE TABLE `like_table` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pen_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------


CREATE TABLE `collection` (
  `collection_id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(1000) NOT NULL,
  PRIMARY KEY (`collection_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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


--
-- Table structure for table `pen`
--

CREATE TABLE `pen` (
  `pen_id` int(11) NOT NULL,
  `html_code` text DEFAULT NULL,
  `js_code` text DEFAULT NULL,
  `css_code` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pen`
--

INSERT INTO `pen` (`pen_id`, `html_code`, `js_code`, `css_code`, `name`, `createdAt`, `updatedAt`) VALUES
(1, '1341', '12341', '4124', NULL, '2023-09-30 23:08:26', '2023-09-30 23:08:26'),
(2, 'fawfe', 'fawef', 'fawe', NULL, '2023-09-30 23:10:45', '2023-09-30 23:10:45'),
(3, 'fawef', '', 'faweffawefawefewfaw', NULL, '2023-09-30 23:13:59', '2023-10-11 07:55:39'),
(4, '', '', '', NULL, '2023-10-11 06:48:11', '2023-10-11 06:48:11');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `avatar_path` text DEFAULT NULL,
  `user_name` text NOT NULL,
  `gmail` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `full_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `avatar_path`, `user_name`, `gmail`, `password`, `createdAt`, `updatedAt`, `full_name`) VALUES
(1, NULL, 'User1', 'user1@gmail.com', 'password1', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(2, NULL, 'User2', 'user2@gmail.com', 'password2', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(3, NULL, 'User3', 'user3@gmail.com', 'password3', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(4, NULL, 'User4', 'user4@gmail.com', 'password4', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(5, NULL, 'User5', 'user5@gmail.com', 'password5', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(6, NULL, 'User6', 'user6@gmail.com', 'password6', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(7, NULL, 'User7', 'user7@gmail.com', 'password7', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(8, NULL, 'User8', 'user8@gmail.com', 'password8', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(9, NULL, 'User9', 'user9@gmail.com', 'password9', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(10, NULL, 'User10', 'user10@gmail.com', 'password10', '2023-09-14 00:35:13', '2023-09-14 00:35:13', ''),
(11, NULL, 'fawef', 'khang12345@gmail.com', 'Khang11082003!', '2023-09-21 10:06:48', '2023-09-21 10:06:48', 'fawf'),
(12, NULL, 'găge', 'khang123145@gmail.com', 'Khang11082003!', '2023-09-21 10:30:40', '2023-09-21 10:30:40', 'fawef'),
(13, NULL, 'ăefef', 'khan1g12345@gmail.com', 'Khang11082003!', '2023-09-21 10:31:28', '2023-09-21 10:31:28', 'fawge');

-- --------------------------------------------------------

--
-- Table structure for table `user_pen`
--

CREATE TABLE `user_pen` (
  `user_pen_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pen_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_pen`
--

INSERT INTO `user_pen` (`user_pen_id`, `user_id`, `pen_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, NULL, '2023-09-30 23:08:26', '2023-09-30 23:08:26'),
(2, 1, 2, '2023-09-30 23:10:45', '2023-09-30 23:10:45'),
(3, 1, 3, '2023-09-30 23:13:59', '2023-09-30 23:13:59'),
(4, 1, 4, '2023-10-11 06:48:11', '2023-10-11 06:48:11');

-- --------------------------------------------------------

--
-- Table structure for table `view_table`
--

CREATE TABLE `view_table` (
  `views_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pen_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment_table`
--
ALTER TABLE `comment_table`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `fk_comment_user` (`user_id`),
  ADD KEY `fk_comment_pen` (`pen_id`);

--
-- Indexes for table `like_table`
--
ALTER TABLE `like_table`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `fk_like_user` (`user_id`),
  ADD KEY `fk_like_pen` (`pen_id`);

--
-- Indexes for table `pen`
--
ALTER TABLE `pen`
  ADD PRIMARY KEY (`pen_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_pen`
--
ALTER TABLE `user_pen`
  ADD PRIMARY KEY (`user_pen_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pen_id` (`pen_id`);

--
-- Indexes for table `view_table`
--
ALTER TABLE `view_table`
  ADD PRIMARY KEY (`views_id`),
  ADD KEY `fk_views_user` (`user_id`),
  ADD KEY `fk_views_pen` (`pen_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment_table`
--
ALTER TABLE `comment_table`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `like_table`
--
ALTER TABLE `like_table`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pen`
--
ALTER TABLE `pen`
  MODIFY `pen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_pen`
--
ALTER TABLE `user_pen`
  MODIFY `user_pen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `view_table`
--
ALTER TABLE `view_table`
  MODIFY `views_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment_table`
--
ALTER TABLE `comment_table`
  ADD CONSTRAINT `fk_comment_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `like_table`
--
ALTER TABLE `like_table`
  ADD CONSTRAINT `fk_like_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  ADD CONSTRAINT `fk_like_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_pen`
--
ALTER TABLE `user_pen`
  ADD CONSTRAINT `user_pen_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `user_pen_ibfk_2` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`);

--
-- Constraints for table `view_table`
--
ALTER TABLE `view_table`
  ADD CONSTRAINT `fk_views_pen` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`),
  ADD CONSTRAINT `fk_views_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
