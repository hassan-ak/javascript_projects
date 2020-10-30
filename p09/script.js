//Dom Elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");

//Dummy Transactions
const dummyTransactions = [
    {id:1, description:'Income1', amount:100},
    {id:2, description:'Income2', amount:75},
    {id:3, description:'Expense1', amount:-50},
    {id:4, description:'Expense2', amount:-25},
];

let transactions = dummyTransactions;

// Function to display Transactions in Transaction History
function addTransactionUI(transaction) {
    // Classify if income or expense
    const type = transaction.amount > 0 ? '+' : '-';

    // Create DOM Element for List Item
    const item = document.createElement('li');

    // Add class for list item based on type
    item.classList.add( transaction.amount  > 0 ? 'income-h' : 'expense-h' );

    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="del" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

// Function to update the balance, income, and expense summaries
function updateSums() {
    // Create array of transaction amounts from transactions array
    const amounts = transactions.map( transaction => transaction.amount );
    
    // Calculate total value for balance
    const total = amounts
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Calculate total income
    const totalIncome = amounts
                    .filter( amount => amount > 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);

    // Calculate total expense
    const totalExpense1 = amounts
                    .filter( amount => amount < 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    const totalExpense = Math.abs(totalExpense1)
    

    // Update Balance in DOM
    balance.innerText = `$ ${total}`

    // Update Income in DOM
    income.innerText = `$ ${totalIncome}`

    // Update Expense in DOM
    expense.innerText = `$ ${totalExpense}`
}

// Function to Remove a Transaction
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id );
    init();
}

// Function to generate an ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add a New Transaction from the Form
function addTransaction(e) {
    e.preventDefault();

    if( description.value.trim() === '' || amount.value.trim() === '' ) {
        alert('Please enter a valid description and transaction amount.')
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
            };
        
        transactions.push(transaction);

        addTransactionUI(transaction);
        updateSums();

        description.value = '';
        amount.value = '';
    }
}

// Function to initialize the App
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionUI);
    updateSums();
}

// Event Listeners
// 1. Event Listener for form submit
form.addEventListener('submit', addTransaction);

init();