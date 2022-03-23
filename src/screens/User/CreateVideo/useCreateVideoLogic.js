import {useRef, useEffect, useState, useContext} from 'react';
import { SuccessContext } from '../../../helpers/contexts/SuccessContext';
import {api} from '../../../api/config';

const useCreateVideoLogic = (navigation) => {
    const isMounted = useRef(false);
    const {success, setSuccess} = useContext(SuccessContext);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    const [createVideo, setCreateVideo] = useState({
        title: '',
        url: '',
    });

    const [createVideoErrors, setCreateVideoErrors] = useState({
        title: '',
        url: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const abortCreateVideo = new AbortController();

    const createAVideo = async () => {
        const errorState = {title: '', url: ''};

        //Title Validation
        if(createVideo.title === ''){
            errorState.title = 'Please add a title';
        }else if(createVideo.title.length < 3){
            errorState.title = 'Your title can\'t be less than 3 characters';
        }else if(createVideo.title.length > 25){
            errorState.title = 'Your title can\'t be more than 25 characters';
        }else{
            errorState.title = '';
        }

        //Url Validation
        if(createVideo.url === ''){
            errorState.url = 'Please add a valid youtube url';
        }else{
            errorState.url = '';
        }

        if(isMounted) setCreateVideoErrors({...errorState});

        if(errorState.title === '' && errorState.url === ''){
            if(isMounted) setIsLoading(prev => !prev);

            const data = {
                title: createVideo.title,
                url: createVideo.url,
            };

            api().post('/video/create', data, {signal: abortCreateVideo.signal})
            .then(res => {
                if(isMounted) setIsLoading(prev => !prev);

                const data = {
                    _id: res.data._id,
                    title: res.data.title,
                    thumbnail: res.data.thumbnail,
                };

                if(isMounted) setCreateVideo({title: '', url: ''});
                if(isMounted) setCreateVideoErrors({title: '', url: ''});

                if(isMounted) navigation.navigate('Videos', {video: data});
                
                if(isMounted){
                    setSuccess('Video has been created');
                    setTimeout(() => {
                        setSuccess('');
                    }, 4000);
                }
            })
            .catch(error => {
                if(isMounted) setIsLoading(prev => !prev);

                const { response } = error;

                if (response.data.validation) {
                    for (const err of response.data.validation) {
                        const name = err.context.key;

                        //Title Errors
                        if (name === 'title') {
                            errorState.title = err.message;
                        }

                        //Url Errors
                        if(name === 'url') {
                            errorState.url = err.message;
                        }

                        if (isMounted.current) setCreateVideoErrors({ ...errorState });
                    }
                }else{
                    //If the url is invalid
                    if (response.data.url) {
                        errorState.url = response.data.url;
                    }

                    if (isMounted.current) setCreateVideoErrors({ ...errorState });
                }
            })
        }
    }

    return { createVideo, setCreateVideo, createVideoErrors, isLoading, createAVideo };
}

export default useCreateVideoLogic;