import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import useErrorLogic from './useErrorLogic';

const Error = () => {
    const {
        error,
    } = useErrorLogic();
    
    return (
        <MotiView 
            from={{
                translateX: error === '' ? -1500 : 0
            }}
            animate={{
                translateX: error !== '' ? 0 : -1500
            }}
            transition={{
                type: 'timing',
                duration: 300,
            }}
            style={styles.container}
        >
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Ionicons name="alert-circle" size={20} color='#F22E66' />
            </View>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        zIndex: 100,
    },
    errorContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    errorText: {
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 16,
        color: '#1F1E1E',
    },
  });

export default Error;