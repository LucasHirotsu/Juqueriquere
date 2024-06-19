const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
"JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
const weekdayNames = [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
];

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDay = null;

function renderCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysContainer = document.getElementById("days");
    daysContainer.innerHTML = "";

    // Adicionar dias anteriores, se necessário, para preencher a primeira semana
    for (let i = 0; i < firstDayOfMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        daysContainer.appendChild(dayElement);
    }

    // Adicionar os dias do mês
    for (let i = 1; i <= lastDayOfMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i;
        dayElement.addEventListener("click", () => {
            if (selectedDay) {
                selectedDay.classList.remove("selected");
            }
            if (selectedDay !== dayElement) {
                selectedDay = dayElement;
                selectedDay.classList.add("selected");
            } else {
                selectedDay = null;
            }
        });
        daysContainer.appendChild(dayElement);
    }
}

function updateMonthText() {
    const monthText = `${monthNames[currentMonth]} ${currentYear}`;
    document.getElementById("current-month").textContent = monthText;
}

function showSelectedDay() {
    if (!selectedDay) {
        alert("Por favor, selecione um dia antes de enviar.");
        return;
    }

    const dayOfWeek = new Date(currentYear, currentMonth, selectedDay.textContent).getDay();

    // Verifica se é segunda-feira (dia 1 da semana)
    if (dayOfWeek === 1) {
        alert("Às segundas-feiras, o parque não abre. Por favor, elecione outro dia da semana.");
        return;
    }

    
    // Obtém o dia, mês e ano selecionados
    const day = selectedDay.textContent;
    const month = monthNames[currentMonth];
    const year = currentYear;
    const weekday = weekdayNames[dayOfWeek];
    // Exibe o dia, mês e ano selecionados ao fim da página
    const selectedDateContainer = document.getElementById("selectedDateContainer");
    selectedDateContainer.textContent = `Data Selecionada: ${weekday}, ${day} de ${month} de ${year}`;
    // Remove a seleção do dia
    selectedDay.classList.remove("selected");
    selectedDay = null;
}



// Adiciona o evento de clique ao botão "Enviar"
document.getElementById("sendButton").addEventListener("click", showSelectedDay);

function updateMonthText() {
    const monthText = `${monthNames[currentMonth]} ${currentYear}`;
    document.getElementById("current-month").textContent = monthText;
}

function goToPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
    updateMonthText();
}

function goToNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
    updateMonthText();
}

function goToPreviousYear() {
    currentYear--;
    renderCalendar();
    updateMonthText();
}

function goToNextYear() {
    currentYear++;
    renderCalendar();
    updateMonthText();
}

document.getElementById("prev-month").addEventListener("click", goToPreviousMonth);
document.getElementById("next-month").addEventListener("click", goToNextMonth);
document.getElementById("prev-year").addEventListener("click", goToPreviousYear);
document.getElementById("next-year").addEventListener("click", goToNextYear);

renderCalendar();
updateMonthText();