<script lang="ts">
	import { todos } from './lib/todos.svelte';

	let input = $state({ title: '', description: '' });

	async function addTodo(e: Event) {
		e.preventDefault();
		todos.add(input.title, input.description);
		input = { title: '', description: '' };
	}

</script>

<div class="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-10">
	<div class="mx-auto w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
		<h1 class="mb-6 text-center text-2xl font-bold text-indigo-800">My Tasks</h1>

		<form class="mb-6 flex flex-col gap-4" onsubmit={addTodo}>
			<div class="flex flex-col gap-1">
				<label for="title" class="text-sm font-medium text-gray-700">Title</label>
				<input
					id="title"
					class="rounded-lg border border-indigo-200 bg-indigo-50 p-3 transition outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-300"
					type="text"
					placeholder="What needs to be done?"
					bind:value={input.title}
					required
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label for="description" class="text-sm font-medium text-gray-700">Description</label>
				<textarea
					id="description"
					class="h-20 rounded-lg border border-indigo-200 bg-indigo-50 p-3 transition outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-300"
					placeholder="Add details about your task..."
					bind:value={input.description}
				></textarea>
			</div>

			<button
				class="mt-2 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
				type="submit"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
						clip-rule="evenodd"
					/>
				</svg>
				Add Task
			</button>
		</form>

			<div class="border-t border-indigo-100 pt-4">
				<h2 class="mb-3 flex items-center gap-2 text-lg font-medium text-indigo-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                    </svg>
                    My Tasks
                    <span class="ml-1 rounded-full bg-indigo-100 px-2 py-0.5 text-sm text-indigo-800">{todos.todos.length}</span>
                </h2>

				{#if todos.todos.length === 0}
					<div class="rounded-lg bg-indigo-50 py-8 text-center text-gray-500">
						<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-2 h-10 w-10 text-indigo-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd" />
                        </svg>
						<p>No tasks yet. Add your first task above!</p>
					</div>
				{/if}

				<ul class="mt-4 flex flex-col gap-3">
					{#each todos.todos as todo (todo.id)}
						<li
							class="group flex items-start justify-between rounded-lg border border-indigo-100 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md"
						>
							<div class="flex flex-1 items-start gap-3">
								<div class="pt-1">
									<input
										type="checkbox"
										checked={todo.done}
										class="h-5 w-5 cursor-pointer rounded-full border-indigo-300 text-indigo-600 focus:ring-indigo-500"
										onchange={async () => await todos.toggle(todo.id)}
									/>
								</div>

								<div class="flex-1">
									<a href={`todo/${todo.id}`} class="group block">
										<h3
											class={`font-medium text-gray-900 transition group-hover:text-indigo-600 ${todo.done ? 'text-gray-500 line-through' : ''}`}
										>
											{todo.title}
										</h3>

										{#if todo.description}
											<p
												class={`mt-1 text-sm text-gray-600 ${todo.done ? 'text-gray-400 line-through' : ''}`}
											>
												{todo.description}
											</p>
										{/if}

										<p class="mt-2 text-xs text-gray-500">
											Created: {new Date(todo.createdAt).toLocaleString()}
										</p>
									</a>
								</div>
							</div>

							<button
								class="mt-1 ml-2 text-gray-400 opacity-0 transition hover:text-red-500 group-hover:opacity-100"
								type="button"
								onclick={async () => await todos.delete(todo.id)}
								aria-label="Delete task"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</li>
					{/each}
				</ul>
			</div>
	</div>
</div>
