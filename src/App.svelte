<script>
	import Task from './Task.svelte';
	import {tasks} from './store.js';

	tasks.useLocalStorage();

	let newTask = '';
	let showCompleted = true;

	$: filterTasks = $tasks.filter(t => showCompleted === true ? true : t.completed === false);
	$: incompleteCount = $tasks.filter(t => t.completed === false).length;

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

<label><input type="checkbox" bind:checked={showCompleted}> Show completed</label>

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

<p>{JSON.stringify($tasks)}</p>
<p>{JSON.stringify(newTask)}</p>