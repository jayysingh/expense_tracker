const expenseAmount = document.getElementById("expenseamount");
const description = document.getElementById("description");
const category = document.getElementById("catogery");
const addexpense = document.getElementById("addexpense");
const taskForm = document.getElementById("task-form");
const output = document.getElementById("output");

let currentTask = {};
const taskData = [];

const addOrUpdateExpense = () =>{
    
    const taskDataIndex = taskData.findIndex((item)=>
        item.id === currentTask.id

    )
    console.log(taskDataIndex);
    const object = {
        id:`${Date.now()}`,
        expenseAmount:expenseAmount.value,
        description:description.value,
        category:category.value
    }
    if(taskDataIndex===-1){
        taskData.unshift(object);
    }else{
        taskData[taskDataIndex] = object;
        console.log("taskDataIndex");
        
    }
    localStorage.setItem("expense",JSON.stringify(taskData));

    updateContainer();
    reset();

}
const updateContainer = () =>{

    output.innerHTML=` <h1 class="m-3 text-center text-white">Expense List</h1>
    `;

    taskData.forEach(({id,expenseAmount,description,category} )=>{
    output.innerHTML+=`
    <li id ="${id}" class="list-group-item">
    <strong>Expense Amount: </strong>${expenseAmount}
    </p>
    <p>
    <strong>Description: </strong>${description}
    </p>
    <p>
    <strong>Category: </strong>${category}
    </p>
    <p>
    <button onclick ="edit(this)" type="button">Edit</button>
    <button onclick ="remove(this)" type="button" >Delete</button>
    <hr>
    </li>`

    })
    
}



const reset =() =>{
    expenseAmount.value="";
    description.value ="";
    category.value="";
}


const edit =(btn)=>{
    addexpense.innerText="update Expense";
const taskDataIndex = taskData.findIndex((item) =>
    item.id === btn.parentElement.id
)

currentTask = taskData[taskDataIndex];
expenseAmount.value= currentTask.expenseAmount;
description.value= currentTask.description;
category.value = currentTask.category;
};


const remove = (btn) => {
    const taskDataIndex = taskData.findIndex((item) => item.id === btn.parentElement.id
    );


    taskData.splice(taskDataIndex, 1);
    localStorage.setItem("expense", JSON.stringify(taskData));
    btn.parentElement.remove();

};







taskForm.addEventListener("submit",function(e){
    e.preventDefault();
    addOrUpdateExpense();
    
})
