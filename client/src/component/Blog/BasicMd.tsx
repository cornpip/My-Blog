import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useGetMdQuery } from "../../api/api";
import { BlogMdProps } from "../../interface/blog.interface";
import { timeShow } from "../../util/time.util";
import ReactMd from "../MarkDown/Reactmd";
import Loading from "../../page/Loading";

export default function BasicMd({ post }: BlogMdProps) {
    // console.log("@@blogpost", post);
    const md_query = useGetMdQuery({ name: post.mdName });
    return (
        <>
            {md_query.isLoading ? <Loading /> : md_query.data ? <div>
                <Typography variant="overline" sx={{}}>
                    {/* overline center 안먹힘 */}
                    {timeShow(post.created)}
                </Typography>
                <Typography variant="h2" align="center" sx={{ mx: 2, mb: 2 }}>
                    {post.featureTitle}
                </Typography>
                <ReactMd text={md_query.data} />
                <Divider />
            </div> : "Fail"}
        </>
    )
}
