CREATE TABLE `ai_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`project_id` text NOT NULL,
	`model` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`day` text NOT NULL,
	`request_json` text NOT NULL,
	`project_hash` text NOT NULL,
	`reserved_micros` integer NOT NULL,
	`cost_micros` integer,
	`input_tokens` integer,
	`output_tokens` integer,
	`response_json` text,
	`error` text
);
