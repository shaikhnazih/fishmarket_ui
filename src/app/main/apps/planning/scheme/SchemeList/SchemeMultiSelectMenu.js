import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function SchemeMultiSelectMenu(props)
{
    const dispatch = useDispatch();
    const selectedSchemeIds = useSelector(({ schemeApp }) => schemeApp.schemes.selectedSchemeIds);

    const [anchorEl, setAnchorEl] = useState(null);

    function openSelectedSchemeMenu(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function closeSelectedSchemeMenu()
    {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <IconButton
                className="p-0"
                aria-owns={anchorEl ? 'selectedSchemeMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedSchemeMenu}
            >
                <Icon>more_horiz</Icon>
            </IconButton>
            <Menu
                id="selectedSchemesMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeSelectedSchemeMenu}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            dispatch(Actions.removeScheme(selectedSchemeIds));
                            closeSelectedSchemeMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Remove"/>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
//                            dispatch(Actions.setSchemeStarred(selectedSchemeIds));
                            closeSelectedSchemeMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>star</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Starred"/>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
//                            dispatch(Actions.setSchemeUnstarred(selectedSchemeIds));
                            closeSelectedSchemeMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>star_border</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Unstarred"/>
                    </MenuItem>
                </MenuList>
            </Menu>
        </React.Fragment>
    );
}

export default SchemeMultiSelectMenu;

