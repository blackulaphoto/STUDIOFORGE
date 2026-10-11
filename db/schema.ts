import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const workspaces = sqliteTable('workspaces', {
 owner: text('owner').primaryKey(), document: text('document').notNull(),
 revision: integer('revision').notNull(), updatedAt: text('updated_at').notNull(),
});
export const aiRequests = sqliteTable('ai_requests', {
 id:text('id').primaryKey(), owner:text('owner').notNull(), projectId:text('project_id').notNull(),
 model:text('model').notNull(), status:text('status').notNull(), createdAt:text('created_at').notNull(),
 expiresAt:text('expires_at').notNull(), day:text('day').notNull(), requestJson:text('request_json').notNull(),
 projectHash:text('project_hash').notNull(), reservedMicros:integer('reserved_micros').notNull(),
 costMicros:integer('cost_micros'), inputTokens:integer('input_tokens'), outputTokens:integer('output_tokens'),
 responseJson:text('response_json'), error:text('error'),
});
