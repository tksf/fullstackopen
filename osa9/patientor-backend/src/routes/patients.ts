import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';


const router = express.Router();

// console.log('mukana');

router.get('/:id', (req, res) => {
	console.log('someone asked for data for patient: ', req.params.id);
	res.send(patientsService.getPublicEntries(req.params.id));

  // res.send('Fetching all diagnoses!');
})

router.get('/', (_req, res) => {
	console.log('someone asked for patients');
	res.send(patientsService.getNonSensitiveEntries());

  // res.send('Fetching all diagnoses!');
})

router.post('/', (req, res) => {

	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		const addedEntry = patientsService.addPatient(newPatientEntry);
		res.json(addedEntry)
	} catch (e) {
		res.status(400).send(e.message);
	}


	// const { id, name, ssn, dateOfBirth, gender, occupation } = req.body;

	// const newPatientEntry = patientsService.addEntry(
	// 	id,
	// 	name,
	// 	ssn,
	// 	dateOfBirth,
	// 	gender,
	// 	occupation,
	// );
	// res.json(newPatientEntry);
 //  res.send('Saving a patient record!');
})

export default router;