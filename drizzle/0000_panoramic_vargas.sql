CREATE TABLE `reservations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`guests` integer NOT NULL,
	`seating` text NOT NULL,
	`notes` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`created_at` text NOT NULL
);
