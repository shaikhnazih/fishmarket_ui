import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function GiftsMultiSelectMenu(props)
{
    const dispatch = useDispatch();
    const selectedGiftIds = useSelector(({ giftsApp }) => giftsApp.gifts.selectedGiftIds);

    const [anchorEl, setAnchorEl] = useState(null);

    function openSelectedGiftMenu(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function closeSelectedGiftsMenu()
    {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <IconButton
                className="p-0"
                aria-owns={anchorEl ? 'selectedGiftsMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedGiftMenu}
            >
                <Icon>more_horiz</Icon>
            </IconButton>
            <Menu
                id="selectedGiftsMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeSelectedGiftsMenu}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            dispatch(Actions.removeGifts(selectedGiftIds));
                            closeSelectedGiftsMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Remove"/>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
//                            dispatch(Actions.setGiftsStarred(selectedGiftIds));
                            closeSelectedGiftsMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>star</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Starred"/>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
//                            dispatch(Actions.setGiftsUnstarred(selectedGiftIds));
                            closeSelectedGiftsMenu();
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

export default GiftsMultiSelectMenu;

