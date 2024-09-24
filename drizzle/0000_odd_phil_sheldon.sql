CREATE TABLE `contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`subject` text NOT NULL,
	`fullName` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL
);
