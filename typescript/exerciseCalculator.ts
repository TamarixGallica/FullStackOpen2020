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

const calculateRating = (average: number, target: number) : RatingResults => {
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
        ratingDescription = "well done"
    }

    return {
        rating,
        ratingDescription
    };
}

const calculateExercises = (exercises: Array<number>, target: number) : ExerciseResults => {
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
    }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
