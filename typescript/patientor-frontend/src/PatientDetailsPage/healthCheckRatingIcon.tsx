import React from "react";
import { Icon, SemanticCOLORS } from "semantic-ui-react";
import { HealthCheckRating } from "../types";

type HealthCheckRatingIconProps = {
    rating?: HealthCheckRating;
};

const assertNever = (rating: never): never => {
    throw new Error(`Unknown health check rating was supplied: ${rating}`);
};

const HealthCheckRatingIcon: React.FC<HealthCheckRatingIconProps> = ({ rating }: HealthCheckRatingIconProps) => {

    if (rating === undefined) {
        return null;
    }

    let iconColor: SemanticCOLORS;

    switch (rating) {
        case HealthCheckRating.Healthy:
            iconColor = 'green';
            break;
        case HealthCheckRating.LowRisk:
            iconColor = 'yellow';
            break;
        case HealthCheckRating.HighRisk:
            iconColor = 'red';
            break;
        case HealthCheckRating.CriticalRisk:
            iconColor = 'purple';
            break;
        default:
            return assertNever(rating);
    }
    
    return (
        <Icon name="heart" color={iconColor}/>
    );
};

export default HealthCheckRatingIcon;
