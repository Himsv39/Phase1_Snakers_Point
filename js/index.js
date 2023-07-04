import { foodItem } from "./foodItems.js";

function displayItems() {
  var biryani = document.getElementById("biryani");
  var chicken = document.getElementById("chicken");
  var vegetable = document.getElementById("vegetable");
  var paneer = document.getElementById("paneer");
  var chinese = document.getElementById("chinese");
  var southIndian = document.getElementById("southIndian");

  //   filtering out Items from json where cateogry is Biryani
  const biryaniItems = foodItem.filter((item) => item.category == "biryani");
  const chickenItems = foodItem.filter((item) => item.category == "chicken");
  const vegItems = foodItem.filter((item) => item.category == "vegetable");
  const paneerItems = foodItem.filter((item) => item.category == "paneer");
  const chineseItems = foodItem.filter((item) => item.category == "chinese");
  const southIndItems = foodItem.filter(
    (item) => item.category == "south indian"
  );
  CreateParentChildElements(biryaniItems, biryani);
  CreateParentChildElements(chickenItems, chicken);
  CreateParentChildElements(vegItems, vegetable);
  CreateParentChildElements(paneerItems, paneer);
  CreateParentChildElements(chineseItems, chinese);
  CreateParentChildElements(southIndItems, southIndian);
}

function CreateParentChildElements(itemArray, itemMain) {
  itemArray.map((item) => {
    //   creating the parent div container
    var itemCard = document.createElement("div");
    itemCard.setAttribute("id", "item-card");

    //   creating div container to place start icon and like
    var cardTop = document.createElement("div");
    cardTop.setAttribute("id", "card-top");

    var star = document.createElement("i");
    star.setAttribute("id", "rating");
    star.setAttribute("class", "fa fa-star");
    star.innerText = " " + item.rating;

    var heart = document.createElement("i");
    heart.setAttribute("id", item.id);
    heart.setAttribute("class", "fa fa-heart-o add-to-cart");

    cardTop.appendChild(star);
    cardTop.appendChild(heart);

    var img = document.createElement("img");
    img.src = item.img;

    var itemName = document.createElement("p");
    itemName.setAttribute("id", "item-name");
    itemName.innerText = item.name;

    var itemPrice = document.createElement("p");
    itemPrice.setAttribute("id", "item-price");
    itemPrice.innerText = "Price : $ " + item.price;

    itemCard.appendChild(cardTop);
    itemCard.appendChild(img);
    itemCard.appendChild(itemName);
    itemCard.appendChild(itemPrice);

    itemMain.appendChild(itemCard);
  });
}
displayItems();

// filtering unique items from food Item Array based on Category
const categoryListData = [
  ...new Map(foodItem.map((item) => [item["category"], item])).values(),
];

function displayCategoryList() {
  var categoryList = document.getElementById("category-list");

  categoryListData.map((item) => {
    var listCard = document.createElement("div");
    listCard.setAttribute("class", "list-card");

    var img = document.createElement("img");
    img.src = item.img;

    var anch = document.createElement("a");
    anch.setAttribute("class", "list-name");
    anch.setAttribute("href", "#" + item.category.replace(" ", ""));
    anch.innerText = item.category;

    listCard.appendChild(img);
    listCard.appendChild(anch);

    var cloneListCard = listCard.cloneNode(true);
    categoryList.appendChild(listCard);
  });
}
displayCategoryList();

document.querySelectorAll(".add-to-cart").forEach((item) => {
  item.addEventListener("click", addToCart);
});

var cartData = [];
function addToCart() {
  console.log(this.parentNode.nextSibling.nextSibling.innerText);
  var itemToAddName = this.parentNode.nextSibling.nextSibling.innerText;
  var foodItemObj = foodItem.find((item) => item.name == itemToAddName);
  if (cartData.indexOf(foodItemObj) < 0) {
    document.getElementById(foodItemObj.id).classList.add("toggle-heart");
    cartData = [...cartData, foodItemObj];
    console.log(cartData);
  } else {
    alert("Selected Item already present in cart");
  }
  document.getElementById("cart-plus").innerText =
    " " + cartData.length + " Items";
  totalAmount();
}

