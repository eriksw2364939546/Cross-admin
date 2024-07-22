import { getOrders } from "./service.js";

let ordersList = document.querySelector(".main__section.orders")


getOrders().then(data => renderOrders(data))





function renderOrders(array){
    ordersList.innerHTML = ""

    let products = ""
      

    array.forEach(order => {

        order.products.forEach(prod => {
            products += `<li>Product id ${prod.productId} - ${prod.count} pcs</li>`
        })

        
        ordersList.innerHTML += `
                                   <div class="orders__card" data-id="${order.id}">
                            <div class="row">
                            <div class="order__swiper">
                                <p>${order.userName}<br></p> 
                                <p>${order.adres}</p>
                                <p>${order.telephone}</p>
                                <p>${order.email}</p>
                                <ul>
                                ${products}
                                </ul>
                                <p>Fool price - ${order.allPrice} $</p>
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
    })
}