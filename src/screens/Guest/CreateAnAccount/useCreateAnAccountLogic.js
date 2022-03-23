import {useRef, useEffect, useState, useContext} from 'react';
import {SuccessContext} from '../../../helpers/contexts/SuccessContext';
import {api} from '../../../api/config';

const useCreateAnAccountLogic = () => {
    const isMounted = useRef(false);

    const {setSuccess} = useContext(SuccessContext);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            setSuccess('');
            abortCreateAnAccount.abort();
        }
    }, [])

    const abortCreateAnAccount = new AbortController();

    const [createAccount, setCreateAccount] = useState({
        username: '',
        password: '',
    });

    const [createAccountErrors, setCreateAccountErrors] = useState({
        username: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const createAnAccount = () => {
        const errorState = {username: '', password: ''};

        //Username Validation
        if(createAccount.username === ''){
            errorState.username = 'Please enter a username.';
        }else if(createAccount.username.length < 3){
            errorState.username = 'Your username can\'t be less than 3 characters.';
        }else if(createAccount.username.length > 25){
            errorState.username = 'Your username can\'t be more than 25 characters.';
        }else{
            errorState.username = '';
        }

        //Password Validation
        if(createAccount.password === ''){
            errorState.password = 'Please enter a password.';
        }else if(createAccount.password.length < 8){
            errorState.password = 'Your password can\'t be less than 8 characters.';
        }else if(createAccount.password.length > 255){
            errorState.password = 'Your password can\'t be more than 255 characters.';
        }else{
            errorState.password = '';
        }

        if(isMounted) setCreateAccountErrors({...errorState});

        if(errorState.username === '' && errorState.password === ''){
            if(isMounted) setIsLoading(prev => !prev);

            const data = {
                username: createAccount.username,
                password: createAccount.password,
            }

            api().post('/user/create_an_account', data, {signal: abortCreateAnAccount.signal})
            .then(res => {
                console.log(res.data);

                if(isMounted) setIsLoading(prev => !prev);

                if(isMounted) setSuccess('Your account has been successfully created!');

                if(isMounted) setTimeout(() => {
                    setSuccess('');
                }, 2500);
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

                        if (isMounted.current) setCreateAccountErrors({ ...errorState });
                    }
                }else{
                    //If the username has already been taken
                    if (response.data.username) {
                        errorState.username = response.data.username;
                    }

                    if (isMounted.current) setCreateAccountErrors({ ...errorState });
                }
            })
        }
    }

    return {createAccount, setCreateAccount, createAccountErrors, isLoading, createAnAccount};
}

export default useCreateAnAccountLogic;