import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { BlogMdProps } from "../../interface/blog.interface";
import { timeShow } from "../../util/time.util";
import ReactMd from "../MarkDown/Reactmd";
import Box from "@mui/material/Box";
import '../../css/BasicMd.module.css';

export default function BasicMd({ post }: BlogMdProps) {

    return (
        <Box sx={{ padding: { xs: 2, sm: 3, lg: 4, xl: 5 } }}>
            <Typography variant="h2" fontFamily={"'Nanum Gothic', sans-serif"} align="center" sx={{ mx: 2, mb: 2 }}>
                {post.featureTitle}
            </Typography>
            <Typography variant="body2" align="center" sx={{}}>
                {/* overline center 안먹힘 */}
                {timeShow(post.created)}
            </Typography>
            <ReactMd text={post.content} />
            <Divider />
        </Box>
    )
}
