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

addIncomeBtn.addEventListener('click', () => {
    showScreen(inExScreen, 'flex');
    inExScreenTitle.textContent = 'Income';
});

addExpenseBtn.addEventListener('click', () => {
    showScreen(inExScreen, 'flex');
    inExScreenTitle.textContent = 'Expense';
});

returnHomeBtn.addEventListener('click', () => showScreen(home, 'block'));
inExScreenCancelBtn.addEventListener('click', () => showScreen(home, 'block'));

inExScreenAddBtn.addEventListener('click', () => {
    if (descriptionInput.value === '') return;
    if (valueInput.value === '') return;
    printDescription(descriptionInput.value, valueInput.value, inExScreenTitle.textContent.toLowerCase());

    descriptionInput.value = '';
    valueInput.value = '';

    showScreen(home, 'block');
});

function showScreen(element, show) {
    home.style.display = 'none';
    inExScreen.style.display = 'none';
    element.style.display = show;
}

function printDescription(title, value, type) {
    const templete = `
        <div class="description"><span class="description_icon"><img src="imgs/coin.svg" alt="coin"></span><p class="description_title">${title}</p><span class="description_value"><span class="description_value-type">${type === 'income' ? '+' : '-'} <span>${value}</span><span>$</span></div>
    `;

    descriptionContainer.innerHTML += templete;
    updateMonitor();
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
