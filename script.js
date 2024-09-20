const questions = [
    {
        image: 'imagens arvores/ipe-amarelo.jpg',
        question: 'Qual árvore é esta?',
        options: ['Ipê Amarelo', 'Pau-Brasil', 'Jacarandá', 'Cedro'],
        answer: 'Ipê Amarelo',
        hint: 'É conhecida por suas flores amarelas brilhantes e é símbolo do Brasil.'
    },
    {
        image: 'imagens arvores/araucaria.jpg',
        question: 'Qual árvore é esta?',
        options: ['Araucária', 'Pinheiro', 'Cedro', 'Carvalho'],
        answer: 'Araucária',
        hint: 'É uma árvore nativa do sul do Brasil e produz pinhões.'
    },
    // Adicione as outras perguntas aqui
];

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleQuestions() {
    shuffle(questions);
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('quiz-image').src = currentQuestion.image;
    document.getElementById('question').innerText = currentQuestion.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const options = [...currentQuestion.options];
    shuffle(options);
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    document.getElementById('hint-button').onclick = () => {
        alert(currentQuestion.hint);
    };
}

function showResponseMessage(message) {
    const responseMessageDiv = document.getElementById('response-message');
    responseMessageDiv.innerText = message;
    responseMessageDiv.style.display = 'block';
    setTimeout(() => {
        responseMessageDiv.style.display = 'none';
    }, 2000);
}

function checkAnswer(selected) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selected === currentQuestion.answer;
    score += isCorrect ? 1 : 0;

    showResponseMessage(isCorrect ? 'Correto!' : 'Errado! A resposta certa é ' + currentQuestion.answer);
    updateScore();

    // Adiciona um intervalo antes de carregar a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showEndScreen();
        }
    }, 2000);
}

function updateScore() {
    document.getElementById('score').innerText = 'Pontuação: ' + score;
}

function showEndScreen() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('end-screen').style.display = 'flex';
    document.getElementById('final-score').innerText = `${score}/${questions.length}`;
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    updateScore();
    shuffleQuestions();
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
}

document.getElementById('start-button').onclick = () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    shuffleQuestions();
    loadQuestion();
};

document.getElementById('restart-button').onclick = () => {
    restartQuiz();
};
