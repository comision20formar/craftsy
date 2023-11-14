const $ = (id) => document.getElementById(id);

const addItemToCart = async (quantity, product) => {
  try {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify({
        quantity,
        product,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { ok, cart, message } = await response.json();

    if (!ok) {
      throw new Error(message);
    }
  } catch (error) {
    Swal.fire({
      title: "Upss",
      text: error.message,
      icon: "error",
    });
  }
};

window.onload = function () {
  $("btn-cart") &&
    $("btn-cart").addEventListener("click", async function (e) {
      try {
        const response = await fetch("/cart");
        const { ok, cart, message } = await response.json();

        if (ok) {
          if (cart.products.length) {
            $("cart-body").innerHTML = `
            
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Imagen</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody id="cart-table">
                  
                </tbody>
            </table>

            `;

            

            cart.products.forEach(({image, name,price,discount, quantity}) => {
                $('cart-table').innerHTML += `
                <tr>
                    <th scope="row">
                    <img src="/images/${image}" width=100 alt="" />
                    </th>
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${price}</td>
                </tr>
                `
            });

          } else {
            $("cart-body").innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        No hay productos en el carrito.
                    </div>
                  `;
          }
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Upss",
          text: message,
          icon: "error",
        });
      }
    });
};
