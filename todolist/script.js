const todoText = document.querySelector("#todo_text")
const todoButton = document.querySelector("#todo-button") 
const todos = document.querySelector("#todos")
const todoForm = document.querySelector("#todo-all")


if(localStorage.getItem("todos") === null){
    var myTodos = []
    document.getElementById("remove-todo").style.display = "none";
    document.getElementById("todos").style.display = "none"
}else{
    myTodos = JSON.parse(localStorage.getItem("todos"))
    document.getElementById("remove-todo").style.display = "block";
    document.getElementById("todos").style.display = "flex"
}

todoForm.addEventListener("submit", function(event){
    
    
    if(todoText.value !== ""){

        const todoItem = document.createElement("div")
        todoItem.classList.add("todo-item")

        const myTodo = document.createElement("input")
        myTodo.setAttribute("value", event.target.elements.todo_text.value)
        //myTodo.value = event.target.elements.todo_text.value
        todoItem.appendChild(myTodo)
        myTodo.classList.add("form-control")
        
        
        
        myTodos.push({
            id:uuidv4(),
            name: todoText.value
        })

        let myTodosJSON = JSON.stringify(myTodos)
        localStorage.setItem("todos", myTodosJSON)

        todoText.value = ""
        document.getElementById("remove-todo").style.display = "block";

    }
    

})


function todosLoad(){
    let myTodosFromLS = localStorage.getItem("todos")
    let myTodoResult = JSON.parse(myTodosFromLS)

    if(localStorage.getItem("todos") !== null){
        myTodoResult.forEach(function(oneTodo){
            
            const todoItem = document.createElement("div")
            todos.appendChild(todoItem)
            todoItem.classList.add("todo-item")

            const checkLabel = document.createElement("label")
            todoItem.appendChild(checkLabel)

            const check = document.createElement("input")
            check.setAttribute("type", "checkbox")
            checkLabel.appendChild(check)

            
            const myTodo = document.createElement("input")
            myTodo.setAttribute("value", oneTodo.name)
            myTodo.classList.add("todo-result")
            todoItem.appendChild(myTodo)

                
            check.addEventListener("change", function(event){
                if(check.checked === true){
                myTodo.style.textDecoration = "line-through"
                myTodo.style.color = "gray"
                myTodo.readOnly = true
                } else{
                    myTodo.style.textDecoration = "none"
                    myTodo.style.color = "rgb(32, 32, 32)"
                    myTodo.readOnly = false
                }
            })

        })
       
    }
}

function todosRemove(){

    localStorage.clear()
    todos.innerHTML = " "
    console.log("All removed")
    location.reload()
    document.getElementById("remove-todo").style.display = "none";
    document.getElementById("todos").style.display = "none"
}


