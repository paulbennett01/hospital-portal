-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2025 at 02:57 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(4) NOT NULL,
  `FirstName` text NOT NULL,
  `surname` text NOT NULL,
  `email` text NOT NULL,
  `department_id` varchar(4) NOT NULL,
  `telephone_number` varchar(11) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hospital_number` varchar(20) NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `FirstName`, `surname`, `email`, `department_id`, `telephone_number`, `password`, `created_at`, `hospital_number`, `dob`) VALUES
('', 'e', 'e', '20342779@myclyde.ac.uk', '1', '2147483647', '$2b$10$6PvbbDrGpEHvRD1/IdFpLehmV7XDEFo88Y3O8hkC9i6jrPYqScWdC', '0000-00-00 00:00:00', 'ch200', '1111-11-11'),
('', 'Rick', 'Astley', 'rickastley@gmail.com', '1', '01419933845', '$2b$10$HNeKabhHRFeWq/oIKoBc9uuCgOoHqGfJoNgZnA48M1LglBA.QCXdS', '2025-02-03 10:17:22', 'CH500', '1988-11-11');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
