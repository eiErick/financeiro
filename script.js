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

const confirmHtml = document.querySelector('.confirm');
const confirmMsg = document.querySelector('.confirm-msg');
const cancelConfirmationBtn = document.querySelector('.cancel-confirmation-btn');
const confirmConfirmationBtn = document.querySelector('.confirm-confirmation-btn');

const settingsScreen = document.querySelector('.settings-screen');
const settingsScreenReturnHomeBtn = document.querySelector('.settings-screen_return-home-btn');
const settingsScreenTitle = document.querySelector('.settings-screen_title');
const containerOptions = document.querySelector('.container-options');
const screenSettingsOption = document.querySelector('.screen-sttings-option');
const profileSettingsBtn = document.querySelector('.profile-settings-btn');
const profileDisplay = document.querySelector('.profile-display');
const dataSettingsBtn = document.querySelector('.data-settings-btn');
const dataDisplay = document.querySelector('.data-display');
const themeSettingsBtn = document.querySelector('.theme-settings-btn');
const themeDisplay = document.querySelector('.theme-display');
const languageSettingsBtn = document.querySelector('.language-settings-btn');
const languageDisplay = document.querySelector('.language-display');
const aboutSettingsBtn = document.querySelector('.about-settings-btn');
const aboutDisplay = document.querySelector('.about-display');
let profiles = document.querySelectorAll('.profiles');
const dataExportBtn = document.querySelector('.data-export');
const deleteAllFinacesBtn = document.querySelector('.delete-all-finaces');

const date = new Date();
const currentDate = `${getMonth()}-${getYear()}`;

let finances = {};
const savedFinances = localStorage.getItem('savedFinances');
let profileSelected = localStorage.getItem('profileSelected');

if (savedFinances) {
    finances = JSON.parse(savedFinances);
    Object.keys(finances.profile[1]).forEach((e) => createOptionMonth(extractNumbers(e).start, extractNumbers(e).end));
}

if (!profileSelected && savedFinances) profileSelected = 1;
if (profileSelected) {
    for (let i = 0; i <= finances.profile.length; i++) finances.profile[i] === profileSelected ? profileSelected = i + 1 : '';
}

if (selectedMonth.value != currentDate) {
    let isCurrentMonth = false;
    selectedMonth.childNodes.forEach((e) => e.value === currentDate ? isCurrentMonth = true : '');
    if (!isCurrentMonth) createOptionMonth(getMonth(), getYear());
} else selectedMonth.value = currentDate;

if (savedFinances) {
    finances.profile[profileSelected][currentDate].forEach((e) => printDescription(e.title, e.value, e.type));

    for (let i = 0; i <= finances.profile.length; i += 2) finances.profile[i] != undefined ? printProfile(finances.profile[i]) : '';
    profiles = document.querySelectorAll('.profiles');
    profiles.forEach((e) => e.textContent === finances.profile[profileSelected - 1] ? e.classList.add('select-profile') : '');
} else {
    const name = window.prompt('Say the name for your profile!');
    finances.profile = [name, {}];

    selectedMonth.childNodes.forEach((e) => finances.profile[1][e.value] = []);
    localStorage.setItem('savedFinances', JSON.stringify(finances));
}

addIncomeBtn.addEventListener('click', () => {
    showScreen([inExScreen], 'flex');
    inExScreenTitle.textContent = 'Income';
});

addExpenseBtn.addEventListener('click', () => {
    showScreen([inExScreen], 'flex');
    inExScreenTitle.textContent = 'Expense';
});

selectedMonth.addEventListener('change', () => {
    clearDescription();

    if (finances.profile[profileSelected][selectedMonth.value]) {
        finances.profile[profileSelected][selectedMonth.value].forEach((e) => printDescription(e.title, e.value, e.type));
    } else {
        finances.profile[profileSelected][selectedMonth.value] = [];
        localStorage.setItem('savedFinances', JSON.stringify(finances));
    }
});

returnHomeBtn.addEventListener('click', () => showScreen([home], 'flex'));
inExScreenCancelBtn.addEventListener('click', () => showScreen([home], 'flex'));

inExScreenAddBtn.addEventListener('click', () => {
    if (descriptionInput.value === '' || valueInput.value === '') return;
    if (selectedMonth.value === inExScreenSelectedMonth.value) printDescription(descriptionInput.value, valueInput.value, inExScreenTitle.textContent.toLowerCase());

    saveFinaceDescription(descriptionInput.value, valueInput.value, inExScreenTitle.textContent.toLowerCase(), inExScreenSelectedMonth.value);

    descriptionInput.value = '';
    valueInput.value = '';

    showScreen([home], 'flex');
});

settingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, containerOptions], 'flex');
});

settingsScreenReturnHomeBtn.addEventListener('click', () => {
    if (settingsScreenTitle.textContent != 'Settings') {
        showScreen([settingsScreen, containerOptions], 'flex');
        settingsScreenTitle.textContent = 'Settings';
    } else showScreen([home], 'flex');
});

document.querySelector('.add-profile-btn').addEventListener('click', () => {
    createProfile();
});

profileSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, profileDisplay], 'flex');
    settingsScreenTitle.textContent = profileSettingsBtn.textContent;
});

profiles.forEach((e) => {
    e.addEventListener('click', () => {
        profiles.forEach((e) => {
            if (e.classList[1] === 'select-profile') e.classList.remove('select-profile');
        });

        e.classList.add('select-profile');
        localStorage.setItem('profileSelected', e.textContent);
    });
});

dataSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, dataDisplay], 'flex');
    settingsScreenTitle.textContent = dataSettingsBtn.textContent;
});

dataExportBtn.addEventListener('click', () => {
    dataDownloader();
});

deleteAllFinacesBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});

themeSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, themeDisplay], 'flex');
    settingsScreenTitle.textContent = themeSettingsBtn.textContent;
});

languageSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, languageDisplay], 'flex');
    settingsScreenTitle.textContent = languageSettingsBtn.textContent;
});

aboutSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, aboutDisplay], 'flex');
    settingsScreenTitle.textContent = aboutSettingsBtn.textContent;
});

function showScreen(element, show) {
    home.style.display = 'none';
    inExScreen.style.display = 'none';
    settingsScreen.style.display = 'none';
    containerOptions.style.display = 'none'
    profileDisplay.style.display = 'none';
    dataDisplay.style.display = 'none';
    themeDisplay.style.display = 'none';
    languageDisplay.style.display = 'none';
    aboutDisplay.style.display = 'none';
    element.forEach((e) => e.style.display = show);
}

function printDescription(title, value, type) {
    descriptionContainer.innerHTML += `<div class="description"><span class="description_icon"><img src="imgs/coin.svg" alt="coin"></span><p class="description_title">${title}</p><span class="description_value"><span class="description_value-type">${type === 'income' ? '+' : '-'} <span>${value}</span><span>$</span></div>`;
    updateMonitor();
}

function clearDescription() {
    descriptionContainer.innerHTML = '';
}

function saveFinaceDescription(title, value, type, month) {
    finances.profile[profileSelected][month].push({id: `${randomID()}`,title: title, value: value, type: type});

    localStorage.setItem('savedFinances', JSON.stringify(finances));
}

function updateMonitor() {
    monitorIncome.childNodes[0].textContent = getIncome();
    monitorExpense.childNodes[0].textContent = getExpense();
    monitorBalance.childNodes[0].textContent = getBalance();
}

function getIncome() {
    let income = 0;
    description = document.querySelectorAll('.description_value').forEach((e) => {
        if (e.childNodes[0].childNodes[0].textContent === '+ ') income += parseInt(e.childNodes[0].childNodes[1].textContent);
    });

    return income;
}

function getExpense() {
    let expense = 0;
    description = document.querySelectorAll('.description_value').forEach((e) => {
        if (e.childNodes[0].childNodes[0].textContent === '- ') expense += parseInt(e.childNodes[0].childNodes[1].textContent);
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

function printProfile(name) {
    profileDisplay.innerHTML += `<span class="profiles"><img src="imgs/person.svg" alt="person icon">${name}</span>`;
}

function createProfile() {
    const name = window.prompt('Say the name for your new profile');
    if (name === null) return;

    for (let i = 0; i <= finances.profile.length; i += 2) if (finances.profile[i] === name) return;

    printProfile(name);
    finances.profile.push(name, {});

    for (let i = 0; i <= finances.profile.length; i++) if (finances.profile[i] === name) selectedMonth.childNodes.forEach((e) => finances.profile[i+1][e.value] = []);

    localStorage.setItem('savedFinances', JSON.stringify(finances));
    window.location.reload();
}

function dataDownloader() {
    const data = [];
    data.push(finances);
    const linkDownload = document.createElement('a');
    linkDownload.download = 'data.json';
    const blobTask = new Blob([JSON.stringify(data)], { type: 'application/json'});
    linkDownload.href = window.URL.createObjectURL(blobTask);
    linkDownload.click();
}

dataImport();

function dataImport() {
	document.querySelector('.data-inp').addEventListener('change', (element) => {
		const file = element.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = async function (content) {
				let jsonData;
				try {
					const getterData = JSON.parse(content.target.result);
					jsonData = getterData;
				} catch (error) {
					alert('warning', 'Error parsing JSON file!');
				}

				if (jsonData != undefined) {
                    let financesData;

                    if (!await confirm('You want to erase the current data?')) return;

                    financesData = jsonData[0];

                    localStorage.setItem('savedFinances', JSON.stringify(financesData));
					location.reload();
				}
			};
			reader.readAsText(file);
		}
	});
}

async function confirm(msg) {
    confirmHtml.style.display = 'flex';
    confirmMsg.textContent = msg;

    return new Promise((r) => {
        confirmConfirmationBtn.addEventListener('click', () => {
            confirmHtml.style.display = 'none';
            r(true);
        }, { once: true });

        cancelConfirmationBtn.addEventListener('click', () => {
            confirmHtml.style.display = 'none';
            r(false);
        }, { once: true });
    });  
}
