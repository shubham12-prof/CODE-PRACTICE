function maxProfit(prices) {
    let minPriceSoFar = Infinity;
    let maxProfitSoFar = 0;

    for (const price of prices) {
        if (price < minPriceSoFar) {
            // Found a new lowest buying price.
            minPriceSoFar = price;
        } else {
            // Check if selling TODAY (at "price") after buying at the
            // lowest price so far would beat our best profit yet.
            const profitIfSoldToday = price - minPriceSoFar;
            maxProfitSoFar = Math.max(maxProfitSoFar, profitIfSoldToday);
        }
    }

    return maxProfitSoFar;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5  (buy at 1, sell at 6)
console.log(maxProfit([7, 6, 4, 3, 1]));    // 0  (prices only drop, no profit possible)