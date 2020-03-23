import React from "react";
import { Icon } from "semantic-ui-react";
import { Entry } from "../types";
import PatientDiagnosis from "./patientDiagnosis";

type HospitalEntryProps = {
    entry: Entry;
};

const HospitalEntry: React.FC<HospitalEntryProps> = ({ entry }: HospitalEntryProps) => {

    return (
        <div className="patient-entry">
            <p>
                {entry.date} <Icon name="hospital" size="large" />
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
        </div>
    );
};

export default HospitalEntry;
