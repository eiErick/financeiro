const translations = {
    en: {
        income: "Income",
        expenses: "Expenses",
        balance: "Balance",
        addIncome: "Add income",
        addExpense: "Add expense",
        month: "Month:",
        title: "Title:",
        value: "Value:",
        cancel: "Cancel",
        add: "Add",
        settings: "Settings",
        profile: "Profile",
        data: "Data",
        theme: "Theme",
        language: "Language",
        about: "About",
        exportData: "Export data",
        importData: "Import data",
        deleteAll: "Delete all finances",
        systemDefault: "System Default",
        dark: "Dark",
        light: "Light",
        warning: "WARNING",
        yes: "Yes",
        no: "No",
        edit: "Edit",
    },
    pt: {
        income: "Receita",
        expenses: "Despesas",
        balance: "Saldo",
        addIncome: "Adicionar receita",
        addExpense: "Adicionar despesa",
        month: "Mês:",
        title: "Título:",
        value: "Valor:",
        cancel: "Cancelar",
        add: "Adicionar",
        settings: "Configurações",
        profile: "Perfil",
        data: "Dados",
        theme: "Tema",
        language: "Idioma",
        about: "Sobre",
        exportData: "Exportar dados",
        importData: "Importar dados",
        deleteAll: "Excluir todas as finanças",
        systemDefault: "Padrão do sistema",
        dark: "Escuro",
        light: "Claro",
        warning: "AVISO",
        yes: "Sim",
        no: "Não",
        edit: "Editar",
    }
};

if (localStorage.getItem('savedFinancesLanguage')) {
    translatePage(localStorage.getItem('savedFinancesLanguage'));
} else translatePage('en');

function translatePage(lang) {
    document.querySelector('.monitor_income').childNodes[1].textContent = translations[lang].income;
    document.querySelector('.monitor_expenses').childNodes[1].textContent = translations[lang].expenses;
    document.querySelector('.monitor_balance').childNodes[1].textContent = translations[lang].balance;
    document.querySelector('.add-income-btn').innerText = translations[lang].addIncome;
    document.querySelector('.add-expense-btn').innerText = translations[lang].addExpense;
    document.querySelector('label[for="in-ex-screen_selected-month"]').innerText = translations[lang].month;
    document.querySelector('label[for="in-ex-screen_description-input"]').innerText = translations[lang].title;
    document.querySelector('label[for="in-ex-screen_value-input"]').innerText = translations[lang].value;
    document.querySelector('.in-ex-screen_cancel-btn').innerText = translations[lang].cancel;
    document.querySelector('.in-ex-screen_add-btn').innerText = translations[lang].add;
    document.querySelector('.settings-screen_title').innerText = translations[lang].settings;
    document.querySelector('.profile-settings-btn').innerText = translations[lang].profile;
    document.querySelector('.data-settings-btn').innerText = translations[lang].data;
    document.querySelector('.theme-settings-btn').innerText = translations[lang].theme;
    document.querySelector('.language-settings-btn').innerText = translations[lang].language;
    document.querySelector('.about-settings-btn').innerText = translations[lang].about;
    document.querySelector('.data-export').innerText = translations[lang].exportData;
    document.querySelector('label[for="data-inp"]').innerText = translations[lang].importData;
    document.querySelector('.delete-all-finaces').innerText = translations[lang].deleteAll;
    document.querySelector('option[value="system"]').innerText = translations[lang].systemDefault;
    document.querySelector('option[value="dark"]').innerText = translations[lang].dark;
    document.querySelector('option[value="light"]').innerText = translations[lang].light;
    document.querySelector('.alert-title').innerText = translations[lang].warning;
    document.querySelector('.confirm-confirmation-btn').innerText = translations[lang].yes;
    document.querySelector('.cancel-confirmation-btn').innerText = translations[lang].no;
    document.querySelector('.edit-menu_title').innerText = translations[lang].edit;
}
