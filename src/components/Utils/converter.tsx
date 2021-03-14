export const convertBoolToString = (valueBool: boolean) : string => {
    if (valueBool) return "true"
    else return "false"
}

export const convertStringToBool = (valueString: string) : boolean => {
    return valueString === "true";
}