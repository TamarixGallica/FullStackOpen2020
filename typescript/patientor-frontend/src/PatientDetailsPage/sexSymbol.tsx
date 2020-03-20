import React from "react";
import { Icon } from "semantic-ui-react";
import { Gender } from "../types";

type SexSymbolProps = {
    gender: Gender;
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled gender for patient: ${value}`
    );
};

const getIcon = (gender: Gender) => {
    switch (gender) {
        case Gender.Male:
            return "mars";
        case Gender.Female:
            return "venus";
        case Gender.Other:
            return "genderless";
        default:
            return assertNever(gender);
    }
};

const SexSymbol: React.FC<SexSymbolProps> = ({ gender }: SexSymbolProps) => {
    const icon = getIcon(gender);
    return <Icon name={icon} />;
};

export default SexSymbol;