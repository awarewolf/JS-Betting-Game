$('document').ready(function() {

  bankAccount = 100;
  var betRange = [5,10];
  var guessRange = [1,10];

  var showAlert = function (id,type,text) {

    var titleType = type;
    var restartButton = '';

    if (type == 'danger') {
      titleType = 'error';
    }

    title = id.charAt(0).toUpperCase() + id.slice(1) + " " + titleType.charAt(0).toUpperCase() + titleType.slice(1);

    alertHtml = "<div id=\"" + id + "-alert\" class=\"alert alert-" + type + " alert-dismissible fade in\" role=\"alert\"> \
                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button> \
                <h4>"+ title + "</h4> \
                <p>" + text + "</p> \
                </div>";

    $(alertHtml).hide().appendTo("#alert-pane").fadeIn(1500);
  }

  var getBetInRange = function(rangeBottom,rangeTop) {

    var bet;

    bet = $('#bet').val();

    if (!(bet >= rangeBottom && bet <= rangeTop)) {
      alertText = "The bet value is not between $" + rangeBottom + " and $" + rangeTop;

      showAlert('bet', 'danger', alertText);

      return false;
    }
    return bet;
  }

  var getGuessNumberInRange = function(rangeBottom,rangeTop) {

    var guess;

    guess = $('#guess').val();

    if (!(guess >= rangeBottom && guess <= rangeTop)) {
      alertText = "Your guess is not between " + rangeBottom + " and " + rangeTop;

      showAlert('guess', 'danger', alertText);

      return false;
    }
    return guess;
  }

  var getRandNumberInRange = function(rangeBottom,rangeTop) {
    number = Math.floor((Math.random() * rangeTop) + rangeBottom);
    return number;
  }

  var updateBankAccount = function(bankAccount) {
    $("#balance-body").text(bankAccount)
  }

  var stillAlive = function(betRangeBottom) {
    console.log("STILL ALIVE? = "+ (bankAccount >= betRangeBottom))
    return (bankAccount >= betRangeBottom)
  }

  var logGameVars = function(number,guess,bankAccount) {
    console.log("NUMBER : " + number);
    console.log("GUESS : " + guess);
    console.log("BALANCE : " + bankAccount);
  }

  var resetGame = function() {

    $(".alert #restart").fadeOut('fast');

    $("#play").fadeIn('fast');

    $("#balance-body").text(bankAccount);

    bet_placeholder_text = "Enter a bet between $" + betRange[0] + " and $" + betRange[1];
    $("#bet").attr("placeholder", bet_placeholder_text);

    guess_placeholder_text = "Enter a number between " + guessRange[0] + " and " + guessRange[1];
    $("#guess").attr("placeholder", guess_placeholder_text);
  }

  var play = function(betRange, guessRange) {

    $(".alert, #restart").fadeOut('fast');

    bet = getBetInRange(betRange[0],betRange[1]);
    guess = getGuessNumberInRange(guessRange[0],guessRange[1]);

    number = getRandNumberInRange(guessRange[0],guessRange[1]);
    $("#number").text(number);

    if (bet && guess) {
      if (number == guess) {
        bankAccount += 2 * bet;

        logGameVars(number,guess,bankAccount);
        $("#balance-body").text(bankAccount);
        showAlert('guess', 'success', 'Bang on!');

      } else if (!(guess == number + 1 || guess == number - 1)) {
        bankAccount -= bet;

        logGameVars(number,guess,bankAccount);
        $("#balance-body").text(bankAccount);
        showAlert('guess', 'info', 'Sorry, try again!');

      } else {
        logGameVars(number,guess,bankAccount);
        $("#balance-body").text(bankAccount);
        showAlert('guess', 'warning', 'Close but no cigar!');
      }

      if (!(stillAlive(betRange[0]))) {
        $("#balance-body").text(bankAccount);
        showAlert('game', 'info', 'You ran out of money. Thanks for playing.');
        $("#play").fadeOut('fast');

        $("#restart").css("visibility","visible");
      }
    }
  }

  resetGame();

  $('#play').on('click', function() {
    play(betRange, guessRange);
  });

  $('#restart').on('click', function() {
    resetGame();
    $("#restart").css("visibility","hidden");
    bankAccount = 100;
    play(betRange, guessRange);
  });

});