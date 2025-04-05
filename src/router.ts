import { createRouter } from 'sv-router';
import Home from './Home.svelte';
import Layout from './Layout.svelte';
import Todo from './Todo.svelte';
import TodoEdit from './TodoEdit.svelte';

export const { p, navigate, isActive, route } = createRouter({
	'/todo/edit/:id': { '/': TodoEdit, layout: Layout },
	'/todo/:id': { '/': Todo, layout: Layout },
	'/': { '/': Home, layout: Layout },
	'*': Home
});
