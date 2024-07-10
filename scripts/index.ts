const getCurrentTimeDate = () => {
    let currentTimeDate: Date = new Date();
    let month: string[] =  ["Jan", "Feb", "Mar", "Apr", "May",  "Jun",  "Jul",  "Aug",  "Sep", "Oct", "Nov", "Dec"]
    let hours: number   =  currentTimeDate.getHours();
    let minutes: number | string =  currentTimeDate.getMinutes();
    minutes  = minutes < 10 ? '0'+ minutes : minutes;
    let currentTime: string = `${hours}:${minutes}`;
    let currentDate: number  = currentTimeDate.getDate();
    let currentMonth: string= month[currentTimeDate.getMonth()];
    let CurrentYear: number = currentTimeDate.getFullYear();
    let fullDate: string = `${currentDate} ${currentMonth}, ${CurrentYear}`;
    let timeBlock = document.querySelector("time") as HTMLElement | null
    let dateBlock = document.querySelectorAll("time")[1] as HTMLElement | null
    if (!timeBlock || !dateBlock) {
        throw new Error ('Time or Date Element is undefined.')
    }
    timeBlock.innerHTML = currentTime;
    dateBlock.innerHTML = fullDate;
    setTimeout(getCurrentTimeDate, 500);
}
getCurrentTimeDate(); 

let ul = document.querySelector('#todo-bar') as HTMLElement | null


type ToDoList = {
    complete: boolean,
    deadline: string,
    detail: string,
    id: string,   //?
    priority: string,
    title: string
}

function listMain(): void {
    let todoListTask: ToDoList[] = JSON.parse(localStorage.getItem('todoList') || '""')
    if (todoListTask.length !== 0) {
         for (let i=0; i< todoListTask.length;i++) {
            let liClassComplete = (todoListTask[i].complete) ? 'todo-list-done' : '';
            let liClassPriority = (todoListTask[i].priority === '3low') ? 'todo3-low' :
                (todoListTask[i].priority === '2medium') ? 'todo2-medium' :
                (todoListTask[i].priority === '1high') ? 'todo1-high' : '';
            let liDeadline = (!todoListTask[i].deadline) ? 'has not been set' : todoListTask[i].deadline
            let taskHTML = `<li class="todo-list ${liClassComplete} ${liClassPriority}" id='${todoListTask[i].id}'>
                    <div class="todo-title">
                        <span class="title-area-main">${todoListTask[i].title}</span>
                        <span class="detail-area-main">${todoListTask[i].detail}</span>
                        <span class='task-deadline'>deadline: ${liDeadline}</span>
                    </div>
                    <div class="todo-buttons">
                        <button class="todo-edit" onclick="editTask(this)" type="button"></button>
                        <button class="todo-delete" onclick='deleteTask1(this)'></button>
                        <button class = 'todo-done '  onclick='doneTaskStorage(this)'></button>
                    </div>
                    </li>`;
            if (!ul) {
                throw new Error ('Element UL is not found') 
            }       
            ul.insertAdjacentHTML('beforeend',taskHTML)     
        }
    }
}

window.onload = listMain 



function editTask(elem: Element | null): void {
    if (!elem || !elem.closest('.todo-list'))  {
        throw new Error ('Element for edition is not found.')
    }
    const elemID = elem.closest('.todo-list')?.id;
    localStorage.setItem('idEdit', JSON.stringify(elemID));
    location.replace("./pages/edit.html"); 
}






let isAllTasks: boolean = true
let isUncompletedTasks: boolean = false
let doneTasks: HTMLCollectionOf<Element> = document.getElementsByClassName('todo-list-done') 


function taskBTN() {
    let allButtonText = document.querySelector('.todo-all > p') as HTMLElement | null
    if (!allButtonText) {
        throw new Error ('All-button is not found.')
    }
    if (isAllTasks) {
       
        allButtonText.textContent = 'All'
        for (let i = 0; i < doneTasks.length; i++) { 
            doneTasks[i].setAttribute("style", "display: none")
            // doneTasks[i].style.display = 'none' 
        }
        isAllTasks = false
        isUncompletedTasks = true
        return
    }
    if (isUncompletedTasks) {
        allButtonText.textContent = 'Unfinished'
        for (let i = 0; i < doneTasks.length; i++) { 
            doneTasks[i].setAttribute("style", "display: '' ")
            // doneTasks[i].style.display = '' 
        }
        isAllTasks = true
        isUncompletedTasks = false
        return
    }
    return
}


// кнопка удаления
let deleteButton = document.querySelector('.todo-delete')  as Element | null


//   ф-ция удаления элемента 
function deleteTask1(elem: Element) {
    let itemToDelete = elem.closest('.todo-list')  as Element | null
    if (!elem || !itemToDelete) {
        throw new Error ('Element to delete is not found.')
    }
    let storedData = JSON.parse(localStorage.getItem('todoList')!)
    itemToDelete.remove(); 
    for (var i in storedData) {
        if (itemToDelete.id === storedData[i].id) {
            storedData.splice(i, 1);
            localStorage.setItem('todoList', JSON.stringify(storedData));
        }
    }
}
   
