The following snippets of JS code are having some trouble. Let’s help them out. Figure out why they are failing and fix them.

1. [Failing Variable assignment](http://jsfiddle.net/ctulip/9UwDT/)
2. [Multi-line Strings](http://jsfiddle.net/ctulip/VwzUd/)
3. [Failing if statement](http://jsfiddle.net/ctulip/u7sUp/)
4. [Failing switch statement](http://jsfiddle.net/ctulip/Rmvp5/)

ANSWERS

1. [Failing Variable assignment]

// Why is this broken?

The second variable is not spelled the same?

2. [Multi-line Strings]

Missing semi-colon. JS doesn't allow multiline strings.

3. [Failing if statement]

The = operator is the assignment operator, === should be used inside the if statement.

4. [Failing switch statement]

Because the == operator does type conversion from Number to String, the case does not.

