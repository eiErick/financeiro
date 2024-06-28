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
const inExScreenForm = document.querySelector('.in-ex-screen_form');
const inExScreenSelectedMonth = document.querySelector('.in-ex-screen_selected-month');
const descriptionInput = document.querySelector('.in-ex-screen_description-input');
const valueInput = document.querySelector('.in-ex-screen_value-input');
const inExScreenCancelBtn = document.querySelector('.in-ex-screen_cancel-btn');

const alertHTML = document.querySelector('.alert');
const alertCloseBtn = document.querySelector('.alert-close-btn');

const confirmHtml = document.querySelector('.confirm');
const confirmMsg = document.querySelector('.confirm-msg');
const cancelConfirmationBtn = document.querySelector('.cancel-confirmation-btn');
const confirmConfirmationBtn = document.querySelector('.confirm-confirmation-btn');

const promptHtml = document.querySelector('.prompt');
const promptMsg = document.querySelector('.prompt_msg');
const promptInp = document.querySelector('.prompt_inp');
const cancelPromptBtn = document.querySelector('.cancel-prompt-btn');
const confirmPromptBtn = document.querySelector('.confirm-prompt-btn');

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
let deleteProfileBtn = document.querySelectorAll('.delete-profile-btn');
const dataExportBtn = document.querySelector('.data-export');
const deleteAllFinacesBtn = document.querySelector('.delete-all-finaces');

const rmenu = document.querySelector('.rmenu');

const editMenu = document.querySelector('.edit-menu');
const editMenuForm = document.querySelector('.edit-menu_form');
const editMenuSelectedMonth = document.querySelector('.edit-menu_selected-month');
const editMenuDescriptionInput = document.querySelector('.edit-menu_description-input');
const editMenuValueInput = document.querySelector('.edit-menu_value-input');
const editMenuCancelBtn = document.querySelector('.edit-menu_cancel-btn');

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
if (profileSelected) for (let i = 0; i <= finances.profile.length; i++) finances.profile[i] === profileSelected ? profileSelected = i + 1 : '';
if (typeof(profileSelected) != 'number') profileSelected = 1;

if (selectedMonth.value != currentDate) {
    let isCurrentMonth = false;
    selectedMonth.childNodes.forEach((e) => e.value === currentDate ? isCurrentMonth = true : '');
    if (!isCurrentMonth) createOptionMonth(getMonth(), getYear());
} else selectedMonth.value = currentDate;

if (savedFinances) {
    finances.profile[profileSelected][currentDate].forEach((e) => printDescription(e.title, e.value, e.type, e.id));

    for (let i = 0; i <= finances.profile.length; i += 2) finances.profile[i] != undefined ? printProfile(finances.profile[i]) : '';
    profiles = document.querySelectorAll('.profiles');
    deleteProfileBtn = document.querySelectorAll('.delete-profile-btn');
    profiles.forEach((e) => e.dataset.name === finances.profile[profileSelected - 1] ? e.classList.add('select-profile') : '');
} else {
    headlePrompt();
    async function headlePrompt() {
        let name = await prompt('Say the name for your profile!');
        if (name === null) name = 'default';

        finances.profile = [name, {}];
        selectedMonth.childNodes.forEach((e) => finances.profile[1][e.value] = []);
        localStorage.setItem('savedFinances', JSON.stringify(finances));
    }
}

document.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'description_menu') {
        e.target.style.background = '#500000';
        e.target.parentNode.classList[0] === 'note' ? e.target.parentNode.style.background = '#500000' : '';

        printRmenu(e.clientX-170, e.clientY, [{title: 'Delete', context: 'delete'}, {title: 'Edit', context: 'edit'}]);

        let isToDo = true;
        document.addEventListener('click', () => {
            if (isToDo) {
                e.target.style.background = '';
                isToDo = false;
                rmenu.style.display = 'none';
            }
        });

        rmenu.childNodes.forEach((o) => {
            o.addEventListener('click', () => {
                if (isToDo) {
                    if (o.dataset.context === 'delete') deleteFinace(e.target.parentNode.dataset.id);

                    if (o.dataset.context === 'edit') {
                        editMenu.style.display = 'flex';
                        editMenuSelectedMonth.value = selectedMonth.value;
                        editMenuDescriptionInput.value = e.target.parentNode.childNodes[1].textContent;
                        editMenuValueInput.value = e.target.parentNode.childNodes[2].childNodes[0].childNodes[1].textContent;

                        editMenuCancelBtn.addEventListener('click', () => editMenu.style.display = 'none');

                        editMenuForm.addEventListener('submit', (ev) => {
                            ev.preventDefault();
                            const id = randomID();

                            if (selectedMonth.value === editMenuSelectedMonth.value) printDescription(editMenuDescriptionInput.value, editMenuValueInput.value, e.target.parentNode.dataset.type === 'income' ? 'income' : 'expense', id);

                            saveFinaceDescription(editMenuDescriptionInput.value, editMenuValueInput.value, e.target.parentNode.dataset.type === 'income' ? 'income' : 'expense', editMenuSelectedMonth.value, id);
                            deleteFinace(e.target.parentNode.dataset.id);

                            editMenu.style.display = 'none';
                        });
                    }
                }
            });
        });
    }
});

