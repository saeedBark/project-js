-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2024 at 03:24 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

SELECT * FROM personne;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Database: `nodemysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `personne`
--

CREATE TABLE `personne` (
    `id` int(11) NOT NULL PRIMARY KEY, `nom` varchar(22) NOT NULL, `email` varchar(22) NOT NULL, `age` int(3) NOT NULL, `nni` varchar(10) NOT NULL, `salary` int(12), `department` varchar(30), `nbPres` int(3), `nbAbs` int(3)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE `personne`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

INSERT INTO
    `personne` (
        `nom`, `email`, `age`, `nni`, `salary`, `department`, `nbPres`, `nbAbs`
    )
VALUES (
        'John Doe', 'john.doe@example.com', 30, '1234567890', 5000, 'Sales', 2, 1
    ),
    (
        'Jane Smith', 'jane.smith@example.com', 25, '0987654321', 6000, 'Marketing', 3, 0
    ),
    (
        'Mike Johnson', 'mike.johnson@example.com', 35, '9876543210', 7000, 'Finance', 1, 2
    ),
    (
        'Sarah Williams', 'sarah.williams@example.com', 28, '0123456789', 5500, 'HR', 0, 0
    ),
    (
        'David Brown', 'david.brown@example.com', 32, '5678901234', 6500, 'Operations', 4, 1
    );

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;