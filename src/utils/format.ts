import { format, isValid, parseISO } from "date-fns";

export const formatDateToMonthYear = (dateString: string) => {
    const date = parseISO(dateString);
    if (!isValid(date)) return "";
    return format(date, "MM/yy");
};