addIncomeBtn.addEventListener('click', () => {
    showScreen([inExScreen], 'flex');
    inExScreenTitle.textContent = 'Income';
    inExScreenTitle.dataset.type = 'income';
});

addExpenseBtn.addEventListener('click', () => {
    showScreen([inExScreen], 'flex');
    inExScreenTitle.textContent = 'Expense';
    inExScreenTitle.dataset.type = 'expense';
});

selectedMonth.addEventListener('change', () => {
    clearDescription();

    if (finances.profile[profileSelected][selectedMonth.value]) {
        finances.profile[profileSelected][selectedMonth.value].forEach((e) => printDescription(e.title, e.value, e.type, e.id));
    } else {
        finances.profile[profileSelected][selectedMonth.value] = [];
        localStorage.setItem('savedFinances', JSON.stringify(finances));
    }
});

returnHomeBtn.addEventListener('click', () => showScreen([home], 'flex'));
inExScreenCancelBtn.addEventListener('click', () => showScreen([home], 'flex'));

inExScreenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = randomID();

    if (selectedMonth.value === inExScreenSelectedMonth.value) printDescription(descriptionInput.value, valueInput.value, inExScreenTitle.dataset.type, id);

    saveFinaceDescription(descriptionInput.value, valueInput.value, inExScreenTitle.dataset.type, inExScreenSelectedMonth.value, id);

    descriptionInput.value = '';
    valueInput.value = '';

    showScreen([home], 'flex');
});

settingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, containerOptions], 'flex');
});

settingsScreenReturnHomeBtn.addEventListener('click', () => {
    if (settingsScreenTitle.dataset.menu != 'settings') {
        showScreen([settingsScreen, containerOptions], 'flex');
        settingsScreenTitle.dataset.menu = 'settings';
    } else showScreen([home], 'flex');
});

document.querySelector('.add-profile-btn').addEventListener('click', () => {
    createProfile();
});

profileSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, profileDisplay], 'flex');
    settingsScreenTitle.textContent = profileSettingsBtn.textContent;
    settingsScreenTitle.dataset.menu = profileSettingsBtn.textContent;
});

profiles.forEach((e) => {
    e.addEventListener('click', () => {
        profiles.forEach((e) => {
            if (e.classList[1] === 'select-profile') e.classList.remove('select-profile');
        });

        e.classList.add('select-profile');
        changeProfile(e.dataset.profile);
        localStorage.setItem('profileSelected', e.dataset.profile);
    });
});

deleteProfileBtn.forEach((e) => {
    e.addEventListener('click', () => {
        console.log(e.parentNode.dataset.profile);
        deleteProfile(e.parentNode.dataset.profile);
    });
});

dataSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, dataDisplay], 'flex');
    settingsScreenTitle.textContent = dataSettingsBtn.textContent;
    settingsScreenTitle.dataset.menu = profileSettingsBtn.textContent;
});

dataExportBtn.addEventListener('click', () => {
    dataDownloader();
});

deleteAllFinacesBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

themeSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, themeDisplay], 'flex');
    settingsScreenTitle.textContent = themeSettingsBtn.textContent;
    settingsScreenTitle.dataset.menu = profileSettingsBtn.textContent;
});

languageSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, languageDisplay], 'flex');
    settingsScreenTitle.textContent = languageSettingsBtn.textContent;
    settingsScreenTitle.dataset.menu = profileSettingsBtn.textContent;
});

