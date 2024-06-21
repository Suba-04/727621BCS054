const express = require('express');
const app = express();
const PORT = 3000;
const WINDOW_SIZE = 10;

let numbers = [];
let lock = false;


const calculateAverage = (nums) => {
    if (nums.length === 0) return 0;
    const sum = nums.reduce((acc, num) => acc + num, 0);
    return sum / nums.length;
};


const generatePrime = (function() {
    let lastPrime = 1;
    return function() {
        let candidate = lastPrime + 1;
        while (true) {
            if (isPrime(candidate)) {
                lastPrime = candidate;
                return candidate;
            }
            candidate++;
        }
    };
})();

function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

const generateFibonacci = (function() {
    let a = 0, b = 1;
    return function() {
        let next = a + b;
        a = b;
        b = next;
        return a;
    };
})();

const generateEven = (function() {
    let lastEven = 0;
    return function() {
        lastEven += 2;
        return lastEven;
    };
})();

const generateRandom = () => Math.floor(Math.random() * 100) + 1;


const generateNumber = (type) => {
    switch (type) {
        case 'p':
            return generatePrime();
        case 'f':
            return generateFibonacci();
        case 'e':
            return generateEven();
        case 'r':
            return generateRandom();
        default:
            return null;
    }
};

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    const validIds = ['p', 'f', 'e', 'r'];

    if (!validIds.includes(numberid)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    if (lock) {
        return res.status(503).json({ error: 'Service busy, try again later' });
    }

    lock = true;

    const number = generateNumber(numberid);

    const numbersBefore = [...numbers];

    if (number !== null && !numbers.includes(number)) {
        if (numbers.length >= WINDOW_SIZE) {
            numbers.shift(); 
        }
        numbers.push(number); 
    }

    const numbersAfter = [...numbers];
    const average = calculateAverage(numbers);

    lock = false;

    res.json({
        numbersBefore,
        numbersAfter,
        average
    });
});

app.listen(PORT, () => {
    console.log(Average Calculator microservice running on port ${PORT});
});