import{getPublicData , openModal , closeModal , postNewCard , updateCurrCard , deleteCurrCard} from "./service.js"

let productsList = document.querySelector("section.products")
let modalEditProd = document.querySelector(".modal__edit-prod")
let modalCloseProd = document.querySelector(".modal__edit-close button")
let modalHeaderAdd = document.querySelector(".header__btn-add")

let prodForm = document.querySelector(".modal__edit-prod form")
let modalInpTitle = document.querySelector(".modal__edit-title")
let modalInpDescrTextaria = document.querySelector(".modal__edit-descr")
let modalInpPrice = document.querySelector(".modal__edit-price")
let modalInpCategory = document.querySelector(".modal__edit-category")
let modalInpDiscVal = document.querySelector(".modal__edit-disc-val")
let modalInpImage = document.querySelector(".modal__edit-image")

let modalInpRadioTopOn = document.querySelector("#prod-top-on")
let modalInpRadioDiscOn = document.querySelector("#prod-disc-on")

let modalInpRadioTopOff = document.querySelector("#prod-top-off")
let modalInpRadioDiscOff = document.querySelector("#prod-disc-off")

let formPozition = ""

let editCardId = null



getPublicData("Products").then(data => renderProducts(data))



modalHeaderAdd.addEventListener("click", () => {
    openModal(modalEditProd, "modal__edit-active")
	formPozition = "adder"
	modalInpRadioTopOff.checked = true
	modalInpRadioDiscOff.checked = true
})

modalCloseProd.addEventListener("click", () => {
	closeModal(modalEditProd, "modal__edit-active")
	clearForm()
	
})

function clearForm(){
	modalInpTitle.value = ""
	modalInpDescrTextaria.value = ""
	modalInpPrice.value = ""
	modalInpCategory.value = ""
	modalInpDiscVal.value = ""
	modalInpImage.value = ""
}

productsList.addEventListener("click", (event) => {
	let trg = event.target
	
	let cardId = trg.closest(".products__card-control").dataset.id
	editCardId = cardId
	


	if(trg.closest(".products__card-del")){
     let isDelete = confirm("This product will be deleted!")

	 if(isDelete){
		deleteCurrCard("public", "Products", cardId).then(() => {
		getPublicData("Products").then(data => renderProducts(data))
		})
	 }



	}
	if(trg.closest(".products__card-edit")){
		formPozition = "editor"
		getPublicData(`Products/${cardId}`).then(data => {
			modalInpTitle.value = data.title
			modalInpDescrTextaria.value = data.descr
			modalInpPrice.value = data.price
			modalInpCategory.value = data.category
			modalInpDiscVal.value = data.discountValue
			modalInpImage.value = data.image

			if(data.top){
				modalInpRadioTopOn.checked = true
			}else{
				modalInpRadioTopOff.checked = true
			}

			if(data.discount){
				modalInpRadioDiscOn.checked = true
			}else{
				modalInpRadioDiscOff.checked = true
			}
		})
		openModal(modalEditProd, "modal__edit-active")
		
	}
})

prodForm.addEventListener("submit", (e) => {
	e.preventDefault()

	let prodTopOn = modalInpRadioTopOn.checked ? true : false
	let prodDiscOn = modalInpRadioDiscOn.checked ? true : false

	let newCard = {
		image: modalInpImage.value,
		title: modalInpTitle.value,
		descr: modalInpDescrTextaria.value,
		price: modalInpPrice.value,
		discount: prodDiscOn,
		discountValue: modalInpDiscVal.value,
		top: prodTopOn,
		category: modalInpCategory.value,	
	}

	if(formPozition === "adder"){
       postNewCard("public","Products", newCard).then(() => {
		closeModal(modalEditProd, "modal__edit-active")
		clearForm()
		getPublicData("Products").then(data => renderProducts(data))

	   })
	}

	if (formPozition === "editor") {

		updateCurrCard("public", "Products", editCardId , newCard).then(() => {
		closeModal(modalEditProd, "modal__edit-active")
		clearForm()
		getPublicData("Products").then(data => renderProducts(data))

		})
	}
})




function renderProducts(product){
productsList.innerHTML = ""

product.forEach(prod => {
    productsList.innerHTML += `
                            <div class="products__card">
							<div class="row">
								<div class="products__card-info">
									<img src="${prod.image}" alt="${prod.title + "img"}">
									<div class="products__card-descr">
										<h3>${prod.title}</h3>
										<p>${prod.descr}</p>
										<p>${prod.price}$</p>
									</div>
								</div>
								<div class="products__card-control" data-id="${prod.id}">
									<button class="products__card-del">DELETE</button>
									<button class="products__card-edit">EDIT</button>
								</div>
							</div>
						</div>
    
    `
})
}