aboutSettingsBtn.addEventListener('click', () => {
    showScreen([settingsScreen, aboutDisplay], 'flex');
    settingsScreenTitle.textContent = aboutSettingsBtn.textContent;
    settingsScreenTitle.dataset.menu = profileSettingsBtn.textContent;
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

function printDescription(title, value, type, id) {
    descriptionContainer.innerHTML += `
    <div class="description" data-type="${type}" data-id="${id}"><span class="description_icon"><img src="imgs/coin.svg" alt="coin"></span><p class="description_title">${title}</p><span class="description_value"><span class="description_value-type">${type === 'income' ? '+' : '-'} <span>${value}</span><span>$</span><p class="description_title"></p></span></span><span class="description_menu">...</span></div>`;
    updateMonitor();
}

function clearDescription() {
    descriptionContainer.innerHTML = '';
}

function saveFinaceDescription(title, value, type, month, id) {
    finances.profile[profileSelected][month].push({id: id, title: title, value: value, type: type});
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
        if (e.parentNode.dataset.type === 'income') income += parseInt(e.childNodes[0].childNodes[1].textContent);
    });
    return income;
}

function getExpense() {
    let expense = 0;
    description = document.querySelectorAll('.description_value').forEach((e) => {
        if (e.parentNode.dataset.type === 'expense') expense += parseInt(e.childNodes[0].childNodes[1].textContent);
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
    editMenuSelectedMonth.innerHTML += optionTemplate;
    inExScreenSelectedMonth.value = `${month}-${year}`;
    selectedMonth.value = `${month}-${year}`;
    editMenuSelectedMonth.value = `${month}-${year}`;
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
    profileDisplay.innerHTML += `<span class="profiles" data-profile="${name}"><img src="imgs/person.svg" alt="person icon">${name}<span class="delete-profile-btn">x</span></span>`;
}

async function createProfile() {
    const name = await prompt('Say the name for your new profile');
    if (name === null) return;

    for (let i = 0; i <= finances.profile.length; i += 2) if (finances.profile[i] === name) return;

    printProfile(name);
    finances.profile.push(name, {});

    for (let i = 0; i <= finances.profile.length; i++) if (finances.profile[i] === name) selectedMonth.childNodes.forEach((e) => finances.profile[i+1][e.value] = []);

    localStorage.setItem('savedFinances', JSON.stringify(finances));
    location.reload();
}

async function deleteProfile(name) {
    if (await confirm(`Do you really want to delete the "${name}" profile and all its data`)) for (let i = 0; i <= finances.profile.length-1; i++) if (finances.profile[i] === name) finances.profile.splice(i, 2);

    localStorage.setItem('savedFinances', JSON.stringify(finances));
    location.reload();
}

function changeProfile(name) {
    profileSelected = name;
    for (let i = 0; i <= finances.profile.length; i++) finances.profile[i] === profileSelected ? profileSelected = i + 1 : '';

    clearDescription();
    finances.profile[profileSelected][currentDate].forEach((e) => printDescription(e.title, e.value, e.type, e.id));
    updateMonitor();
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
					alert('Error parsing JSON file!');
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

function alert(msg) {
    alertHTML.childNodes[3].childNodes[3].textContent = msg;
    alertHTML.style.display = 'flex';
    alertCloseBtn.addEventListener('click', () => alertHTML.style.display = 'none');
    setTimeout(() => alertHTML.style.display = 'none', 5000);
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

async function prompt(msg) {
    promptMsg.textContent = msg;
    promptHtml.style.display = 'flex';

    return new Promise((r) => {
        confirmPromptBtn.addEventListener('click', () => {
            promptHtml.style.display = 'none';
            r(promptInp.value);
            promptInp.value = '';
        }, { once: true });
        
        cancelPromptBtn.addEventListener('click', () => {
            promptHtml.style.display = 'none';
            promptInp.value = '';
            r(null);
        }, { once: true });
    });
}

function printRmenu(x, y, elements) {
    rmenu.style.display = 'flex';
    rmenu.style.top = `${y}px`;
    rmenu.style.left = `${x}px`;
    rmenu.innerHTML = '';
    elements.forEach((e) => rmenu.innerHTML += `<span data-context='${e.context}' class="rmenu_option">${e.title}</span>`);
}

function deleteFinace(id) {
    for (let i = 0; i <= finances.profile[profileSelected][currentDate].length-1; i++) if (finances.profile[profileSelected][currentDate][i].id === id) finances.profile[profileSelected][currentDate].splice(i, 1);

    localStorage.setItem('savedFinances', JSON.stringify(finances));
    location.reload();
}
