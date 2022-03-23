import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Guest/Home/HomeScreen';
import CreateAnAccountScreen from '../screens/Guest/CreateAnAccount/CreateAnAccountScreen';
import LoginScreen from '../screens/Guest/Login/LoginScreen';

import Error from '../components/Error/Error';
import Success from '../components/Success/Success';

const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        primary: '#FFFFFF',
    },
};

const GuessNavigationStack = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ gestureEnabled: false, animation: 'none' }}>
                    {/* Home Screen */}
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                        theme={MyTheme} />

                    {/* Create An Account Screen */}
                    <Stack.Screen
                        name="CreateAnAccount"
                        component={CreateAnAccountScreen}
                        options={{ headerShown: false }}
                        theme={MyTheme} />

                    {/* Login Screen */}
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false, gestureEnabled: false }}
                        theme={MyTheme}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            
            <Success />
            <Error />
        </>
    );
}

export default GuessNavigationStack;