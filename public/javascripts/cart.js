const $ = (id) => document.getElementById(id);

const showProductInCart = (products, total) => {
  if (products.length) {
    if ($("cart-table")) {
      $("cart-table").innerHTML = null;
      products.forEach(({ id, image, name, price, discount, quantity }) => {
        $("cart-table").innerHTML += `
        <tr>
            <th scope="row">
            <img src="/images/${image}" width="100" alt="" />
            </th>
            <td>${name}</td>
            <td>
              <div class="d-flex gap-2">
                <button onclick="removeItemToCart(${id})" class="btn btn-sm btn-danger"><i class="fa-solid fa-minus"></i></button>
                <input type="text" value="${quantity}" style="width:30px;text-align:center"/>
                <button onclick="addItemToCart(1, ${id})" class="btn btn-sm btn-success"><i class="fa-solid fa-plus"></i></button>
              </div>
            </td>
            <td>${price * quantity}</td>
            <td>
              <h3 class="text-danger" onclick="removeAllItem(${id})"><i class="fa fa-trash"></i></h3>
            </td>
        </tr>
        `;
      });
      $("showTotal").innerHTML = total;
      $('btn-empty-cart').classList.remove('disabled')
    }
  } else {
    $("cart-body").innerHTML = `
  <div class="alert alert-warning" role="alert">
      No hay productos en el carrito.
  </div>
`;
$('btn-empty-cart').classList.add('disabled')

  }
};

const showCountCart = (products) => {
  sessionStorage.setItem(
    "countCart",
    products.map((product) => product.quantity).reduce((a, b) => a + b, 0)
  );
  $("show-count-cart").innerHTML = sessionStorage.getItem("countCart");
};

const showMessageInfo = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "info",
    title: message
  });
}


const addItemToCart = async (quantity, product) => {
  try {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify({
        quantity,
        product: +product,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const {
      ok,
      cart: { products, total },
      message,
    } = await response.json();

    if (!ok) {
      throw new Error(message);
    }

    showProductInCart(products, total);
    showCountCart(products);
    showMessageInfo(message)

  } catch (error) {
    Swal.fire({
      title: "Upss",
      text: error.message,
      icon: "error",
    });
  }
};

const removeItemToCart = async (id) => {
  try {
    const response = await fetch(`/cart?product=${id}`, {
      method: "DELETE",
    });

    const {
      ok,
      cart: { products, total },
      message,
    } = await response.json();

    if (!ok) {
      throw new Error(message);
    }

    showProductInCart(products, total);
    showCountCart(products);
    showMessageInfo(message)

  } catch (error) {
    Swal.fire({
      title: "Upss",
      text: error.message,
      icon: "error",
    });
  }
};

const removeAllItem = async (id) => {
  try {
    const response = await fetch(`/cart/item-all?product=${id}`, {
      method: "DELETE",
    });
    const {
      ok,
      cart: { products, total },
      message,
    } = await response.json();

    if (!ok) {
      throw new Error(message);
    }

    showProductInCart(products, total);
    showCountCart(products);
    showMessageInfo(message)

  } catch (error) {
    Swal.fire({
      title: "Upss",
      text: error.message,
      icon: "error",
    });
  }
};

const emptyCart = async () => {
  try {
    const response = await fetch('/cart/all', {
      method : 'delete'
    })

    const {
      ok,
      cart: { products, total },
      message,
    } = await response.json();

    if (!ok) {
      throw new Error(message);
    }

    showProductInCart(products, total);
    showCountCart(products);
    showMessageInfo(message);


  } catch (error) {
    Swal.fire({
      title: "Upss",
      text: error.message,
      icon: "error",
    });
  }
}

window.onload = function () {
  sessionStorage.setItem("countCart", sessionStorage.getItem("countCart") || 0);
  $("show-count-cart").innerHTML = sessionStorage.getItem("countCart");
  $("show-count-cart").hidden = false;

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
                  <caption>
                  <div class="d-flex justify-content-end">
                  $ <span id="showTotal"></span> 
                  </div>
                  </caption>
            </table>
            `;

            showProductInCart(cart.products, cart.total);
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