interface ArrayConstructor {
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
    from<T>(arrayLike: ArrayLike<T>): Array<T>;
} //для работы Array.from
function sortTasks() {
    let selectedSortElement =  document.getElementById('sort-select') as  HTMLInputElement //
    let selectedValue: string = selectedSortElement.value; // the choosen option 
    let ulTodo: Element | null = document.querySelector('#todo-bar') //ul of tasks
    let todoListTask: NodeListOf<Element> = document.querySelectorAll('.todo-list') //li of tasks
    let arrTodoList: Element[] = Array.from(todoListTask) //li as Array (for SORT Function)
    if (selectedValue === 'deadline') { //if 'deadline''s been choosen
        arrTodoList.sort( function(a, b) {
            if (!a.children[0].children[2].textContent || !b.children[0].children[2].textContent) {
                throw new Error ('Deadline Elements for Sorting is not found.')
            } // we need to change the format of date in case to use the 'New Date' function
            let aDeadline: string = a.children[0].children[2].textContent.slice(10) //deadline (format as dd.mm.yyyy)
            let bDeadline: string = b.children[0].children[2].textContent.slice(10) //deadline (format as dd.mm.yyyy)
            let aDate: string = aDeadline.split(".")[2] + '-' + aDeadline.split(".")[1] + '-' + aDeadline.split(".")[0]; // deadline (format as yyyy-mm-dd)
            let bDate: string = bDeadline.split(".")[2] + '-' + bDeadline.split(".")[1] + '-' + bDeadline.split(".")[0]; //deadline (format as yyyy-mm-dd)
            return new Date(aDate).getTime() - new Date(bDate).getTime()//sorting by deadline
        }) 
        arrTodoList.reverse(); //changing the order of just sorted tasks
        for(var i=0; i<arrTodoList.length; i++){
            if (!ulTodo) {
                throw new Error ('ToDo List Elements is not found.')
            }
            ulTodo.insertBefore(arrTodoList[i], ulTodo.firstChild); //showing the new order not changing the data in local storage
        }
        return
    }
    if (selectedValue = 'priority') { // if 'priority''s been choosen
       arrTodoList.sort( function (a, b) { 
        let aPriority: string = a.classList[1] //priority (format as todo1-high, todo2-medium or todo3-low)
        let bPriority: string = b.classList[1]
        return +aPriority[4] - +bPriority[4] // sorting by priority (using the number in priority class)
    })
    arrTodoList.reverse(); //changing the order of just sorted tasks
        for(var i=0; i<arrTodoList.length; i++){
            if (!ulTodo) {
                throw new Error ('ToDo List Elements is not found.')
            }
            ulTodo.insertBefore(arrTodoList[i], ulTodo.firstChild); //showing the new order not changing the data in local storage
        }
        return
    }
}

let sortingTasks=document.querySelector('#sort-select') as Element | null 
if (!sortingTasks) {
    throw new Error ('Selected Sorting Element is not found.')
}
    //селект для списка дел
sortingTasks.addEventListener('change', function() {  //при изменении option происходит перезагрузка страницы
    sortTasks();
});

let doneButton = document.getElementById('todo-done') as HTMLElement | null
let titleOfDoneTask = document.querySelector('.title-area-main') as HTMLInputElement | null
let detailOfDoneTask = document.querySelector('.detail-area-main') as HTMLInputElement | null
let storedTasks = JSON.parse(localStorage.getItem('todoList')!)

/* Ф-ция обработки выполненного задания через map c добавлением complete:true/false */

function doneTaskStorage(elem: Element) {
    let itemToEdit: Element | null = elem.closest('.todo-list')
    if (!itemToEdit) {
        throw new Error ('Item to edit is not found.')
    }
    let doneTaskID: string = itemToEdit.id;
    let dataStored: ToDoList[] = JSON.parse(localStorage.getItem('todoList')!);
    
    let newdataStored: ToDoList[] = dataStored.map(obj => {
        if (obj.id === doneTaskID && obj.complete === false) {
            return {...obj, complete: true};
        } else if (obj.id === doneTaskID && obj.complete === true) {
            return {...obj, complete: false}
        }
         return obj;
    });
    localStorage.setItem('todoList', JSON.stringify(newdataStored));
    changeStyleCheckedTask(elem) //ф-ция см ниже
}


// Ф-ция, которая исправляет стиль блока с заданием при условиях complete:true/false

function changeStyleCheckedTask(elem: Element) {
    let itemChecked: Element | null = elem.closest('.todo-list')
    let checkedIcon: Element | null = elem.closest('.todo-done'); //иконка checked
    if (!itemChecked || !checkedIcon) {
        throw new Error ('Item to edit is not found.')
    }
    let dataStored: ToDoList[] = JSON.parse(localStorage.getItem('todoList')!); 
    let doneTaskID: string = itemChecked.id; 
    for (var i in dataStored)  {
        if (doneTaskID === dataStored[i].id && dataStored[i].complete === true) { //если задание отмечено как выполненное
            itemChecked.classList.add('todo-list-done'); //добавление класса, ктр изменяет стиль фона блока
            checkedIcon.classList.add('todo-checked') //  -//-ктр изменяет иконку checked
        } else if (doneTaskID === dataStored[i].id && dataStored[i].complete === false) { //если задание не выполнено
            itemChecked.classList.remove('todo-list-done'); //удаляется фон
            checkedIcon.classList.remove('todo-checked') // изменение иконки обратно
        }
    }
}