import { authUser, getUser } from "./service.js";

let loader = document.querySelector(".loader")

let logOutBtn = document.querySelector(".logout-btn")
let moderatorsLink = document.querySelector(".moderators__link")

let user = getUser()
let currPage = location.pathname

if(user && user.pass && user.login){
    
    if(currPage === "/src/pages/moderators.html" && user.role !== "owner" ){
        localStorage.removeItem("admin-cross-user")
        alert("You dont have permission for this page!")
        window.location.href = "/"
    }

    if(user.role !== "owner"){
        moderatorsLink.style.display = "none"
    }

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

