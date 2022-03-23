import {
    View, 
    ScrollView, 
    Text, 
    Pressable, 
    StyleSheet, 
    LogBox,
} from 'react-native';
import useDisplayNotesLogic from './useDisplayNotesLogic';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Ionicons} from '@expo/vector-icons';
import {MotiView} from 'moti';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const DisplayNotes = ({videoRef, note, setNote, setNotes, notes}) => {
    const {
        convertSecondsToMinutes,
        goToTimeInVideo,
        handleNote,
        swipeToDeleteNote,
        deleteANote,
    } = useDisplayNotesLogic(videoRef, note, setNote, setNotes, notes);

    const rightSwipeActions = () => {
        return (
          <Pressable onPress={() => deleteANote()} style={styles.noteSwipeContainer}>
            <Ionicons style={styles.noteSwipeContainerText} name="trash" size={24}  />
          </Pressable>
        );
    };

    return (
        <ScrollView 
            style={{ marginTop: 10, marginBottom: 40, height: '45%' }}  
            showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'never'}
        >
            {note === null ? (
                <>
                    {notes.length > 0 ? notes.map((note, idx) => {
                        return (
                            <MotiView
                                key={note._id}
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
                                        onSwipeableRightOpen={() => swipeToDeleteNote(note?._id)}
                                    >
                                        {/* Notes */}
                                        <Pressable style={styles.notes}>
                                            <Pressable onPress={() => goToTimeInVideo(note?.time)}>
                                                <Text style={styles.noteTime}>{convertSecondsToMinutes(note?.time)}</Text>
                                            </Pressable>

                                            <Pressable onPress={() => handleNote(note?.title, note?.body)}>
                                                <Text style={styles.noteText}>{note?.title}</Text>
                                            </Pressable>
                                        </Pressable>
                                    </Swipeable>
                                </GestureHandlerRootView>
                            </MotiView>
                        )
                    }) : (
                        <View style={styles.noNotesContainer}>
                            <Text style={styles.noNotesContainerText}>No notes</Text>
                        </View>
                    )}
                </>
            ) : (
                <Pressable>
                    <Text style={styles.noteTitle}>{note?.title}</Text>
                    <Text style={styles.noteBody}>{note?.body.replace(/\n{2,}/gm, "\n\n")}</Text>
                </Pressable>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    videoContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        width: '90%',
    },
    notes: {
        marginVertical: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
        width: '95%',
        backgroundColor: '#F22E66',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
    },
    noteTime: {
        color: '#FFFFFF',
    },
    noteText: {
        color: '#FFFFFF',
    },
    noteTitle: {
        padding: 10,
        width: '100%',
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 24,
        color: '#1F1E1E',
    },
    noteBody: {
        padding: 10,
        width: '100%',
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 16,
        color: '#1F1E1E',
    },
    noteSwipeContainer: {
        marginVertical: 10,
        padding: 10,
        height: 45,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    noteSwipeContainerText: {
        width: '100%',
        fontFamily: 'Mohave_VariableFont_wght',
        color: '#FFFFFF',
    },
    noNotesContainer: {
        marginTop: 120,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noNotesContainerText: {
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 20,
        color: '#1F1E1E',
    },
});

export default DisplayNotes;