import { useAuth } from "../../contexts/authContexts"
import { doPasswordReset } from "../../firebase/auth";

function Settings() {
    const { userLoggedIn, currentUser } = useAuth;

    const onReset = async (e) => {
        e.preventDefault();
        await doPasswordReset(currentUser.email);
    } 

    return (
        <>
        <button onClick={onReset}>RESET PASSWORD</button>
        </>
    )
}

export default Settings