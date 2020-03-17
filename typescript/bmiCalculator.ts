interface BmiCliArguments {
    height: number;
    weight: number;
}

export const parseBmiArguments = (args: Array<string>) : BmiCliArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided height and weight are not numbers');
    }

}

export const calculateBmi = (height: number, weight: number) : string => {
    const bmi = weight / (height / 100)**2;
    if (bmi <= 15)
        return "Very severely underweight";
    if (bmi <= 16)
        return "Severely underweight";
    if (bmi <= 18.5)
        return "Underweight";
    if (bmi <= 25)
        return "Normal (healthy weight)";
    if (bmi <= 30)
        return "Overweight";
    if (bmi <= 35)
        return "Obese Class I (Moderately obese)";
    if (bmi <= 40)
        return "Obese Class II (Severely obese)";
    return "Obese Class III (Very severely obese)";
}

try {
    const {height, weight} = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.error(`Error, could not calculate BMI: ${e.message}`);
    console.error('Two number arguments should be passed to the program: height and weight.');
}