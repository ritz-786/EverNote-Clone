import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            text: '',
            title: '',
            id: ''
        }
    }

    componentDidMount(){
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        })
    }

    componentDidUpdate(){
        if(this.props.selectedNote.id !== this.state.id){
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            })
        }
    }
    
    updateBody = async (val) => {
        await this.setState({text: val});
        this.update();
    }

    update = debounce(() => {
        this.props.noteUpdate(this.state.id,{
            title: this.state.title,
            body: this.state.text
        })
    },1500);

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.editorContainer}>
                <ReactQuill 
                value={this.state.text} 
                onChange={this.updateBody}
                noteUpdate={this.noteUpdate}/>
            </div>
        )
    }
}

export default withStyles(styles)(EditorComponent)
// this will help to access the classess from the props
// this.props.classes.className