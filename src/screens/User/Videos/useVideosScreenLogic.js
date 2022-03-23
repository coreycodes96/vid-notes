import {useRef, useState, useMemo, useEffect, useContext} from 'react';

const useVideosScreenLogic = (route) => {
    const isMounted = useRef(false);
    const [videos, setVideos] = useState([]);
    const videosValues = useMemo(() => ({videos, setVideos}), [videos, setVideos]);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    //When a video has been created
    useEffect(() => {
        if (route && route?.params?.video) {
            setVideos([route?.params?.video, ...videos]);
            route.params = {};
        }

        return () => {
            route.params = {};
        }
    }, [route])

    return { videosValues };
}

export default useVideosScreenLogic;