import{authUser, saveUser} from "./service.js"

let authLogInp = document.querySelector(".auth__log-inp")
let authPassInp = document.querySelector(".auth__pass-inp")
let authForm = document.querySelector("#auth-form")
let authMessage = document.querySelector("#auth-form p")

authForm.addEventListener("submit", (event) => {

event.preventDefault()

    const login = authLogInp.value;
    const password = authPassInp.value;

    authUser({ login, password}).then(data => {
        if (data && data.userName) {
            saveUser(data)
            window.location.href = "/index.html";
        } else {
            throw new Error("Wrong login or password!");

        }
    }).catch(error => {
          authMessage.innerHTML += error

          setTimeout(() => {
            authMessage.innerHTML = ""
            authLogInp.value = ""
            authPassInp.value = ""
          }, 3000)
          
    });
})