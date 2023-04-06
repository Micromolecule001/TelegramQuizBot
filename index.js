const TelegramBot = require('node-telegram-bot-api');
const token = '6292547172:AAEzrNkkpIWYTXYC5tJfu6RxWMxIGHSrVM8';
const bot = new TelegramBot(token, { polling: true });

const questions = [
  {
    question: "Какие типы данных поддерживает Python?",
    options: [
      "int, float, bool, complex",
      "str, bytes, bytearray, memoryview",
      "list, tuple, set, frozenset",
      "dict"
    ],
    correctOptionIndex: 1,
    answersCount: 4 // Ответ задается порядковыми номерами вариантов ответов
  },
  {
    question: "Как создать массив в C#?",
    options: [
      "var myArray = [];, var myArray = new Array();",
      "int[] myArray = new int[5];, myArray = [1, 2, 3, 4, 5];",
      "Array myArray = new Array();",
      "myArray = new Array(1, 2, 3, 4, 5);"
    ],
    correctOptionIndex: 1,
    answersCount: 4 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Как получить значение свойства объекта в JavaScript?",
    options: [
      "object.property, object[property], object.getProperty()",
      "object.getProperty, object[property], object.getProperty()",
      "object[property], object.getProperty(), object.getProperty"
    ],
    correctOptionIndex: 1,
    answersCount: 3 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Какой язык используется для управления базами данных?",
    options: [
      "JavaScript, PHP, Python, SQL",
      "C#", "Java, Ruby, Perl",
      "HTML", "CSS, XML, JSON",
      "Assembly, C++, Objective-C, Swift"
    ],
    correctOptionIndex: 3,
    answersCount: 4 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Как добавить элемент в список в Python?",
    options: [
      "list.add(element), list.append(element), list.insert(element)",
      "list.add(element), list.insert(element), list.append(element)",
      "list.insert(element), list.append(element), list.add(element)",
      "list.append(element), list.add(element), list.insert(element)"
    ],
    correctOptionIndex: 2,
    answersCount: 4 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Какой оператор используется в языке Python для выполнения целочисленного деления?",
    options: [
      "/",
      "%",
      "//",
      "*"
    ],
    correctOptionIndex: 2,
    answersCount: 4 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Какая функция используется в языке C# для чтения пользовательского ввода с консоли?",
    options: [
      "Console.Write();",
      "Console.Read();",
      "Console.ReadLine();",
      "Console.WriteLine();"
    ],
    correctOptionIndex: 2,
    answersCount: 4 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Какая команда используется в SQL для выборки данных из таблицы?",
    options: [
      "UPDATE",
      "DELETE",
      "INSERT INTO",
      "SELECT"
    ],
    correctOptionIndex: 3,
    answersCount: 4 // Ответ задается порядковым номером варианта ответа
  }
]

bot.setMyCommands([
  { command: '/start', description: 'Start the bot' },
  { command: '/help', description: 'Get help'  },
  { command: '/stop', description: 'Stop the quiz' },
  { command: 'quiz', description: 'Start the quiz' }
])

// Function for generating question 

function generateQuestionMessage(index) {
  const question = questions[index];
  const keyboard = question.options.map((option, index) => ({
    text: option,
    callback_data: index.toString()
  }));
  return {
    text: question.question,
    reply_markup: {
      inline_keyboard: [keyboard]
    }
  };
}

const quizOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: questions[0].options[0], callback_data: '0' }],
      [{ text: questions[0].options[1], callback_data: '1' }],
      [{ text: questions[0].options[2], callback_data: '2' }],
      [{ text: questions[0].options[3], callback_data: '3' }]
    ]
  })
};

// Reaction on the button

let currentQuestionIndex = 0;
let correctCount = 0;

bot.on("callback_query", msg => {
  const chatId = msg.message.chat.id;
  const selectedOptionIndex = parseInt(msg.data);
  const correctOptionIndex = questions[currentQuestionIndex].correctOptionIndex;
  
  // Initialize and set the text variable to an empty string
  let text = '';

  if (selectedOptionIndex === correctOptionIndex) {
    // Increment the score if the answer is correct
    correctCount++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    // If there are more questions, ask the next question
    const questionMessage = generateQuestionMessage(currentQuestionIndex);
    text = questionMessage.text;
    bot.sendMessage(chatId, text, quizOptions);
  } else {
    // If all questions have been asked, display the final score
    text = `Твой результат: ${correctCount}/${questions.length}`;
    bot.sendMessage(chatId, text);
    currentQuestionIndex = 0;
    correctCount = 0;
  }
});


 
//command "/quiz"

bot.onText(/\/quiz/, (msg) => {
  const chatId = msg.chat.id;
  const questionMessage = generateQuestionMessage(0);
  bot.sendMessage(chatId, questionMessage.text, quizOptions);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет, что бы поучаствовать в викторине введи команду /quiz')
});

bot.on("polling_error", console.log);