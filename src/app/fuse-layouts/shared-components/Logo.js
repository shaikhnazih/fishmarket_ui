import React from 'react';
import {Typography} from '@material-ui/core';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root      : {
        '& .logo-icon'                : {
            width     : 24,
            height    : 24,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        },
        '& .react-badge, & .logo-text': {
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    },
    reactBadge: {
        backgroundColor: '#121212',
        color          : '#61DAFB'
    }
}));

function Logo()
{
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex items-center")}>
            <img className="logo-icon" src="assets/images/logos/konnect-login-sm.png" alt="logo"/>
            {/* <Typography className="text-16 mx-12 font-light logo-text" color="inherit">Konnect</Typography> */}
            <div className={clsx(classes.reactBadge, "react-badge flex items-center py-4 px-8 rounded")}>
                <img
                    className="react-logo"
                    src="assets/images/logos/Konnect Logo.png"
                    alt="react"
                    width="116"
                />
                <span className="react-text text-12 mx-4">&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
        </div>
    );
}

export default Logo;
