-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2026 at 08:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lably`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` char(36) NOT NULL,
  `job_seeker_id` char(36) NOT NULL,
  `job_id` char(36) NOT NULL,
  `cover_letter` text DEFAULT NULL,
  `resume_path` varchar(255) DEFAULT NULL,
  `applied_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `job_seeker_id`, `job_id`, `cover_letter`, `resume_path`, `applied_at`) VALUES
('4c58588a-4ceb-4fe0-a403-550393182c90', 'c5a05747-84f1-43bf-b8eb-0c42ccfdc8f0', 'a3784bf8-0cbb-4677-b4c2-9ae352cc4bce', 'Hello my name is Mhmoud.', '/any/jui.', '2026-03-01 19:10:26'),
('50024588-4acd-47be-8738-cfe7516353b7', 'c5a05747-84f1-43bf-b8eb-0c42ccfdc8f0', 'fc95fe23-6b58-4fbb-86eb-06fe7e0c41d9', 'Hello my name is .....', 'test', '2026-03-01 17:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `employer_profiles`
--

CREATE TABLE `employer_profiles` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employer_profiles`
--

INSERT INTO `employer_profiles` (`id`, `user_id`, `company_name`, `company_description`, `location`, `website`, `created_at`, `updated_at`) VALUES
('519c6442-d943-44d8-9bd8-92ed6b89bc40', 'f4f53234-a98b-4d7e-a163-1de44881c4eb', 'BrainKets', 'BrainKets is a Software Development company based in ', 'Lebanon', 'brainkets.com', '2026-02-27 18:58:14', '2026-02-27 20:01:04');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` char(36) NOT NULL,
  `job_seeker_profile_id` char(36) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `job_seeker_profile_id`, `company_name`, `job_title`, `start_date`, `end_date`, `description`, `created_at`) VALUES
('183cc7d8-0b6f-4841-980e-866e3400cfb5', 'bc8f029d-07b9-45e7-8aeb-234d69b23982', 'BrainKets ', 'Full Stack Web Developer', '2023-01-15', '2024-06-30', 'Built A full stack web application using React TypeScript and Laravel', '2026-02-28 20:26:05'),
('c3cba001-7dfa-469a-9080-8b276063a8ab', '5e7bd777-914c-4f2f-bba7-247b95ee253e', 'supportful ', 'Full Stack Web Developer', '2023-01-15', '2024-06-30', 'Built A full stack web application using React TypeScript and Laravel', '2026-03-01 21:45:55'),
('cdb220ca-c9bb-4e74-842c-67186c29ba50', 'bc8f029d-07b9-45e7-8aeb-234d69b23982', 'BrainKets ', 'Full Stack Web Developer', '2023-01-15', '2024-06-30', 'Built A full stack web application using React TypeScript and Laravel', '2026-02-27 23:17:24'),
('cfc7bb1c-1c06-4c1c-a8c3-a5f98c8d636a', 'bc8f029d-07b9-45e7-8aeb-234d69b23982', 'Lably ', 'Full Stack Web Developer', '2023-01-15', '2024-06-30', 'Built A full stack web application using React TypeScript and Laravel', '2026-02-28 20:31:38');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` char(36) NOT NULL,
  `employer_id` char(36) NOT NULL,
  `status` enum('active','filled','closed') DEFAULT 'active',
  `job_title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `requirements` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `job_type` enum('remote','on_site','hybrid') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `employer_id`, `status`, `job_title`, `description`, `requirements`, `location`, `job_type`, `created_at`, `updated_at`) VALUES
('a3784bf8-0cbb-4677-b4c2-9ae352cc4bce', '70880213-6ddd-4b1b-8f51-d829cd529f42', 'active', 'Full Stack Web Developer', 'Built A full stack web application using React TypeScript and Laravel', NULL, NULL, 'on_site', '2026-03-01 18:51:01', '2026-03-01 18:51:01'),
('fc95fe23-6b58-4fbb-86eb-06fe7e0c41d9', 'f4f53234-a98b-4d7e-a163-1de44881c4eb', 'active', 'Full Stack Engineer', 'We are looking for full stack engineer to join our dynamic team', '1. Strong knowlage in algo and data structure. 2. strong Knowlage in system design', 'Lebanon', 'remote', '2026-02-28 21:35:18', '2026-02-28 21:35:18');

-- --------------------------------------------------------

--
-- Table structure for table `job_seekers_profiles`
--

CREATE TABLE `job_seekers_profiles` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_seekers_profiles`
--

