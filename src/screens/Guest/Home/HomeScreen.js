import {View, Text, Pressable, StyleSheet, StatusBar} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { MotiView, AnimatePresence } from 'moti';

const HomeScreen = ({navigation}) => {
    return (
        <>
            <StatusBar barStyle='light-content' />
            <View style={styles.container}>
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
                        <Text style={styles.title}>Vid Notes</Text>
                    </MotiView>
                </View>
                    
                {/* Buttons */}
                <View style={styles.buttonContainer}>
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
                    >
                        <Pressable onPress={() => navigation.navigate('CreateAnAccount')} style={styles.button}>
                            <Text style={styles.buttonText}>Create Account</Text>
                            <Ionicons name="pencil" size={20} color="#1F1E1E" />
                        </Pressable>
                    </MotiView>

                    {/* Login */}
                    <MotiView
                        from={{
                            translateX: -500
                        }}
                        animate={{
                            translateX: 0
                        }}
                        transition={{
                            delay: 1200,
                            type: 'timing',
                            duration: 300,
                        }}
                    >
                        <Pressable onPress={() => navigation.navigate('Login')} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                            <Ionicons name="log-in" size={20} color="#1F1E1E" />
                        </Pressable>
                    </MotiView>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: "#F22E66",
    },
    titleContainer: {
        overflow: 'hidden'
    },
    title: {
      fontFamily: 'Mohave_VariableFont_wght', 
      fontSize: 60,
      color: '#FFFFFF'
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        marginVertical: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '55%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    buttonText: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        color: '#1F1E1E',
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 16,
        textAlign: 'center',
    }
  });

export default HomeScreen;