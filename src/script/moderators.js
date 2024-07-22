import { getAdmins,deleteCurrCard , openModal , closeModal, updateCurrCard, postNewCard } from "./service.js";

let containerForModerators = document.querySelector(".main__section.moderators")
let moderModal = document.querySelector(".moderators__modal")
let moderCloseBtn = document.querySelector(".moder__modal-close button")

let headerAdd = document.querySelector(".header__btn-add")

let inpModName = document.querySelector(".moder__name")
let inpModLogin = document.querySelector(".moder__login")
let inpModPass = document.querySelector(".moder__pass")
let inpModRole = document.querySelector(".moder__role")

let moderatorsForm = document.querySelector(".moderators__modal form")

let modFormPozition = ""
let idForEdit = null




getAdmins().then(data => renderModerators(data))


headerAdd.addEventListener("click", () => {
    openModal(moderModal, "moderators__active")
    modFormPozition = "adder"
})

function clearModForm(){
    inpModName.value = ""
    inpModLogin.value = ""
    inpModPass.value = ""
    inpModRole.value = ""
}



moderCloseBtn.addEventListener("click", () => {
    closeModal(moderModal, "moderators__active")
    clearModForm()
})

containerForModerators.addEventListener("click", (event) => {
    let cardId = event.target.closest(".moderators__card").dataset.id
    idForEdit = cardId

    if(event.target.closest(".moderators__card-del")){
        let isDelete = confirm("This admin will be deleted!")

        if(isDelete){
            deleteCurrCard("admin","", cardId).then(() =>{
             getAdmins().then(data => renderModerators(data))
            })
        }
    }

    if(event.target.closest(".moderators__card-edit")){
        modFormPozition = "editor"
      openModal(moderModal , "moderators__active")

      getAdmins(cardId).then(data => {
        inpModName.value = data.name
        inpModLogin.value = data.login
        inpModPass.value = data.pass
        inpModRole.value = data.role
      })
    }
})

moderatorsForm.addEventListener("submit", (event) => {
    event.preventDefault()
     let newModerator = {
        name: inpModName.value,
        login: inpModLogin.value,
        pass: inpModPass.value,
        role: inpModRole.value,
     }

    if(modFormPozition === "adder"){
        postNewCard("admins", "" , newModerator).then(() => {
            clearModForm()
            closeModal(moderModal, "moderators__active")
            getAdmins().then(data => renderModerators(data))
        })
        

    }

    if(modFormPozition === "editor"){
     updateCurrCard("admins","", idForEdit, newModerator).then(() => {
        clearModForm()
        closeModal(moderModal, "moderators__active")
        getAdmins().then(data => renderModerators(data))

     })
    }
})


function renderModerators(moder){
    containerForModerators.innerHTML = ""

    moder.forEach(el => {
        containerForModerators.innerHTML += `
                                   <div class="moderators__card" data-id="${el.id}">
                            <div class="row">
                                <div class="moderators__card-header">
                                    <p>${el.userName}</p>
                                    <span class="mod__role">[${el.role}]</span>
                                </div>
                                
                                <div class="moderators__card-buttons">
                                    <button class="moderators__card-del">Delete</button>
                                    <button class="moderators__card-edit">Edit</button>
                                </div>
                            </div>
                           </div>
        
        `
    })
}

