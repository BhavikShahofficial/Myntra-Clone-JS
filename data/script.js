let bagItems = [];
onLoad();

function onLoad() {
  let bagItemsstr = localStorage.getItem("bagItems");
  bagItems = bagItemsstr ? JSON.parse(bagItemsstr) : [];
  addElement();
  displayBagCount();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagCount();
}

function displayBagCount() {
  let bagCount = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagCount.style.visibility = "visible";
    bagCount.innerText = bagItems.length;
  } else {
    bagCount.style.visibility = "hidden";
  }
}

function addElement() {
  let itemsContainerElement = document.querySelector(".items-container");

  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = " ";
  items.forEach((item) => {
    innerHtml += `
  <div class="item-container">
          <img src=${item.image} alt="image" class="card-image" />
          <div class="rating">${item.rating.stars}⭐|${item.rating.count}</div>
          <div class="company-name">${item.company}</div>
          <div class="item-name">${item.item_name}</div>
          <div class="price">
            <span class="current-price">Rs${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% off)</span>
          </div>
          <button class="bag-btn" onclick = "addToBag(${item.id})">Add to bag</button>
    </div>
  `;
  });
  itemsContainerElement.innerHTML = innerHtml;
}