function showCartItems() {
  var tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  if (cartData.length < 1) {
    alert("Currently no items are present in cart!!");
    return;
  }
  cartData.map((item) => {
    var tableRow = document.createElement("tr");

    var tabledata1 = document.createElement("td");
    var trImg = document.createElement("img");
    trImg.setAttribute("src", item.img);

    tabledata1.appendChild(trImg);

    var tabledata2 = document.createElement("td");
    tabledata2.innerText = item.name;

    var tabledata3 = document.createElement("td");

    var btnIncItem = document.createElement("button");
    btnIncItem.setAttribute("class", "inc-item");
    btnIncItem.innerHTML = "+";

    var span = document.createElement("span");
    span.innerText = item.quantity;

    var btnDecItem = document.createElement("button");
    btnDecItem.setAttribute("class", "dec-item");
    btnDecItem.innerHTML = "-";

    tabledata3.appendChild(btnIncItem);
    tabledata3.appendChild(span);
    tabledata3.appendChild(btnDecItem);

    var tabledata4 = document.createElement("td");
    tabledata4.innerText = item.price;

    tableRow.appendChild(tabledata1);
    tableRow.appendChild(tabledata2);
    tableRow.appendChild(tabledata3);
    tableRow.appendChild(tabledata4);

    tableBody.appendChild(tableRow);
  });

  document.querySelectorAll(".inc-item").forEach((item) => {
    item.addEventListener("click", handleItemIncreaseCountWithAmount);
  });
  document.querySelectorAll(".dec-item").forEach((item) => {
    item.addEventListener("click", handleItemdecreaseCountWithAmount);
  });
}

function handleItemIncreaseCountWithAmount() {
  var itemToInc = this.parentNode.previousSibling.innerText;
  console.log(itemToInc);

  let incObj = cartData.find((item) => item.name == itemToInc);

  incObj.quantity += 1;
  console.log(incObj);

  totalAmount();
  showCartItems();
}

function handleItemdecreaseCountWithAmount() {
  var itemToInc = this.parentNode.previousSibling.innerText;
  console.log(itemToInc);

  let decObj = cartData.find((item) => item.name == itemToInc);
  let indx = cartData.indexOf(itemToInc);

  if (decObj.quantity > 1) {
    decObj.quantity -= 1;
  } else {
    document.getElementById(decObj.id).classList.remove("toggle-heart");
    cartData.splice(indx, 1);
    if (cartData.length < 1) {
      document.getElementById("total-item").innerText = "Total item : ";
      document.getElementById("total-price").innerText = "Total Price : $ ";
      document.getElementById("food-items").classList.toggle("food-items");
      document.getElementById("category-list").classList.toggle("food-items");
      document.getElementById("cart-page").classList.toggle("cart-toggle");
      document.getElementById("checkout").classList.toggle("cart-toggle");
      document.getElementById("cart-plus").innerText = " 0 Items";
    }
  }
  totalAmount();
  showCartItems();
}

function totalAmount() {
  var sum = 0;
  cartData.forEach((item) => (sum += item.price * item.quantity));
  document.getElementById("total-item").innerText =
    "Total item : " + cartData.length;
  document.getElementById("total-price").innerText = "Total Price : $ " + sum;
  console.log(sum);
}

function cartToggle() {
  if (cartData.length > 0) {
    document.getElementById("food-items").classList.toggle("food-items");
    document.getElementById("category-list").classList.toggle("food-items");
    document.getElementById("cart-page").classList.toggle("cart-toggle");
    document.getElementById("checkout").classList.toggle("cart-toggle");

    showCartItems();
  } else {
    alert("Cart is empty!!");
  }
}

document.getElementById("cart-plus").addEventListener("click", cartToggle);
