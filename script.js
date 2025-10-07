// Lấy các phần tử từ HTML
const resultDiv = document.getElementById('result');
const spinButton = document.getElementById('spinButton');

// Hàm để tạo hiệu ứng quay số
function animateNumber(finalNumber) {
    let currentNumber = 0;
    const interval = setInterval(() => {
        // Tạo một số ngẫu nhiên để hiển thị trong lúc quay
        let randomNumber = Math.floor(Math.random() * 999) + 1;
        // Định dạng số để luôn có 3 chữ số (ví dụ: 007, 098, 123)
        resultDiv.textContent = randomNumber.toString().padStart(3, '0');
    }, 50); // Cứ 50ms cập nhật số một lần

    // Dừng hiệu ứng sau 3 giây và hiển thị kết quả cuối cùng
    setTimeout(() => {
        clearInterval(interval);
        resultDiv.textContent = finalNumber.toString().padStart(3, '0');
        spinButton.disabled = false; // Bật lại nút bấm
        spinButton.textContent = 'Quay Tiếp!';
    }, 3000); // Hiệu ứng kéo dài 3 giây
}

// Gắn sự kiện "click" cho nút bấm
spinButton.addEventListener('click', () => {
    // Vô hiệu hóa nút bấm trong khi đang quay
    spinButton.disabled = true;
    spinButton.textContent = 'Đang quay...';

    // Sinh một số ngẫu nhiên từ 1 đến 999
    const winningNumber = Math.floor(Math.random() * 999) + 1;

    // Bắt đầu hiệu ứng quay số
    animateNumber(winningNumber);
});
