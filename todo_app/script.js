const form= document.querySelector('.form');
const input = document.querySelector('.input');
const btnAdd = document.querySelector('.btn-add');
// const btnDelete = document.querySelector('.btn-delete');
const containerTask = document.querySelector('.tasks');
let task={
    tasks:[],
};

const addHTML = function(text){
   
    const HTML =`
    <li>
          <input type="checkbox">
            <span>${text}</span>
          <button class="noselect btn-delete" data-value="${text}"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
    </li>
    `
    containerTask.insertAdjacentHTML('beforeend',HTML)
}

const addTask = function(){
    if(input.value ==="") return;
    task.tasks.push(input.value);
    addHTML(input.value);
}


form.addEventListener('submit',function(e){
    e.preventDefault();
    addTask();
    form.reset();
})

btnAdd.addEventListener('click',function(e){
    addTask();
    form.reset();
})

containerTask.addEventListener('click',function(e){

    const btn = e.target.closest('.btn-delete');
    if(!btn) return;
    
    console.log("delete btn",btn);

})
