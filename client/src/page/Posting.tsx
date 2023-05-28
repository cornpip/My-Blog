import { Box, Button, Container, FilledInput, FormControl, Grid, InputAdornment, InputLabel, TextField, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ReactMd from "../component/MarkDown/Reactmd";
import MiniHead from "../component/Head/MiniHead";
import BasicTable from "../component/Table/BasicTable";
import { sample_txt } from "../constants/sample.const";
import { useGetCheckQuery } from "../api/api";
import NoAuth from "./NoAuth";
import PostAPI from "../api/post";
import { useNavigate } from "react-router-dom";


export default function Posting() {
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [formData, setFormData] = useState(new FormData);
    const [filesInfo, setFilesInfo] = useState<Array<Array<string | number>>>([]);
    const [err, setErr] = useState(false);
    const [imgborder, setimgBorder] = useState({});
    const login_query = useGetCheckQuery({});
    const navigate = useNavigate();

    function titleHandler(e: any) {
        // console.log(e.target.value);
        setTitle(e.target.value);
        return;
    }

    function textHandler(e: any) {
        setText(e.target.value);
        return;
    }

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        formData.delete("file"); //초기화
        if (files !== null) {
            const info = [];

            const fleng = files.length;
            for (let i = 0; i < fleng; i++) {
                info.push([files[i].name, files[i].type, Math.round(files[i].size / 1024)])
                formData.append("file", files[i]);
            }
            setFilesInfo(info);
        }
        // console.log(e.target.files);
        console.log(formData.getAll("file"));
    }

    async function submitHandler(e: React.PointerEvent<HTMLButtonElement>) {
        setimgBorder({}); setErr(false);

        if (!formData.has("file")) setimgBorder({
            border: 2,
            borderColor: 'error.main',
            borderRadius: 2
        });
        else if (!title || !text) setErr(true);

        if (title && formData.has("file")) {
            formData.delete("feature_title"); formData.delete("content")
            formData.append("feature_title", title);
            formData.append("content", text);
            try {
                await PostAPI.writeSubmit(formData);
                navigate(`${process.env.REACT_APP_ROOT2}`, { replace: true });
                window.location.reload();
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <>
            {login_query.error && <NoAuth />}
            {!login_query.isLoading && !login_query.error &&
                <Container maxWidth={false} sx={{ maxWidth: { md: "95%" } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MiniHead />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Button
                                    color="secondary"
                                    variant='contained'
                                    component="label"
                                    sx={{}}
                                >
                                    Feature image upload *
                                    <input hidden multiple type="file" onChange={(e) => inputHandler(e)} />
                                </Button>
                            </Box>
                            <Button
                                // size="large"
                                variant='contained'
                                color='success'
                                onClick={submitHandler}
                            >
                                submit
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{}}>
                            <Box sx={{
                                width: { xs: "100%", md: "50%" }, ...imgborder
                            }}>
                                <BasicTable headrows={["fileName", "type", "size(KB)"]} rows={filesInfo} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                error={err}
                                id="filled-required"
                                label="Title"
                                value={title}
                                onChange={titleHandler}
                                sx={{ width: { xs: "100%", lg: "100%" } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{}}>
                            <TextField
                                id="outlined-multiline-flexible"
                                error={err}
                                fullWidth
                                placeholder={sample_txt}
                                multiline
                                value={text}
                                onChange={textHandler}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} zeroMinWidth sx={{}}>
                            {text ? <ReactMd text={text} /> : <ReactMd text={sample_txt} />}
                        </Grid>
                    </Grid>
                </Container >
            }
        </>
    )
}