import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const signInOptions = [
    {icon: faGoogle, provider: 'Google'},
    {icon: faFacebook, provider: 'Facebook'},
    {icon: faMicrosoft, provider: 'Microsoft'},
    {icon: faQuestion, provider: 'Guest'},
]

function handleListItemClick() {

}

export const SignIn = ({ onClose, open, selectedValue}) => {
    return (
        <div>
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Sign In with</DialogTitle>
                <List>
                    {signInOptions.map(({icon, provider}) => (
                    <ListItem button onClick={() => handleListItemClick(provider)} key={provider}>
                        <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={icon} />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={provider} />
                    </ListItem>
                    ))}
                </List>
                </Dialog>
        </div>
    )
}