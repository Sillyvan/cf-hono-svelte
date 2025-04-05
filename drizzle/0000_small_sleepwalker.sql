CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`done` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text
);
