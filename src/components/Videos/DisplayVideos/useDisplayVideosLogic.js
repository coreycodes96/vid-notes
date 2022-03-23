import {useRef, useEffect, useContext, useState} from 'react';
import { VideosContext } from '../../../helpers/contexts/VideosContext';
import {api} from '../../../api/config';

const useDisplayVideosLogic = () => {
    const isMounted = useRef(false);
    const {videos, setVideos} = useContext(VideosContext);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const abortVideos = new AbortController();

    useEffect(() => {
        isMounted.current = true;

        if(isMounted){
            getVideos(abortVideos);
        }

        return () => {
            isMounted.current = false;
            abortVideos.abort();
        }
    }, [])

    const getVideos = async (abortVideos) => {
        try{
            if(isMounted) setIsLoading(prev => !prev);
            const {data} = await api().get('/video/', {signal: abortVideos.signal});

            if(!data) return;

            if(isMounted) setIsLoading(prev => !prev);

            if(isMounted) setVideos(data);
        }catch(error){
            console.log(error);
        }
    }

    const getVideosOnRefresh = () => {
        if(isMounted) setRefresh(prev => !prev);
        getVideos(abortVideos);
        if(isMounted) setRefresh(prev => !prev);
    }

    const swipeToDeleteVideo = id => {
        setVideoId(id);
    };

    const deleteAVideo = () => {
        if(videoId === null) return;

        api().delete(`/video/delete/${videoId}`)
        .then(() => {
            const updatedVideos = videos.filter(v => v._id !== videoId);

            if(isMounted) setVideos(updatedVideos);
        })
        .catch(error => console.log(error.response));
    }

    return {isLoading, refresh, videos, getVideosOnRefresh, swipeToDeleteVideo, deleteAVideo};
}

export default useDisplayVideosLogic;