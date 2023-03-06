import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AUTH_TAG = "Auth";

export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER}),
    tagTypes: [AUTH_TAG],
    endpoints: (builder) => ({
        getAuth: builder.query({
            query: () => `auth/login`,
            providesTags: (result, err, arg)=>{
                return [{ type: AUTH_TAG }];
            }
        })
    })
})
export const { useGetAuthQuery } = authApi;