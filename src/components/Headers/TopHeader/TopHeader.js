import {View, Text, Pressable, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTopHeaderLogic from './useTopHeaderLogic';

const TopHeader = () => {
    const {
        logTheUserOut
    } = useTopHeaderLogic();

    return (
        <View style={styles.headerContainer}>
            {/* Title */}
            <Text style={styles.headerTitle}>Vid Notes</Text>

            {/* Logout Button */}
            <Pressable onPress={() => logTheUserOut()}>
                <Ionicons name="power" size={20} color="#F22E66" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 15,
        position: 'absolute',
        top: 40,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    headerTitle: {
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 20,
        color: '#1F1E1E',
    }
});

export default TopHeader;