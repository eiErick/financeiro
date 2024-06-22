const home = document.querySelector('.home');
const selectedMonth = document.querySelector('.selected-month');
const settingsBtn = document.querySelector('.settings-btn');
const monitorIncome = document.querySelector('.monitor_income');
const monitorExpense = document.querySelector('.monitor_expenses');
const monitorBalance = document.querySelector('.monitor_balance');
const descriptionContainer = document.querySelector('.description-container');
const addIncomeBtn = document.querySelector('.add-income-btn');
const addExpenseBtn = document.querySelector('.add-expense-btn');

const icomeScreen = document.querySelector('.income-screen');
const expenseScreen = document.querySelector('.expense-screen');

const inExScreen = document.querySelector('.in-ex-screen');
const returnHomeBtn = document.querySelector('.in-ex-screen_return-home-btn');
const inExScreenTitle = document.querySelector('.in-ex-screen_title');
const inExScreenSelectedMonth = document.querySelector('.in-ex-screen_selected-month');
const descriptionInput = document.querySelector('.in-ex-screen_description-input');
const valueInput = document.querySelector('.in-ex-screen_value-input');
const inExScreenCancelBtn = document.querySelector('.in-ex-screen_cancel-btn');
const inExScreenAddBtn = document.querySelector('.in-ex-screen_add-btn');

const date = new Date();
const currentDate = `${getMonth()}-${getYear()}`;

let finances = {};
const savedFinances = localStorage.getItem('savedFinances');

if (savedFinances) {
    finances = JSON.parse(savedFinances);
    Object.keys(finances.profile[1]).forEach((e) => createOptionMonth(extractNumbers(e).start, extractNumbers(e).end));
}

if (selectedMonth.value != currentDate) {
    let isCurrentMonth = false;
    selectedMonth.childNodes.forEach((e) => e.value === currentDate ? isCurrentMonth = true : '');
    if (!isCurrentMonth) createOptionMonth(getMonth(), getYear());
} else selectedMonth.value = currentDate;

if (savedFinances) {
    finances.profile[1][currentDate].forEach((e) => printDescription(e.title, e.value, e.type));
} else {
    const name = window.prompt('Say the name for your profile!');
    finances.profile = [name, {}];

    selectedMonth.childNodes.forEach((element) => finances.profile[1][element.value] = []);
    localStorage.setItem('savedFinances', JSON.stringify(finances));
}

addIncomeBtn.addEventListener('click', () => {
    showScreen(inExScreen, 'flex');
    inExScreenTitle.textContent = 'Income';
});

addExpenseBtn.addEventListener('click', () => {
    showScreen(inExScreen, 'flex');
    inExScreenTitle.textContent = 'Expense';
});

selectedMonth.addEventListener('change', () => {
    clearDescription();

    if (finances.profile[1][selectedMonth.value]) {
        finances.profile[1][selectedMonth.value].forEach((e) => printDescription(e.title, e.value, e.type));
    } else {
        finances.profile[1][selectedMonth.value] = [];
        localStorage.setItem('savedFinances', JSON.stringify(finances));
    }
});

returnHomeBtn.addEventListener('click', () => showScreen(home, 'flex'));
inExScreenCancelBtn.addEventListener('click', () => showScreen(home, 'flex'));

inExScreenAddBtn.addEventListener('click', () => {
    if (descriptionInput.value === '') return;
    if (valueInput.value === '') return;

    if (selectedMonth.value === inExScreenSelectedMonth.value) printDescription(descriptionInput.value, valueInput.value, inExScreenTitle.textContent.toLowerCase());

    saveFinaceDescription(descriptionInput.value, valueInput.value, inExScreenTitle.textContent.toLowerCase(), inExScreenSelectedMonth.value);

    descriptionInput.value = '';
    valueInput.value = '';

    showScreen(home, 'flex');
});

function showScreen(element, show) {
    home.style.display = 'none';
    inExScreen.style.display = 'none';
    element.style.display = show;
}

function printDescription(title, value, type) {
    const template = `<div class="description"><span class="description_icon"><img src="imgs/coin.svg" alt="coin"></span><p class="description_title">${title}</p><span class="description_value"><span class="description_value-type">${type === 'income' ? '+' : '-'} <span>${value}</span><span>$</span></div>`;

    descriptionContainer.innerHTML += template;
    updateMonitor();
}

function clearDescription() {
    descriptionContainer.innerHTML = '';
}

function saveFinaceDescription(title, value, type, month) {
    finances.profile[1][month].push({id: `${randomID()}`,title: title, value: value, type: type});

    localStorage.setItem('savedFinances', JSON.stringify(finances));
}

function updateMonitor() {
    monitorIncome.childNodes[0].textContent = getIncome();
    monitorExpense.childNodes[0].textContent = getExpense();
    monitorBalance.childNodes[0].textContent = getBalance();
}

function getIncome() {
    let income = 0;
    description = document.querySelectorAll('.description_value').forEach((element) => {
        if (element.childNodes[0].childNodes[0].textContent === '+ ') income += parseInt(element.childNodes[0].childNodes[1].textContent);
    });

    return income;
}

function getExpense() {
    let expense = 0;
    description = document.querySelectorAll('.description_value').forEach((element) => {
        if (element.childNodes[0].childNodes[0].textContent === '- ') expense += parseInt(element.childNodes[0].childNodes[1].textContent);
    });

    return expense;
}

function getBalance() {
    return parseInt(monitorIncome.childNodes[0].textContent) - parseInt(monitorExpense.childNodes[0].textContent);
}

function getYear() {
    return date.getFullYear();
}

function getMonth() {
    return date.getMonth();
}

function getNameMonth(num) {
    const months = ['janary', 'februaty', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return months[num];
}

function createOptionMonth(month, year) {
    const optionTemplate = `<option value="${month}-${year}">${capitalizeFirstLetter(getNameMonth(month))} ${year}</option>`;
    
    selectedMonth.innerHTML += optionTemplate;
    inExScreenSelectedMonth.innerHTML += optionTemplate;
    inExScreenSelectedMonth.value = `${month}-${year}`;
    selectedMonth.value = `${month}-${year}`;
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.substring(1);
}

function randomID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function extractNumbers(inputString) {
    let parts = inputString.split('-');
    return { start: parseInt(parts[0], 10), end: parseInt(parts[1], 10) };
}
