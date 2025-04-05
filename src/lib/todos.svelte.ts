import type { AppType } from '../server';
import { hc, type InferResponseType } from 'hono/client';

class Todos {
	client = hc<AppType>('/');
	todos = $state<InferResponseType<typeof this.client.api.todos.$get>>([]);

	constructor() {
		this.getTodos().then((todos) => (this.todos = todos));
	}

	async getTodos() {
		const res = await this.client.api.todos.$get();
		return await res.json();
	}

	async add(title: string, description: string) {
		await this.client.api.todos.$post({ json: { title, description } });
		this.todos = await this.getTodos();
	}

	async delete(id: string) {
		await this.client.api.todos[':id'].$delete({ param: { id } });
		this.todos = await this.getTodos();
	}

	async toggle(id: string) {
		const todoItem = this.todos.find((t) => t.id === id);
		if (!todoItem) return;

		await this.client.api.todos[':id'].toggle.$post({
			param: { id },
			json: { completed: !todoItem.done }
		});

		this.todos = await this.getTodos();
	}

	async update(id: string, title: string, description: string | null) {
		await this.client.api.todos[':id'].$patch({
			param: { id },
			json: { title, description }
		});
		this.todos = await this.getTodos();
	}
}

export const todos = new Todos();
