// PROGRAM 7: Compose Function
// -------------------------------------
// Compose is just like pipe, but it runs the functions from
// RIGHT to LEFT instead of left to right.

function compose(...functions) {
  return function (input) {
    let result = input;

    // loop backwards through the functions array
    for (let i = functions.length - 1; i >= 0; i--) {
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

// runs in order: square -> addTen -> double (right to left)
const process = compose(double, addTen, square);

console.log(process(3));
// square(3) = 9 -> addTen(9) = 19 -> double(19) = 38
// Output: 38

module.exports = { compose };
