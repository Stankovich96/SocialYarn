import React, { Component, Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';

//MUISTUFF
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//REDUX
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { postScream, clearErrors } from '../../redux/actions/dataActions';

//Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    submitButton:{
        position:'relative',
        float:'right',
        marginTop:10
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        position:'absolute',
        left:'91%',
        top:'6%'
    }
})

// class PostScream extends Component {
//     state = {
//         open:false,
//         body:'',
//         errors:{} 
//     };

//     componentWillReceiveProps(nextProps){
//         if(nextProps.UI.errors){
//             setState({
//                 errors: nextProps.UI.errors
//             })
//         }
//         if(!nextProps.UI.errors && !nextProps.UI.loading){
//             this.setState({ body:'', open: false, errors:{} });
//         }
//     }
//     handleOpen = () => {
//         this.setState({ open: true })
//       };
    
//     handleClose = () => {
//         this.props.clearErrors();
//         this.setState({ open: false, errors:{} });
//       };

//     handleChange = (event) =>{
//      this.setState({
//         [event.target.name]: event.target.value
//      })
//     }
    
//     handleSubmit = (event) => {
//         event.preventDefault();
//         this.props.postScream({ body: this.state.body });
//       };

//       render(){
//           const {errors}  = this.state;
//           const { classes, UI:{ loading } } = this.props;

//           return(
//             <Fragment>
//             <MyButton tip="Post a Scream" onClick={this.handleOpen} >
//             <AddIcon/>
//             </MyButton>
//             <Dialog
//                 open={this.state.open}
//                 onClose={this.handleClose}
//                 fullWidth
//                 maxWidth="sm">
//                     <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton} >
//                     <CloseIcon/>
//                     </MyButton>
//                     <DialogTitle>Post a new Scream</DialogTitle>
//                     <DialogContent>
//                     <form onSubmit={this.handleSubmit}>
//                           <TextField
//                             name="body"
//                             type="text"
//                             label="SCREAM!!"
//                             multiline
//                             rows="3"
//                             placeholder="Scream at your hommies"
//                             error={errors.body ? true: false}
//                             helperText={errors.body}
//                             className={classes.textField}
//                             onChange={this.handleChange}
//                             fullWidth
//                           />  
//                           <Button type="submit" variant="contained" color="primary"
//                           className={classes.submitButton} disabled={loading}>
//                               Submit
//                               {loading && (
//                                   <CircularProgress size={30} className={classes.progressSpinner}/>
//                               )}
//                           </Button>
//                     </form>
//                     </DialogContent>
//             </Dialog>
//             </Fragment>
//           )
//       }
// }



const PostScream = (props) => {

    const [postState, setpostState] = useState({
        open:false,
        body:'',
        errors:{} 
    });

    const {UI} = useSelector(state => ({
        UI: state.UI
    }));

    const {loading, errors} = UI;

    const dispatch = useDispatch();

    useEffect(() => {
        if(UI.errors){
            setpostState({
                errors: UI.errors
            })
        }
        if(!UI.errors && !UI.loading){
            setpostState({ body:'', open: false, errors:{} });
        }
    }, []);


    const handleOpen = () => {
        setpostState({ open: true })
      };
    
    const handleClose = () => {
        dispatch(clearErrors());
        setpostState({ open: false, errors:{} });
      };

      const handleChange = (event) =>{
        const {name, value} = event.target;
        setpostState( postState =>({...postState, [name]:value}))
     };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postScream({ body: postState.body }));
      };

    const { classes } = props;

    return (
        <Fragment>
        <MyButton tip="Post a Scream" onClick={handleOpen} >
        <AddIcon/>
        </MyButton>
        <Dialog
            open={postState.open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm">
                <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton} >
                <CloseIcon/>
                </MyButton>
                <DialogTitle>Post a new Scream</DialogTitle>
                <DialogContent>
                <form noValidate onSubmit={handleSubmit}>
                      <TextField
                        name="body"
                        type="text"
                        label="SCREAM!!"
                        multiline
                        rows="3"
                        placeholder="Scream at your hommies"
                        // error={postState.errors.body ? true: false}
                        // helperText={postState.errors.body}
                        className={classes.textField}
                        onChange={handleChange}
                        fullWidth
                      />  
                      <Button type="submit" variant="contained" color="primary"
                      className={classes.submitButton} disabled={loading}>
                          Submit
                          {loading && (
                              <CircularProgress size={30} className={classes.progressSpinner}/>
                          )}
                      </Button>
                </form>
                </DialogContent>
        </Dialog>
        </Fragment>
    );
}

PostScream.propTypes = {
    postScream: PropTypes.func,
    clearErrors: PropTypes.func,
    UI: PropTypes.object
}

export default withStyles(styles)(PostScream);

// PostScream.propTypes = {
//     postScream: PropTypes.func.isRequired,
//     clearErrors: PropTypes.func.isRequired,
//     UI: PropTypes.object.isRequired
// }
// const mappostStateToProps = (state) =>({
//     UI: state.UI
// })

// const mapActionsToProps = { postScream, clearErrors };

// export default connect(mapStateToProps, mapActionsToProps )(withStyles(styles)(PostScream));