import patients from '../../data/patients.json'

import { Gender, NonSensitivePatientEntry, PatientEntry, NewPatientEntry, PublicPatient } from '../types';

// const patients: Array<PatientEntry> = patientsData;

// const getEntries = (): Array<PatientEntry> => {
const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const getPublicEntries = (
		id: string
	): PublicPatient[] => {
		const theOne = patients.filter((p) => { return p.id === id; } );

		return theOne.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			ssn,
			dateOfBirth,
			gender,
			occupation,
			entries: [],
		}));


	// return patients.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
	// 	id,
	// 	name,
	// 	ssn,
	// 	dateOfBirth,
	// 	gender,
	// 	occupation,
	// 	entries,
	// }));
};

const addEntry = (
    id: string, name: string, ssn: string, dateOfBirth: string, gender: string, occupation: string
  ): PatientEntry => {
    
  const newPatientEntry = {
    id,
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation,
  }
  
  patients.push(newPatientEntry);
  return newPatientEntry;
}


const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
	const newPatientEntry = {
		/// should be random number here
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

// const addEntry = () => {
//   return null;
// };

export default {
  getEntries,
  getPublicEntries,
  getNonSensitiveEntries,
  addEntry,
  addPatient
};