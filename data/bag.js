const ConvinianceFees = 99;

let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItems();
  displayBagItems();
  displayBagSum();
}

function displayBagSum() {
  let bagSummeryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemObjects.length;
  let totalMrp = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach((bagItem) => {
    totalMrp += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let totalPayment = totalMrp - totalDiscount + ConvinianceFees;

  bagSummeryElement.innerHTML = `
  <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount"
                >-₹ ${totalDiscount}</span
              >
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr />
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${totalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

function loadBagItems() {
  console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHtml = "";
  bagItemObjects.forEach((bagItem) => {
    innerHtml += generateItemHtml(bagItem);
  });
  containerElement.innerHTML = innerHtml;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItems();
  displayBagCount();
  displayBagItems();
  displayBagSum();
}

function generateItemHtml(items) {
  return `

  <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${items.image}" />
    </div>
    <div class="item-right-part">
      <div class="company">${items.company}</div>
      <div class="item-name">
      ${items.item_name}
      </div>
      <div class="price-container">
        <span class="current-price">Rs ${items.current_price}</span>
        <span class="original-price">Rs ${items.original_price}</span>
        <span class="discount-percentage">(${items.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${items.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${items.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${items.id})">X</div>
  </div>; `;
}
