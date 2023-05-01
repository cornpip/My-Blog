import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
// import useGetAll from '../api/query/useGetAll';
import PostAPI from '../api/post';

function Test() {
    async function tt() {
        const res = await PostAPI.getAll();
        console.log("test page:", res);
        console.log("@@@", res[0].created);
        return
    }

    useEffect(() => {
        tt();
    }, [])

    return (
        <Container>
            <Typography variant='h2'>Test Page</Typography>
            <code>
                bla bla bla bla
                <h1>
                    Hello
                </h1>
                + one
            </code>
        </Container>
    )
}

export default Test 