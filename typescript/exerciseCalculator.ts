interface ExerciseCliArguments {
    target: number;
    trainingHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseCliArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (isNaN(Number(args[2]))) {
        throw new Error('Provided target is not a number');
    }

    const trainingHours: Array<number> = [];

    const hourArgs = args.slice(3);

    let trainingHour;

    while ((trainingHour = hourArgs.pop()) !== undefined) {
        if (isNaN(Number(trainingHour))) {
            throw new Error(`Provided training hour ${trainingHour} is not a number`);
        }
        trainingHours.push(Number(trainingHour));
    }

    return {
        target: Number(args[2]),
        trainingHours,
    };

};

interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface RatingResults {
    rating: number;
    ratingDescription: string;
}

const calculateRating = (average: number, target: number): RatingResults => {
    let rating;
    let ratingDescription;

    const difference = average - target;

    if (difference < -0.5) {
        rating = 1;
        ratingDescription = "come on, get a grip!";
    } else if (difference < 0) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 3;
        ratingDescription = "well done";
    }

    return {
        rating,
        ratingDescription
    };
};

const calculateExercises = (exercises: Array<number>, target: number): ExerciseResults => {
    const periodLength = exercises.length;
    const trainingDays = exercises.filter((hours) => hours !== 0).length;
    const average = exercises.reduce((acc, curr) => acc + curr) / periodLength;
    const success = average >= target;

    const {rating, ratingDescription} = calculateRating(average, target);


    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    const {target, trainingHours} = parseExerciseArguments(process.argv);
    console.log(calculateExercises(trainingHours, target));
} catch (e) {
    console.error(`Error, could not calculate exercises: ${e.message}`);
}