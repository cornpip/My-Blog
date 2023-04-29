import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { IPost } from '../../interface/post.interface';
import { FeaturedPostProps } from '../../interface/blog.interface';
import { timeShow } from '../../util/time.util';
import { useGetImageQuery, useGetMdQuery } from '../../api/api';
import Box from '@mui/material/Box';
import ReactMd from '../MarkDown/Reactmd';
import { useNavigate } from 'react-router-dom';


//post.mdNmae자리 = 설명 앞부분 가져와야함
//post image가져오기
export default function FeaturedPost({ post }: FeaturedPostProps) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(process.env.REACT_APP_ROOT + `/post/${post.id}`)
  };

  console.log("### FeautredPost", post);
  const md_query = useGetMdQuery({ name: post.mdName });
  return (
    <Grid item xs={12} sm={6} lg={4} >
      <CardActionArea onClick={handleNavigate} sx={{ boxShadow: "-1px 1px 12px 1px rgba(204, 204, 204, .7)" }}>
        <Card sx={{ flexDirection: 'column', display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ height: { xs: 250, sm: 300, md: 320, lg: 340 } }}
            image={`${process.env.REACT_APP_IMAGE}/${post.images[0].imageName}`}
            alt={post.images[0].imageName}
          />
          <CardContent sx={{ flex: 1, textAlign: "center" }}>
            <Typography component="h2" variant="h4">
              {post.featureTitle}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {timeShow(post.created)}
            </Typography>
            <Box sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical" }}>
              <ReactMd text={md_query.data} />
            </Box>
            {/* <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography> */}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

//image ={post.image};
