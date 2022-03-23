import {
    View, 
    ScrollView, 
    Text, 
    Pressable, 
    ImageBackground,
    RefreshControl,
    StyleSheet, 
    ActivityIndicator,
    LogBox,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import useDisplayVideosLogic from './useDisplayVideosLogic';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Ionicons} from '@expo/vector-icons';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const DisplayVideos = ({navigation}) => {
    const {
        isLoading,
        refresh,
        videos,
        getVideosOnRefresh,
        swipeToDeleteVideo,
        deleteAVideo,
    } = useDisplayVideosLogic();

    const rightSwipeActions = () => {
        return (
          <Pressable onPress={() => deleteAVideo()} style={styles.videoSwipeContainer}>
            <Ionicons style={styles.videoSwipeContainerText} name="trash" size={24}  />
          </Pressable>
        );
    };

    return (
        <>
            {!isLoading ? (
                <>
                    {/* Video Count */}
                    <Text style={styles.title}>Videos ({videos.length})</Text>

                    {/* Display Videos */}
                    <ScrollView 
                        style={{ marginTop: 135, marginBottom: 150 }} 
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={getVideosOnRefresh}
                            />
                        } 
                        showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
                    >
                        {videos.length > 0 ? videos.map((video, idx) => {
                            return (
                                <MotiView
                                    key={video?._id}
                                    from={{
                                        translateX: -500
                                    }}
                                    animate={{
                                        translateX: 0
                                    }}
                                    transition={{
                                        delay: idx * 200,
                                        type: 'timing',
                                        duration: 200 ,
                                    }}
                                >
                                    <GestureHandlerRootView>
                                        <Swipeable
                                            renderRightActions={rightSwipeActions}
                                            onSwipeableRightOpen={() => swipeToDeleteVideo(video?._id)}
                                        >
                                            {/* Videos */}
                                            <Pressable onPress={() => navigation.navigate('Video', {id: video?._id})} style={styles.videoContainer}>
                                                <ImageBackground 
                                                    resizeMode='cover'
                                                    style={styles.image} 
                                                    source={{uri: video?.thumbnail}}
                                                >
                                                    <BlurView tint='dark' intensity={25} style={styles.blur}>
                                                        <Text numberOfLines={1} style={styles.blurTitle}>{video?.title}</Text>
                                                    </BlurView>
                                                </ImageBackground>
                                            </Pressable>
                                        </Swipeable>
                                    </GestureHandlerRootView>
                                </MotiView>
                            )
                        }) : (
                            <View style={styles.noVideos}>
                                <Text style={styles.noVideosText}>Sorry you currently do not have any videos</Text>
                            </View>
                        )}
                    </ScrollView>
                </>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={'black'} size={'large'} />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        position: 'absolute',
        top: 100, 
        left: 0,
        width: '100%',
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 22,
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        color: '#1F1E1E',
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 25,
        backgroundColor: 'white',
        width: '90%',
    },
    image: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    blur: {
        padding: 15,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    blurTitle: {
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 60,
        color: '#FFFFFF'
    },
    videoSwipeContainer: {
        marginVertical: 25,
        padding: 10,
        height: 250,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    videoSwipeContainerText: {
        width: '100%',
        fontFamily: 'Mohave_VariableFont_wght',
        color: '#FFFFFF',
    },
    noVideos: {
        flex: 1,
        width: '100%',
        height: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noVideosText: {
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70%',
        color: '#1F1E1E',
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default DisplayVideos;