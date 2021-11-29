import React, { useState } from 'react';
import { Icon, Typography, Select, Paper, IconButton } from '@material-ui/core';

function ReportHeaderFieldWidget(props) {
    // const [currentRange, setCurrentRange] = useState(props.widget.currentRange);

    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-4 pt-4">

            </div>
            <div className="text-center pt-12 pb-28">
                <Typography
                    className="text-72 leading-none text-red">{props.value}</Typography>
                <Typography className="text-16" color="textSecondary">{props.label}</Typography>
            </div>

        </Paper>
    );
}

export default React.memo(ReportHeaderFieldWidget);
