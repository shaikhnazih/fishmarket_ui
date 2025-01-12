import React from 'react';
import {Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, NavLinkAdapter} from '@fuse';
import {useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            marginRight: 16
        }
    }
}));

function GiftsSidebarContent(props)
{
    const user = useSelector(({ giftsApp }) => giftsApp.user);

    const classes = useStyles(props);

    return (
        <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
            <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                <Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
                    <div className="p-24 flex items-center">
                        <Avatar alt={user.name} src={user.avatar}/>
                        <Typography className="mx-12">{user.name}</Typography>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem
                            button
                            component={NavLinkAdapter}
                            to={'/apps/gifts/all'}
                            activeClassName="active"
                            className={classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">people</Icon>
                            <ListItemText className="truncate" primary="All gifts" disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLinkAdapter}
                            to={'/apps/gifts/frequent'}
                            activeClassName="active"
                            className={classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">restore</Icon>
                            <ListItemText className="truncate" primary="Frequently gifted" disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLinkAdapter}
                            to={'/apps/gifts/starred'}
                            activeClassName="active"
                            className={classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">star</Icon>
                            <ListItemText className="truncate" primary="Starred gifts" disableTypography={true}/>
                        </ListItem>
                    </List>
                </Paper>
            </FuseAnimate>
        </div>
    );
}

export default GiftsSidebarContent;
