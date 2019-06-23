<script>
	import Task from './Task.svelte';
	import {tasks} from './store.js';

	let newTask = '';
	let showCompleted = true;

	$: filterTasks = $tasks.filter(t => showCompleted === true ? true : t.completed === false);

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
</script>

<h1>To-do</h1>

<label><input type="checkbox" bind:checked={showCompleted}> Show completed</label>

<ul>
	{#each filterTasks as task (task.id)}
		<Task task={task} on:update={(e) => updateTask(task, e.detail)} on:delete={() => deleteTask(task)} />
	{/each}
</ul>

<input type="text" bind:value="{newTask}">
<button on:click|preventDefault={addTask}>Add</button>

<p>{JSON.stringify($tasks)}</p>
<p>{JSON.stringify(newTask)}</p>