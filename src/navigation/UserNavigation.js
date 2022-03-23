import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VideosScreen from '../screens/User/Videos/VideosScreen';
import CreateVideoScreen from '../screens/User/CreateVideo/CreateVideoScreen';
import VideoScreen from '../screens/User/Video/VideoScreen';

import Error from '../components/Error/Error';
import Success from '../components/Success/Success';

const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        primary: '#FFFFFF',
    },
};

const UserNavigationStack = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ gestureEnabled: false, animation: 'none' }}>
                    {/* Videos Screen */}
                    <Stack.Screen
                        name="Videos"
                        component={VideosScreen}
                        options={{ headerShown: false }}
                        theme={MyTheme} 
                    />

                    {/* Create Video Screen */}
                    <Stack.Screen
                        name="CreateVideo"
                        component={CreateVideoScreen}
                        options={{ headerShown: false }}
                        theme={MyTheme} 
                    />

                    {/* Video Screen */}
                    <Stack.Screen
                        name="Video"
                        component={VideoScreen}
                        options={{ headerShown: false }}
                        theme={MyTheme}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            
            <Success />
            <Error />
        </>
    );
}

export default UserNavigationStack;