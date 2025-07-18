const BASE_URL = "https://api.frankfurter.app/latest?from=USD&to=INR";

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msgs");

for (let select of dropdown){
  for (currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    
    if (select.name === "from" && currCode === "USD"){
        newOption.selected = "selected"
    } else if (select.name === "to" && currCode === "INR"){
        newOption.selected = "selected"
    }
      select.append(newOption);

}

    select.addEventListener("change", (evt) =>{
      updateFlag(evt.target);
  })
}
const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let newImg = element.parentElement.querySelector("img");
if (newImg) { // check if img exists
    newImg.src = newSrc;
  }
}

btn.addEventListener('click', async (evt) => {
  evt.preventDefault();
  msg.innerText = "Getting exchange rate...";
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  try {
    let response = await fetch(URL);
    if (!response.ok) {
      msg.innerText = "Currency pair not supported or API error.";
      return;
    }
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    msg.innerText = `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
    console.error(error);
  }
});