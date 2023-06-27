import { Box, Typography } from "@mui/material"
import { useState, KeyboardEvent } from "react";
import "../../css/Tags.module.css";

export default function Tags() {
    const [tags, setTags] = useState<Array<string>>([]);
    const [tag, setTag] = useState<string>("");

    function removeHandler(v: string) {
        setTags(pre_tags => pre_tags.filter((e) => e !== v));
    }

    function tagsHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTag(e.target.value);
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setTags(pre_tags => {
                let r_tag = tag.trim();
                if (r_tag && !pre_tags.includes(r_tag)) pre_tags.push(r_tag);
                setTag("");
                return pre_tags;
            });
        }
        if (e.key == "Space") {
            setTag(v => v + " ");
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            height: "100%",
            alignItems: "center"
        }}>
            {tags.map((v) => {
                return (
                    <Box key={v} sx={{
                        borderRadius: 2,
                        padding: 1.5,
                        mx: 1,
                        marginBottom: 1,
                        backgroundColor: "#e3f2fd",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "#9ea9b1",
                        }
                    }}
                        onClick={() => removeHandler(v)}
                    >
                        <Typography sx={{
                            fontFamily: "'Noto Sans KR', sans-serif",
                        }}>{v}</Typography>
                    </Box>
                )
            })}
            <Box
                component="input"
                type="text"
                placeholder="태그를 입력하세요."
                value={tag}
                sx={{
                    border: 0,
                    borderRadius: 2,
                    padding: 1.5,
                    marginBottom: 1,
                    backgroundColor: "#e8f4fd",
                    boxSizing: "border-box",
                    whiteSpace: "normal",
                    fontSize: "1rem",
                    fontFamily: "'Noto Sans KR', sans-serif",
                    "&::placeholder" : {
                        // color: "white",
                    }
                }}
                onChange={tagsHandler}
                onKeyDown={handleKeyPress}
            />
        </Box>
    )
}