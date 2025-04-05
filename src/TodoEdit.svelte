<script lang="ts">
	import { navigate, route } from './router';
	import {todos} from './lib/todos.svelte';


	let input = $state({ title: '', description: '' });
	const todo = $derived(todos.todos.find((t) => t.id === route.params.id!));

	$effect(() => {
		if (!todo) return;
		input.title = todo.title;
		input.description = todo.description ?? "";
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!todo) return;
		todos.update(todo.id, input.title, input.description);
		navigate(`/todo/:id`, { params: { id: todo.id } });
	}

	async function handleCancel() {
		if (!todo) return;
		navigate(`/todo/:id`, { params: { id: todo.id } });
	}
</script>

{#if todo}
	<div class="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-10">
		<div class="mx-auto w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
			<div class="mb-6 flex items-center gap-3 border-b border-indigo-100 pb-3">
                <a
                    href={`/todo/${todo.id}`}
                    class="text-indigo-600 hover:text-indigo-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </a>
				<h1 class="text-2xl font-bold text-indigo-800">Edit Task</h1>
			</div>

			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="title" class="mb-1 block text-sm font-medium text-gray-700">
						Title <span class="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="title"
						bind:value={input.title}
						required
						class="w-full rounded-lg border border-indigo-200 bg-indigo-50 p-3 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-300"
						placeholder="Enter task title"
					/>
				</div>

				<div>
					<label for="description" class="mb-1 block text-sm font-medium text-gray-700">
						Description <span class="text-xs text-gray-500">(Optional)</span>
					</label>
					<textarea
						id="description"
						bind:value={input.description}
						rows="5"
						class="w-full resize-y rounded-lg border border-indigo-200 bg-indigo-50 p-3 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-300"
						placeholder="Enter task description..."
					></textarea>
				</div>

				<div class="flex flex-col gap-3 pt-4 sm:flex-row">
					<button
						type="submit"
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						Save Changes
					</button>

					<button
						type="button"
						onclick={handleCancel}
						class="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:opacity-50"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"

						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
