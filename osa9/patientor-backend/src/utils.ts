import { Gender, NewPatientEntry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object: any): NewPatientEntry => {
	return {
		name: parseStringType(object.name),
		dateOfBirth: parseStringType(object.dateOfBirth),
		ssn: parseStringType(object.ssn),
		gender: parseGender(object.gender),
		occupation: parseStringType(object.occupation),
		entries: [],
	}  
};

const parseStringType = (stringi: any): string => {
  if (!stringi || !isString(stringi)) {
    throw new Error('Incorrect or missing: ' + stringi);
  }

  return stringi;
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
  	throw new Error('Incorrect or missing gender: ' + gender);
  } 
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;