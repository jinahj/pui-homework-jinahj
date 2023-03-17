//copied from rollsData 
const rolls = {
  "Original": {
      "basePrice": 2.49,
      "imageFile": "original-cinnamon-roll.jpg"
  },
  "Apple": {
      "basePrice": 3.49,
      "imageFile": "apple-cinnamon-roll.jpg"
  },
  "Raisin": {
      "basePrice": 2.99,
      "imageFile": "raisin-cinnamon-roll.jpg"
  },
  "Walnut": {
      "basePrice": 3.49,
      "imageFile": "walnut-cinnamon-roll.jpg"
  },
  "Double-Chocolate": {
      "basePrice": 3.99,
      "imageFile": "double-chocolate-cinnamon-roll.jpg"
  },
  "Strawberry": {
      "basePrice": 3.99,
      "imageFile": "strawberry-cinnamon-roll.jpg"
  }    
};

const allGlazingOptions = [
  {
    glazingOption: 'Keep original',
    priceAdaptation: 0,
  },
  {
    glazingOption: 'Sugar milk',
    priceAdaptation: 0,
  },
  {
    glazingOption: 'Vanilla milk',
    priceAdaptation: 0.5,
  },
  {
    glazingOption: 'Double chocolate',
    priceAdaptation: 1.5,
  },
];

const allPackSizeOptions = [
  {
    packSizeOption: '1',
    priceAdaptation: 1,
  },
  {
    packSizeOption: '3',
    priceAdaptation: 3,
  },
  {
    packSizeOption: '6',
    priceAdaptation: 5,
  },
  {
    packSizeOption: '12',
    priceAdaptation: 10,
  },
];


for (let i = 0; i < allGlazingOptions.length; i++){
  var newOption = document.createElement('option');
  newOption.text = allGlazingOptions[i].glazingOption; 
  newOption.value = allGlazingOptions[i].priceAdaptation; 
  const select = document.querySelector('#glazing-dropdown'); 
  select.appendChild(newOption);
}

for (let i = 0; i < allPackSizeOptions.length; i++){
  var newOption = document.createElement('option');
  newOption.text = allPackSizeOptions[i].packSizeOption; 
  newOption.value = allPackSizeOptions[i].priceAdaptation; 
  const select = document.querySelector('#pack-size-dropdown'); 
  select.appendChild(newOption);
}

//Create empty array for cart 
let cart = []; 

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll'); 
//console.log(rolls[rollType]);

//update header text
const headerElement = document.querySelector('#detail-header-text'); 
headerElement.innerText = rollType + " Cinnamon Roll"; 

//update image
const rollImage = document.querySelector('.product-photo-detail'); 
rollImage.src = './assets/' + rollType.toLowerCase() + '-cinnamon-roll.jpeg'; 

//update base price function depending on the roll type 
const rollPrice = document.querySelector(".price-detail"); 
const basePrice = rolls[rollType].basePrice;
rollPrice.innerText = "$ " + basePrice; 

//retrieve glazing and size 

function glazingChange(element){
  const displayPrice = document.querySelector('.price-detail');
  const glazingChange = parseFloat(element.value); 
  const packMult = document.querySelector('#pack-size-dropdown').value; 
  const currentPrice = (basePrice + glazingChange) * packMult; 
  displayPrice.innerText = '$ ' + parseFloat(currentPrice).toFixed(2); 
}

function packChange(element){
  const displayPrice = document.querySelector('.price-detail');
  const packChange = element.value; 
  const glazingPrice = document.querySelector('#glazing-dropdown').value; 
  const currentPrice = (basePrice + parseFloat(glazingPrice)) * packChange; 
  displayPrice.innerText = '$ ' + parseFloat(currentPrice).toFixed(2); 
}
/*REFERENCE SOURCE for toFixed() https://www.techonthenet.com/js/number_tofixed.php */ 
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

function onSelectValueChange() {
  const newRoll = new Roll();
  newRoll.type = rollType;   
  var currGlazing = document.querySelector('#glazing-dropdown'); 
  newRoll.glazing = currGlazing.options[currGlazing.selectedIndex].text; 
  var currSize = document.querySelector('#pack-size-dropdown'); 
  newRoll.size = currSize.options[currSize.selectedIndex].text; 
  newRoll.basePrice = basePrice; 
  cart.push(newRoll); 

  saveToLocalStorage(); 
}

let addToCart = document.querySelector("#add-to-cart-button"); 
addToCart.addEventListener('click', onSelectValueChange);

let tempArray = []; 

if (cart.length == 0 && localStorage != null){
  const cartArrayString = localStorage.getItem('storedItems');
  const cartArray = JSON.parse(cartArrayString);
  tempArray = cartArray; 
}

function saveToLocalStorage() {
  if (tempArray != null && tempArray.length > 0){
    let rebuild = []; 
    for (const item of tempArray){
      rebuild.push(item); 
    }

    for (const item of cart){
      rebuild.push(item); 
    }

    cart = rebuild; 
  }

  const cartArrayString = JSON.stringify(cart);
  localStorage.setItem('storedItems', cartArrayString);

  console.log(localStorage.getItem('storedItems'));
}


