CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text(100),
	`completed` integer DEFAULT false,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
