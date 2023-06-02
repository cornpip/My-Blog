import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import ReactMd from "../component/MarkDown/Reactmd";
import MiniHead from "../component/Head/MiniHead";
import BasicTable from "../component/Table/BasicTable";
import { sample_txt } from "../constants/sample.const";
import { useGetCheckQuery } from "../api/api";
import NoAuth from "./NoAuth";
import PostAPI from "../api/post";
import { useNavigate } from "react-router-dom";
import EditCodeMirror from "../component/Blog/EditCodeMirror";


export default function Posting() {
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [subTitle, setSubTitle] = useState<string>("");
    const [formData, setFormData] = useState(new FormData);
    const [filesInfo, setFilesInfo] = useState<Array<Array<string | number>>>([]);
    const [err, setErr] = useState(false);
    const [imgborder, setimgBorder] = useState({});
    const [editborder, setEditBorder] = useState({});
    const login_query = useGetCheckQuery({});
    const navigate = useNavigate();

    function titleHandler(e: any) {
        setTitle(e.target.value);
        return;
    }

    function subTtileHandler(e: any) {
        setSubTitle(e.target.value);
        return;
    }

    const editOnChange = useCallback((value: string, viewUpdate: any) => {
        setText(value);
    }, []);

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
        else if (!title) setErr(true);
        else if (!text) setEditBorder({ border: 1, borderColor: 'error.main'});

        if (title && text && formData.has("file")) {
            formData.delete("feature_title"); formData.delete("sub_title"); formData.delete("content");
            formData.append("feature_title", title);
            formData.append("sub_title", subTitle);
            formData.append("content", text);
            try {
                await PostAPI.writeSubmit(formData);
                navigate(`${process.env.REACT_APP_ROOT2}`, { replace: true });
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <>
            {login_query.error && <NoAuth />}
            {!login_query.isLoading && !login_query.error &&
                <Container maxWidth={false} sx={{ maxWidth: { md: "95%" }, height: "100vh" }}>
                    <Grid container spacing={2} sx={{ height: "100%" }}>
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
                                id="title"
                                label="Title"
                                value={title}
                                onChange={titleHandler}
                                sx={{ width: { xs: "100%", lg: "100%" } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="subtitle"
                                label="subtitle to show"
                                multiline
                                rows={3}
                                onChange={subTtileHandler}
                                sx={{ width: { xs: "100%", lg: "100%" } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{}}>
                            <Box sx={{ ...editborder }}>
                                <EditCodeMirror text={text} sample_txt={sample_txt} onChange={editOnChange} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} zeroMinWidth sx={{}}>
                            <Box sx={{ height: "100vh", overflow: "auto" }}>
                                {text ? <ReactMd text={text} /> : <ReactMd text={sample_txt} />}
                            </Box>
                        </Grid>
                    </Grid>
                </Container >
            }
        </>
    )
}