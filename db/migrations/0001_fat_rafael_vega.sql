DROP TABLE `campaign_achievements`;
--> statement-breakpoint
CREATE TABLE `achievements` (
	`id` text NOT NULL,
	`campaign_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session_tiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`point` integer NOT NULL,
	`state` integer DEFAULT 0 NOT NULL,
	`session_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`session_id`) REFERENCES `play_sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP TABLE `task_tiles`;
--> statement-breakpoint
DROP TABLE `tile_pools`;
--> statement-breakpoint
PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE `__new_achievements` (
	`id` text NOT NULL,
	`campaign_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_achievements`("id", "campaign_id", "created_at") SELECT "id", "campaign_id", "created_at" FROM `achievements`;
--> statement-breakpoint
DROP TABLE `achievements`;
--> statement-breakpoint
ALTER TABLE `__new_achievements` RENAME TO `achievements`;
--> statement-breakpoint
PRAGMA foreign_keys=ON;