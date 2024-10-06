document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    fetch('question.json')  // Fetch the questions from the JSON file
        .then(response => response.json())
        .then(data => {
            const todayQuestion = data.find(q => q.date === currentDate);

            if (todayQuestion) {
                // Dynamically set the image and answer for today
                const questionImage = document.getElementById('question-image');
                questionImage.src = todayQuestion.image;
                window.correctAnswer = math.evaluate(todayQuestion.answer);
            } else {
                document.getElementById('result').innerText = "No question available for today!";
            }
        })
        .catch(error => {
            console.error("Error fetching the questions:", error);
        });
});

function submitAnswer() {
    const userAnswerText = document.getElementById('answer').value;
    const resultSection = document.getElementById('result');

    try {
        const userAnswer = math.evaluate(userAnswerText);
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
