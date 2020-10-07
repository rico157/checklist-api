const table = document.querySelector('.table');
const tableRow = document.getElementsByClassName('table-row');
const tableRowChecked = document.getElementsByClassName('table-row-checked');
const input = document.querySelector('.input');
const date = document.querySelector('.input-date');
const add = document.querySelector('.add');
const remove = document.querySelector('.delete-button');

fetch('/api/tasks')
  .then((response) => response.json())
  .then(({ tasks }) => loadPage(tasks));

function loadPage(tasks) {
  tasks.forEach(({ task, completed, dueBy, task_id }) => {
    const row = document.createElement('tr');
    const check = document.createElement('td');
    const newTask = document.createElement('td');
    const duedate = document.createElement('td');
    const id = document.createElement('td');

    const taskDate = Date.parse(dueBy);
    const today = new Date().setHours(0, 0, 0, 0);

    newTask.className = 'task';
    newTask.innerText = task;

    id.innerText = task_id;
    id.style.display = 'none';
    id.className = 'id';

    duedate.className = 'date';
    duedate.innerText = dueBy;
    if (completed === 'false') {
      row.className = 'table-row';
      check.innerText = '';
    } else {
      row.className = 'table-row-checked';
      check.innerText = '✓';
      check.className = 'check';
    }

    const deleteButton = document.createElement('td');
    deleteButton.innerText = 'DELETE';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
      row.classList.add('deleting');
    });

    row.appendChild(check);
    row.appendChild(newTask);
    row.appendChild(duedate);
    row.appendChild(id);
    row.appendChild(deleteButton);

    row.addEventListener('click', addCheck(row));

    if (taskDate < today) {
      duedate.style.color = 'red';
    }

    table.appendChild(row);
    sortTable(2);
  });
}

add.onclick = () => {
  const taskText = input.value || 'My new task!';
  const dateValue =
    date.value ||
    `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
  console.log(dateValue);
  const taskDate = Date.parse(dateValue);
  const today = new Date().setHours(0, 0, 0, 0);

  const row = document.createElement('tr');
  const check = document.createElement('td');
  const task = document.createElement('td');
  const duedate = document.createElement('td');

  const deleteButton = document.createElement('td');
  deleteButton.innerText = 'DELETE';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', () => {
    row.classList.add('deleting');
  });

  task.className = 'task';
  task.innerText = taskText;
  duedate.className = 'date';
  duedate.innerText = dateValue;
  check.innerText = '';
  check.className = 'check';
  row.className = 'table-row';
  row.appendChild(check);
  row.appendChild(task);
  row.appendChild(duedate);
  row.appendChild(deleteButton);
  row.addEventListener('click', addCheck(row, 0));

  if (taskDate < today) {
    duedate.style.color = 'red';
  }
  console.log(row);
  table.appendChild(row);
  const body = {
    task: taskText,
    dueBy: dateValue,
    completed: 'false'
  };
  addTask(body);
};

// Event Handler

function addCheck(newRow, fake_id) {
  const id = newRow.childNodes[3] ? newRow.childNodes[3].innerText : fake_id;
  const task_id = parseInt(id);
  return () => {
    if (newRow.classList.contains('deleting')) {
      removeTask(id);
      newRow.classList.add('deleted');
      [...newRow.children][1].innerText = 'DELETED';
    } else if (newRow.classList.contains('table-row')) {
      newRow.classList.add('table-row-checked');
      newRow.classList.remove('table-row');
      [...newRow.children][0].innerText = '✓';
      patchTask(task_id, 'true');
    } else if (newRow.classList.contains('table-row-checked')) {
      newRow.classList.add('table-row');
      newRow.classList.remove('table-row-checked');
      [...newRow.children][0].innerText = '';
      patchTask(task_id, 'false');
    }
  };
}

// HTTP REQUESTS

function removeTask(task_id) {
  fetch(`/api/tasks/${task_id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(() => window.location.reload());
}
function addTask(body) {
  fetch('/api/tasks/', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
}

function patchTask(task_id, completed) {
  fetch(`/api/tasks/${task_id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
}

// SORT BY

function sortTable(n) {
  let rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    switchcount = 0;
  switching = true;
  // Set the sorting direction to ascending:
  let dir = 'asc';

  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */

      if (n === 1) {
        if (dir == 'asc') {
          if (x.innerText.toLowerCase() > y.innerText.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == 'desc') {
          if (x.innerText.toLowerCase() < y.innerText.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      } else if (n === 2) {
        if (dir == 'asc') {
          if (Number(new Date(x.innerText)) > Number(new Date(y.innerText))) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == 'desc') {
          if (Number(new Date(x.innerText)) < Number(new Date(y.innerText))) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
  if (n === 2) {
    table.rows[0].children[2].innerText =
      dir === 'asc' ? 'Oldest first' : 'Due first';
  } else if (n === 1) {
    table.rows[0].children[2].innerText = 'Date';
    table.rows[0].children[1].innerText = `Alphabetic ${dir}ending order`;
  }
}

// [...tableRow].forEach((row) => {
//   const deleteButton = document.createElement('td');
//   deleteButton.innerText = 'DELETE';
//   deleteButton.className = 'delete-button';
//   row.appendChild(deleteButton);
// });
//.then(() => window.location.reload());
// [...tableRow].forEach((row) => {
//   row.addEventListener('click', addCheck(row));

//   const taskDate = Date.parse([...row.children][2].innerText);
//   const today = new Date().setHours(0, 0, 0, 0);
//   if (taskDate < today) {
//     [...row.children][2].style.color = 'red';
//   }
// });
// remove.onclick = (data) => {
//   [...tableRow].forEach((row) => {
//     console.log(row);
//     if (row.classList.contains('deleting')) {
//       row.classList.remove('deleting');
//     }
//     row.classList.add('deleting');
//   });
//   [...tableRowChecked].forEach((row) => {
//     console.log(row);
//     if (row.classList.contains('deleting')) {
//       row.classList.remove('deleting');
//     }
//     row.classList.add('deleting');
//   });
// };
