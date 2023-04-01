export const isNumber = (value) => {
    return typeof value === "number" && isFinite(value);
};

export const isNullOrEmptyString = (value) => {
    return value === null || value.length === 0;
};
