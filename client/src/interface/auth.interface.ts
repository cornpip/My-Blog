export interface SignInUser{
    email: string,
    password: string,
}

export interface SignUpUser{
    email: string;
    password: string;
}

export interface SignUpRes{
    flag: number;
    msg: string;
}

export interface ResUser{
    id: number,
    email: string,
    password: string;
    create: Date
}