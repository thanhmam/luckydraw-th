document.addEventListener('DOMContentLoaded', () => {
    // UI ELEMENTS
    const resultDiv = document.getElementById('result');
    const spinButton = document.getElementById('spinButton');
    const prizeInfoDiv = document.getElementById('current-prize-info');

    // PRIZE STRUCTURE
    const prizes = [
        {
            name: "Vouchers",
            count: 35,
            listElementId: "list-vouchers"
        },
        {
            name: "Hotel Voucher in Pattaya",
            count: 2,
            listElementId: "list-pattaya"
        },
        {
            name: "Flight ticket by Vietjet Air",
            count: 1,
            listElementId: "list-vietjet"
        },
        {
            name: "Flight ticket by Vietnam Airlines",
            count: 2,
            listElementId: "list-vietnam-airlines"
        }
    ];

    // STATE VARIABLES
    let spunNumbers = new Set();
    let currentPrizeIndex = 0;
    let numbersDrawnForCurrentPrize = 0;

    // FUNCTION TO UPDATE THE UI TEXT
    function updateUI() {
        if (currentPrizeIndex >= prizes.length) {
            prizeInfoDiv.textContent = "All prizes have been drawn!";
            spinButton.textContent = "COMPLETED";
            spinButton.disabled = true;
            return;
        }
        const currentPrize = prizes[currentPrizeIndex];
        prizeInfoDiv.innerHTML = `Now spinning for: <b>${currentPrize.name}</b><br>
                                  Spin: ${numbersDrawnForCurrentPrize + 1} / ${currentPrize.count}`;
    }

    // FUNCTION TO ADD THE WINNING NUMBER TO THE RESULTS LIST
    function addNumberToResults(number) {
        const currentPrize = prizes[currentPrizeIndex];
        const listElement = document.getElementById(currentPrize.listElementId);
        const numberChip = document.createElement('span');
        numberChip.className = 'number-chip';
        numberChip.textContent = number.toString().padStart(3, '0');
        listElement.appendChild(numberChip);

        numbersDrawnForCurrentPrize++;
        if (numbersDrawnForCurrentPrize >= currentPrize.count) {
            currentPrizeIndex++;
            numbersDrawnForCurrentPrize = 0;
        }
        updateUI();
    }

    // CLICK EVENT FOR THE SPIN BUTTON
    spinButton.addEventListener('click', () => {
        if (spinButton.disabled) return;
        spinButton.disabled = true;

        // Short spinning animation
        let animationInterval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 999) + 1;
            resultDiv.textContent = randomNumber.toString().padStart(3, '0');
        }, 30);

        // Stop the animation and show the result after 0.8 seconds
        setTimeout(() => {
            clearInterval(animationInterval);
            let winningNumber;
            do {
                winningNumber = Math.floor(Math.random() * 999) + 1;
            } while (spunNumbers.has(winningNumber));
            
            spunNumbers.add(winningNumber);
            resultDiv.textContent = winningNumber.toString().padStart(3, '0');
            
            addNumberToResults(winningNumber);
            
            if (currentPrizeIndex < prizes.length) {
                spinButton.disabled = false;
            }
        }, 500);
    });

    // INITIAL UI SETUP
    prizeInfoDiv.textContent = "Press the button to start";
});
