import React from 'react';
import {AppBar, Hidden, Toolbar} from '@material-ui/core';
import {makeStyles, ThemeProvider} from '@material-ui/styles';
import {FuseSearch, FuseShortcuts} from '@fuse';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import ChatPanelToggleButton from 'app/fuse-layouts/shared-components/chatPanel/ChatPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import {useSelector} from 'react-redux';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';

const useStyles = makeStyles(theme => ({
    separator: {
        width          : 1,
        height         : 64,
        backgroundColor: theme.palette.divider
    },
    reactlogo1: {
        marginLeft:'10px'
    }
}));

function ToolbarLayout1(props)
{
    const config = useSelector(({fuse}) => fuse.settings.current.layout.config);
    const toolbarTheme = useSelector(({fuse}) => fuse.settings.toolbarTheme);

    const classes = useStyles(props);

    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="default" style={{backgroundColor: toolbarTheme.palette.background.default}}>
                <Toolbar className="p-0">

                    {config.navbar.display && config.navbar.position === 'left' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0"/>
                            <div className={classes.separator}/>
                        </Hidden>
                    )}

                    <div className="flex flex-1">
                        <Hidden mdDown>
                            {config.navbar.folded}
                        {(config.navbar.folded) && (<img
                            className={classes.reactlogo1}
                                src="assets/images/logos/Konnect Logo.png"
                            alt="react"
                            width="110"
                        />)}
                            <FuseShortcuts className="px-16"/>
                        </Hidden>
                    </div>

                    <div className="flex">

                        <UserMenu/>

                        <div className={classes.separator}/>

                        <FuseSearch/>

                        {/* <Hidden lgUp>

                            <div className={classes.separator}/>

                            <ChatPanelToggleButton/>
                        </Hidden> */}

                        <div className={classes.separator}/>

                        {/* <LanguageSwitcher/> */}

                        {/* <div className={classes.separator}/> */}

                        {/* <QuickPanelToggleButton/> */}
                    </div>

                    {config.navbar.display && config.navbar.position === 'right' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton/>
                        </Hidden>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default ToolbarLayout1;
