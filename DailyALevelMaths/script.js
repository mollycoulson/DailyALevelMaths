// script.js
document.addEventListener('DOMContentLoaded', () => {
    const challenge = { question: "08_06_24.jpg", answer: 4 * Math.sqrt(2) }; // Sample question with the answer

    // Dynamically set the image source
    const questionImage = document.getElementById('question-image');
    questionImage.src = challenge.question;
});

function submitAnswer() {
    const userAnswerText = document.getElementById('answer').value;
    const resultSection = document.getElementById('result');
    const correctAnswer = 4 * Math.sqrt(2); // Use the actual answer from the challenge object

    try {
        // Use math.js to evaluate the user's input
        const userAnswer = math.evaluate(userAnswerText);

        // Define a small tolerance for floating point comparison
        const tolerance = 0.01;

        // Check if the user's answer is within the tolerance range of the correct answer
        if (Math.abs(userAnswer - correctAnswer) < tolerance) {
            resultSection.innerText = "Correct!";
            resultSection.style.color = "green";
        } else {
            resultSection.innerText = "Incorrect. Try again!";
            resultSection.style.color = "red";
        }
    } catch (error) {
        // Handle errors in user input
        resultSection.innerText = "Invalid input. Please enter a valid mathematical expression.";
        resultSection.style.color = "red";
    }
}
