export interface RegisterPayloadType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    profile: {
        country: string;
    };
}

export interface LoginPayloadType {
    email: string;
    password: string;
}
