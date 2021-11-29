import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from 'react-redux';

function FeedbacksMultiSelectMenu(props)
{
    const dispatch = useDispatch();
    const selectedFeedbackIds = useSelector(({ feedbackApp }) => feedbackApp.feedback.selectedFeedbackIds);

    const [anchorEl, setAnchorEl] = useState(null);

    function openSelectedFeedbackMenu(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function closeSelectedFeedbacksMenu()
    {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <IconButton
                className="p-0"
                aria-owns={anchorEl ? 'selectedFeedbacksMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedFeedbackMenu}
            >
                <Icon>more_horiz</Icon>
            </IconButton>
            <Menu
                id="selectedFeedbacksMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeSelectedFeedbacksMenu}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            dispatch(Actions.removeFeedbacks(selectedFeedbackIds));
                            closeSelectedFeedbacksMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Remove"/>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
//                            dispatch(Actions.setFeedbacksStarred(selectedFeedbackIds));
                            closeSelectedFeedbacksMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>star</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Starred"/>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
//                            dispatch(Actions.setFeedbacksUnstarred(selectedFeedbackIds));
                            closeSelectedFeedbacksMenu();
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

export default FeedbacksMultiSelectMenu;

