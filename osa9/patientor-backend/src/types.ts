export enum Gender {
	Male = "male",
	Female = "female",
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

// export interface Patient {
//   id: string;
//   name: string;
//   ssn: string;
//   occupation: string;
//   gender: Gender;
//   dateOfBirth: string;
// }

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >


    // {
    //     "id": "d2773336-f723-11e9-8f0b-362b9e155667",
    //     "name": "John McClane",
    //     "dateOfBirth": "1986-07-09",
    //     "ssn": "090786-122X",
    //     "gender": "male",
    //     "occupation": "New york city cop"
    // }

// export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;



  // {
  //   "code": "S62.5",
  //   "name": "Fracture of thumb",
  //   "latin": "Fractura [ossis/ossium] pollicis"
  // },
  // {
  //   "code": "H35.29",
  //   "name": "Other proliferative retinopathy",
  //   "latin": "Alia retinopathia proliferativa"
  // }