// Store flashcards in localStorage to persist data
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

// Show/Create Flashcard Page
function showCreatePage() {
    console.log("Showing create page...");
    resetAllPages();
    document.getElementById("createPage").classList.add("active");
}

// Show/Test Knowledge Page
function showTestPage() {
    console.log("Showing test page...");
    resetAllPages();
    document.getElementById("testPage").classList.add("active");
    renderTestQuestions();
}

// Show/Delete Flashcard Page
function showDeletePage() {
    console.log("Showing delete page...");
    resetAllPages();
    document.getElementById("deletePage").classList.add("active");
    renderFlashcardList();
}

// Reset all pages (hide them)
function resetAllPages() {
    console.log("Resetting pages...");
    const pages = document.querySelectorAll('.container');
    pages.forEach(page => page.classList.remove('active'));
}

// Save Flashcard
function saveFlashcard() {
    console.log("Saving flashcard...");
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    if (question && answer) {
        const newFlashcard = { question, answer };
        flashcards.push(newFlashcard);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));

        alert("Flashcard saved successfully!");
        document.getElementById("createForm").reset(); // Reset the form fields
        backToMenu(); // Go back to the menu
    } else {
        alert("Please fill out both fields.");
    }
}

// Render flashcards for testing
function renderTestQuestions() {
    const testQuestionsDiv = document.getElementById("testQuestions");
    testQuestionsDiv.innerHTML = ""; // Clear previous content

    flashcards.forEach((flashcard, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('flashcard-question');
        questionElement.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${flashcard.question}</p>
            <input type="text" id="answer${index}" placeholder="Your answer" class="input-field">
        `;
        testQuestionsDiv.appendChild(questionElement);
    });
}

// Submit answers and show results
function testAnswers() {
    console.log("Testing answers...");
    let correctCount = 0;

    flashcards.forEach((flashcard, index) => {
        const userAnswer = document.getElementById(`answer${index}`).value.trim().toLowerCase();
        if (userAnswer === flashcard.answer.toLowerCase()) {
            correctCount++;
        }
    });

    alert(`You answered ${correctCount} out of ${flashcards.length} correctly!`);
    backToMenu();
}

// Render flashcards for deletion
function renderFlashcardList() {
    const flashcardList = document.getElementById("flashcardList");
    flashcardList.innerHTML = ""; // Clear previous list

    flashcards.forEach((flashcard, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${flashcard.question}</p>
            <button class="btn btn-danger" onclick="deleteFlashcard(${index})">Delete</button>
        `;
        flashcardList.appendChild(listItem);
    });
}

// Delete a flashcard
function deleteFlashcard(index) {
    console.log(`Deleting flashcard ${index}...`);
    flashcards.splice(index, 1);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    renderFlashcardList(); // Re-render the list after deletion
}

// Go back to the menu page
function backToMenu() {
    console.log("Going back to menu...");
    resetAllPages();
    document.getElementById("introPage").classList.add("active");
}

// Exit the app
function exitApp() {
    alert("Thanks for using the Flashcard App!");
    window.close(); // This will only work in certain browsers or environments
}

// Initially show the intro page
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded...");
    document.getElementById("introPage").classList.add("active");
});
