import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InfoModalProps } from '../../interface/modal.interface';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function InfoModal(props: InfoModalProps) {
    const { info_title, info_sub, open, setOpen, closeHandler } = props;
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h4" component="h2">
                            {info_title}
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {info_sub}
                        </Typography>
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={closeHandler}> OK </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}