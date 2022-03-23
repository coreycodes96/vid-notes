import {View, Pressable, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomHeader = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {/* Videos */}
                <Pressable onPress={() => navigation.navigate('Videos')}>
                    <Ionicons name="videocam" size={24} color='#FFFFFF' />
                </Pressable>

                {/* Create Video */}
                <Pressable onPress={() => navigation.navigate('CreateVideo')}>
                    <Ionicons name="create" size={24} color='#FFFFFF' />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        width: '100%',
        zIndex: 10,
    },
    headerContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
        width: '90%',
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F22E66',
        borderRadius: 10,
    },
    headerTitle: {
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 20,
        color: '#1F1E1E',
    },
});

export default BottomHeader;