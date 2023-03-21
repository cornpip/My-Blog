import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../interface/post.interface";



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
            //아래처럼 type붙일 수 있으나 fetchBaseQuery default type에 data?:undefined가 있다는 거 고려하자.
            //즉 res.data타입은 IPost[] | undefined가 된다.
            transformResponse:(res: IPost): IPost=>{
                console.log("hell getid", res);
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
            transformResponse:(res: Array<IPost>): Array<IPost>=>{
                return res;
            }
        }),
        getMd: builder.query({
            query: ({ name }) => ({
                // console.log("here is rtk query", name);
                url: `file/md/${name}`,
                responseHandler: (res):Promise<string> => res.text(),
                credentials: "include",
            }),
            providesTags: (result, err, arg) => {
                // console.log("here is rtk", result, err, arg);
                return [{ type: MD_TAG, id: arg.name }];
            },
            // transformResponse는 err없이 res return나온 후 handle같다.
            // err있으면 아나오고 return전 res handle은 responsehandler에서 된다.
        }),
        getImage: builder.query({
            query: ({name}) => ({
                url: `file/image/${name}`,
                responseHandler: (res) => {
                    return res.blob();
                },
                credentials: "include",
            }),
            providesTags: (result, err, arg) => {
                console.log("image provides");
                console.log(result, err, arg);
                return [{ type: IMAGE_TAG , id:arg.name}]
            },
        }),
        getCheck: builder.query({
            query: () => ({
                url: `auth/check`,
                responseHandler: (res: any) => {
                    console.log("getCheck", res);
                    return res.text();
                },
                credentials: "include",
            }),
            providesTags: (result, err, arg) => {
                console.log("~!@#!@#!@#@!#!@", result);
                return [{ type:CHECK_AUTH_TAG }]
            },
        })
    })
})
export const { useGetAllPostQuery, useGetIdPostQuery, useGetMdQuery, useGetImageQuery, useGetCheckQuery } = Api;