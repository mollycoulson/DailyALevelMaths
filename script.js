document.addEventListener('DOMContentLoaded', () => {
    // Hardcoded date for testing
    const currentDate = "2024-10-06"; // Change this to test other dates if needed

    // Here we manually set the question data
    const questions = [
        {
            "date": "2024-10-06",
            "image": "6_10_24.jpg",
            "answer": "3"
        },
        {
            "date": "2024-10-07",
            "image": "2024-10-07.jpg",
            "answer": "2"
        }
    ];

    const todayQuestion = questions.find(q => q.date === currentDate);

    if (todayQuestion) {
        // Dynamically set the image and answer for today
        const questionImage = document.getElementById('question-image');
        questionImage.src = todayQuestion.image; // Set hardcoded image
        window.correctAnswer = math.evaluate(todayQuestion.answer); // Make sure 'math' is defined
    } else {
        document.getElementById('result').innerText = "No question available for today!";
    }
});

function submitAnswer() {
    const userAnswerText = document.getElementById('answer').value;
    const resultSection = document.getElementById('result');

    try {
        const userAnswer = math.evaluate(userAnswerText); // Ensure 'math' is defined
        const tolerance = 0.01;

        if (Math.abs(userAnswer - window.correctAnswer) < tolerance) {
            resultSection.innerText = "Correct!";
            resultSection.style.color = "green";
        } else {
            resultSection.innerText = "Incorrect. Try again!";
            resultSection.style.color = "red";
        }
    } catch (error) {
        resultSection.innerText = "Invalid input. Please enter a valid mathematical expression.";
        resultSection.style.color = "red";
    }
}
