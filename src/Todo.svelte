<script lang="ts">
	import { navigate, route } from './router';
	import {todos} from './lib/todos.svelte';


	const todo = $derived(todos.todos.find((t) => t.id === route.params.id!));


	async function deleteTodo() {
		await todos.delete(route.params.id!);
		navigate('/');
	}

</script>

{#if todo}
	<div class="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-10">
		<div class="mx-auto w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
			<div class="mb-4 flex items-center justify-between">
				<a
					href="/"
					class="flex items-center gap-1 font-medium text-indigo-600 transition hover:text-indigo-800"
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
					Back to tasks
				</a>

				<div class="flex items-center gap-2">
					<span class="text-sm text-gray-500">Mark as done</span>
					<input
						type="checkbox"
						checked={todo.done}
						class="h-5 w-5 cursor-pointer rounded-full border-indigo-300 text-indigo-600 focus:ring-indigo-500"
						onchange={async () => await todos.toggle(todo.id)}
					/>
				</div>
			</div>

			<div class="mb-4 border-b border-indigo-100 pb-4">
				<h1 class={`mb-2 text-2xl font-bold ${todo.done ? 'text-gray-500 line-through' : 'text-indigo-800'}`}>{todo.title}</h1>
				<div class="flex items-center gap-2 text-sm text-gray-500">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
				</div>

				{#if todo.updatedAt && todo.updatedAt !== todo.createdAt}
					<div class="mt-1 flex items-center gap-2 text-sm text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						<span>Updated: {new Date(todo.updatedAt).toLocaleString()}</span>
					</div>
				{/if}
			</div>

			<div class="mb-6">
				<h2 class="mb-2 flex items-center gap-2 text-lg font-medium text-indigo-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>
                    Description
                </h2>
				{#if todo.description}
					<div class="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
						<p class={`whitespace-pre-wrap ${todo.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{todo.description}</p>
					</div>
				{:else}
					<div class="rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-gray-500 italic">
						<p>No description provided</p>
					</div>
				{/if}
			</div>

			<div class="flex gap-3">
				<a
					href="/todo/edit/{todo.id}"
					class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
						/>
					</svg>
					Edit
				</a>

				<button
					class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
					type="button"
					onclick={deleteTodo}
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
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}
