function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("What inspired the crusades?", ["Muslim Turk Raids", "Religion & Polotics","Right to Pilgrim to Holy Land", "Polotics"], "Religion & Polotics"),
    new Question("Which two religious groups fought each other ?", ["Catholic & Muslims", "Muslims  & Christans", "Buddists & Catholics", "Protostants & Christans"], "Muslims  & Christans"),
    new Question("How did the Europenas benefit from the crusaids?", ["Increased Traid & Travel", "lost medical knowlage from the Romans and Greeks", "All", "Building knowlage, from ships to castles"], "All"),
    new Question("How did the Muslims benefit from the crusiads?", ["United Islam", "Improvded Traid", "Culture awareness of Europeans", "All"], "United Islam"),
    new Question("Where did the majority of the wars take place?", ["Middle East", "North Arica", "Asia"],"Middle East"),
    new Question("What happened to Richard the lion heart on his way back to England from the third crusade?", ["got married", "kidnaped", "was ingered", "was sainted"],"kidnaped"),
    new Question("Why was King John unpopular?", ["High Taxes", "Being Mean", "Banned Churches", "Did Nothing- He was a scape Goat"],"High Taxes"),
    new Question("In which crusades did Christians win the right to pilgrim?", ["1st  & 3rd", "the childrens crusaid", "9th", "5th & 7th"], "1st  & 3rd"),
    new Question("Who was Sainted for the part they took during the crusades?", ["Pope Urban II", "Richard I","King Louis IX", "Joan of Ark"],"King Louis IX"),
    new Question("Who issued a proclamation which started the crusades?", ["Pope Urban II", "Richard I","King Louis IX", "Joan of Ark"], "Pope Urban II")
];


// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();