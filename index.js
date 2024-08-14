const buttons = document.querySelectorAll('button:not(#restart)');
const resultDiv = document.getElementById('result');
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const roundSpan = document.getElementById('round');
const restartButton = document.getElementById('restart');

let userScore = 0;
let computerScore = 0;
let currentRound = 1;
const maxRounds = 5;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.id;
        const computerChoice = getComputerChoice();
        const result = determineWinner(userChoice, computerChoice);
        displayResult(userChoice, computerChoice, result);
        updateScore(result);
        updateRound();
        if (currentRound > maxRounds) {
            endGame();
        }
    });
});

function getComputerChoice() {
    const choices = ['камень', 'ножницы', 'бумага'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(user, computer) {
    if (user === computer) {
        return 'Ничья!';
    }
    if (
        (user === 'камень' && computer === 'ножницы') ||
        (user === 'ножницы' && computer === 'бумага') ||
        (user === 'бумага' && computer === 'камень')
    ) {
        return 'Вы победили!';
    }
    return 'Компьютер победил!';
}

function displayResult(user, computer, result) {
    resultDiv.innerHTML = `
        Вы выбрали: ${user}<br>
        Компьютер выбрал: ${computer}<br>
        Результат: ${result}
    `;
}

function updateScore(result) {
    if (result === 'Вы победили!') {
        userScore++;
        userScoreSpan.textContent = userScore;
    } else if (result === 'Компьютер победил!') {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
    }
}

function updateRound() {
    currentRound++;
    roundSpan.textContent = currentRound;
}

function endGame() {
    const finalResult = userScore > computerScore ? 'Вы выиграли игру!' : 'Компьютер выиграл игру!';
    resultDiv.innerHTML += `<br><strong>${finalResult}</strong>`;
    restartButton.style.display = 'block';
}

restartButton.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    currentRound = 1;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
    roundSpan.textContent = currentRound;
    resultDiv.innerHTML = '';
    restartButton.style.display = 'none';
});
