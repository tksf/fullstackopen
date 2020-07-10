import express from 'express';
import { calculateBmi, BmiValues } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';


// interface BmiValues {
//   height: number;
//   weight: number;
// }

const app = express();
app.use(express.json());

const parseArguments = (height:string, weight: string): BmiValues => {
  if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

	console.log(req.query, typeof(req));
	console.log(req.query.weight, typeof(req.query.weight));



	try {
		const { height, weight } = parseArguments(req.query.height, req.query.weight);
		// console.log(height, weight);
		const response = calculateBmi(height, weight);
		res.send(response);

	} catch (e) {
		if (e instanceof Error) {
			console.log('Error, something bad happened, message: ', e.message);
		}
	}

	// const response = `Got ${req.query.height} and ${req.query.weight}`;
});

app.post('/exercise', (req, res) => {
	console.log(req.body);
	// console.log(req, res);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const daily_exercises : any = req.body.daily_exercises;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const target : any = req.body.target;

	if (!daily_exercises || !target) {
		res.status(400).json({error: 'parameters missing'});
	}

	try {
		
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		daily_exercises.unshift(target);
		const result = calculateExercises(daily_exercises);
		res.json(result);

	} catch (e) {
		if (e instanceof Error) {
			console.log('Error, something bad happened, message: ', e.message);
		}
	}
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
