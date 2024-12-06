// Initialize the flashcards array
let flashcards = [];

// Show the "Create Flashcard" page
function showCreatePage() {
    document.getElementById("introPage").style.display = "none";
    document.getElementById("createPage").style.display = "block";
}

// Show the "Test Knowledge" page
// Show the "Test Knowledge" page
function showTestPage() {
    if (flashcards.length === 0) {
        alert("No flashcards available. Please create some first.");
        backToMenu();
        return;
    }

    document.getElementById("introPage").style.display = "none";
    document.getElementById("testPage").style.display = "block";
    
    // Prepare the questions for display with numbering
    let testQuestionsHTML = '';
    flashcards.forEach((flashcard, index) => {
        testQuestionsHTML += `
            <div>
                <p><strong>Question ${index + 1}:</strong> ${flashcard.question}</p>
                <input type="text" id="answer${index}" placeholder="Your answer">
            </div>
        `;
    });
    
    testQuestionsHTML += `
        <button type="button" onclick="submitTest()">Submit Answers</button>
    `;
    
    document.getElementById("testQuestions").innerHTML = testQuestionsHTML;
}

// Submit the answers and show the correct answers
function submitTest() {
    let resultHTML = '<h2>Results</h2>';
    
    flashcards.forEach((flashcard, index) => {
        const userAnswer = document.getElementById(`answer${index}`).value.trim();
        const correctAnswer = flashcard.answer;

        // Display the question number, user's answer, and the correct answer
        resultHTML += `
            <div>
                <p><strong>Question ${index + 1}:</strong> ${flashcard.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
            </div>
        `;
    });

    resultHTML += `
        <button type="button" onclick="backToMenu()">Back to Menu</button>
    `;
    
    // Clear previous content and add results
    const testQuestionsContainer = document.getElementById("testQuestions");
    testQuestionsContainer.innerHTML = resultHTML;
}


// Show the "Delete Flashcard" page
function showDeletePage() {
    if (flashcards.length === 0) {
        alert("No flashcards to delete.");
        backToMenu();
        return;
    }

    document.getElementById("introPage").style.display = "none";
    document.getElementById("deletePage").style.display = "block";
    let flashcardListHTML = '';
    flashcards.forEach((flashcard, index) => {
        flashcardListHTML += `
            <li onclick="deleteFlashcard(${index})">
                <p><strong>Question:</strong> ${flashcard.question}</p>
                <p><strong>Answer:</strong> ${flashcard.answer}</p>
            </li>
        `;
    });
    document.getElementById("flashcardList").innerHTML = flashcardListHTML;
}

// Save the flashcard
function saveFlashcard() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    if (question && answer) {
        flashcards.push({ question, answer });
        console.log("Flashcard Created!");
        alert("Flashcard saved!");

        // Reset the form
        document.getElementById("createForm").reset();
        backToMenu();
    } else {
        alert("Please enter both a question and an answer.");
    }
}

// Delete a flashcard
function deleteFlashcard(index) {
    flashcards.splice(index, 1);
    alert("Flashcard deleted!");
    showDeletePage();  // Refresh the delete page after deletion
}

// Test the flashcards
function testAnswers() {
    let correctCount = 0;
    flashcards.forEach((flashcard, index) => {
        const userAnswer = document.getElementById(`answer${index}`).value.trim();
        const correctAnswer = flashcard.answer;

        // Show the correct answer after the user enters theirs
        document.getElementById(`correctAnswer${index}`).style.display = "inline";

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            correctCount++;
        }
    });

    alert(`You got ${correctCount} out of ${flashcards.length} correct!`);
    backToMenu();
}

// Exit the app
function exitApp() {
    window.close();  // Close the browser window/tab (may not work in all browsers)
}

// Go back to the main menu (intro page)
function backToMenu() {
    document.getElementById("createPage").style.display = "none";
    document.getElementById("testPage").style.display = "none";
    document.getElementById("deletePage").style.display = "none";
    document.getElementById("introPage").style.display = "block";
}
