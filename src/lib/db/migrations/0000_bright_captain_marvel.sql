CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`customer` text NOT NULL,
	`phone_number` text NOT NULL,
	`address` text,
	`tax_code` text,
	`car_model` text,
	`car_registration_number` text,
	`car_vin` text,
	`car_odometer` integer,
	`date` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quote_id` text NOT NULL,
	`name` text NOT NULL,
	`unit_price` integer NOT NULL,
	`quantity` real NOT NULL,
	`vat` integer DEFAULT 8 NOT NULL,
	`type` text DEFAULT '1' NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text NOT NULL
);
