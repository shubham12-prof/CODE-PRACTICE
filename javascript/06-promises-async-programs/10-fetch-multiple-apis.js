// PROGRAM 10: Fetch Multiple APIs
// -------------------------------------
// A common real task: call several APIs and combine their data.
// We simulate 3 API calls and fetch them all together using
// Promise.all combined with async/await.

function fetchWeather(city) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ city: city, temp: 28 });
    }, 1000);
  });
}

function fetchNews(city) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(["News 1 for " + city, "News 2 for " + city]);
    }, 1200);
  });
}

function fetchTraffic(city) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ city: city, status: "Moderate traffic" });
    }, 800);
  });
}

async function getCityDashboard(city) {
  console.log("Fetching dashboard data for", city, "...");

  // run all 3 requests at the same time instead of one by one
  const [weather, news, traffic] = await Promise.all([
    fetchWeather(city),
    fetchNews(city),
    fetchTraffic(city),
  ]);

  return {
    weather: weather,
    news: news,
    traffic: traffic,
  };
}

// ---------------- Example usage ----------------
getCityDashboard("Delhi").then(function (dashboard) {
  console.log("Dashboard data:", dashboard);
});

module.exports = { fetchWeather, fetchNews, fetchTraffic, getCityDashboard };
