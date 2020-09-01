import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import history from '../History/History';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: .3,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(5),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(7),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    mainName: {
        margin: "50px"
    }
}));

export default function AppBarComponent(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const { children } = props;

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit" onClick={() => {
                    history.push("/user");
                }}>
                    <Typography variant="subtitle1">
                        User
                    </Typography>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton color="inherit" onClick={() => {
                    history.push("/post");
                }}>
                    <Typography variant="subtitle1">
                        Post
                    </Typography>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton color="inherit" onClick={() => {
                    history.push("/comment");
                }}>
                    <Typography variant="subtitle1">
                        Comment
                    </Typography>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton color="inherit" onClick={() => {
                    history.push("/tag");
                }}>
                    <Typography variant="subtitle1">
                        Tag
                    </Typography>
                </IconButton>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <IconButton color="inherit" onClick={() => {
                                history.push("/");
                            }}>
                                <Badge color="secondary">
                                    <Typography variant="h6">
                                        User
                                </Typography>
                                </Badge>
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit" onClick={() => {
                            history.push("/user");
                        }}>
                            <Badge color="secondary">
                                <Typography variant="h6">
                                    User
                                </Typography>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => {
                            history.push("/post");
                        }}>
                            <Badge color="secondary">
                                <Typography variant="h6">
                                    Post
                                </Typography>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => {
                            history.push("/comment");
                        }}>
                            <Badge color="secondary">
                                <Typography variant="h6">
                                    Comment
                            </Typography>
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                history.push("/tag");
                            }}
                        >
                            <Typography variant="h6">
                                Tag
                            </Typography>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <main className={classes.mainName}>
                {children}
            </main>
        </div>
    );
}
