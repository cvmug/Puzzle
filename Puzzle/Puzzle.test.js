const { optimalMulligan, calculateStrength } = require('./Puzzle');

function generateRandomHand() {
    const suits = ['H', 'D', 'C', 'S'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return Array.from({ length: 5 }, () => values[Math.floor(Math.random() * values.length)] + suits[Math.floor(Math.random() * suits.length)]);
}

test('Optimal mulligan calculation', () => {
    const testCases = [
        ['2H', '3H', '4H', '5H', '6H'],  // Straight flush
        ['2H', '2D', '2C', '2S', '3H'],  // Four of a kind
        ['AH', 'KH', 'QH', 'JH', '10H'], // Royal flush
        ['2H', '3D', '4S', '5C', '6H'],  // Straight
        ['2H', '3H', '4H', '5H', '7H'],  // Flush
        generateRandomHand(),  // Random hand
        generateRandomHand(),  // Random hand
        generateRandomHand(),  // Random hand
    ];

    testCases.forEach(hand => {
        const [optimalCards, probability] = optimalMulligan(hand);
        const originalStrength = calculateStrength(hand);
        console.log("Original Hand:", hand);
        console.log("Original Strength:", originalStrength);
        console.log("Optimal Mulligan:", optimalCards);
        console.log("Probability of Improvement:", probability);
        console.log("--------------------");
    });
});
