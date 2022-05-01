var cart = {
  hPdt: null,
  // hPdt2: null,
  // hPdt3: null,
  hItems: null,
  items: {},
  iURL: "../images/menuPizza/",

  saveCart: function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // (B2) loadOldCart CART FROM LOCALSTORAGE
  loadOldCart: function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) {
      cart.items = {};
    } else {
      cart.items = JSON.parse(cart.items);
    }
  },

  // (B3) EMPTY ENTIRE CART
  emptyCart: function () {
    if (confirm("Empty cart?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.displayCart();
    }
  },

  // (C) INITIALIZE
  init: function () {
    // (C1) GET HTML ELEMENTS
    cart.hPdt = document.getElementById("fav-prod");
    cart.hPdt2 = document.getElementById("cla-prod");
    cart.hPdt3 = document.getElementById("del-prod");
    cart.hItems = document.getElementById("cart-items");

    // (C2) DRAW PRODUCTS LIST
    cart.hPdt.innerHTML = "";
    let p, item, part;
    for (let id in products) {
      // WRAPPER
      p = products[id];
       if (p.cat == "fav"){
        item = document.createElement("div");
        item.className = "p-item";
        cart.hPdt.appendChild(item);
  
        // PRODUCT IMAGE
        part = document.createElement("img");
        part.src = cart.iURL + p.img;
        part.className = "p-img";
        item.appendChild(part);
  
        // PRODUCT NAME
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "p-name";
        item.appendChild(part);
  
        // PRODUCT DESCRIPTION
        part = document.createElement("div");
        part.innerHTML = p.desc;
        part.className = "p-desc";
        item.appendChild(part);
  
        // PRODUCT PRICE
        part = document.createElement("div");
        part.innerHTML = "$" + p.price;
        part.className = "p-price";
        item.appendChild(part);
  
        // ADD TO CART
        part = document.createElement("input");
        part.type = "button";
        part.value = "Add to Cart";
        part.className = "cart p-add";
        part.onclick = cart.addToCart;
        part.dataset.id = id;
        item.appendChild(part);
       }

       if (p.cat == "cla"){
        item = document.createElement("div");
        item.className = "p-item";
        cart.hPdt2.appendChild(item);
  
        // PRODUCT IMAGE
        part = document.createElement("img");
        part.src = cart.iURL + p.img;
        part.className = "p-img";
        item.appendChild(part);
  
        // PRODUCT NAME
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "p-name";
        item.appendChild(part);
  
        // PRODUCT DESCRIPTION
        part = document.createElement("div");
        part.innerHTML = p.desc;
        part.className = "p-desc";
        item.appendChild(part);
  
        // PRODUCT PRICE
        part = document.createElement("div");
        part.innerHTML = "$" + p.price;
        part.className = "p-price";
        item.appendChild(part);
  
        // ADD TO CART
        part = document.createElement("input");
        part.type = "button";
        part.value = "Add to Cart";
        part.className = "cart p-add";
        part.onclick = cart.addToCart;
        part.dataset.id = id;
        item.appendChild(part);
       }

       if (p.cat == "del"){
        item = document.createElement("div");
        item.className = "p-item";
        cart.hPdt3.appendChild(item);
  
        // PRODUCT IMAGE
        part = document.createElement("img");
        part.src = cart.iURL + p.img;
        part.className = "p-img";
        item.appendChild(part);
  
        // PRODUCT NAME
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "p-name";
        item.appendChild(part);
  
        // PRODUCT DESCRIPTION
        part = document.createElement("div");
        part.innerHTML = p.desc;
        part.className = "p-desc";
        item.appendChild(part);
  
        // PRODUCT PRICE
        part = document.createElement("div");
        part.innerHTML = "$" + p.price;
        part.className = "p-price";
        item.appendChild(part);
  
        // ADD TO CART
        part = document.createElement("input");
        part.type = "button";
        part.value = "Add to Cart";
        part.className = "cart p-add";
        part.onclick = cart.addToCart;
        part.dataset.id = id;
        item.appendChild(part);
       }
    }

    // (C3) loadOldCart CART FROM PREVIOUS SESSION
    cart.loadOldCart();

    // (C4) LIST CURRENT CART ITEMS
    cart.displayCart();
  },

  // (D) displayCart CURRENT CART ITEMS (IN HTML)
  displayCart: function () {
    // (D1) RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) {
        empty = false;
        break;
      }
    }

    // (D2) CART IS EMPTY
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.hItems.appendChild(item);
    }

    // (D3) CART IS NOT EMPTY - displayCart ITEMS
    else {
      let p,
        total = 0,
        subtotal = 0;
      for (let id in cart.items) {
        // ITEM
        p = products[id];
        item = document.createElement("div");
        item.className = "c-item";
        cart.hItems.appendChild(item);

        // NAME
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "c-name";
        item.appendChild(part);

        // REMOVE
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.dataset.id = id;
        part.className = "c-del cart";
        part.addEventListener("click", cart.removeFromCart);
        item.appendChild(part);

        // QUANTITY
        part = document.createElement("input");
        part.type = "number";
        part.min = 0;
        part.value = cart.items[id];
        part.dataset.id = id;
        part.className = "c-qty";
        part.addEventListener("change", cart.itemQuantity);
        item.appendChild(part);

        // SUBTOTAL
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }

      // TOTAL AMOUNT
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML = "TOTAL: $" + Math.round(total * 100) / 100;
      cart.hItems.appendChild(item);

      // EMPTY BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.emptyCart);
      item.className = "c-empty cart";
      cart.hItems.appendChild(item);

      // CHECKOUT BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout";
      item.addEventListener("click", cart.checkout);
      item.className = "c-checkout cart";
      cart.hItems.appendChild(item);
    }
  },

  addToCart: function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
    }
    cart.saveCart();
    cart.displayCart();
  },

  itemQuantity: function () {
    if (this.value <= 0) {
      delete cart.items[this.dataset.id];
      cart.saveCart();
      cart.displayCart();
    } else {
      cart.items[this.dataset.id] = this.value;
      var total = 0;
      for (let id in cart.items) {
        total += cart.items[id] * products[id].price;
        document.getElementById("c-total").innerHTML = "TOTAL: $" + total;
      }
    }
  },

  removeFromCart: function () {
    delete cart.items[this.dataset.id];
    cart.saveCart();
    cart.displayCart();
  },
};
window.addEventListener("DOMContentLoaded", cart.init);
