<script>
  import {createEventDispatcher} from 'svelte';
  import {fade} from 'svelte/transition'

  export let task = {};

  const dispatch = createEventDispatcher();

  const onCheck = () => {
    dispatch('update', {completed: !task.completed});
  };

  const onInput = (e) => {
    dispatch('update', {name: e.target.value});
  };

  const onDelete = () => {
    dispatch('delete');
  };
</script>

<li transition:fade>
  <input type="checkbox" checked={task.completed} on:change={onCheck}>
  <input type="text" value={task.name} on:input={onInput}>
  <button on:click|preventDefault={onDelete}>x</button>
</li>