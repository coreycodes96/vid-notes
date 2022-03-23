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
import {Ionicons} from '@expo/vector-icons';
import {MotiView} from 'moti';
import useCreateVideoLogic from './useCreateVideoLogic';

const CreateVideoScreen = ({navigation}) => {
    const {
        createVideo, 
        setCreateVideo, 
        createVideoErrors, 
        isLoading, 
        createAVideo,
    } = useCreateVideoLogic(navigation);

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <KeyboardAvoidingView style={{ flex: 1 }} enabled={true} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Pressable onPress={() => navigation.navigate('Videos')}>
                                <Ionicons name='arrow-back' size={24} color='#1F1E1E' />
                            </Pressable>
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>Create Video</Text>

                        {/* Create Video */}
                        <MotiView 
                            from={{
                                translateX: -500
                            }}
                            animate={{
                                translateX: 0
                            }}
                            transition={{
                                type: 'timing',
                                duration: 300,
                            }}
                            style={styles.createVideoContainer}
                        >
                            {/* Title */}
                            <View style={styles.createVideoTextInputContainer}>
                                <TextInput 
                                    style={styles.createVideoTextInput} 
                                    placeholder='Title'
                                    placeholderTextColor={'#FFFFFF'}
                                    selectionColor='#FFFFFF'
                                    value={createVideo.title}
                                    onChangeText={text => setCreateVideo({ ...createVideo, title: text })}
                                />

                                {/* Title Errors */}
                                {createVideoErrors.title ? <Text style={styles.createVideoError}><Ionicons name="alert-circle-outline" size={18} />{createVideoErrors.title}</Text> : null}
                            </View>

                            {/* Url */}
                            <View style={styles.createVideoTextInputContainer}>
                                <TextInput 
                                    style={styles.createVideoTextInput} 
                                    placeholder='Url'
                                    placeholderTextColor={'#FFFFFF'}
                                    selectionColor='#FFFFFF'
                                    value={createVideo.url}
                                    onChangeText={text => setCreateVideo({ ...createVideo, url: text })}
                                />

                                {/* Url Errors */}
                                {createVideoErrors.url ? <Text style={styles.createVideoError}><Ionicons name="alert-circle-outline" size={18} />{createVideoErrors.url}</Text> : null}
                            </View>

                            {/* Create An Account Button */}
                            <Pressable disabled={isLoading} onPress={() => createAVideo()} style={styles.createVideoButton}>
                                {!isLoading ? <Text style={styles.createVideoButtonText}>Create Video</Text> : <ActivityIndicator style={styles.createVideoButtonText} size='small' color='#FFFFFF' />}
                            </Pressable>
                        </MotiView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginTop: 50,
        paddingHorizontal: 10,
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
        marginLeft: 15,
        fontFamily: 'Mohave_VariableFont_wght', 
        fontSize: 30,
        color: '#1F1E1E',
    },
    createVideoContainer: {
        marginTop: 20,
        width: '100%',
        height: '85%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    createVideoTextInputContainer: {
        marginVertical: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
    },
    createVideoTextInput: {
        paddingLeft: 10,
        paddingVertical: 20,
        backgroundColor: '#F22E66',
        borderRadius: 10,
        fontFamily: 'Mohave_VariableFont_wght',
        color: '#FFFFFF',
    },
    createVideoError: {
        marginTop: 10,
        marginLeft: 5,
        fontFamily: 'Mohave_VariableFont_wght',
        fontStyle: 'italic',
        color: '#1F1E1E',
    },
    createVideoButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 70,
        paddingHorizontal: 10,
        width: '90%',
        backgroundColor: '#F22E66',
        borderRadius: 10,
    },
    createVideoButtonText: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        color: '#FFFFFF',
        fontFamily: 'Mohave_VariableFont_wght', 
        fontSize: 16,
        textAlign: 'center',
    }
});

export default CreateVideoScreen;