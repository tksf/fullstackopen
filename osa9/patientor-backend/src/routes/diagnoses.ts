import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

console.log('mukana');

router.get('/', (_req, res) => {
	console.log('someone asked for diagnoses');
	res.send(diagnosesService.getEntries());

  // res.send('Fetching all diagnoses!');
})

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
})

export default router;