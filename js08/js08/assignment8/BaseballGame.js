var newGameButton = document.getElementById('new');
var keyDisplayElement = document.getElementById('key');
var guessDisplayElement = document.getElementById('guess');
var statTableBodyElement = document.getElementById('tbody-stat');
var digitButtonsElements = document.querySelectorAll('.digit');
var secretCode;

// NumberGame class
class NumberGame {
    // Generate a secret code
    generateSecretCode() {
        var digits = this.shuffleDigits();
        secretCode = digits.slice(0, 3).join('');
        return secretCode;
    }

    // Shuffle an array of digits
    shuffleDigits() {
        return Array.from({ length: 10 }, (_, i) => i)
            .sort(() => Math.random() - 0.5);
    }

    // Handle digit button click event
    handleDigitButtonClick(event) {
        var digitButton = event.target;
        var digit = digitButton.textContent;

        // Update user's guess, disable clicked button, and update statistics table
        this.updateUserGuess(digit);
        this.disableDigitButton(digitButton);
        this.updateStatisticsTable();

        // If the guess is complete, enable digit buttons
        if (this.isGuessComplete()) {
            this.enableDigitButtons();
        }
    }

    // Update user's guess
    updateUserGuess(digit) {
        var currentGuess = guessDisplayElement.textContent || '';
        if (currentGuess.length < 3) {
            guessDisplayElement.textContent = currentGuess + digit;
        }
    }

    // Clear user's guess
    clearUserGuess() {
        guessDisplayElement.textContent = '';
    }

    // Clear statistics table
    clearStatisticsTable() {
        statTableBodyElement.innerHTML = '';
    }

    // Update statistics table with current guess
    updateStatisticsTable() {
        var currentGuess = guessDisplayElement.textContent;
        if (currentGuess.length === 3) {
            var newRow = this.createStatisticsTableRow(currentGuess);
            statTableBodyElement.appendChild(newRow);
            this.clearUserGuess();

            // If the guess is correct, handle game win
            if (this.isCorrectGuess(currentGuess)) {
                this.handleGameWin();
            }
        }
    }

    // Create a table row for statistics
    createStatisticsTableRow(currentGuess) {
        var newRow = document.createElement('tr');
        var guessCell = document.createElement('td');
        var ballsCell = document.createElement('td');
        var strikesCell = document.createElement('td');

        guessCell.textContent = currentGuess;
        ballsCell.textContent = this.countBalls(currentGuess);
        strikesCell.textContent = this.countStrikes(currentGuess);

        newRow.appendChild(guessCell);
        newRow.appendChild(ballsCell);
        newRow.appendChild(strikesCell);

        return newRow;
    }

    // Count the number of balls in a guess
    countBalls(guess) {
        var secretCodeArray = secretCode.split('');
        var guessArray = guess.split('');

        return guessArray.filter((digit, index) =>
            secretCodeArray.includes(digit) && digit !== secretCodeArray[index]
        ).length;
    }

    // Count the number of strikes in a guess
    countStrikes(guess) {
        var secretCodeArray = secretCode.split('');
        var guessArray = guess.split('');

        return guessArray.filter((digit, index) =>
            digit === secretCodeArray[index]
        ).length;
    }

    // Handle game win
    handleGameWin() {
        alert('Congratulations! You guessed the secret code: ' + secretCode + '\nClick "New Game" to play again.');
        this.enableDigitButtons();
    }

    // Disable a digit button
    disableDigitButton(button) {
        button.disabled = true;
    }

    // Enable all digit buttons
    enableDigitButtons() {
        digitButtonsElements.forEach(button => button.disabled = false);
    }

    // Check if the guess is correct
    isCorrectGuess(guess) {
        return guess === secretCode;
    }

    // Check if the guess is complete
    isGuessComplete() {
        return guessDisplayElement.textContent.length % 3 === 0;
    }
}

// Create an instance of NumberGame
const game = new NumberGame();

// Event listener for New Game button
newGameButton.addEventListener('click', function () {
    // Initialize a new game
    initializeGame();
});

// Event listener for digit buttons
digitButtonsElements.forEach(function (button) {
    button.addEventListener('click', function (event) {
        // Handle digit button click
        game.handleDigitButtonClick(event);
    });
});

// Function to initialize the game
function initializeGame() {
    const secretCode = game.generateSecretCode();
    keyDisplayElement.textContent = secretCode;
    game.clearUserGuess();
    game.clearStatisticsTable();
    game.enableDigitButtons();
}
