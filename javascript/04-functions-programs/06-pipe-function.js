// PROGRAM 6: Pipe Function
// -------------------------------------
// Pipe runs a list of functions one after another, from
// LEFT to RIGHT, passing the result of each function to the next.

function pipe(...functions) {
  return function (input) {
    let result = input;

    for (let i = 0; i < functions.length; i++) {
      result = functions[i](result);
    }

    return result;
  };
}

// ---------------- Example usage ----------------
function double(x) {
  return x * 2;
}

function addTen(x) {
  return x + 10;
}

function square(x) {
  return x * x;
}

// runs in order: double -> addTen -> square
const process = pipe(double, addTen, square);

console.log(process(3));
// double(3) = 6 -> addTen(6) = 16 -> square(16) = 256
// Output: 256

module.exports = { pipe };
