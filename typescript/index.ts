import express from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
import { calculateExercises, parseExerciseExpressArguments } from './exerciseCalculator';

const app = express();

app.use(express.json());

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
        res.status(400).json({
            error: e.message,
        });
    }
});

app.post('/exercises', (req, res) => {
    try {
        const {target, trainingHours} = parseExerciseExpressArguments(req.body.target, req.body.daily_exercises);
        const bmi = calculateExercises(trainingHours, target);
        res.json(bmi);
    } catch (e) {
        res.status(400).json({
            error: e.message,
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});