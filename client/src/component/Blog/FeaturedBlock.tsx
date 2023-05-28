import Grid from "@mui/material/Grid";
import { useGetAllPostQuery } from "../../api/api";
import FeaturedPost from "./FeaturedPost";
import Loading from "../../page/Loading";

export default function FeaturedBlock() {
    console.log("@@@: FeaturedBlock");
    const posts_query = useGetAllPostQuery({}); //caching으로 동작하는지 확인필요
    const featured_count = 9;

    return (
        <Grid container spacing={5}>
            {posts_query.isLoading ? <Loading /> : ""}
            {posts_query.data?.slice(0, featured_count).map((v,i)=>{
                return <FeaturedPost key={v.id} post={v} />
            })}
        </Grid>
    )
}