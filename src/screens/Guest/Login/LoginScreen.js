import {
    View, 
    Text, 
    TextInput, 
    Pressable,     
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, 
    ActivityIndicator,
    StyleSheet,
    StatusBar,
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { MotiView } from 'moti';
import useLoginScreenLogic from './useLoginScreenLogic';

const LoginScreen = ({navigation}) => {
    const {
        login,
        setLogin, 
        loginErrors, 
        isLoading, 
        logUserIn,
    } = useLoginScreenLogic();

    return (
        <>
            <StatusBar barStyle='light-content' />
            <KeyboardAvoidingView style={{ flex: 1 }} enabled={true} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        {/* Back Button */}
                        <Pressable onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
                        </Pressable>

                        {/* Title */}
                        <View style={styles.titleContainer}>
                            <MotiView
                                from={{
                                    translateY: 500
                                }}
                                animate={{
                                    translateY: 0
                                }}
                                transition={{
                                    type: 'timing',
                                    duration: 600,
                                }}
                            >
                                <Text style={styles.title}>Login</Text>
                            </MotiView>
                        </View>

                        {/* Create An Account */}
                        <MotiView 
                            from={{
                                translateX: -500
                            }}
                            animate={{
                                translateX: 0
                            }}
                            transition={{
                                delay: 800,
                                type: 'timing',
                                duration: 300,
                            }}
                            style={styles.loginContainer}
                        >
                            {/* Username */}
                            <View style={styles.loginTextInputContainer}>
                                <TextInput 
                                    style={styles.loginTextInput} 
                                    placeholder='Username'
                                    placeholderTextColor={'#1F1E1E'}
                                    selectionColor='#1F1E1E'
                                    value={login.username}
                                    onChangeText={text => setLogin({ ...login, username: text })}
                                />

                                {/* Username Errors */}
                                {loginErrors.username ? <Text style={styles.loginError}><Ionicons name="alert-circle-outline" size={18} />{loginErrors.username}</Text> : null}
                            </View>

                            {/* Password */}
                            <View style={styles.loginTextInputContainer}>
                                <TextInput 
                                    style={styles.loginTextInput} 
                                    placeholder='Password'
                                    placeholderTextColor={'#1F1E1E'}
                                    selectionColor='#1F1E1E'
                                    value={login.password}
                                    onChangeText={text => setLogin({ ...login, password: text })}
                                    secureTextEntry={true}
                                />
                                
                                {/* Password Errors */}
                                {loginErrors.password ? <Text style={styles.loginError}><Ionicons name="alert-circle-outline" size={18} />{loginErrors.password}</Text> : null}
                            </View>

                            {/* Login Button */}
                            <Pressable disabled={isLoading} onPress={() => logUserIn()} style={styles.loginButton}>
                                {!isLoading ? <Text style={styles.loginButtonText}>Login</Text> : <ActivityIndicator style={styles.loginButtonText} size='small' color='#F22E66' />}
                            </Pressable>
                        </MotiView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    backButton: {
        marginTop: 0,
        marginLeft: 25,
        width: '100%',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: "#F22E66",
    },
    titleContainer: {
        marginTop: -90,
        overflow: 'hidden',
    },
    title: {
      fontFamily: 'Mohave_VariableFont_wght', 
      fontSize: 40,
      color: '#FFFFFF',
    },
    loginContainer: {
        width: '100%',
    },
    loginTextInputContainer: {
        marginVertical: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
    },
    loginTextInput: {
        paddingLeft: 10,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        fontFamily: 'Mohave_VariableFont_wght',
    },
    loginError: {
        marginTop: 10,
        marginLeft: 5,
        fontFamily: 'Mohave_VariableFont_wght',
        fontStyle: 'italic',
        color: '#FFFFFF',
    },
    loginButton: {
        marginVertical: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 10,
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    loginButtonText: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        color: '#1F1E1E',
        fontFamily: 'Mohave_VariableFont_wght', 
        fontSize: 16,
        textAlign: 'center',
    }
});

export default LoginScreen;