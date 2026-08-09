/*
  10.7 ES6+ - Nullish Coalescing (??)

  CORE IDEA: returns the RIGHT side value ONLY if the left side is
  null or undefined. Unlike ||, it does NOT treat other "falsy" values
  (0, "", false, NaN) as missing.
*/

// -----------------------------------------------------------------
// The problem nullish coalescing solves (the classic || bug)
// -----------------------------------------------------------------
function getVolume(userVolume) {
  // OLD WAY using || - looks fine at first...
  return userVolume || 50;
}

console.log(getVolume(80)); // 80   (works fine)
console.log(getVolume());   // 50   (works fine, undefined -> default)
console.log(getVolume(0));  // 50 ❌ BUG! User explicitly wants volume 0
                             //      (silent/muted), but || treats 0 as
                             //      "falsy" and wrongly falls back to 50.


function getVolumeFixed(userVolume) {
  // NEW WAY using ?? - only falls back if the value is null/undefined,
  // NOT if it's just 0, "", or false.
  return userVolume ?? 50;
}

console.log(getVolumeFixed(0));         // 0   ✅ correctly respects 0
console.log(getVolumeFixed(undefined)); // 50  ✅ falls back correctly
console.log(getVolumeFixed(null));      // 50  ✅ falls back correctly


// -----------------------------------------------------------------
// More examples showing the difference clearly
// -----------------------------------------------------------------
console.log(0 || "default");   // "default"  (0 is falsy, || replaces it)
console.log(0 ?? "default");   // 0          (0 is NOT null/undefined, ?? keeps it)

console.log("" || "default");  // "default"  (empty string is falsy)
console.log("" ?? "default");  // ""         (empty string is kept)

console.log(null ?? "default");      // "default"
console.log(undefined ?? "default"); // "default"


// -----------------------------------------------------------------
// Often combined with optional chaining for safe defaults
// -----------------------------------------------------------------
const settings = { theme: "dark" };

const fontSize = settings.fontSize ?? 16; // fontSize missing -> 16
console.log(fontSize); // 16

const user = {}; // no "profile" key at all
const bio = user.profile?.bio ?? "No bio available";
console.log(bio); // No bio available

/*
  RULE OF THUMB (great interview one-liner):
  Use || when you want to replace ANY falsy value (0, "", false, null,
  undefined, NaN).
  Use ?? when you want to replace ONLY null or undefined, and treat
  0, "", and false as valid, intentional values.
*/
