document.addEventListener('DOMContentLoaded', 


function() {
  const questionsData = [
    {
      title: 'Client Information',
      inputs: [
        { label: 'What is your full name?', type: 'text', name: 'clientName', required: true },
        // { label: 'Email:', type: 'email', name: 'clientEmail', required: true },
        // { label: 'Phone Number:', type: 'tel', name: 'clientPhone', required: true }
      ]
    },
    {
      title: 'Property Details',
      inputs: [
        { label: 'Property Address:', type: 'text', name: 'propertyAddress', required: true },
        { label: 'Property Type:', type: 'text', name: 'propertyType', required: true }
      ]
    },
    {
      title: 'Communication with Agency',
      inputs: [
        { label: 'Name of Agency:', type: 'text', name: 'agencyName', required: true },
        { label: 'Contact Person:', type: 'text', name: 'contactPerson' },
        { label: 'Contact Number:', type: 'tel', name: 'contactNumber' },
        { label: 'Contact Email:', type: 'email', name: 'contactEmail' },
        { label: 'Dates of Communication:', type: 'text', name: 'communicationDates' },
        { label: 'Description of Communication:', type: 'text', name: 'communicationDescription' }
      ]
    },
    {
      title: 'Documentation',
      inputs: [
        { label: 'Attached Documents:', type: 'text', name: 'attachedDocuments' },
        { label: 'Details of Documents:', type: 'text', name: 'documentDetails' }
      ]
    },
    // Add more sections/questions as needed
  ];

  const questionContainer = document.getElementById('questionContainer');
  const form = document.createElement('form');

  let currentQuestionIndex = 0;

  function createQuestionElement(question) {
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `<h2>${question.title}</h2>`;

    question.inputs.forEach(input => {
      const label = document.createElement('label');
      label.textContent = input.label;
      const inputField = document.createElement('input');
      inputField.type = input.type;
      inputField.name = input.name;
      if (input.required) {
        inputField.required = true;
      }
      div.appendChild(label);
      div.appendChild(inputField);
    });

    if (currentQuestionIndex !== 0) {
      const backButton = document.createElement('button');
      backButton.textContent = 'Back';
      backButton.style.backgroundColor = 'gray';
      backButton.style.border = 'none';
      backButton.style.color = 'white';
      backButton.classList.add('back-button'); 
      backButton.addEventListener('click', () => {
        goToPreviousQuestion();
      });
      div.appendChild(backButton);
    }

    if (currentQuestionIndex !== questionsData.length) {
      const nextButton = document.createElement('button');
      if (currentQuestionIndex !== questionsData.length - 1) {
        nextButton.textContent = 'Next';
        nextButton.classList.add('navigation-button'); 
        nextButton.addEventListener('click', () => {
          goToNextQuestion();
        });
      } else {
        nextButton.textContent = 'Submit';
        nextButton.classList.add('submit-button'); 
        nextButton.addEventListener('click', () => {
          form.removeEventListener('submit', formSubmitHandler);
          questionContainer.textContent = 'Thank you for completing the questionnaire!';
        });
      }
      div.appendChild(nextButton);
    }

    return div;
  }

  function showQuestion(index) {
    questionContainer.innerHTML = ''; // Clear previous question
    const currentQuestion = questionsData[index];
    const questionElement = createQuestionElement(currentQuestion);
    questionContainer.appendChild(questionElement);
  }

  function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex <= questionsData.length) {
      showQuestion(currentQuestionIndex);
    }
  }

  function goToPreviousQuestion() {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }

  const formSubmitHandler = function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    goToNextQuestion();
  };

  form.addEventListener('submit', formSubmitHandler);

  showQuestion(currentQuestionIndex);
  document.body.appendChild(form);
});
