import { format, isValid, parseISO } from "date-fns";

export const formatDateToMonthYear = (dateString: string) => {
    const date = parseISO(dateString);
    if (!isValid(date)) return "";
    return format(date, "MM/yy");
};

export const removeEmpty = (obj: never) => {
    Object.keys(obj).forEach((key) => obj[key] == null || (!obj[key] && delete obj[key]));
    return obj;
};
