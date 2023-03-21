import Grid from "@mui/material/Grid";
import { useGetAllPostQuery } from "../../api/api";
import FeaturedPost from "./FeaturedPost";


// {
//     title: 'Featured post3',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text',
//   },

export default function FeaturedBlock() {
    console.log("@@@: FeaturedBlock");
    const posts_query = useGetAllPostQuery({}); //caching으로 동작하는지 확인필요
    const featured_count = 8;

    return (
        <Grid container spacing={5}>
            {posts_query.isFetching ? "loading post" : ""}
            {posts_query.data?.slice(0, featured_count).map((v,i)=>{
                return <FeaturedPost key={v.id} post={v} />
            })}
        </Grid>
    )
}