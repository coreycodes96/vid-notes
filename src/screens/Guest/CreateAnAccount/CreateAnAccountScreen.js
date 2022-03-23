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
import useCreateAnAccountLogic from './useCreateAnAccountLogic';

const CreateAnAccountScreen = ({navigation}) => {
    const {
        createAccount,
        setCreateAccount,
        createAccountErrors, 
        isLoading, 
        createAnAccount,
    } = useCreateAnAccountLogic();

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
                                <Text style={styles.title}>Create An Account</Text>
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
                            style={styles.createAccountContainer}
                        >
                            {/* Username */}
                            <View style={styles.createAnAccountTextInputContainer}>
                                <TextInput 
                                    style={styles.createAnAccountTextInput} 
                                    placeholder='Username'
                                    placeholderTextColor={'#1F1E1E'}
                                    selectionColor='#1F1E1E'
                                    value={createAccount.username}
                                    onChangeText={text => setCreateAccount({ ...createAccount, username: text })}
                                />

                                {/* Username Errors */}
                                {createAccountErrors.username ? <Text style={styles.createAnAccountError}><Ionicons name="alert-circle-outline" size={18} />{createAccountErrors.username}</Text> : null}
                            </View>

                            {/* Password */}
                            <View style={styles.createAnAccountTextInputContainer}>
                                <TextInput 
                                    style={styles.createAnAccountTextInput} 
                                    placeholder='Password'
                                    placeholderTextColor={'#1F1E1E'}
                                    selectionColor='#1F1E1E'
                                    value={createAccount.password}
                                    onChangeText={text => setCreateAccount({ ...createAccount, password: text })}
                                    secureTextEntry={true}
                                />
                                
                                {/* Password Errors */}
                                {createAccountErrors.password ? <Text style={styles.createAnAccountError}><Ionicons name="alert-circle-outline" size={18} />{createAccountErrors.password}</Text> : null}
                            </View>

                            {/* Create An Account Button */}
                            <Pressable disabled={isLoading} onPress={() => createAnAccount()} style={styles.createAnAccountButton}>
                                {!isLoading ? <Text style={styles.createAnAccountButtonText}>Create Account</Text> : <ActivityIndicator style={styles.createAnAccountButtonText} size='small' color='#F22E66' />}
                            </Pressable>
                        </MotiView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    )
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
    createAccountContainer: {
        width: '100%',
    },
    createAnAccountTextInputContainer: {
        marginVertical: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
    },
    createAnAccountTextInput: {
        paddingLeft: 10,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        fontFamily: 'Mohave_VariableFont_wght',
    },
    createAnAccountError: {
        marginTop: 10,
        marginLeft: 5,
        fontFamily: 'Mohave_VariableFont_wght',
        fontStyle: 'italic',
        color: '#FFFFFF',
    },
    createAnAccountButton: {
        marginVertical: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 10,
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    createAnAccountButtonText: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        color: '#1F1E1E',
        fontFamily: 'Mohave_VariableFont_wght', 
        fontSize: 16,
        textAlign: 'center',
    }
});

export default CreateAnAccountScreen;