const numberGame = new GameInstance();

document.addEventListener('DOMContentLoaded', function () {
    initializeGameUI();

    function initializeGameUI() {
        newGameButton.addEventListener('click', startNewGame);
        digitButtons.forEach(function (button) {
            button.addEventListener('click', handleDigitButtonClick);
        });

        startNewGame();
    }

    function startNewGame() {
        const secretCode = numberGame.generateSecretCode();
        displaySecretCode(secretCode);
        numberGame.resetUserGuess();
        numberGame.resetStatistics();
        enableDigitButtons();
    }

    function handleDigitButtonClick(event) {
        const digitButton = event.target;
        const digit = digitButton.textContent;

        updateGameOnDigitButtonClick(digitButton, digit);
    }

    function updateGameOnDigitButtonClick(digitButton, digit) {
        numberGame.updateUserGuess(digit);
        disableDigitButton(digitButton);
        numberGame.updateStatistics();

        if (isUserGuessComplete()) {
            enableDigitButtons();
        }
    }

    function displaySecretCode(secretCode) {
        keyDisplay.textContent = secretCode;
    }

    function enableDigitButtons() {
        // Implement your logic to enable digit buttons
    }

    function disableDigitButton(digitButton) {
        // Implement your logic to disable a specific digit button
    }

    function isUserGuessComplete() {
        return numberGame.getUserGuess().length % 3 === 0;
    }
});
