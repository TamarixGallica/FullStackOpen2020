import { v4 as uuidv4 } from 'uuid';

import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';
import { parseString } from '../utils';

const patients: Array<Patient> = patientsData;
const patientsMem = patients.slice(0);

const nonSensitivePatients: Array<NonSensitivePatient> = patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
}));

const getPatients = (): Array<Patient> => {
  return patientsMem;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
    return nonSensitivePatients;
};

const getPatient = (id: unknown): Patient | undefined => {
  try {
    const patientId = parseString(id);
    const patient = patients.find((patient) => patient.id === patientId);
    return patient;
  } catch (e) {
    throw new Error(`Incorrect or missing id: ${id}`);
  }
};

const addPatient = (newPatient: NewPatient): Patient => {
    const id = uuidv4();
    const addedPatient: Patient = {
        id,
        ...newPatient,
    };
    console.log('Added patient:');
    patientsMem.push(addedPatient);
    console.dir(patientsMem);
    // console.log(addedPatient);
  return addedPatient;
};

const addEntry = (patient: Patient, entry: Entry): Entry => {
  console.log('Patient:');
  console.dir(patient);
  console.log('Returned entry:');
  console.dir(entry);
  return patients[0].entries[0];
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry
};