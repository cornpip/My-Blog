import { Box, Button, Container, Grid, Slide, TextField, useScrollTrigger } from "@mui/material";
import { useState, useEffect, useCallback, KeyboardEvent, useRef } from "react";
import ReactMd from "../component/MarkDown/Reactmd";
import MiniHead from "../component/Head/MiniHead";
import { sample_txt } from "../constants/sample.const";
import { useGetCheckQuery } from "../api/api";
import NoAuth from "./NoAuth";
import PostAPI from "../api/post";
import { useNavigate } from "react-router-dom";
import EditCodeMirror from "../component/Blog/EditCodeMirror";
import Tags from "../component/Blog/Tags";
import { blue } from "@mui/material/colors";

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });
    return (
        <Slide appear={false} direction="up" in={trigger}>
            {children}
        </Slide>
    );
}

export default function Posting() {
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [subTitle, setSubTitle] = useState<string>("");
    const [formData, setFormData] = useState(new FormData);
    const [err, setErr] = useState(false);
    const [imgborder, setimgBorder] = useState({});
    const [editborder, setEditBorder] = useState({});
    const login_query = useGetCheckQuery({});
    const navigate = useNavigate();

    const titleRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

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
        if (files !== null) {
            formData.delete("image"); //초기화
            formData.append("image", files[0]);
        }
        console.log(formData.getAll("image"));
    }

    async function submitHandler(e: React.PointerEvent<HTMLButtonElement>) {
        setEditBorder({}); setErr(false);
        if (!title) {
            setErr(true);
            titleRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (!text) {
            setEditBorder({ border: 1, borderColor: 'error.main' });
            textRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

        if (title && text) {
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

    useEffect(() => {
        if (!login_query.isFetching) {
            if (login_query.error) navigate("/signin");
        }
    }, [login_query.isSuccess, login_query.isError])

    return (
        <>
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
                                ref={titleRef}
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
                            <Tags />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{}}>
                            <Box
                                ref={textRef}
                                sx={{
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
                    <HideOnScroll>
                        <Box display="flex" sx={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            // height: contents에 맞춤, markdown하고 codemirror는 넉넉하게 10vh띄어놈
                            width: "95%",
                            backgroundColor: "inherite",
                            justifyContent: 'end'
                        }}>
                            <Button
                                component="label"
                                variant='contained'
                                sx={{
                                    m: 2,
                                    backgroundColor: blue[600],
                                    fontFamily: "'Nanum Gothic', sans-serif",
                                }}
                            >
                                대표 이미지 추가(선택)
                                <input hidden type="file" onChange={(e) => inputHandler(e)} />
                            </Button>
                            <Button
                                variant='contained'
                                sx={{
                                    m: 2,
                                    backgroundColor: blue[800],
                                    fontFamily: "'Nanum Gothic', sans-serif",
                                }}
                                onClick={submitHandler}
                            >
                                글 쓰기
                            </Button>
                        </Box>
                    </HideOnScroll>
                </Container >
            }
        </>
    )
}