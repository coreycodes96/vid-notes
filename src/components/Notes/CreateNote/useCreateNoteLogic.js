import {useRef, useEffect, useState, useContext} from 'react';
import {ErrorContext} from '../../../helpers/contexts/ErrorContext';
import {SuccessContext} from '../../../helpers/contexts/SuccessContext';
import { api } from '../../../api/config';

const useCreateNoteLogic = (id, setNotes, notes, videoRef) => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, [])

    const {setError} = useContext(ErrorContext);
    const {setSuccess} = useContext(SuccessContext);

    const [toggle, setToggle] = useState(false);

    const [createNote, setCreateNote] = useState({
        title: '',
        note: '',
    });

    const [createNoteErrors, setCreateNoteErrors] = useState({
        title: '',
        note: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [time, setTime] = useState(null);

    const handleToggle = () => setToggle(prev => !prev);

    const handleTime = async () => {
        const current = await videoRef.current.getCurrentTime();

        if(isMounted) setTime(current);
    }

    const abortCreateNote = new AbortController();

    const createANote = () => {
        const errorState = {title: '', note: ''};

        if(time === null || time <= 0){
            if(isMounted) {
                setError('No time was set');
                setToggle(prev => !prev);
                setCreateNote({title: '', body: ''});
                setCreateNoteErrors({title: '', body: ''});
                setTimeout(() => {
                    setError('');
                }, 6000);
            }

            return;
        }

        //Title Validation
        if(createNote.title === ''){
            errorState.title = 'Please enter your a title';
        }else{
            errorState.title = '';
        }


        //Note Validation
        if(createNote.note === ''){
            errorState.note = 'Please enter your a note';
        }else{
            errorState.note = '';
        }

        if(isMounted) setCreateNoteErrors({...errorState});

        if(errorState.title === ''&& errorState.note === ''){
            if(isMounted) setIsLoading(prev => !prev);

            const data = {
                video: id,
                title: createNote.title,
                body: createNote.note,
                time: time,
            };

            api().post('/note/create', data, {signal: abortCreateNote.signal})
            .then(res => {
                if(isMounted) setIsLoading(prev => !prev);

                if(isMounted) setNotes([res.data, ...notes]);
                
                if(isMounted) setCreateNote({title: '', body: ''});
                if(isMounted) setCreateNoteErrors({title: '', body: ''});
                if(isMounted) setToggle(prev => !prev);

                if(isMounted) {
                    setSuccess('Note has been created');
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

                        //Body Errors
                        if(name === 'body') {
                            errorState.note = err.message;
                        }

                        if (isMounted) setCreateNoteErrors({ ...errorState });
                    }
                }
            })
        }
    }

    return {toggle, handleToggle, handleTime, isLoading, createANote, createNote, setCreateNote, createNoteErrors};
}

export default useCreateNoteLogic;