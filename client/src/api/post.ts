import axios from "axios";
import { IPost } from "../interface/post.interface"
import { clientForm } from "./axios";

async function getMd(url: string, data: object) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    });
    return response;
}

const PostAPI = {
    formSubmit: async (form: any) => {
        const res = await clientForm.post("post", form);
        // console.log(res);
        return res;
    },
    getAll: async (): Promise<Array<IPost>> => {
        const url = `${process.env.REACT_APP_SERVER}/post/all`;
        const res = await fetch(url).then(r => r.json());
        return res
    },

    // map fetch의 promise가 끝나는 시점을 제어하기 위해 promise.all을 쓴다.
    // 여러개의 Promise를 받아오는 작업에 순서가 무관하다면 병렬인 Promise.all이 효율도 옳다.
    // 최종 반환 순서는 fullfiled 들어온 순서와 상관없이 배열의 순서 지키면서 반환해준다.
    getAllMd: async (posts: Array<IPost>): Promise<Array<string>> => {
        const temp = await Promise.all(
            posts.map(async (post, i: number) => {
                // map요소 scope에서 await 걸어도 다음 map요소 함수로 넘어간다
                const res = getMd(`${process.env.REACT_APP_SERVER}/file/md`, { mdName: post.mdName })
                    .then((r) => r.text());
                return res;
            })
        )
        return temp;
    }
}

export default PostAPI;