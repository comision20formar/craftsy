const $ = id => document.getElementById(id)

window.onload = function () {


    $('btn-cart') && $('btn-cart').addEventListener('click', async function (e) {
        
        try {

            const response = await fetch('/cart');
            const result = await response.json();

            console.log(result);
            
        } catch (error) {
            console.log(error);
        }
    })


}