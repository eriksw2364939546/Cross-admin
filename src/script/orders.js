import { getOrders, updateOrders } from "./service.js";

let ordersList = document.querySelector(".main__section.orders")


getOrders().then(data => renderOrders(data))

function renderOrders(array) {
	ordersList.innerHTML = ""

	array.forEach(order => {
        let products = ""

		order.products.forEach(prod => {
			products += `<li>Product id ${prod.productId} - ${prod.count} pcs</li>`
		})

        let orderStatus = ""
                                
        if(order.status == "Waiting") orderStatus =` <span id="order-status-waiting">Waiting</span> `
        if(order.status == "Completed") orderStatus =` <span id="order-status-completed">Completed</span> `
        if(order.status == "Canceled") orderStatus =` <span id="order-status-canceled">Canceled</span> `


		ordersList.innerHTML += `
                                   <div class="orders__card" data-id="${order.id}">
                            <div class="row">
                            <div class="order__swiper">
									 		<h3>Client</h3>
                                <p>${order.userName}<br></p> 
                                <p>${order.adres}</p>
                                <p>${order.telephone}</p>
                                <p>${order.email}</p>
										  <h3>Products</h3>
										  <ul>
										 	${products} 
										  </ul>
                                <h3>Full price - ${order.allPrice} $</h3>
                            </div>
                            </div>
                            <div class="row">
                                ${orderStatus}

                                <div class="orders__card-control btns">
                                    <button id="order-status-btn-complete">Completed</button>
                                    <button id="order-status-btn-waiting">Waiting</button>
                                    <button id="order-status-btn-canceled">Canceled</button>
                                </div>
                            </div>
                           </div>
        
        `
	});
}

ordersList.addEventListener("click", (event) => {
    let eTarget = event.target
    let orderId = eTarget.closest(".orders__card").dataset.id

    if(eTarget.closest("#order-status-btn-complete")){
      getOrders(orderId)
      .then(data => updateOrders(orderId,{...data , status: "Completed"})
    .then(() => getOrders().then(data => renderOrders(data))))
}

    if(eTarget.closest("#order-status-btn-waiting")){
        getOrders(orderId)
        .then(data => updateOrders(orderId,{...data , status: "Waiting"})
      .then(() => getOrders().then(data => renderOrders(data))))
    }

    if(eTarget.closest("#order-status-btn-canceled")){
        getOrders(orderId)
        .then(data => updateOrders(orderId,{...data , status: "Canceled"})
      .then(() => getOrders().then(data => renderOrders(data))))
    }
})
