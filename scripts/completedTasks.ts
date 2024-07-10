type ToDoList = {
    complete: boolean,
    deadline: string,
    detail: string,
    id: string,   //?
    priority: string,
    title: string
}
let ul: Element | null = document.querySelector('#todo-bar')


//ф-ция отображения списка выполненных заданий

function completedList() {
    let storedData: ToDoList[] = JSON.parse(localStorage.getItem('todoList')!);
    if (storedData.length !== 0) { //при наличии данных в local st 
        for (let i=0; i< storedData.length;i++) {
            if (storedData[i].complete) {  //при наличии выполненных заданий
                let taskHTML = `<li class="todo-list" id='${storedData[i].id}'> 
                    <div class="todo-title">
                        <span class="title-area-main">${storedData[i].title}</span>
                        <span class="detail-area-main">${storedData[i].detail}</span>
                     </div>
                    </li>`;
                if (!ul) {
                    throw new Error ('UL-Element is not found.')
                }
                ul.insertAdjacentHTML('beforeend',taskHTML) // вставка html-кода задания
            }
        }
    } 
   else{
        console.log('No data in local storage') 
    }
}

window.onload = completedList //при загрузке страницы выполняется ф-ция completedList