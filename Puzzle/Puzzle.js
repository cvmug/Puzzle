function calculateStrength(hand) {
    const values = hand.map(card => card.slice(0, -1));
    const valueCounts = {};
    values.forEach(value => {
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    const counts = Object.values(valueCounts);
    if (counts.includes(4)) return 8;
    if (counts.includes(3) && counts.includes(2)) return 7;
    if (counts.includes(3)) return 4;
    if (counts.filter(count => count === 2).length === 2) return 3;
    if (counts.filter(count => count === 2).length === 1) return 2;
    return 1;
}

function generateRandomHand(numCards) {
    const suits = ['H', 'D', 'C', 'S'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const hand = [];
    for (let i = 0; i < numCards; i++) {
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        hand.push(randomValue + randomSuit);
    }
    return hand;
}

function optimalMulligan(hand) {
    const originalStrength = calculateStrength(hand);
    let optimalMulliganCards = [];
    let maxProbability = 0.0;

    for (let i = 0; i < hand.length; i++) {
        const mulliganedCard = hand[i];
        const remainingCards = hand.filter(card => card !== mulliganedCard);
        const drawnCards = generateRandomHand(remainingCards.length);
        const newHand = [...drawnCards, ...remainingCards.slice(0, 5 - drawnCards.length)];
        const newStrength = calculateStrength(newHand);
        const probability = newStrength >= originalStrength ? 1 : 0;
        if (probability > maxProbability) {
            optimalMulliganCards = [mulliganedCard];
            maxProbability = probability;
        }
    }

    return [optimalMulliganCards, maxProbability];
}

module.exports = {
    optimalMulligan,
    calculateStrength
};