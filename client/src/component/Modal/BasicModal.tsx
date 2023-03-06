import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { BasicModalProps } from '../../interface/modal.interface';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign:"center",
};

export default function BasicModal(props: BasicModalProps) {
    const { open, setOpen, yesHandler, noHandler, text } = props;
    const handleClose = () => setOpen(false);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {text}
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {text}
                    </Typography> */}
                    <ButtonGroup variant="text" color="secondary" aria-label="outlined primary button group" sx={{mt: 2}}>
                        <Button
                        onClick={yesHandler}>Yes</Button>
                        <Button
                        onClick={noHandler}>No</Button>
                    </ButtonGroup>
                </Box>
            </Modal>
        </>
    )
}