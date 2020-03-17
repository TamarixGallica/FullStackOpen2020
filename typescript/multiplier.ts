type Operation = 'multiply' | 'add' | 'divide';

type CalculatorFn = number;

const calculator = (a: number, b: number, op: Operation) => {
    if (op === 'multiply') {
        return a * b;
    } else if (op === 'add') {
        return a + b;
    } else if (op === 'divide') {
        if (b === 0) return 'Can\'t divide by 0!';
        return a / b;
    }
    return `Unknown requested operation ${op}`;
}

const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b);
}

multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:');