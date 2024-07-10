var ul = document.querySelector('#todo-bar');
//ф-ция отображения списка выполненных заданий
function completedList() {
    var storedData = JSON.parse(localStorage.getItem('todoList'));
    if (storedData.length !== 0) { //при наличии данных в local st 
        for (var i = 0; i < storedData.length; i++) {
            if (storedData[i].complete) { //при наличии выполненных заданий
                var taskHTML = "<li class=\"todo-list\" id='".concat(storedData[i].id, "'> \n                    <div class=\"todo-title\">\n                        <span class=\"title-area-main\">").concat(storedData[i].title, "</span>\n                        <span class=\"detail-area-main\">").concat(storedData[i].detail, "</span>\n                     </div>\n                    </li>");
                if (!ul) {
                    throw new Error('UL-Element is not found.');
                }
                ul.insertAdjacentHTML('beforeend', taskHTML); // вставка html-кода задания
            }
        }
    }
    else {
        console.log('No data in local storage');
    }
}
window.onload = completedList; //при загрузке страницы выполняется ф-ция completedList
