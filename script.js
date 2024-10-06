document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    fetch('questions.json')  // Fetch the questions from the JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const todayQuestion = data.find(q => q.date === currentDate);

            if (todayQuestion) {
                // Dynamically set the image and answer for today
                const questionImage = document.getElementById('question-image');
                questionImage.src = todayQuestion.image; // Set image from JSON
                window.correctAnswer = math.evaluate(todayQuestion.answer); // Evaluate answer
            } else {
                document.getElementById('result').innerText = "No question available for today!";
            }
        })
        .catch(error => {
            console.error("Error fetching the questions:", error);
            document.getElementById('result').innerText = "Error fetching questions. Please try again later.";
        });
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
