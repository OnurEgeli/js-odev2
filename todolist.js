let todoListDOM = document.querySelector("#list")
let inputTaskDOM = document.querySelector("#taskInput")
let buttonDOM = document.querySelector("#liveToastBtn")
let successAlertDOM = document.querySelector("#successToast")
let dangerAlertDOM = document.querySelector("#dangerToast")




buttonDOM.addEventListener('click', addItem)
todoListDOM.addEventListener('click',Check)
document.addEventListener('DOMContentLoaded',GetLocalStorage)








function addItem() {

    let isEmpty = text => text.trim().length > 0 
    console.log(isEmpty(inputTaskDOM.value))

    if (isEmpty(inputTaskDOM.value)) {

        SaveLocalStorage(inputTaskDOM.value)

        const todoLi = document.createElement('li')
        todoLi.innerHTML = inputTaskDOM.value

        todoListDOM.append(todoLi)

        inputTaskDOM.value = ''

        const todoRemoveButton = document.createElement('i')
        todoRemoveButton.classList.add('bi', 'bi-trash3-fill', 'float-right', 'mr-4')

        todoLi.append(todoRemoveButton)

        ToastAlertSuccess();


    }else{

        ToastAlertDanger();

    }

}


function Check(e){
    const item = e.target;
    
    if(item.classList[0] == 'bi'){
        const el = item.parentElement;
        DeleteLocalStorage(el.innerText) 
        el.classList.add('animation')
        el.addEventListener("transitionend",function(){
            el.remove()
        })
        
    }
   
    else{
        item.classList.toggle('checked')
    }
}

function SaveLocalStorage(item){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }

    items.push(item);
    localStorage.setItem('listItem',JSON.stringify(items))
}

function DeleteLocalStorage(item){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }
    items.splice(items.indexOf(item),1)

    localStorage.setItem('listItem', JSON.stringify(items)) 
}


function GetLocalStorage(){
    let items;
    if(localStorage.getItem('listItem') == null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('listItem'))
    }

    items.forEach((item)=>{
        
        const todoLi = document.createElement('li')
        todoLi.innerHTML = item

        todoListDOM.append(todoLi)

        inputTaskDOM.value = ''

        const todoRemoveButton = document.createElement('i')
        todoRemoveButton.classList.add('bi', 'bi-trash3-fill', 'float-right', 'mr-4')

        todoLi.append(todoRemoveButton)
    })
}

function ToastAlertSuccess(){
    let successToast = new bootstrap.Toast(successAlertDOM, alertOptions)
    successToast.show();
}

function ToastAlertDanger(){
    let dangerToast = new bootstrap.Toast(dangerAlertDOM, alertOptions)
    dangerToast.show();
}



let alertOptions = {
    animation: true,
    delay: 3000,
}