document.addEventListener('DOMContentLoaded', () => {
    // --- CÁC PHẦN TỬ GIAO DIỆN ---
    const resultDiv = document.getElementById('result');
    const spinButton = document.getElementById('spinButton');
    const prizeInfoDiv = document.getElementById('current-prize-info');

    // --- CẤU TRÚC GIẢI THƯỞNG ---
    const prizes = [
        {
            name: "Vouchers (Hanoi, Saigon, Nem nướng)",
            count: 35,
            listElementId: "list-vouchers"
        },
        {
            name: "Voucher 2 đêm tại khách sạn Pattaya",
            count: 2,
            listElementId: "list-pattaya"
        },
        {
            name: "Vé máy bay quốc tế Vietjet Air",
            count: 1,
            listElementId: "list-vietjet"
        },
        {
            name: "Vé máy bay quốc tế Vietnam Airlines",
            count: 2,
            listElementId: "list-vietnam-airlines"
        }
    ];

    // --- BIẾN TRẠNG THÁI ---
    let spunNumbers = new Set(); // Dùng Set để lưu số đã quay, kiểm tra trùng lặp rất nhanh
    let currentPrizeIndex = 0;
    let numbersDrawnForCurrentPrize = 0;

    // --- HÀM CẬP NHẬT GIAO DIỆN ---
    function updateUI() {
        if (currentPrizeIndex >= prizes.length) {
            prizeInfoDiv.textContent = "Tất cả các giải đã được quay!";
            spinButton.textContent = "HOÀN THÀNH!";
            spinButton.disabled = true;
            return;
        }

        const currentPrize = prizes[currentPrizeIndex];
        prizeInfoDiv.innerHTML = `Đang quay <b>${currentPrize.name}</b><br>
                                  Lượt quay: ${numbersDrawnForCurrentPrize + 1} / ${currentPrize.count}`;
        spinButton.textContent = `Quay số cho giải ${currentPrize.name}`;
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
            addNumberToResults(finalNumber); // Thêm số vào danh sách kết quả
            spinButton.disabled = false; // Bật lại nút sau khi có kết quả
        }, 2500); // Thời gian hiệu ứng là 2.5 giây
    }

    // --- HÀM THÊM SỐ VÀO DANH SÁCH KẾT QUẢ ---
    function addNumberToResults(number) {
        const currentPrize = prizes[currentPrizeIndex];
        const listElement = document.getElementById(currentPrize.listElementId);

        const numberChip = document.createElement('span');
        numberChip.className = 'number-chip';
        numberChip.textContent = number.toString().padStart(3, '0');
        listElement.appendChild(numberChip);

        // Cập nhật trạng thái
        numbersDrawnForCurrentPrize++;
        if (numbersDrawnForCurrentPrize >= currentPrize.count) {
            currentPrizeIndex++;
            numbersDrawnForCurrentPrize = 0;
        }

        updateUI(); // Cập nhật lại giao diện cho lượt quay tiếp theo
    }
    
    // --- SỰ KIỆN CLICK NÚT QUAY SỐ ---
    spinButton.addEventListener('click', () => {
        if (currentPrizeIndex >= prizes.length) {
            return; // Đã quay hết giải, không làm gì cả
        }

        spinButton.disabled = true;

        // Sinh số ngẫu nhiên và đảm bảo không bị trùng
        let winningNumber;
        do {
            winningNumber = Math.floor(Math.random() * 999) + 1;
        } while (spunNumbers.has(winningNumber));

        spunNumbers.add(winningNumber); // Thêm số mới vào danh sách đã quay

        animateNumber(winningNumber);
    });

    // --- KHỞI TẠO GIAO DIỆN LẦN ĐẦU ---
    updateUI();
});
