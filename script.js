let players = JSON.parse(localStorage.getItem('players')) || [];
let finances = JSON.parse(localStorage.getItem('finances')) || { incomes: [], expenses: [] };
let staff = JSON.parse(localStorage.getItem('staff')) || [];
let clubSettings = JSON.parse(localStorage.getItem('clubSettings')) || { name: 'Club de Fútbol', address: 'Av. Principal 123' };
let matches = JSON.parse(localStorage.getItem('matches')) || [];

function renderPlayers() {
    // Renderiza la lista de jugadores en el DOM
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = '<h4 class="mt-4">Lista de Jugadores</h4>';
    players.forEach((player, index) => {
        const playerCard = document.createElement('div');
        playerCard.className = 'card';
        playerCard.innerHTML = `
            <div class="card-body">
                <p class="card-title"><strong>Nombre:</strong> ${player.name}</p>
                <p class="card-text"><strong>Posición:</strong> ${player.position}</p>
                <p class="card-text"><strong>Edad:</strong> ${player.age}</p>
                <p class="card-text"><strong>Número de Camiseta:</strong> ${player.number}</p>
                <div class="player-actions">
                    <button class="btn btn-secondary" onclick="editPlayer(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="removePlayer(${index})">Eliminar</button>
                </div>
            </div>
        `;
        playerList.appendChild(playerCard);
    });
}

