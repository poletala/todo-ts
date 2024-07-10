type ToDoList = {
    complete: boolean,
    deadline: string,
    detail: string,
    id: string,   //?
    priority: string,
    title: string
}
let editButton: Element | null = document.querySelector('.todo-todo-edit')

let editedTitle: HTMLInputElement | null  = document.querySelector('.edited-title')
let editedDetail: HTMLInputElement | null  = document.querySelector('.edited-detail')
let editedDeadline: HTMLInputElement | null  = document.querySelector('#deadline-input')
let editedPriority: NodeListOf<Element> = document.querySelectorAll('input[type="radio"]')
let dataStored: ToDoList[] = JSON.parse(localStorage.getItem('todoList')!)

if (!editedTitle || ! editedDetail || !editedDeadline) {
    throw new Error ('Elements to edit are not found.')
}


//устанавливаем текущие данные в поля
let idTaskToEdit: string = JSON.parse(localStorage.getItem('idEdit')!)
// for (i in dataStored)
    for (let i=0;i<dataStored.length;i++) {
  if (dataStored[i].id === idTaskToEdit) {
    editedTitle.value = dataStored[i].title
    editedDetail.value = dataStored[i].detail 
    let deadlineNewFormat: string[] = dataStored[i].deadline.split("."); //изменяем формат даты и вставляем в поле дедлайна
    editedDeadline.valueAsDate =  new Date(deadlineNewFormat[2] + '-' + deadlineNewFormat[1] + '-' + deadlineNewFormat[0] ) 
    localStorage.setItem('deadline', JSON.stringify(dataStored[i].deadline)); //передаем в local storage текущий дедлайн на случай, если не будет задан новый
    // for (j in editedPriority)
    for (let j=0; j< editedPriority.length; j++) {
      if ((<HTMLInputElement>editedPriority[j]).value === dataStored[i].priority) {
        (<HTMLInputElement>editedPriority[j]).checked = true; 
      }
    }
  }
}

// проверка полей на заполненность 
function checkInputs() {
    if (!editedTitle || ! editedDetail) {
        throw new Error ('Elements to edit are not found.')
    }
  if (!(editedTitle.value)) {
      editedTitle.placeholder = 'INVALID TITLE'
      alert('The title field is empty.')
      return false
  } if (!editedDetail.value) {
      editedDetail.placeholder = 'INVALID DETAILS'
      alert ('The details field is empty.')
      return false
  }
  else {
    return true
  }
}

//прослушивание события установки дедлайна 
let deadlineInput: Element | null = document.querySelector('#deadline-input')
if (!deadlineInput) {
    throw new Error ('Deadline Input Element is not found.')
}
deadlineInput.addEventListener("input", event => {
  let inputTarget = event.target as HTMLInputElement;
  let date: Date = new Date(inputTarget.value);
  let dayDeadline: string | number = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate()
  let monthDeadline: string | number = (date.getMonth()+1 <10) ? '0'+(date.getMonth()+1) : date.getMonth()+1
  let yearDeadline: number = date.getFullYear()
  let deadline: string = `${dayDeadline}.${monthDeadline}.${yearDeadline}`
  localStorage.setItem('deadline', JSON.stringify(deadline));
});

//передача новых данных в local storage
function updateTask2() {
  if(checkInputs()) {
  let idTaskToEdit: string = JSON.parse(localStorage.getItem('idEdit')!);
  const newdataStored: ToDoList[] = dataStored.map(obj => {
      if (obj.id === idTaskToEdit) {
        if (!editedTitle || !editedDetail) {
            throw new Error ('Elements to edit are not found.')
        }
        return {...obj, 
          title: editedTitle.value, 
          detail: editedDetail.value, 
          priority: (<HTMLInputElement>document.querySelector('input[name="priority"]:checked')).value,
          deadline: JSON.parse(localStorage.getItem('deadline')!)};
      }
      return obj;
    });
  localStorage.setItem('todoList', JSON.stringify(newdataStored));
  localStorage.setItem('deadline', JSON.stringify(''))
  location.replace("../index.html");
  } else {
    return
  }
}







  