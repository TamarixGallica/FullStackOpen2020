import React from "react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import HospitalEntryComponent from "./hospitalEntryComponent";
import HealthCheckEntryComponent from "./healthCheckEntryComponent";
import OccupationalHealthcareComponent from "./occupationalHealthcareComponent";

type EntryProps = {
    entry: Entry;
};

const assertNever = (type: never): never => {
    throw new Error(`Unknown patient entry type: ${type}`);
};

const PatientEntry: React.FC<EntryProps> = ({ entry }: EntryProps) => {

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryComponent entry={entry as HospitalEntry} />;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry as HealthCheckEntry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareComponent entry={entry as OccupationalHealthCareEntry} />;
        default:
            return assertNever(entry.type as never);
    }
};

export default PatientEntry;
