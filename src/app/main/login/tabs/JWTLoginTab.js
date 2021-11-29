import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Typography, InputAdornment, Icon, Link } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Constants from 'app/constants'

function JWTLoginTab(props) {
    const dispatch = useDispatch();
    const login = useSelector(({ auth }) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    // const [noOfAttempts, setNoOfAttempts] = useState(0);
    useEffect(() => {
        console.log(login);
        if (login.error && (login.error.email || login.error.password)) {
            formRef.current.updateInputsWithError({
                ...login.error
            });
            disableButton();
        }
    }, [login.error]);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {
        dispatch(authActions.submitLogin(model));
    }

    function getCaptchaUrl() {
        return Constants.BASE_URL + "api/captcha/image?" + login.noOfAttempts;
    }
    return (
        <div className="w-full">
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
                        minLength: 1
                    }}
                    validationErrors={{
                        minLength: 'Please Enter UserName'
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
                        minLength: 1
                    }}
                    validationErrors={{
                        minLength: 'Please Enter Password'

                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />
                {/* {login.noOfAttempts >= 3 && 
                    <img src={getCaptchaUrl() } />
                }
                {login.noOfAttempts >= 3 && <TextFieldFormsy
                    className="mb-16"
                    type="password"
                    name="captcha"
                    label="Captcha"
                    value=""
                    validations={{
                        minLength: 1
                    }}
                    validationErrors={{
                        minLength: 'Please Enter Captcha'

                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />
                } */}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16 normal-case"
                    aria-label="LOG IN"
                    disabled={!isFormValid}
                    value="legacy"
                >
                    Login
                </Button>

                <div className="w-full">
                    <div className="flex flex-col items-center justify-center pt-32">
                        <Link className="font-medium" href="https://konnect.crompton.co.in/sso/login" >Crompton Single Signon</Link>
                    </div>
                </div>

            </Formsy>

        </div>
    );
}

export default JWTLoginTab;
