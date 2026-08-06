function maxProfit(prices) {

    // Assume first price is minimum
    let minPrice = prices[0];

    // Profit starts from 0
    let profit = 0;

    // Start from second day
    for (let i = 1; i < prices.length; i++) {

        // Update minimum buying price
        minPrice = Math.min(minPrice, prices[i]);

        // Calculate maximum profit
        profit = Math.max(profit, prices[i] - minPrice);
    }

    // Return best profit
    return profit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));