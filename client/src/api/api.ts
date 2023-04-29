import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../interface/post.interface";
import { ResUser, SignInUser } from "../interface/auth.interface";



const IDPOST_TAG = "IdPost";
const ALLPOST_TAG = "AllPost";
const MD_TAG = "MarkDown";
const IMAGE_TAG = "Image";
const CHECK_AUTH_TAG = "CheckAuth";

export const Api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER }),
    tagTypes: [IDPOST_TAG, ALLPOST_TAG, MD_TAG, IMAGE_TAG, CHECK_AUTH_TAG],
    endpoints: (builder) => ({
        getIdPost: builder.query({
            query: ({ id }) => ({
                url: `post/${id}`,
                credentials: "include",
            }),
            providesTags: (result, err, arg) => {
                return [{ type: IDPOST_TAG, id: arg.id }]
            },
            transformResponse: (res: IPost): IPost => {
                console.log("@@@ getIdPost transformResponse", res);
                return res;
            }
        }),
        getAllPost: builder.query({
            query: () => ({
                url: `post/all`,
                credentials: "include",
            }),
            providesTags: (result, err, arg) => {
                return [{ type: ALLPOST_TAG }]
            },
            //아래처럼 type붙일 수 있으나 fetchBaseQuery default type에 data?:undefined가 있다는 거 고려하자.
            //즉 res.data타입은 IPost[] | undefined가 된다.
            transformResponse: (res: Array<IPost>): Array<IPost> => {
                return res;
            }
        }),
        getMd: builder.query({
            query: ({ name }) => ({
                url: `file/md/${name}`,
                responseHandler: (res): Promise<string> => res.text(),
                credentials: "include",
            }),
            providesTags: (result, err, arg) => {
                // console.log("@@@ getMd providesTags", result, err, arg);
                return [{ type: MD_TAG, id: arg.name }];
            },
            // transformResponse는 err없이 res return나온 후 handle같다.
            // err있으면 아나오고 return전 res handle은 responsehandler에서 된다.
        }),
        getImage: builder.query({
            query: ({ name }) => ({
                url: `file/image/${name}`,
                responseHandler: (res) => {
                    return res.blob();
                },
                credentials: "include",
            }),
            providesTags: (res, err, arg) => {
                console.log("@@@ getImage provides", res);
                return [{ type: IMAGE_TAG, id: arg.name }]
            },
        }),
        getCheck: builder.query({
            query: () => ({
                url: `auth/check`,
                responseHandler: async (res) => {
                    console.log("@@@ getCheck responseHandler", res);
                    // 이렇게 처리해도 rtk caching이 reject는 반영안한다.
                    // if (res.status !== 200) {
                    //     console.log("nottttt");
                    //     return "HAHA HEHE";
                    // }
                    return res.text();
                },
                credentials: "include",
            }),
            transformResponse: (res) => {
                console.log("@@@ getcheck transformResponse", res);
                return res;
            },
            //여기도 마찬가지로 처리해도 reject는 반영안됨
            transformErrorResponse: (baseQueryReturnValue, meta, arg) => {
                console.log("@@@ getcheck transformError", baseQueryReturnValue, meta, arg);
                return 200;
            },
            providesTags: (result, err, arg) => {
                // console.log("@@@ getcheck providesTags", result);
                return [{ type: CHECK_AUTH_TAG }]
            },
        }),
        setCheck: builder.mutation({
            query: (body: SignInUser) => ({
                url: `auth/login`,
                method: "POST",
                body: body,
                credentials: "include",
                // responseHandler: (res)=>{},
            }),
            transformResponse: (res: ResUser, meta, arg) => {
                // console.log("@@@ setcheck transformResponse", res);
                return res;
            },
            invalidatesTags: (result, error, args) => [{ type: CHECK_AUTH_TAG }],
        })
    })
})
export const { useGetAllPostQuery, useGetIdPostQuery, useGetMdQuery, useGetImageQuery, useGetCheckQuery, useSetCheckMutation } = Api;