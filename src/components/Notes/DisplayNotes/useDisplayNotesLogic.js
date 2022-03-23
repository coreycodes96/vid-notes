import {useRef, useEffect, useState} from 'react';
import { api } from '../../../api/config';

const useDisplayNotesLogic = (videoRef, note, setNote, setNotes, notes) => {
    const isMounted = useRef(false);
    const [noteId, setNoteId] = useState(null);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    const timeFormat = duration => {   
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;
    
        let ret = "";
    
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
    
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    const convertSecondsToMinutes = time => {
        return timeFormat(time);
    }

    const goToTimeInVideo = time => {
        return videoRef.current.seekTo(time);
    }

    const handleNote = (title, body) => {
        setNote({title, body});
    }

    const swipeToDeleteNote = id => {
        if(isMounted) setNoteId(id);
    }

    const deleteANote = () => {
        if(noteId === null) return;

        api().delete(`/note/delete/${noteId}`)
        .then(() => {
            const updatedNotes = notes.filter(n => n._id !== noteId);
            if(isMounted) setNotes(updatedNotes);
        })
        .catch(error => console.log(error.response))
    }

    return { convertSecondsToMinutes, goToTimeInVideo, handleNote, swipeToDeleteNote, deleteANote };
}

export default useDisplayNotesLogic;