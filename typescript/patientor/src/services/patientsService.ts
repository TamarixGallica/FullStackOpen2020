import { v4 as uuidv4 } from 'uuid';

import patientsData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { parseString } from '../utils';

const patients: Array<Patient> = patientsData as Array<Patient>;

const nonSensitivePatients: Array<NonSensitivePatient> = patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
}));

const getPatients = (): Array<Patient> => {
  return patients;
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
    console.log(addedPatient);
  return addedPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient
};