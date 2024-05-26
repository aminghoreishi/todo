let alltodo = document.querySelector(".alltodo");
let cleratodo = document.querySelector(".cleratodo");
let addtodo = document.querySelector(".addtodo");
let input = document.querySelector(".input");
let perorr = document.querySelector('#p-erorr')
let todoArry = [];

function addTodo() {
  let inputval = input.value;

  let index = {
    id: todoArry.length + 1,
    title: inputval,
    condition: false,
  };
  console.log(todoArry);
  input.focus()
  if (input.value === '') {
    perorr.innerHTML = "incorrect"
  }
  else{
    perorr.innerHTML = ""
    todoArry.push(index);
    setLocal(todoArry);
    todogenerator(todoArry);

  }
}

function setLocal(todo) {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function todogenerator(todo) {
  let divcol, p, btn1, btn2, div1, divp, divbtn, divbtn1, divbtn2;
  alltodo.innerHTML = "";
  todo.forEach((todo) => {
   
  

      divcol = document.createElement("div");
      div1 = document.createElement("div");
      divp = document.createElement("div");
      divbtn = document.createElement("div");
      divbtn1 = document.createElement("div");
      divbtn2 = document.createElement("div");
      p = document.createElement("p");
      btn1 = document.createElement("btn1");
      btn2 = document.createElement("btn2");
      btn1.setAttribute("onclick", "edit(" + todo.id + ")");
      btn2.setAttribute("onclick", "removeTodo(" + todo.id + ")");
      divbtn.className = "flex items-center gap-x-3 *:text-white";
      p.innerHTML = todo.title;
      btn1.innerHTML = "Complete";
      div1.className = "flex items-center p-4 justify-between";
      divp.className = "flex items-center";
      p.className = "p-2 text-center text-white";
      divcol.className = "bg-white/30 backdrop-blur-sm  md:w-[400px] rounded-md";
      btn1.className =
        "bg-gradient-to-tr from-blue-500 to-white/30 p-2 rounded-2xl transition-colors hover:bg-blue-700 cursor-pointer";
      btn2.className =
        "bg-gradient-to-tr from-red-500 to-white/30 p-2 rounded-2xl transition-colors hover:bg-red-500 cursor-pointer";
      btn2.innerHTML = "Delete";
      if (todo.condition) {
        p.className = "p-2 text-center text-white line-through";
        btn1.innerHTML = 'Uncomplete'
      }
     
      divbtn1.append(btn1);
      divbtn2.append(btn2);
      divbtn.append(divbtn1, divbtn2);
      divp.append(p);
      div1.append(divp, divbtn);
      divcol.append(div1);
      alltodo.append(divcol);
    
  });
}

function edit(todoid) {
  let localStorageTodos = JSON.parse(localStorage.getItem("todo"));
  todoArry = localStorageTodos
  todoArry.forEach(function (todos) {
    if (todos.id === todoid) {
      todos.condition = !todos.condition
    }
  })
  setLocal(todoArry)
  todogenerator(todoArry)
  
}

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todo"));

  if (localStorageTodos) {
    todoArry = localStorageTodos;
  } else {
    todoArry = [];
  }

  todogenerator(todoArry);
}

function removeTodo(todo) {
  let get = JSON.parse(localStorage.getItem("todo"));
  todoArry = get;
  let find = todoArry.findIndex(function (find) {
    return find === todo.id;
  });
  todoArry.splice(find, 1);
  setLocal(todoArry);
  todogenerator(todoArry);
}
function clearTodoAll() {
  todoArry = [];
  localStorage.removeItem("todo");
  todogenerator(todoArry);
}
window.addEventListener("load", getLocalStorage);
addtodo.addEventListener("click", addTodo);
cleratodo.addEventListener("click", clearTodoAll);
