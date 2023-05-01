import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useGetMdQuery } from "../../api/api";
import { BlogMdProps } from "../../interface/blog.interface";
import { timeShow } from "../../util/time.util";
import ReactMd from "../MarkDown/Reactmd";
import Loading from "../../page/Loading";
import Box from "@mui/material/Box";

export default function BasicMd({ post }: BlogMdProps) {
    // console.log("@@blogpost", post);
    const md_query = useGetMdQuery({ name: post.mdName });
    return (
        <Box sx={{padding: {xs: 2, sm: 3, lg:4, xl: 5}}}>
            {md_query.isLoading ? <Loading /> : md_query.data ? <div>
                <Typography variant="h2" align="center" sx={{ mx: 2, mb: 2 }}>
                    {post.featureTitle}
                </Typography>
                <Typography variant="body2" align="center" sx={{}}>
                    {/* overline center 안먹힘 */}
                    {timeShow(post.created)}
                </Typography>
                <ReactMd text={md_query.data} />
                <Divider />
            </div> : "Fail"}
        </Box>
    )
}
