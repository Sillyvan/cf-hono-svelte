import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { csrf } from 'hono/csrf';
import { todos } from './schema';
import { eq } from 'drizzle-orm';
import { vValidator } from '@hono/valibot-validator';
import * as v from 'valibot';

const ParamsSchema = v.object({
	id: v.pipe(v.string('Id required'), v.uuid('Not a valid UUID'))
});

const CreateTodoSchema = v.object({
	title: v.pipe(v.string(), v.nonEmpty('Title is required')),
	description: v.optional(v.nullish(v.string()))
});

const ToggleTodoSchema = v.object({
	completed: v.boolean()
});

const EditTodoSchema = v.object({
	title: v.optional(v.pipe(v.string(), v.nonEmpty('Title cannot be empty if provided'))),
	description: v.optional(v.nullish(v.string()))
});

const app = new Hono<{
	Bindings: Env;
}>()
	.use(csrf())

	.get('/api/todos', async (c) => {
		const allTodos = await drizzle(c.env.DB).select().from(todos).all();
		return c.json(allTodos);
	})

	.get('/api/todos/:id', vValidator('param', ParamsSchema), async (c) => {
		const { id } = c.req.valid('param');
		const [todo] = await drizzle(c.env.DB).select().from(todos).where(eq(todos.id, id));
		return c.json(todo);
	})

	.post('/api/todos', vValidator('json', CreateTodoSchema), async (c) => {
		const validatedTodoData = c.req.valid('json');
		await drizzle(c.env.DB).insert(todos).values({
			id: crypto.randomUUID(),
			title: validatedTodoData.title,
			description: validatedTodoData.description
		});
		return c.json({ success: 'todo added' });
	})

	.post(
		'/api/todos/:id/toggle',
		vValidator('param', ParamsSchema),
		vValidator('json', ToggleTodoSchema),
		async (c) => {
			const { id } = c.req.valid('param');
			const { completed } = c.req.valid('json');

			await drizzle(c.env.DB).update(todos).set({ done: completed }).where(eq(todos.id, id));

			return c.json({ success: 'todo updated' });
		}
	)
	.patch(
		'/api/todos/:id',
		vValidator('param', ParamsSchema),
		vValidator('json', EditTodoSchema),
		async (c) => {
			const { id } = c.req.valid('param');
			const validatedEditData = c.req.valid('json');

			const updateData: { title?: string; description?: string | null } = {};

			if (validatedEditData.title !== undefined) {
				updateData.title = validatedEditData.title;
			}
			if (validatedEditData.description !== undefined) {
				updateData.description = validatedEditData.description;
			}

			if (Object.keys(updateData).length === 0) {
				return c.json({ message: 'No fields provided for update' }, 400);
			}

			await drizzle(c.env.DB)
				.update(todos)
				.set(updateData)
				.where(eq(todos.id, id))
				.returning({ updatedId: todos.id });

			return c.json({ success: 'todo updated' });
		}
	)
	.delete('/api/todos/:id', vValidator('param', ParamsSchema), async (c) => {
		const { id } = c.req.valid('param');
		await drizzle(c.env.DB).delete(todos).where(eq(todos.id, id));
		return c.json({ success: 'todo deleted' });
	})

	.get('/*', (c) => {
		return c.env.ASSETS.fetch(c.req.raw);
	});

export type AppType = typeof app;

export default app;
