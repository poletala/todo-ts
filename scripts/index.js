var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var getCurrentTimeDate = function () {
    var currentTimeDate = new Date();
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var hours = currentTimeDate.getHours();
    var minutes = currentTimeDate.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var currentTime = "".concat(hours, ":").concat(minutes);
    var currentDate = currentTimeDate.getDate();
    var currentMonth = month[currentTimeDate.getMonth()];
    var CurrentYear = currentTimeDate.getFullYear();
    var fullDate = "".concat(currentDate, " ").concat(currentMonth, ", ").concat(CurrentYear);
    var timeBlock = document.querySelector("time");
    var dateBlock = document.querySelectorAll("time")[1];
    if (!timeBlock || !dateBlock) {
        throw new Error('Time or Date Element is undefined.');
    }
    timeBlock.innerHTML = currentTime;
    dateBlock.innerHTML = fullDate;
    setTimeout(getCurrentTimeDate, 500);
};
getCurrentTimeDate();
var ul = document.querySelector('#todo-bar');
function listMain() {
    var todoListTask = JSON.parse(localStorage.getItem('todoList') || '""');
    if (todoListTask.length !== 0) {
        for (var i = 0; i < todoListTask.length; i++) {
            var liClassComplete = (todoListTask[i].complete) ? 'todo-list-done' : '';
            var liClassPriority = (todoListTask[i].priority === '3low') ? 'todo3-low' :
                (todoListTask[i].priority === '2medium') ? 'todo2-medium' :
                    (todoListTask[i].priority === '1high') ? 'todo1-high' : '';
            var liDeadline = (!todoListTask[i].deadline) ? 'has not been set' : todoListTask[i].deadline;
            var taskHTML = "<li class=\"todo-list ".concat(liClassComplete, " ").concat(liClassPriority, "\" id='").concat(todoListTask[i].id, "'>\n                    <div class=\"todo-title\">\n                        <span class=\"title-area-main\">").concat(todoListTask[i].title, "</span>\n                        <span class=\"detail-area-main\">").concat(todoListTask[i].detail, "</span>\n                        <span class='task-deadline'>deadline: ").concat(liDeadline, "</span>\n                    </div>\n                    <div class=\"todo-buttons\">\n                        <button class=\"todo-edit\" onclick=\"editTask(this)\" type=\"button\"></button>\n                        <button class=\"todo-delete\" onclick='deleteTask1(this)'></button>\n                        <button class = 'todo-done '  onclick='doneTaskStorage(this)'></button>\n                    </div>\n                    </li>");
            if (!ul) {
                throw new Error('Element UL is not found');
            }
            ul.insertAdjacentHTML('beforeend', taskHTML);
        }
    }
}
window.onload = listMain;
function editTask(elem) {
    var _a;
    if (!elem || !elem.closest('.todo-list')) {
        throw new Error('Element for edition is not found.');
    }
    var elemID = (_a = elem.closest('.todo-list')) === null || _a === void 0 ? void 0 : _a.id;
    localStorage.setItem('idEdit', JSON.stringify(elemID));
    location.replace("./pages/edit.html");
}
var isAllTasks = true;
var isUncompletedTasks = false;
var doneTasks = document.getElementsByClassName('todo-list-done');
function taskBTN() {
    var allButtonText = document.querySelector('.todo-all > p');
    if (!allButtonText) {
        throw new Error('All-button is not found.');
    }
    if (isAllTasks) {
        allButtonText.textContent = 'All';
        for (var i = 0; i < doneTasks.length; i++) {
            doneTasks[i].setAttribute("style", "display: none");
            // doneTasks[i].style.display = 'none' 
        }
        isAllTasks = false;
        isUncompletedTasks = true;
        return;
    }
    if (isUncompletedTasks) {
        allButtonText.textContent = 'Unfinished';
        for (var i = 0; i < doneTasks.length; i++) {
            doneTasks[i].setAttribute("style", "display: '' ");
            // doneTasks[i].style.display = '' 
        }
        isAllTasks = true;
        isUncompletedTasks = false;
        return;
    }
    return;
}
// кнопка удаления
var deleteButton = document.querySelector('.todo-delete');
//   ф-ция удаления элемента 
function deleteTask1(elem) {
    var itemToDelete = elem.closest('.todo-list');
    if (!elem || !itemToDelete) {
        throw new Error('Element to delete is not found.');
    }
    var storedData = JSON.parse(localStorage.getItem('todoList'));
    itemToDelete.remove();
    for (var i in storedData) {
        if (itemToDelete.id === storedData[i].id) {
            storedData.splice(i, 1);
            localStorage.setItem('todoList', JSON.stringify(storedData));
        }
    }
}
function sortTasks() {
    var selectedSortElement = document.getElementById('sort-select'); //
    var selectedValue = selectedSortElement.value; // the choosen option 
    var ulTodo = document.querySelector('#todo-bar'); //ul of tasks
    var todoListTask = document.querySelectorAll('.todo-list'); //li of tasks
    var arrTodoList = Array.from(todoListTask); //li as Array (for SORT Function)
    if (selectedValue === 'deadline') { //if 'deadline''s been choosen
        arrTodoList.sort(function (a, b) {
            if (!a.children[0].children[2].textContent || !b.children[0].children[2].textContent) {
                throw new Error('Deadline Elements for Sorting is not found.');
            } // we need to change the format of date in case to use the 'New Date' function
            var aDeadline = a.children[0].children[2].textContent.slice(10); //deadline (format as dd.mm.yyyy)
            var bDeadline = b.children[0].children[2].textContent.slice(10); //deadline (format as dd.mm.yyyy)
            var aDate = aDeadline.split(".")[2] + '-' + aDeadline.split(".")[1] + '-' + aDeadline.split(".")[0]; // deadline (format as yyyy-mm-dd)
            var bDate = bDeadline.split(".")[2] + '-' + bDeadline.split(".")[1] + '-' + bDeadline.split(".")[0]; //deadline (format as yyyy-mm-dd)
            return new Date(aDate).getTime() - new Date(bDate).getTime(); //sorting by deadline
        });
        arrTodoList.reverse(); //changing the order of just sorted tasks
        for (var i = 0; i < arrTodoList.length; i++) {
            if (!ulTodo) {
                throw new Error('ToDo List Elements is not found.');
            }
            ulTodo.insertBefore(arrTodoList[i], ulTodo.firstChild); //showing the new order not changing the data in local storage
        }
        return;
    }
    if (selectedValue = 'priority') { // if 'priority''s been choosen
        arrTodoList.sort(function (a, b) {
            var aPriority = a.classList[1]; //priority (format as todo1-high, todo2-medium or todo3-low)
            var bPriority = b.classList[1];
            return +aPriority[4] - +bPriority[4]; // sorting by priority (using the number in priority class)
        });
        arrTodoList.reverse(); //changing the order of just sorted tasks
        for (var i = 0; i < arrTodoList.length; i++) {
            if (!ulTodo) {
                throw new Error('ToDo List Elements is not found.');
            }
            ulTodo.insertBefore(arrTodoList[i], ulTodo.firstChild); //showing the new order not changing the data in local storage
        }
        return;
    }
}
var sortingTasks = document.querySelector('#sort-select');
if (!sortingTasks) {
    throw new Error('Selected Sorting Element is not found.');
}
//селект для списка дел
sortingTasks.addEventListener('change', function () {
    sortTasks();
});
var doneButton = document.getElementById('todo-done');
var titleOfDoneTask = document.querySelector('.title-area-main');
var detailOfDoneTask = document.querySelector('.detail-area-main');
var storedTasks = JSON.parse(localStorage.getItem('todoList'));
/* Ф-ция обработки выполненного задания через map c добавлением complete:true/false */
function doneTaskStorage(elem) {
    var itemToEdit = elem.closest('.todo-list');
    if (!itemToEdit) {
        throw new Error('Item to edit is not found.');
    }
    var doneTaskID = itemToEdit.id;
    var dataStored = JSON.parse(localStorage.getItem('todoList'));
    var newdataStored = dataStored.map(function (obj) {
        if (obj.id === doneTaskID && obj.complete === false) {
            return __assign(__assign({}, obj), { complete: true });
        }
        else if (obj.id === doneTaskID && obj.complete === true) {
            return __assign(__assign({}, obj), { complete: false });
        }
        return obj;
    });
    localStorage.setItem('todoList', JSON.stringify(newdataStored));
    changeStyleCheckedTask(elem); //ф-ция см ниже
}
// Ф-ция, которая исправляет стиль блока с заданием при условиях complete:true/false
function changeStyleCheckedTask(elem) {
    var itemChecked = elem.closest('.todo-list');
    var checkedIcon = elem.closest('.todo-done'); //иконка checked
    if (!itemChecked || !checkedIcon) {
        throw new Error('Item to edit is not found.');
    }
    var dataStored = JSON.parse(localStorage.getItem('todoList'));
    var doneTaskID = itemChecked.id;
    for (var i in dataStored) {
        if (doneTaskID === dataStored[i].id && dataStored[i].complete === true) { //если задание отмечено как выполненное
            itemChecked.classList.add('todo-list-done'); //добавление класса, ктр изменяет стиль фона блока
            checkedIcon.classList.add('todo-checked'); //  -//-ктр изменяет иконку checked
        }
        else if (doneTaskID === dataStored[i].id && dataStored[i].complete === false) { //если задание не выполнено
            itemChecked.classList.remove('todo-list-done'); //удаляется фон
            checkedIcon.classList.remove('todo-checked'); // изменение иконки обратно
        }
    }
}
