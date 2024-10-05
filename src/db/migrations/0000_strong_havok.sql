CREATE TABLE `games` (
	`id` integer PRIMARY KEY NOT NULL,
	`game_url` text NOT NULL,
	`game_image` text NOT NULL,
	`game_name` text NOT NULL,
	`coins` integer DEFAULT 0 NOT NULL,
	`code` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `history` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`coin` integer,
	`status` integer,
	`chat_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` integer PRIMARY KEY NOT NULL,
	`requests` integer DEFAULT 0,
	`price` integer DEFAULT 0,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `requests` (
	`id` integer PRIMARY KEY NOT NULL,
	`month` text,
	`request` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `setting` (
	`id` integer PRIMARY KEY NOT NULL,
	`refer1` integer DEFAULT 0,
	`refer2` integer DEFAULT 0,
	`refer3` integer DEFAULT 0,
	`plan_id` integer DEFAULT 0,
	`admin` text DEFAULT 'admin',
	`password` text DEFAULT 'password',
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `taskDone` (
	`id` integer PRIMARY KEY NOT NULL,
	`task_id` integer NOT NULL,
	`chat_id` integer NOT NULL,
	`completed_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`platform` text NOT NULL,
	`name` text NOT NULL,
	`coins` integer DEFAULT 0 NOT NULL,
	`link` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`username` text,
	`chat_id` integer NOT NULL,
	`coins` integer DEFAULT 0 NOT NULL,
	`refer_id` integer NOT NULL,
	`level_1` integer DEFAULT 0 NOT NULL,
	`level_2` integer DEFAULT 0 NOT NULL,
	`level_3` integer DEFAULT 0 NOT NULL,
	`withdraw` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `videoDone` (
	`id` integer PRIMARY KEY NOT NULL,
	`video_id` integer NOT NULL,
	`chat_id` integer NOT NULL,
	`completed_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` integer PRIMARY KEY NOT NULL,
	`video_id` text NOT NULL,
	`coins` integer DEFAULT 0 NOT NULL,
	`code` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `withdwaral` (
	`id` integer PRIMARY KEY NOT NULL,
	`coins` integer,
	`method` text,
	`address` text,
	`chat_id` integer,
	`status` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_chat_id_unique` ON `users` (`chat_id`);