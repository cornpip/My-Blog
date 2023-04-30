// import { JwtPayload } from "./jwt-payload.interface";

export interface JwtPayload{
    userId: number,
    email: string
}

export interface JwtDecode extends JwtPayload{
    iat: number,
    exp: number,
}