const TelegramBot = require('node-telegram-bot-api');
const token = '6292547172:AAEzrNkkpIWYTXYC5tJfu6RxWMxIGHSrVM8';
var opt = {polling:true};
const bot = new TelegramBot(token, opt);



const questions = [{
    text: "Какие типы данных поддерживает Python?",
    options: [
      "int, float, bool, complex",
      "str, bytes, bytearray, memoryview",
      "list, tuple, set, frozenset",
      "dict"
    ],
    correctOptionIndex: 1 // Ответ задается порядковыми номерами вариантов ответов
  },
  {
    text: "Как создать массив в C#?",
    options: [
      "var myArray = [];, var myArray = new Array();",
      "int[] myArray = new int[5];, myArray = [1, 2, 3, 4, 5];",
      "Array myArray = new Array();",
      "myArray = new Array(1, 2, 3, 4, 5);"
    ],
    correctOptionIndex: 1 // Ответ задается порядковым номером варианта ответа
  },
  {
    text: "Как получить значение свойства объекта в JavaScript?",
    options: [
      "object.property, object[property], object.getProperty()",
      "object.getProperty, object[property], object.getProperty()",
      "object[property], object.getProperty(), object.getProperty"
    ],
    correctOptionIndex: 1 // Ответ задается порядковым номером варианта ответа
  },
  {
    text: "Какой язык используется для управления базами данных?",
    options: [
      "JavaScript, PHP, Python, SQL",
      "C#", "Java, Ruby, Perl",
      "HTML", "CSS, XML, JSON",
      "Assembly, C++, Objective-C, Swift"
    ],
    correctOptionIndex: 3 // Ответ задается порядковым номером варианта ответа
  },
  {
    text: "Как добавить элемент в список в Python?",
    options: [
      "list.add(element), list.append(element), list.insert(element)",
      "list.add(element), list.insert(element), list.append(element)",
      "list.insert(element), list.append(element), list.add(element)",
      "list.append(element), list.add(element), list.insert(element)"
    ],
    correctOptionIndex: 2 // Ответ задается порядковым номером варианта ответа
  },
  {
    text: "Какой оператор используется в языке Python для выполнения целочисленного деления?",
    options: [
      "/",
      "%",
      "//",
      "*"
    ],
    correctOptionIndex: 2 // Ответ задается порядковым номером варианта ответа
  },
   {
    text: "Какая функция используется в языке C# для чтения пользовательского ввода с консоли?",
    options: [
      "Console.Write();",
      "Console.Read();",
      "Console.ReadLine();",
      "Console.WriteLine();"
    ],
    correctOptionIndex: 2 // Ответ задается порядковым номером варианта ответа
  },
    {
    text: "Какая команда используется в SQL для выборки данных из таблицы?",
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
  const options = question.options.map((option) => [{ text: option }]);
  const keyboard = { keyboard: options, resize_keyboard: true };
  bot.sendMessage(chatId, question.text, { reply_markup: keyboard });
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  var question = questions[currentQuestionIndex];
  var answerIndex = question.options.findIndex((option) => option === msg.text);
 

 if (msg.text === '/start') {
    bot.sendMessage(chatId, "Привет! Добро пожаловать в нашу викторину! Чтобы начать, отправьте команду /quiz");
}
 if (msg.text === 'quiz') {
  if (answerIndex === question.correctOptionIndex) {
     correctAnswersCount++;
     currentQuestionIndex++;
 }
  if (answerIndex != question.correctOptionIndex) {
     correctAnswersCount++;
     currentQuestionIndex++;
}}});