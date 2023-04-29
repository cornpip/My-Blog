export interface SignInUser{
    email: string,
    password: string,
}

export interface ResUser{
    id: number,
    email: string,
    password: string;
    create: Date
}