import { Box, Container, Grid, TextField } from "@mui/material";
import { useState, useEffect, useCallback, KeyboardEvent } from "react";
import ReactMd from "../component/MarkDown/Reactmd";
import MiniHead from "../component/Head/MiniHead";
import { sample_txt } from "../constants/sample.const";
import { useGetCheckQuery } from "../api/api";
import NoAuth from "./NoAuth";
import PostAPI from "../api/post";
import { useNavigate } from "react-router-dom";
import EditCodeMirror from "../component/Blog/EditCodeMirror";
import SubmitBar from "../component/BottomBar/SubmitBar";

export default function Posting() {
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [subTitle, setSubTitle] = useState<string>("");
    const [formData, setFormData] = useState(new FormData);
    const [filesInfo, setFilesInfo] = useState<Array<Array<string | number>>>([]);
    const [err, setErr] = useState(false);
    const [imgborder, setimgBorder] = useState({});
    const [editborder, setEditBorder] = useState({});
    const [tags, setTags] = useState<Array<string>>([]);
    const [tag, setTag] = useState<string>("");
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
        else if (!text) setEditBorder({ border: 1, borderColor: 'error.main' });

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

    function tagsHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTag(e.target.value);
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setTags(pre_tags => {
                let r_tag = tag.trim();
                if (!pre_tags.includes(r_tag)) pre_tags.push(r_tag);
                setTag("");
                return pre_tags;
            });
        }
        if (e.key == "Space") {
            setTag(v => v + " ");
        }
    };

    return (
        <>
            {login_query.error && <NoAuth />}
            {!login_query.isLoading && !login_query.error &&
                <Container maxWidth={false} sx={{ maxWidth: { md: "95%" }, height: "100vh" }}>
                    <Grid container spacing={2} sx={{ height: "100%" }}>
                        <Grid item xs={12}>
                            <MiniHead />
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
                        <Grid item xs={12} width={"100%"}>
                            <Box sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                height: "100%",
                                alignItems: "center"
                            }}>
                                {tags.map((v) => {
                                    return (
                                        <Box key={v} sx={{ padding: 2, backgroundColor: "rgb(233, 233, 233)", margin: 1, borderRadius: "16px" }}>{v}</Box>
                                    )
                                })}
                                <input type="text" placeholder={"태그를 입력하세요."} value={tag} style={{
                                    border: 0,
                                    borderRadius: "16px",
                                    backgroundColor: "rgb(233, 233, 233)",
                                    padding: "16px",
                                    boxSizing: "border-box",
                                    whiteSpace: "normal",
                                }}
                                    onChange={tagsHandler}
                                    onKeyDown={handleKeyPress}>
                                </input>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{}}>
                            <Box sx={{
                                ...editborder,
                                paddingBottom: "8vh"
                            }}>
                                <EditCodeMirror text={text} sample_txt={sample_txt} onChange={editOnChange} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} zeroMinWidth sx={{}}>
                            <Box sx={{
                                paddingBottom: "8vh",
                            }}>
                                <Box sx={{
                                    height: "92vh", overflow: "auto",
                                }}>
                                    {text ? <ReactMd text={text} /> : <ReactMd text={sample_txt} />}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <SubmitBar />
                </Container >
            }
        </>
    )
}