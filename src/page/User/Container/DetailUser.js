import React, { useState, useEffect } from "react";
import { Dialog, GridList, GridListTile, DialogContent, DialogActions, DialogContentText, DialogTitle, Grid, Typography, } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { confirmable, createConfirmation } from "react-confirm";
import axios from 'axios';
import moment from 'moment';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '5f4e87875e2cb0570e9b78be';

const useStyles = makeStyles((theme) => ({
    gridList: {
        width: 800,
        height: 450,
    },
    gridContent: {
        marginleft: "20px",
    }
}));

function DetailDialog(props) {
    const classes = useStyles();
    const { title, value } = props;
    const [open, setOpen] = React.useState(true);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    console.log(value.id);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const id = value.id

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/user/${id}`, { headers: { 'app-id': APP_ID } })
            .then(({ data }) => setData(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    console.log(data);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <GridList cellHeight={160} className={classes.gridList} cols={3}>

                            <GridListTile >
                                <img src={value.picture} alt="picture" />
                            </GridListTile>

                            <GridListTile className={classes.gridContent}>
                                <DialogContentText>
                                    Email: {value.email}
                                </DialogContentText>
                                <DialogContentText>
                                    First Name: {value.firstName}
                                </DialogContentText>
                                <DialogContentText>
                                    Last Name: {value.lastName}
                                </DialogContentText>
                                <DialogContentText>
                                    Gender: {value.gender}
                                </DialogContentText>
                                <DialogContentText>
                                    Birthday: {moment(value.dateOfBirth).format('DD/MM/YYYY') || '-'}
                                </DialogContentText>
                            </GridListTile>

                        </GridList>
                    </DialogContentText>



                </DialogContent>
            </Dialog>
        </div >
    );
}
export function showDetail(
    title,
    value
) {
    return createConfirmation(confirmable(DetailDialog))({
        title,
        value
    });
}
