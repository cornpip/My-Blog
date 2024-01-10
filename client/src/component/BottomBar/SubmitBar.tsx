import { Box, Button, Slide, useScrollTrigger } from "@mui/material";
import { blue } from '@mui/material/colors';
import "../../css/SubmitBar.module.css";

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

interface SubmitProps {
    submitHandler: (e: any) => void;
}

function HideOnScroll(props: Props) {
    //자식요소가 있다면 children은 기본 prop에 담겨 넘어온다.
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });
    // console.log(trigger, children);
    return (
        <Slide appear={false} direction="up" in={trigger}>
            {children}
        </Slide>
    );
}

export default function SubmitBar(props: SubmitProps) {
    const { submitHandler } = props;
    return (
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
                    variant='contained'
                    color='success'
                    sx={{
                        m: 2,
                        backgroundColor: blue[600],
                        fontFamily: "'Nanum Gothic', sans-serif",
                    }}
                >
                    대표 이미지 추가
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
    )
}