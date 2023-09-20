const fetchQuestions = async () => {
  const response = await fetch('https://quizz-db-71d50-default-rtdb.firebaseio.com/questions.json');
  const questions = await response.json();
  return questions;
};

const init = async () => {
  const questions = await fetchQuestions();
  let currentQuestionIndex = 0;
  let score = 0; // Agregamos una variable para el puntaje

  const answers = document.querySelectorAll('.answer');
  const scoreElement = document.querySelector('.score'); // Elemento donde se muestra el puntaje

  const displayQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.querySelector('#question h1');
    questionElement.innerText = currentQuestion.question;

    const answerElements = document.querySelectorAll('.answer');
    for (let i = 0; i < answerElements.length; i++) {
      answerElements[i].innerText = currentQuestion.answers[i];
    }
  };

  const updateScore = () => {
    scoreElement.innerText = `Score: ${score}`; // Actualiza el puntaje en el HTML
  };

  const shuffleQuestions = () => {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    displayQuestion();
  };

  for (const answer of answers) {
    answer.addEventListener('click', function() {
      if (this.innerText === questions[currentQuestionIndex].correctAnswer) {
        this.classList.add('rightAnswer');
        score++; // Aumenta el puntaje si la respuesta es correcta
        updateScore(); // Actualiza el puntaje en el HTML
      } else {
        this.classList.add('wrongAnswer');
        score = 0; // Reinicia el puntaje si la respuesta es incorrecta
        updateScore(); // Actualiza el puntaje en el HTML
        for (const answer of answers) {
          if (answer.innerText === questions[currentQuestionIndex].correctAnswer) {
            answer.classList.add('rightAnswer');
          }
        }
      }
      setTimeout(function() {
        for (const answer of answers) {
          answer.classList.remove('rightAnswer', 'wrongAnswer');
        }
        shuffleQuestions();
      }, 1000);
    });
  }

  shuffleQuestions();
  updateScore(); // Inicializa el puntaje en el HTML
};

init();
