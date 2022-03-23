import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import useSuccessLogic from './useSuccessLogic';

const Success = () => {
    const {
        success,
    } = useSuccessLogic();

    return (
        <MotiView 
            from={{
                translateX: success === '' ? -1500 : 0
            }}
            animate={{
                translateX: success !== '' ? 0 : -1500
            }}
            transition={{
                type: 'timing',
                duration: 300,
            }}
            style={styles.container}
        >
            <View style={styles.successContainer}>
                <Text style={styles.successText}>{success}</Text>
                <Ionicons name="checkmark-circle" size={20} color='#F22E66' />
            </View>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
    },
    successContainer: {
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
    successText: {
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 16,
        color: '#1F1E1E',
    },
  });

export default Success;