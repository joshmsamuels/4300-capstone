import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons'


export const SignIn = ({ hideSignIn }) => {
    return (
        <div>
            Sign In with
            <FontAwesomeIcon icon={faGoogle} onClick={hideSignIn} />
            <FontAwesomeIcon icon={faFacebook} onClick={hideSignIn} />
            <FontAwesomeIcon icon={faMicrosoft} onClick={hideSignIn} />

            <button onClick={hideSignIn}>Sign in as guest</button>
        </div>
    )
}