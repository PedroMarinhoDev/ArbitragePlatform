const BTC_Price_Element = "BTC_MercadoBitcoin_Info";
let BTC_MER_BRL_Price, BTC_MER_USD_Price, BTC_BIN_USDT_Price, BTC_BIN_BRL_Price;
var USD_BRL = 4.11;

const URL_BTC_BRL_MER = "https://www.mercadobitcoin.net/api/BTC/ticker/";
const URL_BTC_USDT_BIN =
  "https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT";
const URL_USD_BRL =
  "https://free.currconv.com/api/v7/convert?q=USD_brl&compact=ultra&apiKey=b41d6d3a85b0730d9299";

window.onload = function what() {
  //getData_USD_BRL();
  getData_BTC_MER();
  getData_BTC_BIN();
  //addInfo();
  getDiff();
};

// Function to get data from an API
function getData_USD_BRL() {
  fetch(URL_USD_BRL)
    // Transform the data into a JSON object
    .then(API_Data => API_Data.json())
    // Pass the JSON data on to another function
    .then(JSON_Data => {
      assignData_USD_BRL(JSON_Data);
    });
}

// Function to receive the JSON data from the API call
function assignData_USD_BRL(data) {
  // Select the passed data (price) and set it to a variable
  USD_BRL = 4.11; //parseFloat(data.USD_BRL);
  console.log("USDBRL: " + USD_BRL);
  document.getElementById("exRate").innerHTML = `Exchange rate: ${USD_BRL}`;
}

// Function to get data from an API
function getData_BTC_MER() {
  // Get data from the API URL
  fetch(URL_BTC_BRL_MER)
    // Transform the data into a JSON object
    .then(API_Data => API_Data.json())
    // Pass the JSON data on to another function
    .then(JSON_Data => {
      assignData_BTC_MER(JSON_Data);
    });
}

// Function to receive the JSON data from the API call
function assignData_BTC_MER(data) {
  // Select the passed data (price) and set it to a variable
  BTC_MER_BRL_Price = parseFloat(data.ticker.last);

  // Pass the variable (value) on to another function

  convertBRLtoUSD(BTC_MER_BRL_Price);
  console.log("Mercado Bitcoin: " + BTC_BIN_USDT_Price);

  document.getElementById(
    "BTCBRL_Mer"
  ).innerHTML = `$ ${BTC_MER_USD_Price.toFixed(2)}`;

  getDiff();
  getArbRate();
}

function getData_BTC_BIN() {
  // Get data from the API URL
  fetch(URL_BTC_USDT_BIN)
    // Transform the data into a JSON object
    .then(API_Data => API_Data.json())
    // Pass the JSON data on to another function
    .then(JSON_Data => {
      assignData_BTC_BIN(JSON_Data);
    });
}
function assignData_BTC_BIN(data) {
  BTC_BIN_USDT_Price = data.price;

  // Select the passed data (price) and set it to a variable
  BTC_BIN_USDT_Price = parseFloat(data.price);
  // Pass the variable (value) on to another function
  //renderInfo(BTC_MER_BRL_Price);
  //convertBRLtoUSD(BTC_MER_BRL_Price);
  console.log("Binance: " + BTC_BIN_USDT_Price);
  document.getElementById(
    "BTCUSDT_Bin"
  ).innerHTML = `$ ${BTC_BIN_USDT_Price.toFixed(2)}`;
}

function convertUSDtoBRL(priceUSD) {
  BTC_BIN_BRL_Price = priceUSD * USD_BRL;
  console.log(BTC_BIN_BRL_Price);
}

function convertBRLtoUSD(priceBRL) {
  BTC_MER_USD_Price = priceBRL / USD_BRL;
  console.log("BRL Price in USD: " + BTC_MER_USD_Price);

  document.getElementById("BTCUSD_Mer").innerHTML = BTC_MER_BRL_Price.toFixed(
    2
  );
}

function getDiff() {
  var priceDiff = BTC_MER_BRL_Price / USD_BRL - BTC_BIN_USDT_Price;

  console.log(priceDiff);

  document.getElementById("MERBIN_Diff").innerHTML =
    "$ " + priceDiff.toFixed(2);
}

function getArbRate() {
  var arbRate = BTC_BIN_USDT_Price / (BTC_MER_BRL_Price / USD_BRL);

  console.log(arbRate);

  document.getElementById("MERBIN_Perc").innerHTML = "% " + arbRate.toFixed(2);
}

/* function addElement(data) {
  var para = document.createElement("p");
  var node = document.createTextNode(data);

  para.appendChild(node);

  var element = document.getElementById("BTC_Info");
  element.appendChild(para);
} */
/* 
function addInfo() {
  let output = `
  
  <div>
      <p>Exchange Rate: ${BTC_MER_BRL_Price}</p>
    </div>
  
  
  `;

  document.getElementById("BTC_Info").innerHTML = output;
} */
