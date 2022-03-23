import {useRef, useEffect, useState, useCallback} from 'react';
import { api } from '../../api/config';

const useVideoLogic = (id) => {
    const isMounted = useRef(false);
    const videoRef = useRef();
    const abortVideo = new AbortController();

    useEffect(() => {
        isMounted.current = true;

        if(isMounted){
            getVideo(abortVideo);
            getNotes(abortVideo);
        }

        return () => {
            isMounted.current = false;
        }
    }, [])

    const [video, setVideo] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [note, setNote] = useState(null);

    const getVideo = async abortVideo => {
        try{
            if(isMounted) setIsLoading(prev => !prev);
            const {data} = await api().get(`/video/${id}`, {signal: abortVideo.signal});

            if(!data) return;

            if(isMounted) setIsLoading(prev => !prev);

            if(isMounted) setVideo(data);
        }catch(error){
            console.log('request to get video abandoned');
        }
    }

    const getNotes = async abortVideo => {
        try{
            const {data} = await api().get(`/note/${id}`, {signal: abortVideo.signal});

            if(!data) return;

            if(isMounted) setNotes(data);
        }catch(error){
            console.log('request to get notes abandoned');
        }
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          Alert.alert("video has finished playing!");
        }
    }, []);

    return {videoRef, playing, onStateChange,  isLoading, video, setNotes, notes, note, setNote};
}

export default useVideoLogic;