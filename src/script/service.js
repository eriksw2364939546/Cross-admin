import{ADMIN_URL, PUBLIC_URL} from "./key.js"

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

export {authUser, saveUser , getUser}