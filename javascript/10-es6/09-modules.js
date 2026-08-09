/*
  10.9 ES6+ - Modules (import / export)

  CORE IDEA: modules let you split code across multiple FILES, and
  share (export) specific values/functions from one file so another
  file can use (import) them. This keeps code organized and avoids
  polluting the global scope.

  NOTE: unlike the other examples, modules only make sense across
  MULTIPLE files. Below is what those files would actually look like,
  shown together in one file with clear comments for each "file".
*/


/* ================================================================
   FILE: mathUtils.js  (this file EXPORTS things)
================================================================= */

// -----------------------------------------------------------------
// NAMED EXPORTS - export multiple specific things by name.
// You can have as many named exports as you want in one file.
// -----------------------------------------------------------------

// export const PI = 3.14159;
//
// export function add(a, b) {
//   return a + b;
// }
//
// export function subtract(a, b) {
//   return a - b;
// }

// Alternative style: declare everything first, export together at the
// bottom of the file - some teams prefer this for readability.
//
// const PI = 3.14159;
// function add(a, b) { return a + b; }
// function subtract(a, b) { return a - b; }
// export { PI, add, subtract };


// -----------------------------------------------------------------
// DEFAULT EXPORT - only ONE per file, used for the "main" thing a
// file provides (often a single class, component, or function).
// -----------------------------------------------------------------

// export default function multiply(a, b) {
//   return a * b;
// }


/* ================================================================
   FILE: app.js  (this file IMPORTS from mathUtils.js)
================================================================= */

// Importing named exports - names must match EXACTLY, wrapped in { }.
// import { PI, add, subtract } from "./mathUtils.js";
//
// console.log(add(2, 3));      // 5
// console.log(subtract(5, 2)); // 3
// console.log(PI);             // 3.14159

// Importing a default export - you can name it ANYTHING you want,
// since there's only one, no { } needed.
// import multiply from "./mathUtils.js";
// console.log(multiply(4, 5)); // 20

// Importing BOTH named and default exports together:
// import multiply, { PI, add } from "./mathUtils.js";

// Importing everything as one object (useful when there are many
// named exports and you don't want to list them all individually):
// import * as MathUtils from "./mathUtils.js";
// console.log(MathUtils.add(2, 3)); // 5
// console.log(MathUtils.PI);        // 3.14159


/* ================================================================
   HOW TO ACTUALLY RUN MODULES

   In the browser:
   <script type="module" src="app.js"></script>
   (the type="module" attribute is required, or import/export will
   throw a syntax error)

   In Node.js, either:
   - name your files with a .mjs extension, OR
   - add "type": "module" to your package.json
================================================================= */


/*
  NAMED vs DEFAULT EXPORT - common interview question:

  NAMED EXPORT:
  - export { thing } / export const thing = ...
  - Import name must match: import { thing } from "./file.js"
  - Can have MANY per file.
  - Good for utility files with several related functions (e.g. a
    math helpers file with add, subtract, multiply).

  DEFAULT EXPORT:
  - export default thing
  - Import name can be ANYTHING: import anyNameYouWant from "./file.js"
  - Only ONE per file.
  - Good for files that represent a single "main" thing (e.g. a single
    React component, or a single class).
*/
