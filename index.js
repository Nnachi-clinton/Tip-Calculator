// getting reference to the required elements

const billInput = document.querySelector('input[name="bill"]');
const tipPercentButton = document.querySelectorAll(".tip-percent");
const customTipInput = document.querySelector('input[name ="custom"]');
const numberOfPeopleInput = document.querySelector('input[name ="people"]');

const tipAmountPerPerson = document.querySelector("#tip-amount");
const totalAmountPerPerson = document.querySelector("#total-amount");
const resetButton = document.querySelector('button[type="reset"]');

// console.log(
//   billInput,
//   tipPercentButton,
//   customTipInput,
//   numberOfPeopleInput,
//   tipAmountPerPerson,
//   totalAmountPerPerson,
//   resetButton
// );

function calculateBill() {
  const billAmount = parseFloat(billInput.value) || 0;
  const constomTipPercent = parseFloat(customTipInput.value) || 0;
  const numberOfPeople = parseInt(numberOfPeopleInput.value) || 0;

  if (numberOfPeople <= 0) {
    document.querySelector(".error-message").textContent =
      "Can't be less than or equal to zero";
    return;
  } else {
    document.querySelector(".error-message").textContent = "";
  }
  let tipPercent = 0;
  //check if a custom tip was provided, otherwise use the selected button value
  if (!isNaN(constomTipPercent) && constomTipPercent > 0) {
    tipPercent = constomTipPercent;
  } else {
    const selected = document.querySelector(".tip-percent.active");
    if (selected) {
      tipPercent = parseInt(selected.value);
    }
  }
  const tipAmount = calculateTipPercentPerPerson(
    billAmount,
    tipPercent,
    numberOfPeople
  );

  const totalAmount = calculateTotalAmountPerPerson(
    billAmount,
    tipPercent,
    numberOfPeople
  );
  console.log(billAmount, tipPercent, numberOfPeople, tipAmount, totalAmount);

  tipAmountPerPerson.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountPerPerson.textContent = `$${totalAmount.toFixed(2)}`;
}
calculateBill();

//helper function to calculate total amount per person
function calculateTotalAmountPerPerson(billAmount, tipPercent, numberOfPeople) {
  const tipAmount = billAmount * (tipPercent / 100);
  return (billAmount + tipAmount) / numberOfPeople;
}

//helper function to  calculate tip amount per person
function calculateTipPercentPerPerson(billAmount, tipPercent, numberOfPeople) {
  return (billAmount * (tipPercent / 100)) / numberOfPeople;
}

// add event listener to number of people input field
numberOfPeopleInput.addEventListener("input", calculateBill);

//add event listener to the tip percent buttons

tipPercentButton.forEach((button) => {
  button.addEventListener("click", () => {
    //remove active class from all buttons
    tipPercentButton.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    calculateBill();
  });
});

//add event listener to custom tip input field

customTipInput.addEventListener("input", () => {
  tipPercentButton.forEach((btn) => btn.classList.remove("active"));
  calculateBill();
});

//add event listener to the reset button

resetButton.addEventListener("click", () => {
  billInput.value = "";
  tipPercentButton[0].click();
  numberOfPeopleInput.value = "";
  customTipInput.value = "";
  tipAmountPerPerson.textContent = `$0.00`;
  totalAmountPerPerson.textContent = `$0.00`;
});
