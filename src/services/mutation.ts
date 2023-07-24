import { useMutation } from "@tanstack/react-query";
import { LoginPayloadType, RegisterPayloadType } from "../utils/types";
import axios from "./axios";

export const UseLoginMutation = () =>
    useMutation(["login"], async (login: LoginPayloadType) => {
        const res = await axios.post("/login/token/", login);
        return res;
    });

export const UseRegisterMutation = () =>
    useMutation(["register"], async (register: RegisterPayloadType) => {
        const res = await axios.post("/register/", register);
        return res;
    });
