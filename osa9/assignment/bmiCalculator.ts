export interface BmiValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


type Result = string;

export const calculateBmi = (height: number, weight: number) : Result => {

  const ht = height / 100;
  const bmi = weight / (ht * ht);
  console.log(bmi);
  let message = '';
  // return `Your bmi is ${bmi}`

  if (bmi < 18.5 ) {
    message = 'Underweight';
  } else if (bmi < 25) {
    message = 'Normal weight';
  } else if (bmi < 30) {
    message = 'Overweight';
  } else {
    message = 'Obese';
  }

  // switch(bmi) {
  //   case 'multiply':
  //     return a * b;
  //   case 'divide':
  //     if( b === 0) throw new Error('Can\'t divide by 0!');
  //     return a / b;
  //   case 'add':
  //     return a + b;
  //   default:
  //     throw new Error('Operation is not multiply, add or divide!');
  // }

  return message;
};


// console.log(calculateBmi(197, 110));

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  }
}




