import { getOrders } from "./service.js";

let ordersList = document.querySelector(".main__section.orders")


getOrders().then(data => renderOrders(data))





function renderOrders(array) {
	ordersList.innerHTML = ""

	array.forEach(order => {
        let products = ""

		order.products.forEach(prod => {
			products += `<li>Product id ${prod.productId} - ${prod.count} pcs</li>`
		})

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
                                <span>Completed</span>

                                <div class="orders__card-control btns">
                                    <button>Completed</button>
                                    <button>Waiting</button>
                                    <button>Canceled</button>
                                </div>
                            </div>
                           </div>
        
        `
	});
}