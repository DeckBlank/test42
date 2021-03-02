import { query } from "./query.js";
export const myForm = document.querySelector("#myForm");
const select = document.querySelector("#select");
const inputId = document.querySelector("#id");
const inputs = myForm.querySelectorAll("input");

select.addEventListener("change", e => {
  switch (select.selectedIndex) {
    case 0:
      doPost();
      break;
    case 1:
      doPut();
      break;
    case 2:
      doDelete();
      break;
    case 3:
      doGet();
      break;
  }
});

const doPost = () => {
  for (const input of inputs) {
    input.classList.remove("none");
    input.value = "";
  }
  inputId.classList.add("none");
  inputId.value = "";
};
const doDelete = () => {
  for (const input of inputs) {
    input.classList.add("none");
    input.value = "0";
  }
  inputId.classList.remove("none");
  inputId.value = "";
};
const doPut = () => {
  for (const input of inputs) {
    input.classList.remove("none");
    input.value = "";
  }
};
const doGet = () => {
  for (const input of inputs) {
    input.classList.add("none");
    input.value = "0";
  }
  inputId.classList.remove("none");
  inputId.value = "";
};

const validacion = obj => {
  let metodo = obj.metodo;
   switch (metodo) {
    case "get":
      return null;
      break;
    case "post":
      return obj.price && obj.title && obj.tumbnails ? null : "Faltan campos";
      break;
    case "put":
      return obj.id && obj.price && obj.title && obj.tumbnails ? null : "Faltan campos";
      break;
    case "delete":
      return obj.id ? null : "Faltan campos";
      break;
  }
};

doPost()



myForm.addEventListener("submit", async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(myForm).entries());
  let id = data.id;
  let noPass = validacion(data);
  if (noPass) {
    alert(noPass);
  } else {
    let metodo = data["metodo"];
    delete data["metodo"];
    let respuesta = await query(`/api/productos/${id}`, metodo, data);
    if (respuesta) {
      myForm.reset();
    } else {
      alert("Error: no se guardo el producto");
    }
  }
});


