import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FeaturedPostProps } from '../../interface/blog.interface';
import { timeShow } from '../../util/time.util';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../../page/Loading';
import '../../css/FeaturedPost.module.css';

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const [loadImage, setLoadImage] = useState<boolean>(false);
  const [preImg, setPreImg] = useState(new Image());

  const loadImageHandle = () => {
    setLoadImage(true);
  }

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(process.env.REACT_APP_ROOT + `/post/${post.id}`)
  };

  useEffect(() => {
    const image = new Image();
    image.onload = loadImageHandle;
    image.src = `${process.env.REACT_APP_IMAGE}/${post.images[0].imageName}`;
    setPreImg(image);
    // loadImageHandle();
  }, []);

  return (
    <>
      <Grid item xs={12} sm={6} lg={4} >
        <CardActionArea onClick={handleNavigate} sx={{ boxShadow: "-1px 1px 12px 1px rgba(204, 204, 204, .7)" }}>
          <Card sx={{}}>
            {!loadImage && <Loading />}
            {loadImage &&
              <CardMedia
                component="img"
                sx={{ height: { xs: 250, sm: 300, md: 320, lg: 340 }, objectFit: "cover" }}
                image={preImg.src}
                alt={post.images[0].imageName}
                loading='lazy'
              />}
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontFamily={"'Nanum Gothic', sans-serif"}>
                {post.featureTitle}
              </Typography>
              {/* 날짜 아래로 내리자 */}
              <Typography variant="body1" sx={{ overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.3, height: "3.9em", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", marginTop: 1, whiteSpace: "norml", wordBreak: "break-all" }}>
                {post.subTitle}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
}