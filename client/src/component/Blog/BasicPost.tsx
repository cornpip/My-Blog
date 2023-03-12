import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useGetMdQuery } from "../../api/api";
import { BlogMdProps } from "../../interface/blog.interface";
import { timeShow } from "../../util/time.util";
import ReactMd from "../MarkDown/Reactmd";

export default function BasicPost({ post }: BlogMdProps) {
    const md_query = useGetMdQuery({ name: post.mdName });
    return (
        <>
            {md_query.isFetching ? "loading markdown" : ""}
            <div>
                <Typography variant="overline" sx={{}}>
                    {/* overline center 안먹힘 */}
                    {timeShow(post.created)}
                </Typography>
                <Typography variant="h2" align="center" sx={{ mx: 2, mb: 2 }}>
                    {post.featureTitle}
                </Typography>
                <ReactMd text={md_query.data} />
                <Divider />
            </div>
        </>
    )
}
