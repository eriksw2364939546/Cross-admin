import{ADMIN_URL, PUBLIC_URL} from "./key.js"


async function getAdmins(){
    try {
        let res = await fetch(ADMIN_URL)
        let data = await res.json()
        return data
    } catch (error) {
        return error
    }
}

async function getPublicData(route, param = "" ){
    try {
        let res = await fetch(`${PUBLIC_URL + route}?${param}`)
        let data = await res.json()
        return data
    } catch (error) {
        return error
        
    }
}

async function authUser (infoUser){
    try {
        let res = await fetch(`${ADMIN_URL}?login=${infoUser.login}&pass=${infoUser.password}`)
        let data = await res.json()

        if(data && data.length > 0 && data[0].pass === infoUser.password){
            return data[0]
        }

        throw new Error("User is not found!!!")
    } catch (error) {
        return error
    }
}

async function postNewCard(option, route , newDate){
     try {
        let resUrl = (option === "public" ? PUBLIC_URL : ADMIN_URL) + route
        let res = await fetch( resUrl, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(newDate)
        })
        let date  = await res.json()
        return date
     } catch (error) {
        return error
     }
}

async function updateCurrCard(option , route ,cardId ,newDate ){
    try {
        let resUrl = (option === "public" ? PUBLIC_URL : ADMIN_URL) + route + "/" + cardId
        let res = await fetch( resUrl, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(newDate)
        })
        let date  = await res.json()
        return date
     } catch (error) {
        return error
     }
}

async function deleteCurrCard(option , route , cardId){
    try {
        let resUrl = (option === "public" ? PUBLIC_URL : ADMIN_URL) + route + "/" + cardId
        let res = await fetch(resUrl , {
            method: 'DELETE'
        })
        let data = await res.json()
        return data
        
    } catch (error) {
        return error
    }
}


function saveUser ( user ){
    localStorage.setItem("admin-cross-user", JSON.stringify(user))
}

function getUser(){
    let user = JSON.parse(localStorage.getItem("admin-cross-user"))
    if(user){
        return user
    }
    return null
}

function openModal(modal,className){
    modal.classList.add(className)
}

function closeModal(modal,className){
    modal.classList.remove(className)
}

export {authUser, saveUser , getUser,getPublicData ,closeModal, openModal, postNewCard , updateCurrCard , deleteCurrCard, getAdmins}