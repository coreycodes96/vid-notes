import { useContext } from "react";
import { UserContext } from "../../../helpers/contexts/UserContext";
import { removeStore } from "../../../helpers/secure_store";

const useTopHeaderLogic = () => {
    const {setUser} = useContext(UserContext);

    const logTheUserOut = () => {
        removeStore('user');
        setUser(null);
    }

    return {logTheUserOut};
}

export default useTopHeaderLogic;