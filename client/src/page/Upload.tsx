import Button from '@mui/material/Button';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTable from '../component/Table/BasicTable';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import PostAPI from '../api/post';
import { useGetCheckQuery } from '../api/api';
import NoAuth from './NoAuth';
import Loading from './Loading';
import Footer from '../component/Blog/Footer';

export default function Upload() {
    //react의 변수관리를 usestate로 해야하는 이유
    //re-render가 아니여도 setstate를 할 때, Upload()는 돈다. (처음처럼 도는건 아니고 업데이트 느낌으로 돎)
    //이 때 useState로 관리하는 변수가 아니라면 초기화되므로 의도한 경우가 아니면 State를 사용하자
    const [filesInfo, setFilesInfo] = useState<Array<Array<string | number>>>([]);
    const [filesinfoMd, setfilesinfoMd] = useState<Array<Array<string | number>>>([]);
    const [title, setTitle] = useState("");
    const [formData, setFormData] = useState(new FormData);
    const [err, setErr] = useState(false);
    const [mdborder, setmdBorder] = useState({});
    const [imgborder, setimgBorder] = useState({});
    const [fail, setFail] = useState(false);
    const navigate = useNavigate();
    const login_query = useGetCheckQuery({});

    async function submitHandler(e: React.PointerEvent<HTMLButtonElement>) {
        // console.log(e);
        //formdata 안에 값 getAll("프로퍼티") method로 확인가능, 그냥 console은 안나온다.
        console.log(formData.getAll("image"));
        console.log(formData.getAll("md"));
        setmdBorder({}); setimgBorder({}); setErr(false); setFail(false);

        if (!title) setErr(true);
        else if (!formData.has("md")) {
            console.log("not md");
            setmdBorder({
                border: 1,
                borderColor: 'error.main',
                borderRadius: 2
            })
        } else if (!formData.has("image")) {
            console.log("not image");
            setimgBorder({
                border: 1,
                borderColor: 'error.main',
                borderRadius: 2
            })
        }
        //data : JSON.stringify된 { ~~~~~ }
        //위의형태를 보내줘야할지, json으로 key value가 넘어가야할지는 서버에서 지정한 형식을 따른다.
        if (title && formData.has("md")) {
            formData.delete("feature_title"); //초기화
            formData.append("feature_title", title);
            try {
                await PostAPI.formSubmit(formData);
                navigate(`${process.env.REACT_APP_ROOT}`, { replace: true });
                window.location.reload();
                // console.log("성공");
            } catch (e) {
                console.log(e);
                setFail(true);
            }
        }
    }

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>, image: boolean) {
        const files = e.target.files;
        image ? formData.delete("image") : formData.delete("md"); //초기화
        if (files !== null) {
            const info = [];
            const fleng = files.length;
            for (let i = 0; i < fleng; i++) {
                info.push([files[i].name, files[i].type, Math.round(files[i].size / 1024)])
                image ? formData.append("image", files[i]) : formData.append("md", files[i]);
            }

            image ? setFilesInfo(info) : setfilesinfoMd(info);
            // formData는 render 요소가 아니므로 굳이 setstate 하지 않아도 된다.
        }
        // console.log(e.target.files);
        console.log(formData.getAll("image"));
        console.log(formData.getAll("md"));
    }

    function texthandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        // console.log(e);
        setTitle(e.target.value);
    }

    return (
        <>
            {login_query.isLoading ? <Loading /> : login_query.error ? <NoAuth /> :
                <Container>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <Typography variant="h2"> Upload Page </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                error={err}
                                fullWidth id="filled-basic"
                                label="feature title"
                                variant="standard"
                                onChange={texthandler}>
                            </TextField>
                        </Grid>
                        <Grid xs={12} sx={imgborder}>
                            <Typography variant='h6'>
                                Feature image
                            </Typography>
                            <Button
                                color="secondary"
                                variant='contained'
                                component="label"
                                sx={{ margin: 2 }}
                            >
                                upload
                                <input hidden multiple type="file" onChange={(e) => inputHandler(e, true)} />
                            </Button>
                            <BasicTable headrows={["fileName", "type", "size(KB)"]} rows={filesInfo} />
                        </Grid>
                        <Grid xs={12} sx={mdborder}>
                            <Typography variant='h6'>
                                md File
                            </Typography>
                            <Button
                                color="secondary"
                                variant='contained'
                                component="label"
                                sx={{ margin: 2 }}
                            >
                                upload
                                <input hidden multiple type="file" onChange={(e) => inputHandler(e, false)} />
                            </Button>
                            <BasicTable headrows={["fileName", "type", "size(KB)"]} rows={filesinfoMd} />
                        </Grid>
                        <Grid container
                            xs={12}
                            sx={{ margin: 4 }}
                            // alignItems="center" 세로축
                            justifyContent="center">
                            <Button
                                size="large"
                                variant='contained'
                                color='success'
                                onClick={submitHandler}>
                                submit
                            </Button>
                        </Grid>
                        <Grid container
                            xs={12}
                            justifyContent="center">
                            {fail ? <Typography variant='h6'
                                sx={{
                                    color: "#990066",
                                    border: 1,
                                    borderRadius: 2,
                                    borderColor: "#990066",
                                    padding: 1
                                }}>
                                try again
                            </Typography> : ""}
                        </Grid>
                    </Grid>
                    <Footer
                        title="Footer"
                        description="Something here to give the footer a purpose!"
                    />
                </Container>}
        </>
    )
}