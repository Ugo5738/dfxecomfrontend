import { format, isValid, parseISO } from "date-fns";
import { ParamsType } from "./types";

export const formatDateToMonthYear = (dateString: string) => {
    const date = parseISO(dateString);
    if (!isValid(date)) return "";
    return format(date, "MM/yy");
};

export const removeEmpty = (obj: ParamsType) => {
    if (obj == null) return {};
    Object.keys(obj).forEach((key) => obj[key] == null || (!obj[key] && delete obj[key]));
    return obj;
};

export const generateTransactionRef = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let autoId = "";
    for (let i = 0; i < 15; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "dfx-" + Date.now().toLocaleString() + autoId;
};
