import { useRef, useEffect, useContext } from 'react';
import { SuccessContext } from '../../helpers/contexts/SuccessContext';

const useSuccessLogic = () => {
    const {success, setSuccess} = useContext(SuccessContext);

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            setSuccess('');
        }
    }, [])

    return { success };
}

export default useSuccessLogic;