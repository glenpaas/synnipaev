const book = document.querySelector(".book");
const sheets = document.querySelectorAll(".sheet");
let current = 0;

// Initialize z-index: first sheet on top
sheets.forEach((sheet, index) => {
    sheet.style.zIndex = sheets.length - index;
});

// Update z-index on flip to avoid overlaps
function updateZIndex() {
    sheets.forEach((sheet, index) => {
        if (sheet.classList.contains("flipped")) {
            // Flipped sheets go behind
            sheet.style.zIndex = index;
        } else {
            // Not flipped sheets stay on top
            sheet.style.zIndex = sheets.length - index;
        }
    });
}

function nextPage() {
    if (current < sheets.length) {
        sheets[current].classList.add("flipped");
        current++;
        updateZIndex();
    }
}

function prevPage() {
    if (current > 0) {
        current--;
        sheets[current].classList.remove("flipped");
        updateZIndex();
    }
}

// Click to turn pages
book.addEventListener("click", (e) => {
    const rect = book.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width / 2) nextPage();
    else prevPage();
});

// Buttons
document.getElementById("next").addEventListener("click", nextPage);
document.getElementById("prev").addEventListener("click", prevPage);