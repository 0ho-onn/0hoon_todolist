const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  toDidList = document.querySelector(".js-toDidList");

const TODOS_LS = "toDOs";
const TODIDS_LS = "toDids";

let toDos = [];
let toDids = [];

function skipToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const name = li.querySelector("span").innerText;
  const parent = li.parentNode;
  if (parent === toDoList) {
    paintToDid(name);
    deleteToDo(event);
    saveToDids();
  } else {
    paintToDo(name);
    deleteToDid(event);
    saveToDos();
  }
}

function deleteToDid(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDidList.removeChild(li);
  const cleanToDids = toDids.filter(function filterFn(toDid) {
    return toDid.id !== parseInt(li.id, 10);
  });
  toDids = cleanToDids;
  saveToDids();
}
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function filterFn(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveToDids() {
  localStorage.setItem(TODIDS_LS, JSON.stringify(toDids));
}

function paintToDid(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const didBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDids.length + 1;
  didBtn.innerText = "✅";
  didBtn.addEventListener("click", skipToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDid);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(didBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDidList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDids.push(toDoObj);
  saveToDids();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  doBtn.innerText = "✔";
  doBtn.addEventListener("click", skipToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(doBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = "≫­" + toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadToDids() {
  const loadedToDids = localStorage.getItem(TODIDS_LS);
  if (loadedToDids !== null) {
    const parsedToDids = JSON.parse(loadedToDids);
    parsedToDids.forEach(function(toDid) {
      paintToDid(toDid.text);
    });
  }
}

function init() {
  loadToDids();
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