function addPlayer() {
    // Agrega un nuevo jugador a la lista y actualiza el DOM
    const name = document.getElementById('player-name').value;
    const position = document.getElementById('player-position').value;
    const age = parseInt(document.getElementById('player-age').value);
    const number = parseInt(document.getElementById('player-number').value);

    if (name && position && age && number) {
        const player = { name, position, age, number };
        players.push(player);
        savePlayers();
        clearForm('player-form');
        renderPlayers();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function editPlayer(index) {
    // Prepara el formulario para editar un jugador existente
    const player = players[index];
    document.getElementById('player-name').value = player.name;
    document.getElementById('player-position').value = player.position;
    document.getElementById('player-age').value = player.age;
    document.getElementById('player-number').value = player.number;

    document.querySelector('#player-form button').innerText = 'Actualizar Jugador';
    document.querySelector('#player-form button').onclick = () => updatePlayer(index);
}

function updatePlayer(index) {
    // Actualiza los detalles de un jugador existente y actualiza el DOM
    const name = document.getElementById('player-name').value;
    const position = document.getElementById('player-position').value;
    const age = parseInt(document.getElementById('player-age').value);
    const number = parseInt(document.getElementById('player-number').value);

    if (name && position && age && number) {
        players[index] = { name, position, age, number };
        savePlayers();
        clearForm('player-form');
        renderPlayers();
        document.querySelector('#player-form button').innerText = 'Agregar Jugador';
        document.querySelector('#player-form button').onclick = addPlayer;
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function removePlayer(index) {
    // Elimina un jugador de la lista y actualiza el DOM
    players.splice(index, 1);
    savePlayers();
    renderPlayers();
}

function renderFinancialSummary() {
    // Renderiza el resumen financiero en el DOM
    const totalIncome = finances.incomes.reduce((sum, income) => sum + income.amount, 0).toFixed(2);
    const totalExpense = finances.expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);
    const balance = (totalIncome - totalExpense).toFixed(2);

    document.getElementById('total-income').innerText = `$${totalIncome}`;
    document.getElementById('total-expense').innerText = `$${totalExpense}`;
    document.getElementById('balance').innerText = `$${balance}`;
}

function renderIncomes() {
    // Renderiza la lista de ingresos en el DOM
    const incomeList = document.getElementById('income-list');
    incomeList.innerHTML = '<h5>Ingresos</h5>';
    finances.incomes.forEach((income, index) => {
        const incomeCard = document.createElement('div');
        incomeCard.className = 'card income-card';
        incomeCard.innerHTML = `
            <div class="card-body">
              <p class="card-title"><strong>Descripcion del Ingreso:</strong> ${income.description}</p>
                <p class="card-text"><strong>Monto:</strong> $${income.amount.toFixed(2)}</p>
                <div class="player-actions">
                    <button class="btn btn-secondary" onclick="editIncome(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="removeIncome(${index})">Eliminar</button>
                </div>
            </div>
        `;
        incomeList.appendChild(incomeCard);
    });
}

function renderExpenses() {
    // Renderiza la lista de gastos en el DOM
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '<h5>Gastos</h5>';
    finances.expenses.forEach((expense, index) => {
        const expenseCard = document.createElement('div');
        expenseCard.className = 'card expense-card';
        expenseCard.innerHTML = `
            <div class="card-body">
                <p class="card-title"><strong>Descripcion del Gasto:</strong> ${expense.description}</p>
                <p class="card-text"><strong>Monto:</strong> $${expense.amount.toFixed(2)}</p>
                <div class="player-actions">
                    <button class="btn btn-secondary" onclick="editExpense(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="removeExpense(${index})">Eliminar</button>
                </div>
            </div>
        `;
        expenseList.appendChild(expenseCard);
    });
}

function addIncome() {
    // Agrega un nuevo ingreso a la lista y actualiza el DOM
    const description = document.getElementById('income-description').value;
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (description && amount > 0) {
        const income = { description, amount };
        finances.incomes.push(income);
        saveFinances();
        clearForm('income-form');
        renderIncomes();
        renderFinancialSummary();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function editIncome(index) {
    // Prepara el formulario para editar un ingreso existente
    const income = finances.incomes[index];
    document.getElementById('income-description').value = income.description;
    document.getElementById('income-amount').value = income.amount;

    document.querySelector('#income-form button').innerText = 'Actualizar Ingreso';
    document.querySelector('#income-form button').onclick = () => updateIncome(index);
}

function updateIncome(index) {
    // Actualiza los detalles de un ingreso existente y actualiza el DOM
    const description = document.getElementById('income-description').value;
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (description && amount > 0) {
        finances.incomes[index] = { description, amount };
        saveFinances();
        clearForm('income-form');
        renderIncomes();
        renderFinancialSummary();
        document.querySelector('#income-form button').innerText = 'Agregar Ingreso';
        document.querySelector('#income-form button').onclick = addIncome;
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function removeIncome(index) {
    // Elimina un ingreso de la lista y actualiza el DOM
    finances.incomes.splice(index, 1);
    saveFinances();
    renderIncomes();
    renderFinancialSummary();
}

function addExpense() {
    // Agrega un nuevo gasto a la lista y actualiza el DOM
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description && amount > 0) {
        const expense = { description, amount };
        finances.expenses.push(expense);
        saveFinances();
        clearForm('expense-form');
        renderExpenses();
        renderFinancialSummary();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function editExpense(index) {
    // Prepara el formulario para editar un gasto existente
    const expense = finances.expenses[index];
    document.getElementById('expense-description').value = expense.description;
    document.getElementById('expense-amount').value = expense.amount;

    document.querySelector('#expense-form button').innerText = 'Actualizar Gasto';
    document.querySelector('#expense-form button').onclick = () => updateExpense(index);
}

function updateExpense(index) {
     // Actualiza los detalles de un gasto existente y actualiza el DOM
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description && amount > 0) {
        finances.expenses[index] = { description, amount };
        saveFinances();
        clearForm('expense-form');
        renderExpenses();
        renderFinancialSummary();
        document.querySelector('#expense-form button').innerText = 'Agregar Gasto';
        document.querySelector('#expense-form button').onclick = addExpense;
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function removeExpense(index) {
     // Elimina un gasto de la lista y actualiza el DOM
    finances.expenses.splice(index, 1);
    saveFinances();
    renderExpenses();
    renderFinancialSummary();
}

function renderStaff() {
    // Renderiza la lista de personal en el DOM
    const staffList = document.getElementById('staff-list');
    staffList.innerHTML = '<h4 class="mt-4">Lista de Personal</h4>';
    staff.forEach((member, index) => {
        const staffCard = document.createElement('div');
        staffCard.className = 'card staff-card';
        staffCard.innerHTML = `
            <div class="card-body">
               <p class="card-text"><strong>Nombre:</strong> ${member.name}</p>
                <p class="card-text"><strong>Cargo:</strong> ${member.position}</p>
                <p class="card-text"><strong>Contacto:</strong> ${member.contact}</p>
                <div class="staff-actions">
                    <button class="btn btn-secondary" onclick="editStaff(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="removeStaff(${index})">Eliminar</button>
                </div>
            </div>
        `;
        staffList.appendChild(staffCard);
    });
}

function addStaff() {
     // Agrega un nuevo miembro del personal a la lista y actualiza el DOM
    const name = document.getElementById('staff-name').value;
    const position = document.getElementById('staff-position').value;
    const contact = document.getElementById('staff-contact').value;

    if (name && position && contact) {
        const member = { name, position, contact };
        staff.push(member);
        saveStaff();
        clearForm('staff-form');
        renderStaff();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function editStaff(index) {
    // Prepara el formulario para editar un miembro del personal existente
    const member = staff[index];
    document.getElementById('staff-name').value = member.name;
    document.getElementById('staff-position').value = member.position;
    document.getElementById('staff-contact').value = member.contact;

    document.querySelector('#staff-form button').innerText = 'Actualizar Empleado';
    document.querySelector('#staff-form button').onclick = () => updateStaff(index);
}

function updateStaff(index) {
    // Actualiza los detalles de un miembro del personal existente y actualiza el DOM
    const name = document.getElementById('staff-name').value;
    const position = document.getElementById('staff-position').value;
    const contact = document.getElementById('staff-contact').value;

    if (name && position && contact) {
        staff[index] = { name, position, contact };
        saveStaff();
        clearForm('staff-form');
        renderStaff();
        document.querySelector('#staff-form button').innerText = 'Agregar Empleado';
        document.querySelector('#staff-form button').onclick = addStaff;
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function removeStaff(index) {
    // Elimina un miembro del personal de la lista y actualiza el DOM
    staff.splice(index, 1);
    saveStaff();
    renderStaff();
}

function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}

function saveFinances() {
    localStorage.setItem('finances', JSON.stringify(finances));
}

function saveStaff() {
    localStorage.setItem('staff', JSON.stringify(staff));
}

function clearForm(formId) {
    document.getElementById(formId).reset();
}

function renderMatches(filteredMatches = matches) {
    /* renderiza los partidos añadidos */
    const matchList = document.getElementById('match-list');
    matchList.innerHTML = '<h4 class="mt-4">Lista de Partidos</h4>';
    filteredMatches.forEach((match, index) => {
        const matchCard = document.createElement('div');
        matchCard.className = 'card match-card';
        let resultText = '';
        switch (match.result) {
            case 'ganado':
                resultText = '<span class="badge badge-success">Ganado</span>';
                break;
            case 'perdido':
                resultText = '<span class="badge badge-danger">Perdido</span>';
                break;
            case 'empatado':
                resultText = '<span class="badge badge-warning">Empatado</span>';
                break;
            default:
                resultText = '<span class="badge badge-secondary">No jugado</span>';
        }
        matchCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${match.date} - ${match.time}</h5>
                <p class="card-text"><strong>Rival:</strong> ${match.opponent}</p>
                <p class="card-text"><strong>Estadio:</strong> ${match.stadium}</p>
                <p class="card-text">${resultText}</p>
                <div class="match-actions">
                    <button class="btn btn-secondary" onclick="viewMatchDetails(${index})">Detalles</button>
                    <button class="btn btn-secondary" onclick="editMatch(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="removeMatch(${index})">Eliminar</button>
                </div>
            </div>
        `;
        matchList.appendChild(matchCard);
    });
}

function addMatch() {
  /* añade el partido a jugar o jugado( Fecha, rival, estadio, hora y resultado) */
    const date = document.getElementById('match-date').value;
    const opponent = document.getElementById('match-opponent').value;
    const stadium = document.getElementById('match-stadium').value;
    const time = document.getElementById('match-time').value;
    const result = document.getElementById('match-result').value;

    if (date && opponent && stadium && time) {
        const match = { date, opponent, stadium, time, result };
        matches.push(match);
        saveMatches();
        clearForm('match-form');
        renderMatches();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function editMatch(index) {
   /* edita el partido a jugar o jugado( Fecha, rival, estadio, hora y resultado) */
    const match = matches[index];
    document.getElementById('match-date').value = match.date;
    document.getElementById('match-opponent').value = match.opponent;
    document.getElementById('match-stadium').value = match.stadium;
    document.getElementById('match-time').value = match.time;
    document.getElementById('match-result').value = match.result;

    document.querySelector('#match-form button').innerText = 'Actualizar Partido';
    document.querySelector('#match-form button').onclick = () => updateMatch(index);
}

function updateMatch(index) {
    /* atualiza el partido a jugar o jugado( Fecha, rival, estadio, hora y resultado) */
    const date = document.getElementById('match-date').value;
    const opponent = document.getElementById('match-opponent').value;
    const stadium = document.getElementById('match-stadium').value;
    const time = document.getElementById('match-time').value;
    const result = document.getElementById('match-result').value;

    if (date && opponent && stadium && time) {
        matches[index] = { date, opponent, stadium, time, result };
        saveMatches();
        clearForm('match-form');
        renderMatches();
        document.querySelector('#match-form button').innerText = 'Agregar Partido';
        document.querySelector('#match-form button').onclick = addMatch;
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
}

function removeMatch(index) {
   /* elimina el partido a jugar o jugado( Fecha, rival, estadio, hora y resultado) */
    matches.splice(index, 1);
    saveMatches();
    renderMatches();
}

function saveMatches() {
   /* guarda los partidos ingresados */
    localStorage.setItem('matches', JSON.stringify(matches));
}

function clearForm(formId) {
    /* limpia los formularios */
    document.getElementById(formId).reset();
}

function filterMatches() {
   /* filtra los partidos añadidos por fecha y muestra el partido q coincida con la fecha filtrada */
    const filterDate = document.getElementById('filter-date').value;
    if (filterDate) {
        const filteredMatches = matches.filter(match => match.date === filterDate);
        renderMatches(filteredMatches);
    } else {
        renderMatches(matches);
    }
}

function viewMatchDetails(index) {
   /*  muestra a traves de una alerta los detalles de los partidos añadidos */
    const match = matches[index];
    alert(`Fecha: ${match.date}\nHora: ${match.time}\nRival: ${match.opponent}\nEstadio: ${match.stadium}\nResultado: ${match.result}`);
}