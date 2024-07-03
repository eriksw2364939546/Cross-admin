import { authUser, getUser } from "./service.js";

let loader = document.querySelector(".loader")

let logOutBtn = document.querySelector(".logout-btn")

let user = getUser()

if(user && user.pass && user.login){
    authUser({password: user.pass, login: user.login})
    .then((data) => {
        if(data && !data.userName){
            window.location.href = "/src/pages/auth.html";
            localStorage.removeItem("admin-cross-user")
        }
        loader.style.display = "none"
    })
} else {
    window.location.href = "/src/pages/auth.html";
}


logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("admin-cross-user")
    window.location.href = "/src/pages/auth.html";
})

