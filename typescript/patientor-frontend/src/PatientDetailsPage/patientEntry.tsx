import React from "react";
import { Entry } from "../types";

type EntryProps = {
    entry: Entry;
};

const PatientEntry: React.FC<EntryProps> = ({ entry }: EntryProps) => {
    if (!entry) {
        return null;
    }
    return (
        <>
            <p>
                {entry.date}&nbsp;
                <i>{entry.description}</i>
            </p>
            {
                entry.diagnosisCodes
                && (
                    <ul>
                        {
                            entry.diagnosisCodes.map((code, index) => <li key={index}>{code}</li>)
                        }
                    </ul>
                )
            }
        </>
    );
};

export default PatientEntry;
