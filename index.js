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

bot.setMyCommands([
  { command: '/start', description: 'Start the bot' },
  { command: '/help', description: 'Get help'  },
  { command: '/stop', description: 'Stop the quiz' },
  { command: 'quiz', description: 'Start the quiz' }
])


function generateQuestionMessage(index) {
  const question = questions[index];
  const keyboard = question.options.map(option => 
    ([{
      text: option,
      callback_data: option
    }])
  );
  return {
    text: question.question,
    reply_markup: {
      inline_keyboard: keyboard
    }
  };
}

//command "/quiz"

bot.onText(/\/quiz/, (msg) => {
  const chatId = msg.chat.id;
  let index = 0;
  while (index < 8) {
    const questionMessage = generateQuestionMessage(index);
  bot.sendMessage(chatId, questionMessage.text, questionMessage.reply_markup);
  index++;
  }
  
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет, что бы поучаствовать в викторине введи команду /quiz')
});

bot.on("polling_error", console.log);