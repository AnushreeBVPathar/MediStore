import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

let addToCart =document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(medicine){
    axios.post('/update-cart',medicine).then(res=>{
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type:'success',
            timeout:1000,
            text: 'Item added to cart',
            progressBar:false,
        }).show();
    }).catch(err => {
        new Noty({
            type:'error',
            timeout:1000,
            text: 'Something went wrong',
            progressBar:false,
        }).show();
    })

}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let medicine = JSON.parse(btn.dataset.medicine);
        updateCart(medicine);
        console.log(medicine);
    })
})

//remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000);
}

initAdmin()
