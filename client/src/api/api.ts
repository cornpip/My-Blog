import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../interface/post.interface";



const ALLPOST_TAG = "AllPost";
const MD_TAG = "MarkDown";
const IMAGE_TAG = "Image";

export const Api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER }),
    tagTypes: [ALLPOST_TAG, MD_TAG, IMAGE_TAG],
    endpoints: (builder) => ({
        getAllPost: builder.query({
            query: () => ({
                url: `post/all`,
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
                }
            }),
            providesTags: (result, err, arg) => {
                console.log("image provides");
                console.log(result, err, arg);
                return [{ type: IMAGE_TAG , id:arg.name}]
            },
        })
    })
})
export const { useGetMdQuery, useGetAllPostQuery, useGetImageQuery } = Api;