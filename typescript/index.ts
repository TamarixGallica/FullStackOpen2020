import express from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});


app.get('/bmi', (req, res) => {
    try {
        const { height, weight} = parseBmiArguments([null, null, req.query.height, req.query.weight]);
        const bmi: string = calculateBmi(height, weight);
        res.json({
            height,
            weight,
            bmi,
        });
    } catch (e) {
        res.status(401).json({
            error: e.message,
        });
    }
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});