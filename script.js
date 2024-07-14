document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-button');
    let currentQuestionIndex = 0;

    const questions = [
        {
            question: "India is a federal union comprising twenty-eight states and how many union territories?",
            options: ["A. 6", "B. 7", "C. 8", "D. 9"],
            answer: "C. 8"
        },
        {
            question: "Which of the following is the capital of Arunachal Pradesh?",
            options: ["A. Dispur", "B. Itanagar", "C. Imphal"],
            answer: "B. Itanagar"
        }
    ];

    function loadQuestion(questionIndex) {
        const question = questions[questionIndex];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn', 'btn-option');
            button.setAttribute('data-answer', option); // Add data-answer attribute
            button.onclick = () => selectOption(option, question.answer);
            optionsElement.appendChild(button);
        });
    }

    function selectOption(selected, correctAnswer) {
        const question = questions[currentQuestionIndex];
        optionsElement.querySelectorAll('.btn-option').forEach(btn => {
            btn.disabled = true; // Disable all buttons after selecting an option
            if (btn.textContent === correctAnswer) {
                btn.classList.add('btn-correct');
            } else if (btn.textContent === selected) {
                btn.classList.add('btn-wrong');
            }
        });

        // Display the correct answer box in green
        const correctButton = optionsElement.querySelector(`.btn-option[data-answer="${correctAnswer}"]`);
        correctButton.classList.add('btn-correct');
    }

    nextButton.addEventListener('click', () => {
        // Remove classes and enable buttons before loading next question
        optionsElement.querySelectorAll('.btn-option').forEach(btn => {
            btn.classList.remove('btn-correct', 'btn-wrong');
            btn.disabled = false;
        });

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            alert('Quiz completed!');
            currentQuestionIndex = 0;
        }
    });

    // Load the first question
    loadQuestion(currentQuestionIndex);
});
