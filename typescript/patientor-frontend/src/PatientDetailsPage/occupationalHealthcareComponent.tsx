import React from "react";
import { Icon } from "semantic-ui-react";
import { OccupationalHealthCareEntry } from "../types";
import PatientDiagnosis from "./patientDiagnosis";

type HealthCheckEntryProps = {
    entry: OccupationalHealthCareEntry;
};

const HealthCheck: React.FC<HealthCheckEntryProps> = ({ entry }: HealthCheckEntryProps) => {

    return (
        <div className="patient-entry">
            <p>
                {entry.date} <Icon name="stethoscope" size="large" /> {entry.employerName}
            </p>
            <p>
                <i>{entry.description}</i>
            </p>
            {
                entry.sickLeave
                && (
                    <p>
                        {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                    </p>
                )
            }
            {
                entry.diagnosisCodes
                && (
                    <ul>
                        {
                            entry.diagnosisCodes.map((code, index) => <PatientDiagnosis key={index} diagnosisCode={code} />)
                        }
                    </ul>
                )
            }
        </div>
    );
};

export default HealthCheck;
