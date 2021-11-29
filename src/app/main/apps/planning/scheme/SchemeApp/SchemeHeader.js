import React,{useEffect, useRef, useState}  from 'react';
import {Button,Dividerm, Hidden, Icon, IconButton, Input, Paper,InputAdornment, Typography } from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
//import * as Actions from './store/actions';
import Formsy from 'formsy-react';
function SchemeHeader(props) {
    const dispatch = useDispatch();
  //  const searchText = useSelector(({feedbackCategoryApp}) => feedbackCategoryApp.feedbackCategory.searchText);
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        //dispatch(authActions.submitLogin(model));
    }

    return (
        <div className="flex items-left ">


            <div className="flex items-left ">

                <ThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            
                    <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-16"
                    type="text"
                    name="email"
                    label="Username/Email"
                    value="admin"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="password"
                    label="Password"
                    value="admin"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

               

            </Formsy>
                      
                    </FuseAnimate>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default SchemeHeader;
