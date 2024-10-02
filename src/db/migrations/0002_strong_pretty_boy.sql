CREATE TABLE `requests` (
	`id` integer PRIMARY KEY NOT NULL,
	`month` text,
	`request` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
