import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { IPost } from '../../interface/post.interface';
import { FeaturedPostProps } from '../../interface/blog.interface';
import { timeShow } from '../../util/time.util';
import { useGetImageQuery } from '../../api/api';


//post.mdNmae자리 = 설명 앞부분 가져와야함
//post image가져오기
export default function FeaturedPost({ post }: FeaturedPostProps) {
  // const image_query = useGetImageQuery({ name: post.images[0].imageName });
  console.log("### FeautredPost", post);
  // if (!image_query.isFetching) {
  //   console.log("!!!!", image_query.data);
  // }
  return (
    <Grid item xs={12} md={6} >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.featureTitle}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {timeShow(post.created)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.mdName}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={`${process.env.REACT_APP_IMAGE}/${post.images[0].imageName}`}
            alt={post.images[0].imageName}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

//image ={post.image};
