import React, {Dispatch, SetStateAction} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Card, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme : any) => ({
    root: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        outline: "none",
        boxShadow: theme.shadows[20],
        width: "50%",
        maxHeight: "90%",
        overflowY: "auto",
        maxWidth: "100%",
    },
    container: {
        padding:20,
        textAlign:"center"
    },
    button:{
        marginRight: 20
    },
    containerButton: {
        paddingTop:20
    }

}));

type PropsOwnerModal = {
    isOpen : boolean,
    handleConfirm: () => void
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ConfirmModal(props : PropsOwnerModal) {
    const classes = useStyles();
    const {isOpen, handleConfirm, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Card className={classes.root}>
                    <div className={classes.container}>
                        <Typography variant="h2">
                            Etes-vous sur de vouloir supprimer cet élément ?
                        </Typography>
                        <div className={classes.containerButton}>
                        <Button variant="outlined" onClick={handleClose} className={classes.button}>NON</Button>
                        <Button variant="contained" color="secondary" onClick={handleConfirm}>OUI</Button>
                        </div>
                    </div>
                </Card>

            </Modal>
        </div>
    );
}
