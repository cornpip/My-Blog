import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useGetAllPostQuery } from '../../api/api';
import BasicPost from './BasicPost';

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

export default function Main() {
  console.log('@@@: Main');
  const posts_query = useGetAllPostQuery({});

  async function sleep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("sleep finish");
        resolve("suc");
      }, 2000);
    })
  }

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
      <>
        {posts_query.isFetching ? "loading post" : ""}
        {posts_query.data?.map((v, i) => {
          return (
            <BasicPost key={v.id} post={v} />
          )
        })}
      </>
    </Grid>
  );
}