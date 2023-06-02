import Grid from "@mui/material/Grid";
import { useGetAllPostQuery } from "../../api/api";
import FeaturedPost from "./FeaturedPost";
import Loading from "../../page/Loading";
import { useEffect } from 'react';

export default function FeaturedBlock() {
    console.log("@@@: FeaturedBlock");
    //? RTK Query를 쓰면 일단 3번 렌더가 된다. (useEffect는 한 번)
    //이 안의 컴포넌트도 마찬가지로 3번 렌더링
    const posts_query = useGetAllPostQuery({}); //caching으로 동작하는지 확인필요
    const featured_count = 9;
    useEffect(()=>{
        //이러면 처음 blog에서는 2번 fetch되는데~~ 일단ok
        posts_query.refetch();
    }, [])

    return (
        <Grid container spacing={5}>
            {posts_query.isLoading ? <Loading /> : ""}
            {posts_query.data?.slice(0, featured_count).map((v, i) => {
                return <FeaturedPost key={v.id} post={v} />
            })}
        </Grid>
    )
}