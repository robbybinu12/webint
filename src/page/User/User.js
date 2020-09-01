import React, { Fragment, useState, useEffect } from 'react';
import AppBarComponent from '../../component/AppBar/AppBarComponent';
import axios from 'axios';
import Skeleton from "@material-ui/lab/Skeleton";
import Link from "@material-ui/core/Link";

import { Button, Divider, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography, CardHeader, Menu, MenuItem, Fab, Hidden, Tooltip, } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import { showDetail } from "./Container/DetailUser";

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '5f4e87875e2cb0570e9b78be';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '350px',
        margin: '20px'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    paper: {
        padding: theme.spacing(.5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    description: {
        fontSize: '12px',
        color: theme.palette.text.secondary,
    },
    colorStart: {
        color: '#4CAF50'
    },
    colorEnd: {
        color: '#F44336'
    },


    // appBar

    demo1: {
        backgroundColor: theme.palette.background.paper,
        marginBottom: 10,
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },

}));

function ListUser(props) {

    const classes = useStyles();
    const { dataUser, showDetail } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={dataUser.picture}
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Typography gutterBottom variant="h6" component="h2">
                            {dataUser.title}. {dataUser.firstName} {dataUser.lastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <CardHeader
                            action={
                                <Fragment>

                                    <MoreVert onClick={handleClick} />

                                    <Menu
                                        id="long-menu"
                                        elevation={0}
                                        anchorEl={anchorEl}
                                        getContentAnchorEl={null}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <Button color="primary" onClick={showDetail}>
                                            Detail
                                        </Button>

                                    </Menu>
                                </Fragment>
                            }
                        >
                        </CardHeader>
                    </Grid>
                </Grid>
                <Typography className={classes.description}>
                    {dataUser.email}
                </Typography>
            </CardContent>
        </Card>
    )
}

function User() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/user`, { headers: { 'app-id': APP_ID } })
            .then(({ data }) => setData(data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // console.log(data);
    const handleDetailMenu = (value) => {
        showDetail(
            "Detail User",
            value,
        )
    };

    return (
        <AppBarComponent>


            <Grid item xs={12} container justify="center">

                <Fragment>

                    {data.map((value, key) => {
                        return (
                            <ListUser
                                key={key}
                                dataUser={value}
                                showDetail={() => handleDetailMenu(value)}
                            />
                        )
                    })}
                </Fragment>
            </Grid>

        </AppBarComponent>
    )
}

export default User;