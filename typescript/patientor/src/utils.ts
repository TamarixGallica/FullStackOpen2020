/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient } from './types';

const isValidString = (str: any): str is string => {
    return typeof str === 'string' || str instanceof String;
};

const parseString = (name: any): string => {
    if (!name || !isValidString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};

const isValidDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isValidString(dateOfBirth) || !isValidDate(dateOfBirth)) {
        throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
    }
    return dateOfBirth;
};

const isValidSsn = (ssn: any): boolean => {
    const ssnRegex = /^(\d{2})(\d{2})(\d{2})([-A])(\d{3})([0-9a-fhj-np-y])$/i;
    const matches = ssnRegex.exec(ssn);

    return Boolean(matches);
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isValidString(ssn) || !isValidSsn(ssn)) {
        throw new Error(`Incorrect or missing social security number: ${ssn}`);
    }
    return ssn;
};

export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseString(object.gender),
        occupation: parseString(object.occupation)
    };
};
