const cart  = new Set(); 

class Roll {
  constructor(rollType, rollGlazing, packSize, rollPrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = rollPrice;

      this.element = null; 
  }
}

function totalItemPrice(roll){
  const glazing = roll.glazing;  
  const packSize = roll.size; 
  let glazingAdd = 0; 
  let packSizeMult = 0; 

  if (glazing == 'Keep original'){
    glazingAdd = 0; 
  }

  if (glazing == 'Sugar milk'){
    glazingAdd = 0; 
  }

  if (glazing == 'Vanilla milk'){
    glazingAdd = 0.5; 
  }

  if (glazing == 'Double chocolate'){
    glazingAdd = 1.5; 
  }

  if (packSize == 1){
    packSizeMult = 1; 
  }

  if (packSize == 3){
    packSizeMult = 3; 
  }

  if (packSize == 6){
    packSizeMult = 5; 
  }

  if (packSize == 12){
    packSizeMult = 10; 
  }

  return ((roll.basePrice + glazingAdd) * packSizeMult).toFixed(2); 
}


function addNewRoll(rollType, rollGlazing, packSize, rollPrice){
  const roll = new Roll(rollType, rollGlazing, packSize, rollPrice); 
  cart.add(roll); 
  return roll; 
}

//make 4 new roll objects
const rollOne = addNewRoll(
  "Original", 
  "Sugar milk",
  1, 
  2.49
); 

const rollTwo = addNewRoll(
  "Walnut", 
  "Vanilla milk",
  12, 
  3.49
); 

const rollThree = addNewRoll(
  "Raisin", 
  "Sugar milk",
  3, 
  2.99
); 

const rollFour = addNewRoll(
  "Apple", 
  "Keep original",
  3, 
  3.49
);

//iterate through notecard set and create DOM element for each
let currentCartTotal = 0; 

for (const roll of cart){
  createElement(roll); 
}

function deleteRoll(roll){
  roll.element.remove(); 
  cart.delete(roll); 
}

//create element function 
function createElement(roll){
  const template = document.querySelector('#cart-template')
  const clone = template.content.cloneNode(true); 

  roll.element = clone.querySelector('.cart-container');
  updateElement(roll); 

  const removeBtn = roll.element.querySelector('.remove'); 
  removeBtn.addEventListener('click', () => {
    if(cart.size > 0){
      deleteRoll(roll);
      currentCartTotal -= parseFloat(totalItemPrice(roll)); 
      const cartTotalElement = document.querySelector('.cart-price-total'); 
      cartTotalElement.innerText = '$ ' + parseFloat(currentCartTotal.toFixed(2));
    }
  });


  const rollListElement = document.querySelector('.cart-combined-container'); 
  rollListElement.append(roll.element)

  currentCartTotal += parseFloat(totalItemPrice(roll)); 
  const cartTotalElement = document.querySelector('.cart-price-total'); 
  cartTotalElement.innerText = '$ ' + parseFloat(currentCartTotal.toFixed(2));
}


function updateElement(roll){
  const rollImageElement = roll.element.querySelector('.product-photo-cart'); 
  rollImageElement.src = './assets/' + roll.type.toLowerCase() + '-cinnamon-roll.jpeg'; 
  rollImageElement.alt = roll.type.toLowerCase() + 'cinnamon roll'; 

  const rollTypeElement = roll.element.querySelector('#type'); 
  rollTypeElement.innerText = roll.type + ' Cinnamon Roll'; 

  const rollGlazingElement = roll.element.querySelector('#glazing'); 
  rollGlazingElement.innerText = 'Glazing: ' + roll.glazing; 

  const rollPackSizeElement = roll.element.querySelector('#pack-size');
  rollPackSizeElement.innerText = 'Pack Size: ' + roll.size; 

  const itemPrice = roll.element.querySelector('.cart-price'); 
  itemPrice.innerText = '$ ' + totalItemPrice(roll); 
}
