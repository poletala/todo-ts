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
var editButton = document.querySelector('.todo-todo-edit');
var editedTitle = document.querySelector('.edited-title');
var editedDetail = document.querySelector('.edited-detail');
var editedDeadline = document.querySelector('#deadline-input');
var editedPriority = document.querySelectorAll('input[type="radio"]');
var dataStored = JSON.parse(localStorage.getItem('todoList'));
if (!editedTitle || !editedDetail || !editedDeadline) {
    throw new Error('Elements to edit are not found.');
}
//устанавливаем текущие данные в поля
var idTaskToEdit = JSON.parse(localStorage.getItem('idEdit'));
// for (i in dataStored)
for (var i = 0; i < dataStored.length; i++) {
    if (dataStored[i].id === idTaskToEdit) {
        editedTitle.value = dataStored[i].title;
        editedDetail.value = dataStored[i].detail;
        var deadlineNewFormat = dataStored[i].deadline.split("."); //изменяем формат даты и вставляем в поле дедлайна
        editedDeadline.valueAsDate = new Date(deadlineNewFormat[2] + '-' + deadlineNewFormat[1] + '-' + deadlineNewFormat[0]);
        localStorage.setItem('deadline', JSON.stringify(dataStored[i].deadline)); //передаем в local storage текущий дедлайн на случай, если не будет задан новый
        // for (j in editedPriority)
        for (var j = 0; j < editedPriority.length; j++) {
            if (editedPriority[j].value === dataStored[i].priority) {
                editedPriority[j].checked = true;
            }
        }
    }
}
// проверка полей на заполненность 
function checkInputs() {
    if (!editedTitle || !editedDetail) {
        throw new Error('Elements to edit are not found.');
    }
    if (!(editedTitle.value)) {
        editedTitle.placeholder = 'INVALID TITLE';
        alert('The title field is empty.');
        return false;
    }
    if (!editedDetail.value) {
        editedDetail.placeholder = 'INVALID DETAILS';
        alert('The details field is empty.');
        return false;
    }
    else {
        return true;
    }
}
//прослушивание события установки дедлайна 
var deadlineInput = document.querySelector('#deadline-input');
if (!deadlineInput) {
    throw new Error('Deadline Input Element is not found.');
}
deadlineInput.addEventListener("input", function (event) {
    var inputTarget = event.target;
    var date = new Date(inputTarget.value);
    var dayDeadline = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    var monthDeadline = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var yearDeadline = date.getFullYear();
    var deadline = "".concat(dayDeadline, ".").concat(monthDeadline, ".").concat(yearDeadline);
    localStorage.setItem('deadline', JSON.stringify(deadline));
});
//передача новых данных в local storage
function updateTask2() {
    if (checkInputs()) {
        var idTaskToEdit_1 = JSON.parse(localStorage.getItem('idEdit'));
        var newdataStored = dataStored.map(function (obj) {
            if (obj.id === idTaskToEdit_1) {
                if (!editedTitle || !editedDetail) {
                    throw new Error('Elements to edit are not found.');
                }
                return __assign(__assign({}, obj), { title: editedTitle.value, detail: editedDetail.value, priority: document.querySelector('input[name="priority"]:checked').value, deadline: JSON.parse(localStorage.getItem('deadline')) });
            }
            return obj;
        });
        localStorage.setItem('todoList', JSON.stringify(newdataStored));
        localStorage.setItem('deadline', JSON.stringify(''));
        location.replace("../index.html");
    }
    else {
        return;
    }
}
