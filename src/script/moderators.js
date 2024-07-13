import { getAdmins } from "./service.js";

let containerForModerators = document.querySelector(".main__section.moderators")

getAdmins().then(data => renderModerators(data))


function renderModerators(moder){
    containerForModerators.innerHTML = ""

    moder.forEach(el => {
        containerForModerators.innerHTML += `
                                   <div class="moderators__card">
                            <div class="row">
                                <div class="moderators__card-header">
                                    <p>${el.userName}</p>
                                    <span class="mod__role">[${el.role}]</span>
                                </div>
                                
                                <div class="moderators__card-buttons">
                                    <button>Delete</button>
                                    <button>Edit</button>
                                </div>
                            </div>
                           </div>
        
        `
    })
}

