import {writable} from 'svelte/store';

export const tasks = writable([{
  id: 0,
  name: 'Test task',
  completed: false
},
{
  id: 1,
  name: 'Test task 2',
  completed: true
}]);