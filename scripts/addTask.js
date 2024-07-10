var addButton = document.querySelector('.add-task-btn');
var inputTitle = document.querySelector('.title-area');
var inputDetail = document.querySelector('.detail-area');
var deadlineInput = document.querySelector('#deadline-input');
//приоритеты
var radios = document.querySelectorAll('input[type="radio"]');
function checkInputs() {
    if (!inputTitle || !inputDetail) {
        throw new Error('Input element is not found.');
    }
    if (!inputTitle.value) {
        inputTitle.placeholder = 'INVALID TITLE';
        alert('The title field is empty.');
        return false;
    }
    if (!inputDetail.value) {
        inputDetail.placeholder = 'INVALID DETAILS';
        alert('The details field is empty.');
        return false;
    }
    else {
        return true;
    }
}
if (!deadlineInput) {
    throw new Error('Deadline Input element is not found.');
}
deadlineInput.addEventListener("input", function (event) {
    if (!event.target) {
        throw new Error('Event target element is not found.');
    }
    var inputTarget = event.target;
    var date = new Date(inputTarget.value);
    var dayDeadline = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    var monthDeadline = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var yearDeadline = date.getFullYear();
    var deadline = "".concat(dayDeadline, ".").concat(monthDeadline, ".").concat(yearDeadline);
    localStorage.setItem('deadline', JSON.stringify(deadline));
});
//ф-ция добавления первого дела в local storage 
function addTaskToLocalStorage() {
    var checkedPriority = document.querySelector('input[name="priority"]:checked');
    if (!inputTitle || !inputDetail || !checkedPriority) {
        throw new Error('Input element is not found.');
    }
    var arrTasks = [];
    var todoListItem = {
        title: inputTitle.value,
        detail: inputDetail.value,
        id: Math.random().toString(16).slice(2),
        complete: false,
        priority: checkedPriority.value,
        deadline: JSON.parse(localStorage.getItem('deadline'))
    };
    // console.log(todoListItem)
    arrTasks.push(todoListItem);
    localStorage.setItem('todoList', JSON.stringify(arrTasks));
    localStorage.setItem('deadline', JSON.stringify(''));
    // console.log(arrTasks)
}
//ф-ция добавления дела в local storage при нажатии кнопки ADD
if (!addButton) {
    throw new Error('Add Button is not found.');
}
addButton.addEventListener('click', function () {
    if (checkInputs()) {
        var storedData = JSON.parse(localStorage.getItem('todoList'));
        if (!storedData) { //если local storage пуст
            addTaskToLocalStorage();
        }
        else { //если в ls есть список дел
            var checkedPriority = document.querySelector('input[name="priority"]:checked');
            if (!inputTitle || !inputDetail || !checkedPriority) {
                throw new Error('Input element is not found.');
            }
            var todoListItem = {
                title: inputTitle.value,
                detail: inputDetail.value,
                id: Math.random().toString(16).slice(2),
                complete: false,
                priority: checkedPriority.value,
                deadline: JSON.parse(localStorage.getItem('deadline'))
            };
            storedData.push(todoListItem); //добавляем новое дело в конец списка дел в ls
            localStorage.setItem('todoList', JSON.stringify(storedData));
            localStorage.setItem('deadline', JSON.stringify(''));
        }
        location.replace("../index.html"); //переход на главную страницу
    }
    else {
        return;
    }
});
