-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 05, 2018 at 01:50 PM
-- Server version: 10.1.30-MariaDB-0ubuntu0.17.10.1
-- PHP Version: 7.1.15-0ubuntu0.17.10.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store1`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `phone` int(20) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `email`, `phone`, `address`) VALUES
(1, 'mahmood', 'sa@sa123', 12345, 'amman-jordan'),
(2, 'ahamd', 'ahmad@ahmad', 77999, 'amaan'),
(6, 'abusafad', 'hhh@fff', 512512, 'hgjhgjh');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `descrabtion` varchar(256) NOT NULL,
  `authorid` int(11) NOT NULL,
  `priceJod` varchar(11) DEFAULT NULL,
  `priceUsd` varchar(11) DEFAULT NULL,
  `priceEru` varchar(11) DEFAULT NULL,
  `startDate` text NOT NULL,
  `endDate` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `descrabtion`, `authorid`, `priceJod`, `priceUsd`, `priceEru`, `startDate`, `endDate`) VALUES
(1, 'php7', 'good87', 1, '100', '50', '20', '04/03/2018', '04/18/2018'),
(2, 'java', 'good', 2, '7', '', '10', '04/10/2018', '04/17/2018'),
(3, 'css3', 'this book is vary good ', 6, '15', '', '', '04/03/2018', '04/07/2018'),
(33, '11111', '234', 2, '12', '', '', '', ''),
(34, '1342', 'qwerewqr', 2, '234', '123', '', '', ''),
(35, 'wqeq', 'qwe', 2, '12', '', '', '', ''),
(36, '123123', '12311', 2, '12', '', '', '', ''),
(37, '213123', '12312321', 2, '123', '', '', '', ''),
(42, 'oooooooooooo', 'adsas', 2, '12', '', '', '', ''),
(43, 'qweq', 'qweqweqe', 6, '123', '', '', '', ''),
(44, '999999999', 'qweqwe', 2, '12', '', '', '', ''),
(45, 'jhgjhghjsdf', 'sdfsdfsd', 2, '12', '', '', '', ''),
(46, 'uytuytu', 'sadsadasd', 6, '123', '', '', '', ''),
(47, 'dasdasdasd', 'qweqwe', 6, '12', '', '', '', ''),
(48, 'qwe2', 'asdasdasd', 2, '12', '', '', '', ''),
(50, 'asdaqqq', 'sadasdasdasd', 1, '12333', '', '', '', ''),
(51, 'gjhgjhhgasjdhjashgdjashgdjas', 'qwewqewq', 1, '12333333', '', '', '', ''),
(52, 'hkjhkjhkjhkj', 'vcv', 6, '45', '', '', '', ''),
(53, 'jjjy', 'rtyrty', 6, '67', '', '', '', ''),
(54, 'lkjlkjlk', 'ytu', 2, '66', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'it'),
(3, 'history'),
(4, 'sport');

-- --------------------------------------------------------

--
-- Table structure for table `categories_book`
--

CREATE TABLE `categories_book` (
  `idbook` int(11) NOT NULL,
  `idcategories` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories_book`
--

INSERT INTO `categories_book` (`idbook`, `idcategories`) VALUES
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 3),
(33, 1),
(33, 3),
(33, 4),
(34, 3),
(35, 3),
(36, 1),
(36, 3),
(37, 3),
(42, 3),
(43, 3),
(44, 3),
(45, 3),
(46, 3),
(47, 3),
(48, 3),
(50, 3),
(51, 3),
(52, 3),
(53, 3),
(54, 3);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_book_author`
-- (See below for the actual view)
--
CREATE TABLE `view_book_author` (
`bookname` varchar(256)
,`priceJod` varchar(11)
,`priceUsd` varchar(11)
,`priceEru` varchar(11)
,`startDate` text
,`endDate` text
,`bookid` int(11)
,`descrabtion` varchar(256)
,`phone` int(20)
,`authorid` int(11)
,`id` int(11)
,`name` varchar(256)
,`idcategories` int(11)
,`catname` text
);

-- --------------------------------------------------------

--
-- Structure for view `view_book_author`
--
DROP TABLE IF EXISTS `view_book_author`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_book_author`  AS  select `books`.`name` AS `bookname`,`books`.`priceJod` AS `priceJod`,`books`.`priceUsd` AS `priceUsd`,`books`.`priceEru` AS `priceEru`,`books`.`startDate` AS `startDate`,`books`.`endDate` AS `endDate`,`books`.`id` AS `bookid`,`books`.`descrabtion` AS `descrabtion`,`author`.`phone` AS `phone`,`books`.`authorid` AS `authorid`,`author`.`id` AS `id`,`author`.`name` AS `name`,`categories_book`.`idcategories` AS `idcategories`,group_concat(`categories`.`name` separator ',') AS `catname` from (((`books` join `author` on((`author`.`id` = `books`.`authorid`))) left join `categories_book` on((`books`.`id` = `categories_book`.`idbook`))) left join `categories` on((`categories_book`.`idcategories` = `categories`.`id`))) group by `books`.`id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`authorid`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories_book`
--
ALTER TABLE `categories_book`
  ADD PRIMARY KEY (`idbook`,`idcategories`),
  ADD KEY `catbook` (`idcategories`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `author_id` FOREIGN KEY (`authorid`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `categories_book`
--
ALTER TABLE `categories_book`
  ADD CONSTRAINT `bookcat` FOREIGN KEY (`idbook`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `catbook` FOREIGN KEY (`idcategories`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
