import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	done: integer('done', { mode: 'boolean' }).notNull().default(false),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	updatedAt: text('updated_at')
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
