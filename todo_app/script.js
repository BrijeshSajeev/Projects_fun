const form= document.querySelector('.form');
const input = document.querySelector('.input');
const btnAdd = document.querySelector('.btn-add');
// const btnDelete = document.querySelector('.btn-delete');
const containerTask = document.querySelector('.tasks');
class Task{

    constructor(){
        this.tasks=[];
        this.getLocalStr();
    }
    render(){
        containerTask.innerHTML='';
        const HTML = this.tasks.map(text => `
        <li>
              <input type="checkbox">
                <span>${text}</span>
              <button class="noselect btn-delete" data-value="${text}"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
        </li>
        `).join('');
        containerTask.insertAdjacentHTML('beforeend',HTML);
        this.setLocalStr();
    }
    deleteTask(index){
        this.tasks.splice(index,1);
        this.render();
    }
    addElemnt(value){   
        this.tasks.push(value);
    }

    addTask = function(){
        if(input.value ==="") return;
        this.addElemnt(input.value);
        this.render();
    }

    setLocalStr(){
        localStorage.setItem('task',JSON.stringify(this.tasks))
    }
    getLocalStr(){
        const data = JSON.parse(localStorage.getItem('task'));

        if (!data) return;

        this.tasks = data;

        this.render();
        
    }
};
 
const task = new Task();





form.addEventListener('submit',function(e){
    e.preventDefault();
    task.addTask();
    form.reset();
})

btnAdd.addEventListener('click',function(e){
    task.addTask();
    form.reset();
})

containerTask.addEventListener('click',function(e){

    const btn = e.target.closest('.btn-delete');
    if(!btn) return;

    const x = task.tasks.indexOf(btn.dataset.value);
    task.deleteTask(x);

})


