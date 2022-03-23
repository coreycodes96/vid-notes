import {
    View,
    Pressable,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, 
    StyleSheet,
    StatusBar
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Video from '../../../components/Video/Video';

const VideoScreen = ({navigation, route}) => {
    const id = route?.params?.id;

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

                        {/* Video */}
                        <Video id={id} />
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
});

export default VideoScreen;