import React from 'react';
import {Icon, Typography, Paper, IconButton} from '@material-ui/core';

function Widget4(props)
{
    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-4 pt-4">
                <Typography className="text-16 px-12">{props.widget.title}</Typography>
                <IconButton aria-label="more">
                    <Icon>more_vert</Icon>
                </IconButton>
            </div>
            <div className="text-center pt-12 pb-28">
                <Typography
                    className="text-72 leading-none text-green">{props.widget.primaryCount}</Typography>
                <Typography className="text-16" color="textSecondary">{props.widget.primaryLabel}</Typography>
            </div>
            <div className="flex items-center px-16 h-52 border-t-1">
                <Typography className="text-15 flex w-full" color="textSecondary">
                    <span className="truncate">{props.widget.secondaryLabel}</span>
                    :
                    <b className="px-8">{props.widget.secondaryCount}</b>
                </Typography>
            </div>
        </Paper>
    );
}

export default React.memo(Widget4);
