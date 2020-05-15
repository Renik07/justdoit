const form = document.querySelector('#newTaskForm');
const input = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#list-group');


form.addEventListener('submit', function(event){
  event.preventDefault();

  // берем текст введенный пользователем в поле ввода
  const taskText = input.value.trim();
  
  // формируем разметку для новой задачи
  const taskHTML = `<li class="list-group-item d-flex justify-content-between"><span contenteditable="true" class="task-title">${taskText}</span>
  <div>
  <button type="button" data-action="ready" class="btn btn-light align-self-end">Готово</button>
  <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
  </div>
  </li>`;

  // добавляем новую задачу на страницу
  tasksList.insertAdjacentHTML('afterbegin', taskHTML);

  // очищаем поле добавления новой задачи
  input.value = '';
  // возвращаем фокус на поле ввода после добавления новой задачи
  input.focus();

  // скрываем или показываем что список дел пуст
  toggleEmptyListItem();

  // показать нотификацию
  showNotification('new');
})

// прослушиваем клик внутри списка с задачами
tasksList.addEventListener('click', function(event) {

  // проверяем что клик произошел по кнопке "Удалить"
  if (event.target.getAttribute('data-action') == 'delete-task') {
    // Находим родительский тег и удаляем его
    event.target.closest('.list-group-item').remove();

    // скрываем или показываем что список дел пуст
    toggleEmptyListItem();

    // показать нотификацию
  showNotification('delete');
  } else if (event.target.getAttribute('data-action') == 'ready') {
    // находим родительский тег li
    const parentElement = event.target.closest('.list-group-item');
    // добавляем к тегу span дополнительный класс
    parentElement.querySelector('.task-title').classList.add('task-title--done');
    // убираем у тега span атрибут contenteditable
    parentElement.querySelector('.task-title').setAttribute('contenteditable', 'false');
    // перемещаем запись в конец списка
    tasksList.insertAdjacentElement('beforeend', parentElement);
    // удаляем кнопку Готово
    event.target.remove();
    // нотификация задача готова
    showNotification('ready');
  }

});

function toggleEmptyListItem () {
  if (tasksList.children.length > 1) {
    document.querySelector('#empty-list-item').style.display = 'none';
  } else {
    document.querySelector('#empty-list-item').style.display = 'block';
  }
}

function showNotification(type) {
  let newElement = document.createElement('div');

  switch(type) {
    case 'new':
      newElement.classList = 'alert alert-warning';
      newElement.textContent = 'Задача добавлена!';
      break;
    case 'delete':
      newElement.classList = 'alert alert-danger';
      newElement.textContent = 'Задача удалена!';
      break;
    case 'ready':
      newElement.classList = 'alert alert-primary';
      newElement.textContent = 'Вы сделали это!';
      break;  
  }

  document.querySelector('#notifyHolder').insertAdjacentElement('afterbegin', newElement);

  setTimeout(function(){
    newElement.style.opacity = '1';
  }, 0);

  setTimeout(function(){
    newElement.style.opacity = '0';
  }, 2500);

  setTimeout(function(){
    newElement.remove();
  }, 3000);
}

