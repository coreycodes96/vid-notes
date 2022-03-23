import {useRef, useEffect, useState, useContext} from 'react';
import {api} from '../../../api/config';
import {UserContext} from '../../../helpers/contexts/UserContext';
import { createStore } from '../../../helpers/secure_store';

const useLoginScreenLogic = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            abortLogin.abort();
        }
    }, [])

    const abortLogin = new AbortController();

    const {setUser} = useContext(UserContext);

    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const [loginErrors, setLoginErrors] = useState({
        username: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const logUserIn = async () => {
        const errorState = {username: '', password: ''};

        //Username Validation
        if(login.username === ''){
            errorState.username = 'Please enter your username.';
        }else{
            errorState.username = '';
        }

        //Password Validation
        if(login.password === ''){
            errorState.password = 'Please enter your password.';
        }else{
            errorState.password = '';
        }

        if(isMounted) setLoginErrors({...errorState});

        if(errorState.username === '' && errorState.password === ''){
            if(isMounted) setIsLoading(prev => !prev);

            const data = {
                username: login.username,
                password: login.password,
            };

            api().post('/user/login', data, {signal: abortLogin.signal})
            .then(res => {
                if (isMounted.current) setIsLoading(prev => !prev);
                if (isMounted.current) setLogin({ username: '', password: '' });
                if (isMounted.current) setLoginErrors({ username: '', password: '' });

                if (isMounted.current) createStore('user', JSON.stringify(res.data));
                if (isMounted.current) setUser({ ...res.data });
            })
            .catch(error => {
                if(isMounted) setIsLoading(prev => !prev);

                const { response } = error;

                if (response.data.validation) {
                    for (const err of response.data.validation) {
                        const name = err.context.key;

                        //Username Errors
                        if (name === 'username') {
                            errorState.username = err.message;
                        }

                        //Password Errors
                        if(name === 'password') {
                            errorState.password = err.message;
                        }

                        if (isMounted.current) setLoginErrors({ ...errorState });
                    }
                }else{
                    //If username does not exist
                    if (response.data.username) {
                        errorState.username = response.data.username;
                    }

                    //If password does not match
                    if (response.data.password) {
                        errorState.password = response.data.password;
                    }

                    if (isMounted.current) setLoginErrors({ ...errorState });
                }
            })
        }
    }

    return {login, setLogin, loginErrors, isLoading, logUserIn};
}

export default useLoginScreenLogic;