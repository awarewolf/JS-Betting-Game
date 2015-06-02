$('document').ready(function() {

  var startingBalance = 100;
  bankAccount = startingBalance;
  var betRange = [5,10];
  var guessRange = [1,10];

  var showAlert = function (id,type,text) {

    var title_type;

    if (type == 'danger') {
      var title_type = 'error';
    } else {
      title_type = type;
    }

    title = id.charAt(0).toUpperCase() + id.slice(1) + " " + title_type.charAt(0).toUpperCase() + title_type.slice(1)

    alert_html = "<div id=\"" + id + "-alert\" class=\"alert alert-" + type + " alert-dismissible fade in\" role=\"alert\"> \
                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button> \
                <h4>"+ title + "</h4> \
                <p>" + text + "</p> \
              </div>";

    $(alert_html).hide().appendTo("#alert-pane").fadeIn(1500);
  }

  var getBetInRange = function(rangeBottom,rangeTop) {

    var bet;

    bet = $('#bet').val();

    if (!(bet >= rangeBottom && bet <= rangeTop)) {
      alert_text = "The bet value is not between $" + rangeBottom + " and $" + rangeTop;

      showAlert('bet', 'danger', alert_text);

      return false;
    }
    return bet;
  }

  var getGuessNumberInRange = function(rangeBottom,rangeTop) {

    var guess;

    guess = $('#guess').val();

    if (!(guess >= rangeBottom && guess <= rangeTop)) {
      alert_text = "Your guess is not between " + rangeBottom + " and " + rangeTop;

      showAlert('guess', 'danger', alert_text);

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

  var play = function(betRange, guessRange) {

    $(".alert").fadeOut('fast');

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
      }
    }
  }

  $("#balance-body").text(startingBalance);

  bet_placeholder_text = "Enter a bet between $" + betRange[0] + " and $" + betRange[1];
  $("#bet").attr("placeholder", bet_placeholder_text);

  guess_placeholder_text = "Enter a number between " + guessRange[0] + " and " + guessRange[1];
  $("#guess").attr("placeholder", guess_placeholder_text);

  $('#play').on('click', function() {
    play(betRange, guessRange);
  });

});