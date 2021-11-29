import React, {useEffect, useRef, useState} from 'react';
import {Button, Divider, Typography, InputAdornment, Icon, Link} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';

function SSOLoginTab(props)
{
    const dispatch = useDispatch();
    const login = useSelector(({auth}) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if ( login.error && (login.error.email || login.error.password) )
        {
            formRef.current.updateInputsWithError({
                ...login.error
            });
        }
    }, [login.error]);

    const handleLoginClick = () => {
        window.ref = window.open('/','win1')
        console.log(window.ref)
        window.ref.addEventListener('load', function (event) {
            console.log(event);
            //                          alert('stop: ' + event.url);
            if (event.url.indexOf('LoginSuccess')>=0){
            }
        });
    }

 //   alert(window.location.hash)
   
    return (
        <div className="w-full">
            <div className="flex flex-col items-center justify-center pt-32">
                <Link className="font-medium" href="https://localhost:44359/Login" >Go to SSO</Link>
							
            </div>
        </div>
    );
}

export default SSOLoginTab;
