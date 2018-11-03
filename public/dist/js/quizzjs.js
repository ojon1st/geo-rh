// JavaScript Document
$(document).ready(function () {
    
    "use strict";
   
    var url_params =window.location.pathname;
    //var quiz_id= '';
        $.ajax({
            type: 'GET',
            url: '/api/affiche/quizz'+url_params,
            dataType:'json',
            //async: false,
            success: function (data) {
                var questions =[];
                if (JSON.stringify(data) != 'echec'){
                  questions = data["quizzcontent"];    
                  var quiz_id = data["_id"];
                  // Display initial question
                  start_quiz(questions, quiz_id);
                  
                }
                
                }
            });

    
    function start_quiz(questions, quiz_id){
        
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('.content'); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            $('#warning').text('Veuillez choisir une réponse!');
        } else {
            questionCounter++;
            displayNext();
            $('#warning').text('');
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);
        // this is new
        var warningText = $('<p id="warning">');
        qElement.append(warningText);

        return qElement;

    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
        
    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<h3>', {
            id: 'question'
        });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] == questions[i].correctAnswer) {
                numCorrect++;
            }
        }
        // Sending Results
          send_quizz_results(selections, quiz_id);
        // Calculate score and display relevant message
        var percentage = numCorrect / questions.length;
        if (percentage >= 0.9) {
            score.append('Bravo! Vous avez obtenu ' + numCorrect + ' bonnes réponses sur ' +
                questions.length);
        } else if (percentage >= 0.7) {
            score.append('Bon travail! Vous avez obtenu ' + numCorrect + ' bonnes réponses sur ' +
                questions.length);
        } else if (percentage >= 0.5) {
            score.append('Vous avez obtenu ' + numCorrect + ' bonnes réponses sur ' +
                questions.length);
        } else {
            score.append('Vous avez obtenu seulement ' + numCorrect + ' bonnes réponses sur ' +
                questions.length + '. Voulez-vous réessayer?');
        }
        
        return score;
        
    }
}

  
  function send_quizz_results(tableau_reponses, quiz_id) {
    //alert(tableau_reponses)
     var url_params =window.location.pathname;
    
        $.ajax({
            type: 'POST',
            url: '/api/send/quizz'+url_params,
            dataType:'json',
            data: {q_rst:tableau_reponses, quiz_id:quiz_id}, //q_rst = quizz results
            //async: false,
            success: function (data) {
                

                
                }
            });
  }
});
