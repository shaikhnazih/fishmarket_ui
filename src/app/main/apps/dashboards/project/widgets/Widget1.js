import React, {useState} from 'react';
import {Icon, Typography, Select, Paper, IconButton} from '@material-ui/core';

function Widget1(props)
{
    // const [currentRange, setCurrentRange] = useState(props.widget.currentRange);

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
                    className="text-72 leading-none text-red">{props.widget.primaryCount}</Typography>
                <Typography className="text-16" color="textSecondary">{props.widget.primaryLabel}</Typography>
            </div>
            <div className="flex items-center px-16 h-52 border-t-1">
                <Typography className="text-15 flex w-full" color="textSecondary">
                    <span className="truncate">{props.widget.secondaryCount}</span>
                    :
                    <b className="px-8">{props.widget.secondaryLabel}</b>
                </Typography>
            </div>
        </Paper>
    );
}

export default React.memo(Widget1);
