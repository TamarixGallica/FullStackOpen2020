import patientsData from '../../data/patients.json';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

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
  addPatient
};