/*
  15. Real Interview Questions
  Parse Query String

  PROBLEM: given a URL query string, convert it back into a plain JS
  object - the reverse of "Serialize Query Params".
  Example: "name=John&age=25&city=Delhi"
        -> { name: "John", age: "25", city: "Delhi" }

  CORE IDEA: split the string on "&" to get individual "key=value"
  pairs, then split EACH pair on "=" to separate the key from the
  value, decoding both along the way.
*/

function parseQueryString(queryString) {
  const result = {};

  // Remove a leading "?" if present, e.g. from window.location.search.
  const cleanedString = queryString.startsWith("?")
    ? queryString.slice(1)
    : queryString;

  if (cleanedString === "") return result; // nothing to parse

  const pairs = cleanedString.split("&"); // ["name=John", "age=25", ...]

  for (const pair of pairs) {
    // Split only on the FIRST "=" - values could theoretically contain
    // "=" themselves (rare, but safer this way).
    const [rawKey, rawValue = ""] = pair.split(/=(.*)/s);

    const key = decodeURIComponent(rawKey);
    const value = decodeURIComponent(rawValue);

    // Handle repeated keys (e.g. "tags=js&tags=css") by collecting
    // them into an array instead of overwriting the previous value.
    if (result[key] !== undefined) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

// -----------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------
console.log(parseQueryString("name=John&age=25&city=Delhi"));
// { name: 'John', age: '25', city: 'Delhi' }

console.log(parseQueryString("?search=hello%20world&page=2"));
// { search: 'hello world', page: '2' }

console.log(parseQueryString("tags=js&tags=css&tags=html"));
// { tags: ['js', 'css', 'html'] }

console.log(parseQueryString(""));
// {}

/*
  NOTE: all values come out as STRINGS (query strings don't carry type
  information) - "age=25" becomes the string "25", not the number 25.
  If you need numbers/booleans, you'd convert them yourself afterward.

  BONUS - built-in browser alternative:
  const params = new URLSearchParams("name=John&age=25");
  params.get("name"); // "John"
  Object.fromEntries(params); // { name: 'John', age: '25' }
  Same idea as serialize - interviewers usually want the manual
  version first to check your string-parsing fundamentals.

  TIME COMPLEXITY: O(n) - where n is the length of the query string.
*/
