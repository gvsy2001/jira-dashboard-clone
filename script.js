let draggedItem = null;

// Allow dragging an item
function drag(ev) {
  draggedItem = ev.target;
  ev.dataTransfer.setData("text", ev.target.id);
  ev.target.classList.add('dragging');
}

// Allow dropping an item
function allowDrop(ev) {
  ev.preventDefault();
  ev.target.classList.add('dragover');
}

// Handling the drop action
function drop(ev) {
  ev.preventDefault();
  ev.target.classList.remove('dragover');
  
  const column = ev.target;
  if (column.classList.contains("column")) {
    const previousColumnId = draggedItem.closest('.column').id;
    
    column.appendChild(draggedItem);
    draggedItem.classList.remove('dragging');
    updateTaskState(draggedItem);

    // Update counters after the task move
    updateCounter(previousColumnId, -1); // Decrement from previous column
    updateCounter(column.id, 1); // Increment to the new column
  }
}

// Update the task state with colour changing 
function updateTaskState(task) {
  const columnId = task.closest('.column').id;

  task.classList.remove('completed', 'in-progress', 'to-do', 'failed');
  
  if (columnId === 'todo') {
    task.classList.add('to-do');
  } else if (columnId === 'inProgress') {
    task.classList.add('in-progress');
  } else if (columnId === 'done') {
    task.classList.add('completed');
  } else if (columnId === 'failed') {
    task.classList.add('failed');
  }
}

// Update the counter for tasks in each column
function updateCounter(columnId, change) {
  const countElement = document.getElementById(`${columnId}Count`);
  let currentCount = parseInt(countElement.textContent);
  
  // Update count based on the change (+1 or -1)
  currentCount += change;
  currentCount = Math.max(0, currentCount); 
  
  countElement.textContent = currentCount;
}
// Handling the drop action
function drop(ev) {
  ev.preventDefault();
  ev.target.classList.remove('dragover');
  
  const column = ev.target;
  if (column.classList.contains("column")) {
    const previousColumnId = draggedItem.closest('.column').id;
    
    column.appendChild(draggedItem);
    draggedItem.classList.remove('dragging');
    updateTaskState(draggedItem);

    // Update counters after the task move
    updateCounter(previousColumnId, -1); // Decrement from previous column
    updateCounter(column.id, 1); // Increment to the new column
  }
}

// Update the task state with colour changing 
function updateTaskState(task) {
  const columnId = task.closest('.column').id;
  const prioritySpan = task.querySelector('.priority');

  task.classList.remove('completed', 'in-progress', 'to-do', 'failed');
  
  if (columnId === 'todo') {
    task.classList.add('to-do');
  } else if (columnId === 'inProgress') {
    task.classList.add('in-progress');
  } else if (columnId === 'done') {
    task.classList.add('completed');
  } else if (columnId === 'failed') {
    task.classList.add('failed');
  }

  // Add dynamic priority flag styling based on task class
  if (prioritySpan) {
    if (prioritySpan.classList.contains('high')) {
      task.classList.add('high-priority');
    } else if (prioritySpan.classList.contains('mid')) {
      task.classList.add('mid-priority');
    } else if (prioritySpan.classList.contains('low')) {
      task.classList.add('low-priority');
    }
  }
}

