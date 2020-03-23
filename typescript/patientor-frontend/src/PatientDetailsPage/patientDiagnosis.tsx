import React from "react";
import { useStateValue} from "../state";
import { Diagnosis } from "../types";

type PatientDiagnosisProps = {
    diagnosisCode: string;
};

const PatientDiagnosis: React.FC<PatientDiagnosisProps> = ({ diagnosisCode }: PatientDiagnosisProps) => {

    const [{ diagnoses },] = useStateValue();

    const diagnosis: Diagnosis | undefined = diagnoses.get(diagnosisCode);

    if (!diagnosis) {
        return (
            <li>{diagnosisCode}</li>
        );
    }

    return (
        <li>{diagnosis.code} {diagnosis.name}</li>
    );
};

export default PatientDiagnosis;
