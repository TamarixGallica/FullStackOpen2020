import React from "react";
import { Icon } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import PatientDiagnosis from "./patientDiagnosis";
import HealthCheckRatingIcon from "./healthCheckRatingIcon";

type HealthCheckEntryProps = {
    entry: HealthCheckEntry;
};

const HealthCheck: React.FC<HealthCheckEntryProps> = ({ entry }: HealthCheckEntryProps) => {

    return (
        <div className="patient-entry">
            <p>
                {entry.date} <Icon name="doctor" size="large" />
            </p>
            <p>
                <i>{entry.description}</i>
            </p>
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
            <HealthCheckRatingIcon rating={entry.healthCheckRating} />
        </div>
    );
};

export default HealthCheck;
