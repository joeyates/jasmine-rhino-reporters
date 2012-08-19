// Jasmine expects global timer methods to exist.
// See http://stackoverflow.com/questions/2261705/how-to-run-a-javascript-function-asynchronously-without-using-settimeout
var setTimeout,
    clearTimeout,
    setInterval,
    clearInterval;

(function () {
    setTimeout = function(fn, delay) {
      fn();
      return 0;
    }

    clearInterval = clearTimeout = function(id) {};
    setInterval = function(fn, delay) {};
})();

