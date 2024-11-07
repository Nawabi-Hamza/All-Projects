
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 3000],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements,sort=false){
    containerMovements.innerHTML = ''
    const movs = sort ? movements.slice().sort((a,b)=>a-b):movements;

    movs.forEach(function(mov,i){
        const type = mov > 0 ? 'deposit':'withdrawal'
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">
              ${i+1} ${type}
            </div>
            <div class="movements__value">${mov} €</div>
        </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin',html);
    })
}
// displayMovements(account1.movements)
const calcDispalyBalance = function(acc){
    acc.balance = acc.movements.reduce((acc,cur) => acc + cur, 0)
    labelBalance.textContent = `${acc.balance} EUR`
}
// calcDispalyBalance(account1.movements)
const calcDisplaySummary = function(acc){
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc,cur) => acc + cur, 0);
    labelSumIn.textContent = `${incomes} €`
    const out = acc.movements
        .filter(mov=>mov<0)
        .reduce((acc,mov)=>acc + mov,0);
    labelSumOut.textContent = `${Math.abs(out)} €`
    const interest = acc.movements.filter( mov=>mov>0)
        .map(deposit=>deposit*acc.interestRate/100)
        .filter((int,i,arr)=>{
            console.log(arr)
            return int>=1
        })
        .reduce((acc,int)=> acc+int,0)
        labelSumInterest.textContent = `${interest} €`
}

// create username for user accounts
const createUsernames = function(accs){
    accs.forEach(function(acc){
        acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map( (name)=>name[0] )
        .join("");
    })
        // return username
}
createUsernames(accounts)

//  console.log(accounts)



const updateUI = function(acc){
    // display movents
    displayMovements(acc.movements)
    // display balance
    calcDispalyBalance(acc)
    // display summary
    calcDisplaySummary(acc)
}

const startLogOutTimer = function(){
    const tick = function(){
        // in each call, print the remaining time to UI
        const min = Math.floor(time/60)
        const sec = time%60
        labelTimer.textContent = `${min}:${sec}`
        // when 0 second stop timer and log out user
        if(time===0){
            clearInterval(timer)
            labelWelcome.textContent = 'Log in to get started'
            containerApp.style = "opacity:0;"
        }
        // decrease 1s
        time--
    }
    // set time 5 minutes
    let time = 120
    // call the timer every second
    tick()
    const timer = setInterval(tick,1000)
    return timer
}
//////////////////////////////////////
// Event Handler For Login
let currentAccount, timer;
btnLogin.addEventListener("click",function(e){
    e.preventDefault()
    currentAccount = accounts.find(acc=> acc.username===inputLoginUsername.value )
    if(currentAccount?.pin === Number(inputLoginPin.value)){
        // Display UI Message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
        containerApp.style = "opacity:1;"
        // Create current date and time
        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }
        labelDate.textContent = new Intl.DateTimeFormat(
            currentAccount.locale,
            options
        ).format(now)

        // clear input fields
        inputLoginUsername.value = inputLoginPin.value = ""
        inputLoginPin.blur()
        // Reset Timer
        if(timer) clearInterval(timer)
        timer = startLogOutTimer()
        // Update ui
        updateUI(currentAccount)
        
    }else{
        labelWelcome.textContent = `Wrong Password...`
        containerApp.style = "opacity:0;"
    }
    // console.log('Login')
})

// Transfer 
btnTransfer.addEventListener('click',function(e){
    e.preventDefault()
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc=> acc.username === inputTransferTo.value)
    // console.log(amount,receiverAcc)
    if(
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount && 
        receiverAcc?.username !== currentAccount.username ){
            // do transfer
            currentAccount.movements.push(-amount)
            receiverAcc.movements.push(amount)
            updateUI(currentAccount)
            inputTransferTo.value = inputTransferAmount.value = ''
            // Reset Timer
            if(timer) clearInterval(timer)
            timer = startLogOutTimer()
        }
    else{
        console.log("invalid transfer")
    }
})
// Loan
btnLoan.addEventListener('click',function(e){
    e.preventDefault()
    const amount = Number(inputLoanAmount.value)
    if( amount > 0 &&
        currentAccount.movements.some(mov => mov >= amount * 0.1)){
        // approve loan
        currentAccount.movements.push(amount)
        updateUI(currentAccount)
        // Reset Timer
        if(timer) clearInterval(timer)
        timer = startLogOutTimer()
    }
    inputLoanAmount.value = ''
})
// Close
btnClose.addEventListener('click',function(e){
    e.preventDefault()
    if(
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ){
        const index = accounts.findIndex(acc=>acc.username === currentAccount.username)
        // console.log(index)
        accounts.splice(index,1)
        containerApp.style = "opacity:0;"
        labelWelcome.textContent = `Good Bye !, ${currentAccount.owner.split(' ')[0]}`
        
        console.log("Account Deleted")
    }
    else{
        inputCloseUsername.value = inputClosePin.value = ''
        console.log("Invalid deletion")
    }
})
// Sort
let sorted = false
btnSort.addEventListener('click',function(e){
    e.preventDefault()
    displayMovements(currentAccount.movements,!sorted)
    sorted = !sorted
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// console.log(Math.max(...movements))

// console.log(movements.includes(450))

// console.log( movements.some( mov => mov>1000 ) )
// console.log( movements.every( mov => mov>-800 ) )

// const  m = movements.find( mov=>mov<0)
// console.log(m)


// const eurToUsd = 1.1

// const totalDepositsUSD = movements
//     .filter(move=>move<0)
//     .map((move,i,arr)=>{
//         // console.log(arr)
//         return move*eurToUsd
//     })
//     .reduce((acc,mov)=>acc+mov,0)
//     console.log(totalDepositsUSD)

// const checkDogs = function(dogsJulia,dogsKate){
//     const dogsJuliaCorrected = dogsJulia.slice()
//     dogsJuliaCorrected.splice(0,1)
//     dogsJuliaCorrected.splice(-2)
//     // dogsJuliaCorrected.slice(1,3)
//     const dogs = dogsJuliaCorrected.concat(dogsKate)
//     // console.log(dogs)
//     dogs.forEach(function(dog,i){
//         if(dog>=3){
//             console.log(`Dog number ${i+1} is an adult and is ${dog} years old`)
//         }else{
//             console.log(`Dog number ${i+1} is a puppy`)
//         }
//     })
// }


// checkDogs([ 3,5,2,12,7 ],[ 4,1,15,8,3 ])


labelBalance.addEventListener("click",function(e){
    const movementsUI = Array.from(
        document.querySelectorAll(".movements__value"),
        el => Number(el.textContent.replace("€",''))
    )
    console.log(movementsUI)
})