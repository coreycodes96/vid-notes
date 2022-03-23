import {
    View,
    ScrollView,
    Text,
    TextInput,
    Pressable,
    Modal,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, 
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useCreateNoteLogic from './useCreateNoteLogic';

const CreateNote = ({id, setNotes, notes, videoRef}) => {
    const {
        toggle, 
        handleToggle,
        handleTime,
        isLoading, 
        createANote,
        createNote, 
        setCreateNote, 
        createNoteErrors,
    } = useCreateNoteLogic(id, setNotes, notes, videoRef);

    return (
        <>
            {/* Create Note Button */}
            <Pressable onPress={() => {handleToggle(), handleTime()}} style={styles.createMarkerButton}>
                <Ionicons name="bookmark" size={16} color='#FFFFFF' />
            </Pressable>

            <Modal visible={toggle} animationType="slide" transparent={true}>
                <KeyboardAvoidingView style={{ width: '100%', height: '100%'}} enabled={true} behavior="padding">
                    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                        {/* Create Note  */}
                        <View style={styles.createNoteModal}>
                            {/* Title */}
                            <Text style={styles.title}>Create Note</Text>

                            {/* Close Create Note Modal */}
                            <Pressable onPress={() => handleToggle()} style={styles.closeCreateNoteModal}>
                                <Ionicons name='close-circle' size={32} color='#1F1E1E' />
                            </Pressable>

                            {/* Title */}
                            <View style={styles.createNoteTextInputContainer}>
                                <TextInput 
                                    style={[styles.createNoteTextInput, {height: 60}]} 
                                    placeholder='Title'
                                    placeholderTextColor={'#FFFFFF'}
                                    selectionColor='#FFFFFF'
                                    value={createNote.title}
                                    onChangeText={text => setCreateNote({ ...createNote, title: text })}
                                />

                                {/* Title Errors */}
                                {createNoteErrors.title ? <Text style={styles.createNoteError}><Ionicons name="alert-circle-outline" size={18} />{createNoteErrors.title}</Text> : null}
                            </View>

                            {/* Note */}
                            <View style={styles.createNoteTextInputContainer}>
                                <TextInput 
                                    style={styles.createNoteTextInput} 
                                    placeholder='Note'
                                    placeholderTextColor={'#FFFFFF'}
                                    selectionColor='#FFFFFF'
                                    multiline
                                    value={createNote.note}
                                    onChangeText={text => setCreateNote({ ...createNote, note: text })}
                                />

                                {/* Note Errors */}
                                {createNoteErrors.note ? <Text style={styles.createNoteError}><Ionicons name="alert-circle-outline" size={18} />{createNoteErrors.note}</Text> : null}
                            </View>

                            {/* Create Note Button */}
                            <Pressable disabled={isLoading} onPress={() => createANote()} style={styles.createNoteButton}>
                                {!isLoading ? <Text style={styles.createNoteButtonText}>Create Note</Text> : <ActivityIndicator style={styles.createNoteButtonText} size='small' color='#FFFFFF' /> }
                            </Pressable>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    createMarkerButton: {
        marginTop: 5,
        padding: 12,
        backgroundColor: '#F22E66',
        borderRadius: 50,
    },
    createMarkerButtonText: {
        fontFamily: 'Mohave_VariableFont_wght',
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    createNoteModal: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', 
        //overflow: 'hidden',  
    },
    closeCreateNoteModal: {
        position: 'absolute',
        top: 55,
        right: 10,
    },
    title: {
        marginTop: 85,
        marginLeft: 25,
        fontFamily: 'Mohave_VariableFont_wght', 
        fontSize: 30,
        color: '#1F1E1E',
        width: '100%',
    },
    createNoteTextInputContainer: {
        marginVertical: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
    },
    createNoteTextInput: {
        paddingLeft: 10,
        paddingVertical: 20,
        backgroundColor: '#F22E66',
        borderRadius: 10,
        fontFamily: 'Mohave_VariableFont_wght',
        color: '#FFFFFF',
        height: 250,
    },
    createNoteError: {
        marginTop: 10,
        marginLeft: 5,
        fontFamily: 'Mohave_VariableFont_wght',
        fontStyle: 'italic',
        color: '#1F1E1E',
    },
    createNoteButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 40,
        paddingHorizontal: 10,
        width: '90%',
        backgroundColor: '#F22E66',
        borderRadius: 10,
    },
    createNoteButtonText: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        color: '#FFFFFF',
        fontFamily: 'Mohave_VariableFont_wght', 
        fontSize: 16,
        textAlign: 'center',
    }
});

export default CreateNote;