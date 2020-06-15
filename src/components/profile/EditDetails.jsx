import React, { Component, Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';

//REDUX
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { editUserDetails } from '../../redux/actions/userActions';

//MUISTUFF
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import EditIcon from '@material-ui/icons/Edit';




const styles = (theme) => ({
    button:{
        float:"right"
    }
})


// class EditDetails extends Component {
  
//     state = {
//         bio: '',
//         website:'',
//         location: '',
//         open:false
//     };

//     mapUserDetailsToState = (credentials) => {
//         this.setState({
//             bio: credentials.bio ? credentials.bio : '',
//             website: credentials.website ? credentials.website : '',
//             location: credentials.location ? credentials.location : ''
//         });
//       };

//     handleOpen = () => {
//         this.setState({ open: true })
//         this.mapUserDetailsToState(this.props.credentials);
//       };
    
//     handleClose = () => {
//         this.setState({ open: false })
//       };

//     handleChange = (event) =>{
//      this.setState({
//         [event.target.name]: event.target.value
//      })
//     }
    
//     componentDidMount(){
//         const { credentials } = this.props
//         this.mapUserDetailsToState(credentials);
//     }

//     handleSubmit = () => {
//         const userDetails = {
//             bio: this.state.bio,
//             website: this.state.website,
//             location: this.state.location
//         }
//         this.props.editUserDetails(userDetails);
//         this.handleClose();
//       };

//     render() {
//         const { classes } = this.props;
//         return (
//             <Fragment>
//                 <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button} >
//                 <EditIcon color="primary"/>
//                 </MyButton>
//                 <Dialog
//                 open={this.state.open}
//                 onClose={this.handleClose}
//                 fullWidth
//                 maxWidth="sm">
//                     <DialogTitle>Edit Your Details</DialogTitle>
//                     <DialogContent>
//                         <form>
//                           <TextField
//                             name="bio"
//                             type="text"
//                             label="bio"
//                             multiline
//                             rows="3"
//                             placeholder="A short bio about yourself"
//                             value={this.state.bio}
//                             onChange={this.handleChange}
//                             fullWidth
//                           />  

//                         <TextField
//                             name="website"
//                             type="text"
//                             label="Website"
//                             placeholder="Your Personal/ Professional Website"
//                             value={this.state.website}
//                             onChange={this.handleChange}
//                             fullWidth
//                           />  

//                         <TextField
//                             name="location"
//                             type="text"
//                             label="Location"
//                             placeholder="Where you live"
//                             value={this.state.location}
//                             onChange={this.handleChange}
//                             fullWidth
//                           />  

//                         </form>
//                     </DialogContent>
//                       <DialogActions>
//                           <Button onClick={this.handleClose} color="primary">
//                               Cancel
//                           </Button>
//                           <Button onClick={this.handleSubmit} color="primary">
//                               Save
//                           </Button>
//                       </DialogActions>
//                 </Dialog>
//             </Fragment>
//         )
//     }
// }

// EditDetails.propTypes = {
//         editUserDetails: PropTypes.func.isRequired,
//         classes: PropTypes.object.isRequired
//     }
    
    
//     const mapStateToProps = (state) =>({
//         credentials: state.user.credentials
//     });
    
//     export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
    



const EditDetails = (props) => {

    const {credentials} = useSelector(state => ({
        credentials: state.user.credentials,
       
    }));

    const {bio, website, location} = credentials;
  
    const dispatch = useDispatch();


    const [editDetailsState, seteditDetailsState] = useState({
        bio: '',
        website:'',
        location: '',
        open: false
    });

    useEffect(() => {
        seteditDetailsState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    }, []);


    const handleOpen = () => {
        seteditDetailsState({
            open: true,
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
        };

const handleChange = (event) =>{
    const {name, value} = event.target;
    seteditDetailsState( editDetailsState =>({...editDetailsState, [name]:value}))
 };

const handleClose = () => {
    seteditDetailsState({ open: false })
  };

const handleSubmit = () => {
    const userDetails = {
        bio: editDetailsState.bio,
        website: editDetailsState.website,
        location: editDetailsState.location
    }
    dispatch(editUserDetails(userDetails));
    handleClose();
  };

  const { classes } = props;

    return (
        <Fragment>
                <MyButton tip="Edit details" onClick={handleOpen} btnClassName={classes.button} >
                <EditIcon color="primary"/>
                </MyButton>
                <Dialog
                open={editDetailsState.open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <form noValidate>
                          <TextField
                            name="bio"
                            type="text"
                            label="bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            value={editDetailsState.bio}
                            onChange={handleChange}
                            fullWidth
                          />  

                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your Personal/ Professional Website"
                            value={editDetailsState.website}
                            onChange={handleChange}
                            fullWidth
                          />  

                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live"
                            value={editDetailsState.location}
                            onChange={handleChange}
                            fullWidth
                          />  

                        </form>
                    </DialogContent>
                      <DialogActions>
                          <Button onClick={handleClose} color="primary">
                              Cancel
                          </Button>
                          <Button onClick={handleSubmit} color="primary">
                              Save
                          </Button>
                      </DialogActions>
                </Dialog>
            </Fragment>
    )
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func,
    classes: PropTypes.object
}

export default withStyles(styles)(EditDetails);


// const mapStateToProps = (state) =>({
//     credentials: state.user.credentials
// });

// export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
