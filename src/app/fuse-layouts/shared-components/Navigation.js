import React from 'react';
import { FuseNavigation } from '@fuse';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

function Navigation(props) {
    const navigation = useSelector(({ fuse }) => fuse.navigation);
    const user = useSelector(({ auth }) => auth.user.data);
    var filterredNav = navigation;
    if (user.roleNames && user.roleNames.toLowerCase().indexOf('asm') >= 0) {
        navigation[0].children[1].type = 'group-hidden'
        navigation[0].children[2].type = 'group-hidden'
        navigation[0].children[3].type = 'group-hidden'
        navigation[0].children[4].type = 'group-hidden'
        navigation[0].children[5].type = 'group-hidden'
        navigation[0].children[6].type = 'group-hidden'
        navigation[0].children[7].type = 'group-hidden'
    }

    /*    if (user.roleNames.toLowerCase().indexOf('admin') < 0
            && user.roleNames.toLowerCase().indexOf('houser') 
            && user.roleNames.toLowerCase().indexOf('nexusexecutive') 
        ) {
            navigation[0].children[1].type = 'group-hidden'
            navigation[0].children[2].type = 'group-hidden'
            navigation[0].children[3].type = 'group-hidden'
            navigation[0].children[4].type = 'group-hidden'
            navigation[0].children[5].type = 'group-hidden'
            navigation[0].children[6].type = 'group-hidden'
            navigation[0].children[7].type = 'group-hidden'
            console.log('nav:' , navigation[0].children[0], user);
    //        filterredNav = navigation.
        }
    */
    if (user.roleNames && user.roleNames.toLowerCase().indexOf('admin') < 0) {
        navigation[0].children[7].type = 'group-hidden' //user option
    }


    return (
        <FuseNavigation className={clsx("navigation", props.className)} navigation={navigation} layout={props.layout} dense={props.dense} active={props.active} />
    );
}

Navigation.defaultProps = {
    layout: "vertical"
};

export default Navigation;
