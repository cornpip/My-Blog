import { JwtPayload } from "./jwt-payload.interface";

export interface JwtDecode extends JwtPayload{
    iat: number,
    exp: number,
}