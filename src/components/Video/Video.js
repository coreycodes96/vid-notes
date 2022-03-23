import {View, Text, ActivityIndicator, Pressable, StyleSheet} from 'react-native';
import useVideoLogic from './useVideoLogic';
import { Video as ViewVideo } from 'expo-av';
import YoutubePlayer from "react-native-youtube-iframe";
import DisplayNotes from '../Notes/DisplayNotes/DisplayNotes';
import CreateNote from '../Notes/CreateNote/CreateNote';
import {Ionicons} from '@expo/vector-icons';

const Video = ({id}) => {
    const {
        videoRef,
        playing, 
        onStateChange,
        isLoading,
        video,
        setNotes,
        notes,
        note, 
        setNote,
    } = useVideoLogic(id);

    return (
        <>
            {!isLoading && video ? (
                <View>
                    {/* Header */}
                    <View style={styles.header}>
                        {/* Title */}
                        <Text numberOfLines={1} style={styles.title}>{video?.title}</Text>

                        <CreateNote id={id} setNotes={setNotes} notes={notes} videoRef={videoRef} />
                    </View>

                    {/* Video */}
                    <YoutubePlayer
                        ref={videoRef}
                        height={250}
                        play={playing}
                        videoId={video.url}
                        onChangeState={onStateChange}
                    />

                    {/* Sub Header */}
                    <View style={styles.subHeader}>
                        {/* Back To Notes */}
                        {note !== null ? (
                            <Pressable onPress={() => setNote(null)}>
                                <Ionicons name="arrow-back" size={20} color='#1F1E1E' />
                            </Pressable>
                        ) : null}

                        {/* Notes Count */}
                        <Pressable>
                            <Text style={styles.notesCountContainerText}>Notes({notes.length})</Text>
                        </Pressable>
                    </View>

                    {/* Display Notes */}
                    <DisplayNotes videoRef={videoRef} note={note} setNote={setNote} setNotes={setNotes} notes={notes} />
                </View>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={'black'} size={'large'} />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        marginTop: 10,
        padding: 5,
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 45,
        color: '#1F1E1E'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: '100%',
        height: 400,
    },
    subHeader: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingVertical: 10,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notesCountContainerText: {
        textAlign: 'center',
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 18,
        color: '#1F1E1E'
    },
});

export default Video;