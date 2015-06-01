
var startingBalance = 100;
var betRange = [5,10];
var guessRange = [1,10];

var getBetInRange = function(rangeBottom,rangeTop) {
  var bet;
  do {
    bet = prompt("Enter a bet between $" + rangeBottom + " and $" + rangeTop);
  } while (!(bet >= rangeBottom && bet <= rangeTop))
  return bet;
}

var getGuessNumberInRange = function(rangeBottom,rangeTop) {
  var guess;
  do {
    guess = prompt("Enter a number between " + rangeBottom + " and " + rangeTop);
  } while (!(guess >= rangeBottom && guess <= rangeTop))
  return guess;
}

var getRandNumberInRange = function(rangeBottom,rangeTop) {
  number = Math.floor((Math.random() * rangeTop) + rangeBottom);
  return number;
}

var showBankAccount = function(bankAccount) {
  message = "Your bank account balance is now $" + bankAccount + ".";
  return message;
}

var stillAlive = function(bankAccount, betRangeBottom) {
  if (bankAccount >= betRangeBottom) {
    return true;
  } else {
    return false;
  }
}

var logGameVars = function(number,guess,bankAccount) {
  console.log("NUMBER : " + number);
  console.log("GUESS : " + guess);
  console.log("BALANCE : " + bankAccount);
}

var play = function(startingBalance, betRange, guessRange) {

  bankAccount = startingBalance;
  do {
    bet = getBetInRange(betRange[0],betRange[1]);
    guess = getGuessNumberInRange(guessRange[0],guessRange[1]);
    number = getRandNumberInRange(guessRange[0],guessRange[1]);
    if (number == guess) {
      bankAccount += 2 * bet;
      logGameVars(number,guess,bankAccount);
      alert("Bang on!" + " " + showBankAccount(bankAccount));
    } else if (!(guess == number + 1 || guess == number - 1)) {
      bankAccount -= bet;
      logGameVars(number,guess,bankAccount);
      alert("Sorry, try again!" + " " + showBankAccount(bankAccount));
    } else {
      logGameVars(number,guess,bankAccount);
      alert("Close but no cigar!" + " " + showBankAccount(bankAccount));
    }

  } while (stillAlive(bankAccount, betRange[0]))
  alert("You ran out of money." + " " + showBankAccount(bankAccount) + " " + "Thanks for playing.");
}

play(startingBalance, betRange, guessRange);
