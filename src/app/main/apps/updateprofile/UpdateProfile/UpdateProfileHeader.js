import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';

function UpdateProfileHeader(props) {
    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32">notes</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">Update Profile Request</Typography>
                </FuseAnimate>
            </div>
        </div>
    );
}
export default UpdateProfileHeader;