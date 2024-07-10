type ToDoList = {
    complete: boolean,
    deadline: string,
    detail: string,
    id: string,   //?
    priority: string,
    title: string
}

let addButton = document.querySelector('.add-task-btn') as HTMLElement | null
let inputTitle = document.querySelector('.title-area') as HTMLInputElement | null
let inputDetail = document.querySelector('.detail-area') as HTMLInputElement | null
let deadlineInput = document.querySelector('#deadline-input') as HTMLInputElement | null
//приоритеты
let radios = document.querySelectorAll('input[type="radio"]');


function checkInputs(): boolean {
    if (!inputTitle || !inputDetail) {
        throw new Error ('Input element is not found.')
    }
    if (!inputTitle.value) {
        inputTitle.placeholder = 'INVALID TITLE'
        alert('The title field is empty.')
        return false
    } if (!inputDetail.value) {
        inputDetail.placeholder = 'INVALID DETAILS'
        alert ('The details field is empty.')
        return false
    }
    else {
        return true
    }
}


if (!deadlineInput) {
    throw new Error ('Deadline Input element is not found.')
}
deadlineInput.addEventListener("input", event => {
    if (!event.target) {
        throw new Error ('Event target element is not found.')
    }
    const inputTarget = event.target as HTMLInputElement;
    let date: Date = new Date(inputTarget.value);
    let dayDeadline: string | number = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate()
    let monthDeadline: string | number = (date.getMonth()+1 <10) ? '0'+(date.getMonth()+1) : date.getMonth()+1
    let yearDeadline: number = date.getFullYear()
    let deadline: string = `${dayDeadline}.${monthDeadline}.${yearDeadline}`
    localStorage.setItem('deadline', JSON.stringify(deadline));
});


//ф-ция добавления первого дела в local storage 

function addTaskToLocalStorage() {
    let checkedPriority = document.querySelector('input[name="priority"]:checked') as Element | null
    if (!inputTitle || !inputDetail || !checkedPriority ) {
        throw new Error ('Input element is not found.')
    }
    let arrTasks = [];
    let todoListItem: ToDoList = {
        title: inputTitle.value,
        detail: inputDetail.value,
        id: Math.random().toString(16).slice(2),
        complete: false,
        priority: (<HTMLInputElement>checkedPriority).value,
        deadline: JSON.parse(localStorage.getItem('deadline')!) 
    }
    // console.log(todoListItem)
    
    arrTasks.push(todoListItem)

    localStorage.setItem('todoList', JSON.stringify(arrTasks));
    localStorage.setItem('deadline', JSON.stringify(''))
    // console.log(arrTasks)
}

//ф-ция добавления дела в local storage при нажатии кнопки ADD
if (!addButton) {
    throw new Error ('Add Button is not found.')
}
addButton.addEventListener('click', () => {
    if (checkInputs()) {
        let storedData: ToDoList[] = JSON.parse(localStorage.getItem('todoList')!);
        if (!storedData) { //если local storage пуст
            addTaskToLocalStorage()
        }
        else { //если в ls есть список дел
            let checkedPriority = document.querySelector('input[name="priority"]:checked') as Element | null
            if (!inputTitle || !inputDetail || !checkedPriority ) {
                throw new Error ('Input element is not found.')
            }
            let todoListItem: ToDoList = {
                title: inputTitle.value,
                detail: inputDetail.value,
                id: Math.random().toString(16).slice(2),
                complete: false,
                priority:  (<HTMLInputElement>checkedPriority).value,
                deadline: JSON.parse(localStorage.getItem('deadline')!)
            };
            storedData.push(todoListItem) //добавляем новое дело в конец списка дел в ls
            localStorage.setItem('todoList', JSON.stringify(storedData)); 
            localStorage.setItem('deadline', JSON.stringify(''))
        }
        location.replace("../index.html"); //переход на главную страницу
    } else {
        return
    }
   
})


