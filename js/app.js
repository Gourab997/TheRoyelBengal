const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `


    <div class="single-product m-3 card flex-fill" style="background-image: linear-gradient(rgb(255, 255, 255), rgba(204, 204, 204, 0.76)) ">
      <div class="card-body">
    <img class="product-image" src=${image}></img>
      </div>
      <h5 class="card-text">${product?.title.slice(0, 55)}</h5>
      <p class="card-text text-info fw-bold">Category: ${product.category}</p>
      <h3 class="card-text ">Price: <span style="color: orange;"> $ ${product.price} </span></h3>
      <p class="card-text"> <i class="fas fa-star text-warning"></i> ${product.rating.rate} &nbsp &nbsp &nbsp &nbsp <i class="fas fa-user-check text-primary"></i> ${product.rating.count} </p>
   

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success"><i class="fas fa-cart-plus"></i> add to cart</button> <br>
      <button id="details-btn" class="btn btn-danger">Details <i class="fas fa-angle-double-right"></i></button></div>
 
     
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  const changePrice = document.getElementById(id);
  const changingText = Math.round(total * 100) / 100


  changePrice.innerText = changingText;


};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.floor(value * 100) / 100;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  debugger;
  if (priceConverted < 200) {
    setInnerText("delivery-charge", 20);
  }
  else if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  else if (priceConverted > 400) {


    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  else {

    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }

};



//grandTotal update function
const updateTotal = () => {

  const totalPriceText = document.getElementById('price').innerText
  const totalPrice = parseFloat(totalPriceText)
  const deliveryChargeText = document.getElementById('delivery-charge').innerText
  const deliveryCharge = parseFloat(deliveryChargeText)
  const totalTaxText = document.getElementById('total-tax').innerText
  const totalTax = parseFloat(totalTaxText)

  const grandTotal =
    totalPrice + deliveryCharge + totalTax;

  const priceAvg = Math.round(parseFloat(grandTotal) * 100) / 100
  document.getElementById("total").innerText = priceAvg;



};


