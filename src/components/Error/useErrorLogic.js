import { useRef, useEffect, useContext } from 'react';
import { ErrorContext } from '../../helpers/contexts/ErrorContext';

const useErrorLogic = () => {
    const {error, setError} = useContext(ErrorContext);

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            setError('');
        }
    }, [])

    return { error };
}

export default useErrorLogic;