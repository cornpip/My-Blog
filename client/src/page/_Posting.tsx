import { Box, Button, Container, FilledInput, FormControl, Grid, InputAdornment, InputLabel, TextField, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ReactMd from "../component/MarkDown/Reactmd";
import MiniHead from "../component/Head/MiniHead";
import BasicTable from "../component/Table/BasicTable";
import { FileInfo, filetable } from "../constants/_table.const";


export default function Posting() {
    const [text, setText] = useState<string>("");
    const [formData, setFormData] = useState(new FormData);
    // const [filesInfo, setFilesInfo] = useState<Array<Array<string | number>>>([]);
    const [filesInfo, setFilesInfo] = useState<Array<FileInfo>>([]);


    function textHandler(e: any) {
        // console.log(e.target.value);
        setText(e.target.value);
        return;
    }

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        formData.delete("image"); //초기화
        if (files !== null) {
            // const info = [];
            const total_info: Array<FileInfo> = [];

            const fleng = files.length;
            for (let i = 0; i < fleng; i++) {
                // info.name = files[i].name;
                const info: FileInfo = { name: files[i].name, type: files[i].type, size: Math.round(files[i].size / 1024) }
                // info.push([files[i].name, files[i].type, Math.round(files[i].size / 1024)])
                total_info.push(info);
                formData.append("image", files[i]);
            }
            // setFilesInfo(info);
            setFilesInfo(total_info);
        }
        // console.log(e.target.files);
        console.log(formData.getAll("image"));
    }

    return (
        <Container maxWidth={false} sx={{ maxWidth: { md: "95%" } }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MiniHead />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        color="secondary"
                        variant='contained'
                        component="label"
                        sx={{}}
                    >
                        Feature image upload
                        <input hidden multiple type="file" onChange={(e) => inputHandler(e)} />
                    </Button>
                    <Box sx={{ width: { xs: "100%", lg: "80%" } }}>
                        <BasicTable headrows={filetable} rows={filesInfo} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="filled-required"
                        label="Title"
                        variant="filled"
                        sx={{ width: { xs: "100%", lg: "80%" } }}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{}}>
                    <TextField
                        id="outlined-multiline-flexible"
                        variant="filled"
                        fullWidth
                        // label="Multiline"
                        multiline
                        value={text}
                        onChange={textHandler}
                    />
                </Grid>
                <Grid item xs={12} md={6} zeroMinWidth sx={{}}>
                    <ReactMd text={text} />
                </Grid>
            </Grid>
        </Container >
    )
}