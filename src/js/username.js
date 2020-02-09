const ask = document.querySelector(".js-askName"),
  input = ask.querySelector(".inputName"),
  nameTag = document.querySelector(".nameTag");

const NAME_LS = "names";

let names = [];

function deleteName(event) {
  const btn = event.target;
  const li = btn.parentNode;
  nameTag.removeChild(li);
  const cleanNames = names.filter(function filterFn(name) {
    return name.id !== parseInt(li.id, 10);
  });
  names = cleanNames;
  input.placeholder = "What is your name?";
  saveNames();
}

function saveNames() {
  localStorage.setItem(NAME_LS, JSON.stringify(names));
}

function paintName(text) {
  if (names.length > 0) {
    return;
  }
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = names.length + 1;
  delBtn.innerText = "🔄";
  delBtn.addEventListener("click", deleteName);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  nameTag.appendChild(li);
  const nameObj = {
    text: text,
    id: newId
  };
  names.push(nameObj);
  saveNames();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = "Hi! " + input.value;
  paintName(currentValue);
  input.value = "";
  input.placeholder = "push change button";
}

function loadNames() {
  const loadedNames = localStorage.getItem(NAME_LS);
  if (loadedNames !== null) {
    const parsedNames = JSON.parse(loadedNames);
    parsedNames.forEach(function(name) {
      paintName(name.text);
    });
  }
  if (names.length > 0) {
    input.placeholder = "push change button";
  }
}

function init() {
  input.placeholder = "What is your name?";
  loadNames();
  ask.addEventListener("submit", handleSubmit);
}

init();
