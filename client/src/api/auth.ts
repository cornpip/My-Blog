import { client } from "./axios";
import { SignInUser, SignUpUser, SignUpRes } from "../interface/auth.interface";

const AuthAPI = {
    signin: async function (body: SignInUser) {
        const res = await client.post("auth/login", body)
        // .then((r)=>r.data)
        // .catch((e)=>{
        //     // console.log(e.response.data.message);
        //     return e.response.data.message;
        // });
        return res.data;

        // const res2 = await fetch("http://localhost:8000/auth/tt", {
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({email:"chdnjf13755@naver.com", password:"12345"})
        // }).then(r=>r.json());
        // console.log(res2);
        // return;
    },
    signup: async function (body: SignUpUser) {
        const res: SignUpRes = await client.post("auth/signup", body)
            .then((r) => ({flag: 1, msg: r.data }) )
            .catch((e) => {
                return { flag: 0, msg: e.response.data.message };
            })
            return res;
        },
    logout: async function () {
        const res = await client.get("auth/logout");
        return res.data;
    },
    check: async function () {
        const res = await client.get('auth/check');
        console.log(res);
        return res.data;
    }
};


export default AuthAPI;