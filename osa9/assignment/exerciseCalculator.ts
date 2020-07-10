
interface ExerciseData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (args: Array<number>): ExerciseData => {
  // console.log('---->', args)
  const exerciseTarget = Number(args.shift());
  const trainingDays = args.filter(a => a > 0).length;
  const exerciseSum = args.reduce((a,b) => a + b, 0);

  let exerciseRating  = 1 + exerciseSum / (exerciseTarget * args.length);
  exerciseRating = exerciseRating > 3 ? 3 : exerciseRating;
  // const exerciseRating = exerciseSum / (exerciseTarget * args.length);
  const exerciseDescription = exerciseRating < 2 ? 'Need to work harder' : 'Well done';
  const exerciseSuccess = exerciseRating < 1 ? false : true;

  return {
    periodLength: args.length,
    trainingDays: trainingDays,
    success: exerciseSuccess,
    rating: exerciseRating,
    ratingDescription: exerciseDescription,
    target: exerciseTarget,
    average: exerciseSum / args.length
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));

// interface BmiValues {
//   height: number;
//   weight: number;
// }

const parseArguments = (args: Array<string>) => {
  const inputNumbers = args.map(Number);

  if (inputNumbers.some(isNaN)) {
    throw new Error('malformatted parameters');
  }

  return inputNumbers;
};


try {
  // console.log(process.argv);
  const dataGiven = process.argv.slice(2, process.argv.length);
  // console.log(dataGiven);
  const inputData = parseArguments(dataGiven);
  console.log('-->', inputData);
  console.log(calculateExercises(inputData));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  }
}
