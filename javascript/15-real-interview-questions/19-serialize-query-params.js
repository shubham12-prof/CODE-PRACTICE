/*
  15. Real Interview Questions
  Serialize Query Params

  PROBLEM: given a plain JS object, convert it into a URL query string.
  Example: { name: "John", age: 25, city: "Delhi" }
        -> "name=John&age=25&city=Delhi"

  CORE IDEA: loop through each key/value pair, turn it into "key=value"
  (URL-encoded so special characters like spaces or & are safe), then
  join everything together with "&".
*/

function serializeParams(obj) {
  const parts = [];

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];

    // Skip null/undefined values entirely - they shouldn't appear in
    // the query string at all.
    if (value === null || value === undefined) continue;

    // encodeURIComponent makes sure special characters (spaces, &, =,
    // etc.) don't break the URL - e.g. "New York" becomes "New%20York".
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);

    parts.push(`${encodedKey}=${encodedValue}`);
  }

  return parts.join("&");
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
console.log(serializeParams({ name: "John", age: 25, city: "Delhi" }));
// "name=John&age=25&city=Delhi"

console.log(serializeParams({ search: "hello world", page: 2 }));
// "search=hello%20world&page=2"

console.log(serializeParams({ q: "a&b", filter: null }));
// "q=a%26b"   (filter was null, so it's skipped entirely)


// -----------------------------------------------------------------
// Bonus: handling ARRAY values (a common real-world requirement)
// Example: { tags: ["js", "css"] } -> "tags=js&tags=css"
// -----------------------------------------------------------------
function serializeParamsWithArrays(obj) {
  const parts = [];

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      // Add ONE "key=item" pair per array item.
      value.forEach((item) => {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
      });
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return parts.join("&");
}

console.log(serializeParamsWithArrays({ tags: ["js", "css"], page: 1 }));
// "tags=js&tags=css&page=1"

/*
  BONUS - built-in browser alternative:
  const params = new URLSearchParams({ name: "John", age: 25 });
  params.toString(); // "name=John&age=25"
  URLSearchParams handles a lot of this automatically, but interviewers
  usually want to see you build it manually first.

  TIME COMPLEXITY: O(n) - where n is the number of keys in the object.
*/
