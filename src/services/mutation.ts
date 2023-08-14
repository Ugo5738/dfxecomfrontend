import { useMutation } from "@tanstack/react-query";
import { LoginPayloadType, RegisterPayloadType } from "../utils/types";
import axios from "./axios";
import URLS from "./urls";

export const UseLoginMutation = () =>
    useMutation(["login"], async (login: LoginPayloadType) => {
        const res = await axios.post(URLS.LOGIN, login);
        return res;
    });

export const UseRegisterMutation = () =>
    useMutation(["register"], async (register: RegisterPayloadType) => {
        const res = await axios.post(URLS.REGISTER, register);
        return res;
    });
