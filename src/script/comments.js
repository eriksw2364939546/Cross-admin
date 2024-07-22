import { getPublicData, deleteCurrCard } from "./service.js";

let containerForComments = document.querySelector(".main__section.comments")


getPublicData("Comments").then(data => renderComments(data))


containerForComments.addEventListener("click", (ev) => {
    let cardId = ev.target.closest(".comment__card-header").dataset.id

    if(ev.target.closest(".comment__card-delete")){
      let isDelete = confirm("This comment will be deleted!")

      if(isDelete){
          deleteCurrCard("public", "Comments", cardId).then(() => {
          getPublicData("Comments").then(data => renderComments(data))
          })
      }
    }
})



function renderComments (comments){
    containerForComments.innerHTML = ""

    comments.forEach(comment => {
        containerForComments.innerHTML += `
                                   <div class="comments__card">
                                   <div class="comment__card-header" data-id="${comment.id}">
                                    <h3>${comment.title}</h3>
                                    <button class="comment__card-delete">Del</button>
                                   </div>

                               <p class="comment">${comment.text}</p>
                               <div class="row">
                                <p class="comment__user-name">${comment.author}</p>
                                <p class="comment__date">${comment.date}</p>
                               </div>
                           </div>
        
        `
    })
}
