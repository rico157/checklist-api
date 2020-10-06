const table = document.querySelector('.table');
const tableRow = document.getElementsByClassName('table-row');
const input = document.querySelector('.input');
const date = document.querySelector('.input-date');
const add = document.querySelector('.add');

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
    }
    row.appendChild(check);
    row.appendChild(newTask);
    row.appendChild(duedate);
    row.appendChild(id);
    row.addEventListener('click', addCheck(row));

    if (taskDate < today) {
      duedate.style.color = 'red';
    }

    table.appendChild(row);
  });
}

add.onclick = () => {
  if (date.value === '') {
    date.value = '2020-01-01';
  }
  const taskDate = Date.parse(date.value);
  const today = new Date().setHours(0, 0, 0, 0);

  const row = document.createElement('tr');
  const check = document.createElement('td');
  const task = document.createElement('td');
  const duedate = document.createElement('td');
  if (input.value === '') {
    task.innerText = 'My new task!';
  } else {
    task.innerText = input.value;
  }

  task.className = 'task';

  duedate.className = 'date';
  duedate.innerText = date.value;

  check.innerText = '';

  row.className = 'table-row';
  row.appendChild(check);
  row.appendChild(task);
  row.appendChild(duedate);
  row.addEventListener('click', addCheck(row));

  if (taskDate < today) {
    duedate.style.color = 'red';
  }

  table.appendChild(row);
};

// [...tableRow].forEach((row) => {
//   row.addEventListener('click', addCheck(row));

//   const taskDate = Date.parse([...row.children][2].innerText);
//   const today = new Date().setHours(0, 0, 0, 0);
//   if (taskDate < today) {
//     [...row.children][2].style.color = 'red';
//   }
// });

function addCheck(newRow) {
  const id = newRow.childNodes[3].innerText;
  const task_id = parseInt(id);
  return () => {
    if (newRow.className === 'table-row') {
      newRow.className = 'table-row-checked';
      patchTask(task_id, 'true');
      [...newRow.children][0].innerText = '✓';
    } else {
      newRow.className = 'table-row';
      [...newRow.children][0].innerText = '';
      patchTask(task_id, 'false');
    }
  };
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
