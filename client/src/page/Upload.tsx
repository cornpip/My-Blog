import Button from '@mui/material/Button';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTable from '../component/Table/BasicTable';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import PostAPI from '../api/post';
import { useGetCheckQuery } from '../api/api';
import NoAuth from './NoAuth';
import Loading from './Loading';
import Footer from '../component/Blog/Footer';
import MiniHead from '../component/Head/MiniHead';
import { Box, Grid } from '@mui/material';

//<BasicTable headrows={["fileName", "type", "size(KB)"]} rows={filesinfoMd} />
//basictable을 위와 같이 사용한다.

//따로 파일로 관리하지 않는 상수를 직접 사용한다고 무조건 바꾸지 말자.
//이 경우 headrows와 rows의 순서는 같아야하고 rows는 해당 컴포넌트에서 업로드를 받고 만든다.

//범용적인 표 컴포넌트를 만들기 위해서는 순서가 지정된 array로 받아야하고 순서는 table을 만드는 컴포넌트에서 명시적으로 지정하는게 더 좋아보인다.

//그리고 타입을 잘 지정하면서 추상화를 하려면 제네릭은 필수적인 것 같다.
// -> 공통info로 제한된 제네릭으로 하고 공통info 구현한 interface만들고 순서는 자료구조로 접근하면 만들 수 있을 것 같다.

//  퀴즈: commonTable 컴포넌트를 만든다
//  조건: table head와 row data를 인자로 받고 table head와 row data의 원소 순서는 보장되어 있지 않다고 가정한다. 제네릭을 사용해라 
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
        if (title && formData.has("md") && formData.has("image")) {
            formData.delete("feature_title"); //초기화
            formData.append("feature_title", title);
            try {
                await PostAPI.uploadSubmit(formData);
                navigate(`${process.env.REACT_APP_ROOT2}`, { replace: true });
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
                        <Grid item xs={12}>
                            <MiniHead />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={err}
                                fullWidth id="filled-basic"
                                label="feature title"
                                variant="standard"
                                onChange={texthandler}
                                sx={{}}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sx={imgborder}>
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
                        <Grid item xs={12} sx={mdborder}>
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