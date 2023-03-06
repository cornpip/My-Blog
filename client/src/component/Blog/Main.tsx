import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import ReactMd from '../MarkDown/Reactmd';
import PostAPI from '../../api/post';
import { IPost } from "../../interface/post.interface"

// {
//   "id": 1,
//   "featureTitle": "test",
//   "mdName": "blog-post.1_1670735285127-886069199.md",
//   "created": "2022-12-11T05:08:05.167Z",
//   "updated": "2022-12-11T05:08:05.167Z",
//   "images": [
//     {
//       "id": 1,
//       "imageName": "netflix_1670735285129-992920115.png"
//     }
//   ]
// },

export default function Main(props: any) {
  console.log('mainnnnnnnnnnnnnnn');
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [contents, setContents] = useState<Array<string>>([]);

  function timeShow(time: string) {
    const rtime = new Date(time);
    return `${rtime.getFullYear()}-${(rtime.getMonth() + 1).toString().padStart(2, "0")}-${rtime.getDate().toString().padStart(2, "0")}`;
  }


  async function sleep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("sleep finish");
        resolve("suc");
      }, 2000);
    })
  }

  async function firstGet() {
    try {
      const t_posts = await PostAPI.getAll();
      const t_contents = await PostAPI.getAllMd(t_posts);
      setPosts(t_posts);
      setContents(t_contents);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    firstGet();
  }, [])

  return (
    <Grid
      item
      xs={12}
      md={9}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Divider />
      {
        contents && contents.map((content, i) => {
          console.log("markdown");
          return (
            <div key={content}>
              <Typography variant="overline" sx={{}}>
                {/* overline center 안먹힘 */}
                {timeShow(posts[i].created)}
              </Typography>
              <Typography variant="h2" align="center" sx={{ mx: 2, mb: 2 }}>
                {posts[i].featureTitle}
              </Typography>
              <ReactMd text={content} />
              <Divider />
            </div>
          )
        })
      }
    </Grid>
  );
}
