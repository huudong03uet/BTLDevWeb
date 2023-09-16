-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2023 at 05:23 AM
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
-- Table structure for table `pen`
--

CREATE TABLE `pen` (
  `pen_id` int(11) NOT NULL,
  `pen_name` text NOT NULL,
  `pen_color` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `avatar_path` text DEFAULT NULL,
  `user_name` text NOT NULL,
  `gmail` text DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `avatar_path`, `user_name`, `gmail`, `phone_number`, `password`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'User1', 'user1@gmail.com', 1234567890, 'password1', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(2, NULL, 'User2', 'user2@gmail.com', 2147483647, 'password2', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(3, NULL, 'User3', 'user3@gmail.com', 2147483647, 'password3', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(4, NULL, 'User4', 'user4@gmail.com', 2147483647, 'password4', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(5, NULL, 'User5', 'user5@gmail.com', 2147483647, 'password5', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(6, NULL, 'User6', 'user6@gmail.com', 2147483647, 'password6', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(7, NULL, 'User7', 'user7@gmail.com', 2147483647, 'password7', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(8, NULL, 'User8', 'user8@gmail.com', 2147483647, 'password8', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(9, NULL, 'User9', 'user9@gmail.com', 2147483647, 'password9', '2023-09-14 00:35:13', '2023-09-14 00:35:13'),
(10, NULL, 'User10', 'user10@gmail.com', 123456789, 'password10', '2023-09-14 00:35:13', '2023-09-14 00:35:13');

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
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pen`
--
ALTER TABLE `pen`
  MODIFY `pen_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_pen`
--
ALTER TABLE `user_pen`
  MODIFY `user_pen_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_pen`
--
ALTER TABLE `user_pen`
  ADD CONSTRAINT `user_pen_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `user_pen_ibfk_2` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
