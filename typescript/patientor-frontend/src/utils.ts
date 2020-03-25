export const isValidDate = (date: string): boolean => {
    const createdDate = new Date(date);
    if (createdDate.toString() === "Invalid Date") {
        return false;
    }
    const formattedDate = createdDate.toISOString().substring(0, 10);
    return date === formattedDate;
};
