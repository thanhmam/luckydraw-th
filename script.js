document.addEventListener('DOMContentLoaded', () => {
    // --- CÁC PHẦN TỬ GIAO DIỆN ---
    const resultDiv = document.getElementById('result');
    const spinButton = document.getElementById('spinButton');
    const prizeInfoDiv = document.getElementById('current-prize-info');

    // --- CẤU TRÚC GIẢI THƯỞNG (SONG NGỮ) ---
    const prizes = [
        {
            name: "Vouchers",
            count: 35,
            listElementId: "list-vouchers"
        },
        {
            name: "Voucher khách sạn Pattaya / Hotel Voucher in Pattaya",
            count: 2,
            listElementId: "list-pattaya"
        },
        {
            name: "Vé máy bay Vietjet Air / Flight ticket by Vietjet Air",
            count: 1,
            listElementId: "list-vietjet"
        },
        {
            name: "Vé máy bay Vietnam Airlines / Flight ticket by Vietnam Airlines",
            count: 2,
            listElementId: "list-vietnam-airlines"
        }
    ];

    // --- BIẾN TRẠNG THÁI ---
    let spunNumbers = new Set();
    let currentPrizeIndex = 0;
    let numbersDrawnForCurrentPrize = 0;

    // --- HÀM CẬP NHẬT GIAO DIỆN ---
    function updateUI() {
        if (currentPrizeIndex >= prizes.length) {
            prizeInfoDiv.textContent = "Tất cả các giải đã được quay! / All prizes have been drawn!";
            spinButton.textContent = "HOÀN THÀNH / COMPLETED";
            spinButton.disabled = true;
            return;
        }

        const currentPrize = prizes[currentPrizeIndex];
        prizeInfoDiv.innerHTML = `Đang quay giải / Now spinning for: <b>${currentPrize.name}</b><br>
                                  Lượt / Spin: ${numbersDrawnForCurrentPrize + 1} / ${currentPrize.count}`;
    }

    // --- HÀM TẠO HIỆU ỨNG QUAY SỐ ---
    function animateNumber(finalNumber) {
        let animationInterval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 999) + 1;
            resultDiv.textContent = randomNumber.toString().padStart(3, '0');
        }, 50);

        setTimeout(() => {
            clearInterval(animationInterval);
            resultDiv.textContent = finalNumber.toString().padStart(3, '0');
            addNumberToResults(finalNumber);
            spinButton.disabled = false;
        }, 2500);
    }

    // --- HÀM THÊM SỐ VÀO DANH SÁCH KẾT QUẢ ---
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
    
    // --- SỰ KIỆN CLICK NÚT QUAY SỐ ---
    spinButton.addEventListener('click', () => {
        if (currentPrizeIndex >= prizes.length) return;

        spinButton.disabled = true;

        let winningNumber;
        do {
            winningNumber = Math.floor(Math.random() * 999) + 1;
        } while (spunNumbers.has(winningNumber));

        spunNumbers.add(winningNumber);

        animateNumber(winningNumber);
    });

    // --- KHỞI TẠO GIAO DIỆN LẦN ĐẦU ---
    prizeInfoDiv.textContent = "Nhấn nút để bắt đầu / Press the button to start";
});
