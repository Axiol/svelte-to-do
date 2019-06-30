<script>
	import Task from './Task.svelte';
	import {tasks} from './store.js';

	tasks.useLocalStorage();

	let newTask = '';
	let showCompleted = 'all';

	$: filterTasks = $tasks.filter(t => showCompleted === 'all' ? t : t.completed === !showCompleted);
	$: incompleteCount = $tasks.filter(t => t.completed === false).length;

	const setFilter = (filter) => {
		showCompleted = filter;
	};

	const addTask = () => {
		$tasks = [...$tasks, {
			id: Date.now(),
			name: newTask,
			completed: false
		}];
		newTask = '';
	};

	const updateTask = (updatedTask, detail) => {
		$tasks = $tasks.map(t => {
			if(t === updatedTask) {
				return {...updatedTask, ...detail};
			} else {
				return t;
			}
		});
	};

	const deleteTask = (task) => {
		$tasks = $tasks.filter(t => t !== task);
	};

	const deleteCompleted = () => {
		$tasks = $tasks.filter(t => {
			if(t.completed === false) {
				return t;
			}
		});
	};

	const completeEverything = () => {
		$tasks = $tasks.map(t => {
			return {...t, ...{completed: true}};
		});
	};
</script>

<h1>To-do ({incompleteCount} left)</h1>

<p><button on:click|preventDefault={() => {setFilter('all')}}>All</button><button on:click|preventDefault={() => {setFilter(true)}}>Completed</button><button on:click|preventDefault={() => {setFilter(false)}}>Incompleted</button></p>

<ul>
	{#each filterTasks as task (task.id)}
		<Task task={task} on:update={(e) => updateTask(task, e.detail)} on:delete={() => deleteTask(task)} />
	{/each}
</ul>

<div>
	<input type="text" bind:value="{newTask}">
	<button on:click|preventDefault={addTask}>Add</button>
</div>

<div>
	<button on:click|preventDefault={() => {completeEverything()}}>Mark all as completed</button>
</div>

<div>
	<button on:click|preventDefault={() => {deleteCompleted()}}>Delete completed</button>
</div>