const TelegramBot = require('node-telegram-bot-api');
const token = '6292547172:AAEzrNkkpIWYTXYC5tJfu6RxWMxIGHSrVM8';
var opt = {polling:true};
const bot = new TelegramBot(token, opt);



const questions = [{
    question: "Какие типы данных поддерживает Python?",
    options: [
      "int, float, bool, complex",
      "str, bytes, bytearray, memoryview",
      "list, tuple, set, frozenset",
      "dict"
    ],
    correctOptionIndex: 1 // Ответ задается порядковыми номерами вариантов ответов
  },
  {
    question: "Как создать массив в C#?",
    options: [
      "var myArray = [];, var myArray = new Array();",
      "int[] myArray = new int[5];, myArray = [1, 2, 3, 4, 5];",
      "Array myArray = new Array();",
      "myArray = new Array(1, 2, 3, 4, 5);"
    ],
    correctOptionIndex: 1 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Как получить значение свойства объекта в JavaScript?",
    options: [
      "object.property, object[property], object.getProperty()",
      "object.getProperty, object[property], object.getProperty()",
      "object[property], object.getProperty(), object.getProperty"
    ],
    correctOptionIndex: 1 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Какой язык используется для управления базами данных?",
    options: [
      "JavaScript, PHP, Python, SQL",
      "C#", "Java, Ruby, Perl",
      "HTML", "CSS, XML, JSON",
      "Assembly, C++, Objective-C, Swift"
    ],
    correctOptionIndex: 3 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Как добавить элемент в список в Python?",
    options: [
      "list.add(element), list.append(element), list.insert(element)",
      "list.add(element), list.insert(element), list.append(element)",
      "list.insert(element), list.append(element), list.add(element)",
      "list.append(element), list.add(element), list.insert(element)"
    ],
    correctOptionIndex: 2 // Ответ задается порядковым номером варианта ответа
  },
  {
    question: "Какой оператор используется в языке Python для выполнения целочисленного деления?",
    options: [
      "/",
      "%",
      "//",
      "*"
    ],
    correctOptionIndex: 2 // Ответ задается порядковым номером варианта ответа
  },
   {
    question: "Какая функция используется в языке C# для чтения пользовательского ввода с консоли?",
    options: [
      "Console.Write();",
      "Console.Read();",
      "Console.ReadLine();",
      "Console.WriteLine();"
    ],
    correctOptionIndex: 2 // Ответ задается порядковым номером варианта ответа
  },
    {
    question: "Какая команда используется в SQL для выборки данных из таблицы?",
    options: [
      "UPDATE",
      "DELETE",
      "INSERT INTO",
      "SELECT"
    ],
    correctOptionIndex: 3 // Ответ задается порядковым номером варианта ответа
  }
  
 ]


let currentQuestionIndex = 0;
let correctAnswersCount = 0;

function sendQuestion(chatId) {
  const question = questions[currentQuestionIndex];
  const options = question.options;
  const questionText = question.question;

  bot.sendMessage(chatId, questionText, {
    reply_markup: {
      keyboard: options.map((option) => [{ text: option }]),
      resize_keyboard: true,
    },
  });
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === '/start') {
    bot.sendMessage(chatId, "Привет! Добро пожаловать в нашу викторину! Чтобы начать, отправьте команду quiz");
  }
  
  if (msg.text === '/quiz') {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    sendQuestion(chatId);
  }

  if (msg.text === '/stop') {
    bot.sendMessage(chatId, 'Викторина завершена!');
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (msg.text === currentQuestion.options[currentQuestion.correctOptionIndex]) {
    correctAnswersCount++;

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      sendQuestion(chatId);
    } else {
      bot.sendMessage(chatId, `Викторина завершена! Вы ответили правильно на ${correctAnswersCount} из ${questions.length} вопросов.`);
    }
  }
});