INSERT INTO `job_seekers_profiles` (`id`, `user_id`, `full_name`, `phone`, `address`, `about`, `verified_at`, `created_at`, `updated_at`) VALUES
('5e7bd777-914c-4f2f-bba7-247b95ee253e', '5f6261b2-5f8e-49c0-8229-75256b5f3926', 'Mahmoud Al Haj', NULL, NULL, NULL, NULL, '2026-03-01 21:45:36', '2026-03-01 21:45:36'),
('bc8f029d-07b9-45e7-8aeb-234d69b23982', 'c5a05747-84f1-43bf-b8eb-0c42ccfdc8f0', 'Ahmad Al Haj', '+961 81 074 965', 'saida', 'full stack web developer', NULL, '2026-02-27 20:54:24', '2026-02-27 22:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `pending_applications`
--

CREATE TABLE `pending_applications` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `resume_path` varchar(255) NOT NULL,
  `portfolio_path` text DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `application_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `decision_notes` text DEFAULT NULL,
  `reviewed_by` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pending_applications`
--

INSERT INTO `pending_applications` (`id`, `email`, `full_name`, `phone`, `address`, `resume_path`, `portfolio_path`, `submitted_at`, `reviewed_at`, `application_status`, `decision_notes`, `reviewed_by`) VALUES
('24932ee5-ce7f-421b-97ce-1c82f55a3b79', 'Mahmoud@example.comd', 'Mahmoud', NULL, NULL, 'uploads/resumes/24932ee5-ce7f-421b-97ce-1c82f55a3b79.pdf', '[\"uploads\\\\portfolios\\\\205ef869-26fa-4239-b72c-e3334cf29fe5.png\",\"uploads\\\\portfolios\\\\98ff042d-fbf2-4efd-9ef5-7996c11ffcc2.png\"]', '2026-02-19 18:43:31', NULL, 'approved', NULL, NULL),
('24df6736-ca16-4585-9fb0-b117ac595920', 'Ahmad@example.com', 'Ahmad', NULL, NULL, 'uploads/resumes/24df6736-ca16-4585-9fb0-b117ac595920.pdf', '[\"uploads\\\\portfolios\\\\46e8d1d9-52dc-4e53-83db-8f40c909f2d5.png\",\"uploads\\\\portfolios\\\\30ead78c-474d-4166-a62b-bb85fdba1ca6.png\"]', '2026-02-27 20:48:58', NULL, 'rejected', NULL, NULL),
('d2035a0b-a366-47e0-8a80-2ee063ef04e2', 'Mahmoud@example.comds', 'Mahmoud', NULL, NULL, 'uploads/resumes/d2035a0b-a366-47e0-8a80-2ee063ef04e2.pdf', '[\"uploads\\\\portfolios\\\\8a7c5357-9758-44b8-9d7a-49918fe58f91.png\",\"uploads\\\\portfolios\\\\5bba94ba-89d7-4d20-b5b4-3c9861068abd.png\"]', '2026-02-19 21:12:21', NULL, 'rejected', NULL, NULL),
('de8e8689-4d6a-4a21-8c95-bb5229d7f584', 'Mahmoud@example.com', 'Mahmoud', NULL, NULL, 'uploads/resumes/de8e8689-4d6a-4a21-8c95-bb5229d7f584.pdf', '[\"uploads\\\\portfolios\\\\6b6b5ebd-5d68-40be-a8f4-ed1e978ffd9d.png\",\"uploads\\\\portfolios\\\\e1f2df45-8c11-430f-8939-a13f27e59582.png\"]', '2026-02-19 18:40:09', NULL, 'approved', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('job_seeker','employer','admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 0,
  `activation_token` varchar(255) DEFAULT NULL,
  `activation_token_expires` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `created_at`, `updated_at`, `is_active`, `activation_token`, `activation_token_expires`) VALUES
('0d529f6a-d462-4dd8-a278-a3aafde81765', 'test@123', '$2b$10$fgSgqDNiW/U0NdVgez/yTeDTlY5AjIAygjuuOEXKehyQKx3rKCEla', 'employer', '2026-03-03 19:08:11', '2026-03-03 19:08:11', 1, NULL, NULL),
('11be4109-0dd4-11f1-8f7f-68f72894b459', 'admin@lably.com', '$2b$10$LisflTJtWT16Rf3tLcKKTe5BSeMGN36DjYbS49GiOyx5TZsvvshGy', 'admin', '2026-02-19 20:46:24', '2026-02-19 20:46:24', 1, NULL, NULL),
('5f6261b2-5f8e-49c0-8229-75256b5f3926', 'Ahmad@example.com', '$2b$10$deFwr99NiAVJNbSFC2S/Me14YIfYMWwPTtizgBrty3EkLwTVe3ZXu', 'job_seeker', '2026-02-27 20:49:21', '2026-02-27 20:53:04', 1, NULL, NULL),
('70880213-6ddd-4b1b-8f51-d829cd529f42', 'wissamm735@gmail.com', '$2b$10$8z7FbL.OdB95XPWe3rDCh.6/djrhIYTZ74Hhn17HaSBmslGM88MS2', 'employer', '2026-02-27 18:02:48', '2026-02-27 18:02:48', 1, NULL, NULL),
('74d8f5ca-8fd0-4205-bac5-6bfce726d171', 'test@example.com', '$2b$10$rdw4T4uCI268fnG95KgTke807zGXZEY4QsjjBxPYT4tT7sO5UMrJi', 'employer', '2026-03-02 22:49:52', '2026-03-02 22:49:52', 1, NULL, NULL),
('c5a05747-84f1-43bf-b8eb-0c42ccfdc8f0', 'Mahmoud@example.com', '$2b$10$SAt6CiGH7SSqRbbxgdzp5.Lw1m.YOiFj5X0NMB6Kk4wr9jdGQiciG', 'job_seeker', '2026-02-26 20:45:12', '2026-02-26 21:16:49', 1, NULL, NULL),
('f4f53234-a98b-4d7e-a163-1de44881c4eb', 'employer@gmail.com', '$2b$10$ExMB2OJqS0t1jluCIWnmEe1kvOWTywjT7cNH9wF0kydD0Tm0s3C.6', 'employer', '2026-02-26 21:40:47', '2026-02-26 21:40:47', 1, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_seeker_id` (`job_seeker_id`,`job_id`),
  ADD KEY `job_id` (`job_id`);

--
-- Indexes for table `employer_profiles`
--
ALTER TABLE `employer_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_seeker_profile_id` (`job_seeker_profile_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employer_id` (`employer_id`);

--
-- Indexes for table `job_seekers_profiles`
--
ALTER TABLE `job_seekers_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `pending_applications`
--
ALTER TABLE `pending_applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `reviewed_by` (`reviewed_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_seeker_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employer_profiles`
--
ALTER TABLE `employer_profiles`
  ADD CONSTRAINT `employer_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `experiences`
--
ALTER TABLE `experiences`
  ADD CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`job_seeker_profile_id`) REFERENCES `job_seekers_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_seekers_profiles`
--
ALTER TABLE `job_seekers_profiles`
  ADD CONSTRAINT `job_seekers_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pending_applications`
--
ALTER TABLE `pending_applications`
  ADD CONSTRAINT `pending_applications_ibfk_1` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
