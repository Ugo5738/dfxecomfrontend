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

export interface SignUpFormType {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    phone: string;
}

export interface LoginFormType {
    email: string;
    password: string;
}

export interface CheckoutType {
    cvv: number;
    email: string;
    card_number: number;
    expiry_date: string;
    promo_code?: string;
}

export type ColorObject = Record<string, Record<string, string>>;
