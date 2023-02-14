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

function glazingChange(element){
  const displayPrice = document.querySelector('.price-detail');
  const glazingChange = parseFloat(element.value); 
  const packMult = document.querySelector('#pack-size-dropdown').value; 
  const currentPrice = (2.49 + glazingChange) * packMult; 
  displayPrice.innerText = '$ ' + parseFloat(currentPrice).toFixed(2); 
}

function packChange(element){
  const displayPrice = document.querySelector('.price-detail');
  const packChange = element.value; 
  const glazingPrice = document.querySelector('#glazing-dropdown').value; 
  const currentPrice = (2.49 + parseFloat(glazingPrice)) * packChange; 
  displayPrice.innerText = '$ ' + parseFloat(currentPrice).toFixed(2); 
}

/*REFERENCE SOURCE for toFixed() https://www.techonthenet.com/js/number_tofixed.php */ 





