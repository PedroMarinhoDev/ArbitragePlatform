const BTC_Price_Element = "BTC_MercadoBitcoin_Info";
let BTC_MER_BRL_Price, BTC_MER_USD_Price, BTC_BIN_USDT_Price, BTC_BIN_BRL_Price;

const URL_BTC_BRL_MER = "https://www.mercadobitcoin.net/api/BTC/ticker/";
const URL_BTC_USDT_BIN =
  "https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT";
const URL_USD_BRL =
  "https://free.currconv.com/api/v7/convert?q=USD_brl&compact=ultra&apiKey=b41d6d3a85b0730d9299";

window.onload = function what() {
  getData_USD_BRL();
  getData_BTC_MER();
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
  USD_BRL = parseFloat(data.USD_BRL);
  console.log(USD_BRL);
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
  renderInfo(BTC_MER_BRL_Price);
  convertBRLtoUSD(BTC_MER_BRL_Price);
}
// Function to add the passed data to the HTML
function renderInfo(data) {
  document.getElementById(BTC_Price_Element).innerHTML = data;
  console.log(USD_BRL);
}

/* function getData_BTC_MER() {
  $.getJSON(API_URLs.BRL.MercadoBitcoin.BTC_MercadoBitcoin, function(API_Data) {
    BTC_MER_BRL_Price = parseFloat(API_Data.ticker.last);

    renderInfo(BTC_MER_BRL_Price);
    //assignData_BTC_MER(API_Data);
  });
} */

function getData_BTC_BIN() {
  $.getJSON(API_URLs.USDT.BTC_Binance, function(API_Data) {
    assignData_BTC_BIN(API_Data);
  });
}
function assignData_BTC_BIN(data) {
  BTC_BIN_USDT_Price = data.price;
  console.log(BTC_BIN_USDT_Price);
}

function addInfo(assigned_Data) {
  document.getElementById(BTC_Price_Element).innerHTML =
    "R$ " + parseFloat(BTC_MER_BRL_Price / USD_BRL).toFixed(2);

  convertCurrency();
}

function convertUSDtoBRL(priceUSD) {
  BTC_BIN_BRL_Price = priceUSD * USD_BRL;
  console.log(BTC_BIN_BRL_Price);
}

function convertBRLtoUSD(priceBRL) {
  BTC_MER_USD_Price = priceBRL / USD_BRL;
  console.log(BTC_MER_USD_Price);
}
