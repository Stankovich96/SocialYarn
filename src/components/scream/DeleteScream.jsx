import React, { Component, Fragment, useState, useEffect  } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';

//MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//REDUX
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { deleteScream } from '../../redux/actions/dataActions';

const styles = {
    deleteButton:{
        position:'absolute',
        left:'90%',
        top:'10%'
    }
}

// class DeleteScream extends Component {
//     state ={
//         open:false
//     };
//     handleOpen = () => {
//         this.setState({ open: true })
//       };
    
//     handleClose = () => {
//         this.setState({ open: false })
//       };
//     deleteScream = () => {
//         this.props.deleteScream(this.props.screamId);
//         this.setState({ open: false });
//      };
 
//     render() {
//         const { classes} = this.props;
//         return (
//            <Fragment>
//                <MyButton tip="Delete Scream" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
//                     <DeleteOutline color="secondary"/>
//                </MyButton>
//                <Dialog
//                 open={this.state.open}
//                 onClose={this.handleClose}
//                 fullWidth
//                 maxWidth="sm">
//                     <DialogTitle>Are You Sure you want to Delete ?</DialogTitle>
//                     <DialogActions>
//                           <Button onClick={this.handleClose} color="primary">
//                               Cancel
//                           </Button>
//                           <Button onClick={this.deleteScream} color="secondary">
//                               Delete
//                           </Button>
//                       </DialogActions>
//                </Dialog>
//            </Fragment>
//         )
//     }
// }


const DeleteScream = (props) => {

    const { classes, screamId} = props;

    const [openState, setopenState] = useState({
        open:false
    });

    const dispatch = useDispatch();

    const deleteS = () => {
        dispatch(deleteScream(screamId));
        setopenState({ open: false });
     };

    const handleOpen = () => {
        setopenState({ open: true })
      };
    
    const handleClose = () => {
        setopenState({ open: false })
      };

   

    
    return (
        <Fragment>
               <MyButton tip="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary"/>
               </MyButton>
               <Dialog
                open={openState.open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Are You Sure you want to Delete ?</DialogTitle>
                    <DialogActions>
                          <Button onClick={handleClose} color="primary">
                              Cancel
                          </Button>
                          <Button onClick={deleteS} color="secondary">
                              Delete
                          </Button>
                      </DialogActions>
               </Dialog>
           </Fragment>
    )
}

DeleteScream.propTypes =
{
 deleteScream: PropTypes.func,
 classes:  PropTypes.object,
 screamId:  PropTypes.string
}

export default withStyles(styles)(DeleteScream);


// DeleteScream.propTypes =
// {
//  deleteScream: PropTypes.func.isRequired,
//  classes:  PropTypes.object.isRequired,
//  screamId:  PropTypes.string.isRequired
// }


// export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));
