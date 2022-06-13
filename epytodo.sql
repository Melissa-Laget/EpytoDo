CREATE DATABASE `epytodo`;

USE `epytodo`;

CREATE TABLE `user` (
  `id` int unsigned NOT NULL,
  `email` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `due_time` datetime NOT NULL,
  `status` enum('not started','todo','in progress','done') DEFAULT 'not started',
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`user_id`),
  CONSTRAINT `id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

FLUSH PRIVILEGES;