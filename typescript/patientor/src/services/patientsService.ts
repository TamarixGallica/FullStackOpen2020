import patientsData from '../../data/patients.json';

import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientsData;

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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};