import {useState, useMemo, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {UserContext} from '../../helpers/contexts/UserContext';

import * as SecureStore from 'expo-secure-store';

import GuessNavigationStack from '../../navigation/GuestNavigation';
import UserNavigationStack from '../../navigation/UserNavigation';
import { SuccessContext } from '../../helpers/contexts/SuccessContext';
import { ErrorContext } from '../../helpers/contexts/ErrorContext';

const Screen = () => {
    //User
    const [user, setUser] = useState(null);
    const userValues = useMemo(() => ({user, setUser}), [user, setUser]);

    //Success
    const [success, setSuccess] = useState('');
    const successValues = useMemo(() => ({success, setSuccess}), [success, setSuccess]);

    //Error
    const [error, setError] = useState('');
    const errorValues = useMemo(() => ({error, setError}), [error, setError]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(prev => !prev);
        SecureStore.getItemAsync('user')
            .then(res => {
                if (res === null) return;
                const data = JSON.parse(res);
                setUser(data);
            })
        setIsLoading(prev => !prev);
    }, []);

    return (
        <>
            {!isLoading ? (
                <UserContext.Provider value={userValues}>
                    <SuccessContext.Provider value={successValues}>
                        <ErrorContext.Provider value={errorValues}>
                            {user === null ? (
                                <GuessNavigationStack />
                            ) : (
                                <UserNavigationStack />
                            )}
                        </ErrorContext.Provider>
                    </SuccessContext.Provider>
                </UserContext.Provider>
            ) : (
                <View style={styles.loadingContainer}></View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
});

export default Screen;