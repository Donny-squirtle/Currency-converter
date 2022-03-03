const currency = {
    USD: "1",
    BYN: "3.45",
    EUR: "0.91",
    CNY: "7.67",
    RUB: "106.15"
};

const enterValue = document.querySelector(".currency-block__entred-value");
const currencyType = document.querySelector(".currency-block__type");
const convertBlock = document.querySelector(".convert-block");
const calendarInput = document.getElementById("calendar__input");
const calendarBlock = document.querySelector(".calendar__block");
let currencyGraph;
let exCurrency = { ...currency };
let calendarItem = document.createElement("div");
let currencyItem = document.createElement("div");
let timeElapsed = Date.now();
let today = new Date(timeElapsed);
let startDay = today.setDate(today.getDate());
let endDay = startDay - 1209600000;

let convertedCurrency = () => {
    convertBlock.innerHTML = "";
    let cof = 0;
    let currencyList = Object.keys(currency).filter((element) => {
    return !(element === currencyType.value);
    });
    currencyList.forEach((element) => {
    cof = enterValue.value / currency[currencyType.value];
    currencyItem.textContent = `${element}: ${
        Math.ceil(currency[element] * cof * 100) / 100
    }`;
    currencyItem.dataset.type = element;
    convertBlock.appendChild(currencyItem.cloneNode(true));
    });
};

let createExchengeHistory = () => {
    let currencyList = {};
    for (let i = startDay; i > endDay; i = i - 86400000){
        let date = new Date(i);
        currencyList[date.toLocaleDateString()] = generateExchengeValue(exCurrency);
    }
    return currencyList;
};

let generateExchengeValue = (cur) => {
    let exchaengeValue = Object.keys(cur);
    exchaengeValue.forEach((element) => {
        if (element != 'USD') {
            cur[element] = Math.ceil((Math.random() * (cur[element] * 1.1 - cur[element] * 0.9) + cur[element] * 0.9)*100)/100;
        }
    })
    return {...cur};
}

let exchangeHistory = (graph) => {
    calendarBlock.innerHTML = "";
    let inputValue = calendarInput.value;
    let dateValue = inputValue.split('-').reverse().join('.');
    let currentDate = Object.keys(graph).filter((element) => {
        return element === dateValue;
    });
    let calendarCurrencyItem = graph[currentDate];
    if (Math.ceil(Date.parse(inputValue) / 100000000) > Math.ceil(startDay / 100000000)) {
        calendarItem.textContent = "You can't predict exchange curse";
        calendarBlock.appendChild(calendarItem);
    } else if (Math.ceil(Date.parse(inputValue) / 100000000) <= Math.ceil(endDay / 100000000)) {
        let lastElemet = graph[Object.keys(graph).pop()];
        Object.keys(lastElemet).forEach((element) => {
            calendarItem.textContent = `${element}: ${lastElemet[element]}`;
            calendarBlock.appendChild(calendarItem.cloneNode(true));
        })
    } else {
        Object.keys(calendarCurrencyItem).forEach((element) => {
            calendarItem.textContent = `${element}: ${calendarCurrencyItem[element]}`;
            calendarBlock.appendChild(calendarItem.cloneNode(true));
        })
    }
};

document.addEventListener("DOMContentLoaded", () => {
    currencyGraph = createExchengeHistory();
});

enterValue.addEventListener("input", () => {
    convertedCurrency();
});

currencyType.addEventListener("change", () => {
    convertedCurrency();
});

calendarInput.addEventListener("input", () => {
    exchangeHistory(currencyGraph);
});
