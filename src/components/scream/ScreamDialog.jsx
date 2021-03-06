import React, { Component, Fragment, useState, useEffect  } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUISTUFF

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//REDUX
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { getScream, clearErrors } from '../../redux/actions/dataActions';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

const styles = theme => ({
    invisibleSeparator:{
        border:'none',
        margin:4
    },
    profileImage:{
        maxWidth:200,
        height: 200,
        borderRadius: '50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding:20
    },
    closeButton:{
        position:'absolute',
        left:'90%'
    },
    expandButton:{
        position:'absolute',
        left:'90%'
    },
    spinnerDiv:{
        textAlign:'center',
        marginTop: 50,
        marginBottom: 50
    }
});

// class ScreamDialog extends Component {
//     state ={
//         open:false,
//         oldPath:'',
//         newPath:''
//     }
//     componentDidMount() {
//         if (this.props.openDialog) {
//           this.handleOpen();
//         }
//       }

//     handleOpen = () => {
//         //logic for turning every thing clicked into a path
//         let oldPath = window.location.pathname;

//         const { userHandle, screamId } = this.props;
//         const newPath = `/users/${userHandle}/scream/${screamId}`;
    
//         if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    
//         window.history.pushState(null, null, newPath);
    
//         this.setState({ open: true, oldPath, newPath });
//         this.props.getScream(this.props.screamId);
//       };
    
//     handleClose = () => {
//         window.history.pushState(null, null, this.state.oldPath);
//         this.setState({ open: false })
//         this.props.clearErrors();
//       };

//     render(){
//         const { classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount, comments}, UI:{loading} } = this.props;

//         const dialogMarkup = loading ? (
//            <div className={classes.spinnerDiv}>
//                 <CircularProgress size={200}
//                 thickness={2}
//                 />
//           </div>
//         ): (
//             <Grid container spacing={10}>
//                  <Grid item sm={5}>
//                     <img src={userImage} alt="Profile" className={classes.profileImage}/>
//                  </Grid>
//                  <Grid item sm={7}>
//                     <Typography
//                     component={Link} to={`/users/${userHandle}`} color="primary" variant="h5">
//                     @{userHandle}
//                     </Typography>
//                     <hr className={classes.invisibleSeparator}/>
//                     <Typography variant="body2" color="textSecondary">
//                         {dayjs(createdAt).format('h:m a, MMMM DD YYYY')}
//                     </Typography>
//                     <hr className={classes.invisibleSeparator}/>
//                     <Typography variant="body1">
//                         {body}
//                     </Typography>
//                     <LikeButton screamId={screamId}/>
//                     <span>{likeCount} likes</span>
//                     <MyButton tip="comments">
//                         <ChatIcon color="primary"/>
//                     </MyButton>
//                     <span>{commentCount} comment</span>
//                  </Grid>
//                  <hr className={classes.visibleSeparator}/>
//                  <CommentForm screamId={screamId}/>
//                  <Comments comments={comments}/>
//             </Grid>
//         )

//         return(
//             <Fragment>
//                 <MyButton tip="Expand Scream" onClick={this.handleOpen} tipClassName={classes.expandButton}>
//                 <UnfoldMore color="primary"/>
//                </MyButton>
//                <Dialog
//                 open={this.state.open}
//                 onClose={this.handleClose}
//                 fullWidth
//                 maxWidth="sm">
//                     <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton} >
//                     <CloseIcon/>
//                     </MyButton>
//                     <DialogContent className={classes.dialogContent}>
//                         {dialogMarkup}
//                     </DialogContent>
//                 </Dialog>
//             </Fragment>
//         )

//     }

// }


const ScreamDialog = (props) => {
    const [pathState, setpathState] = useState({
        open:false,
        oldPath:'',
        newPath:''
    });

    const {scream, UI} = useSelector(state => ({
        scream: state.data.scream,
        UI: state.UI
    }));

    const {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount, comments} = scream;

    const {loading} = UI;

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.openDialog) {
            handleOpen();
          }
    }, [])

    const handleOpen = () => {
        //logic for turning every thing clicked into a path
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;
    
        if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    
        window.history.pushState(null, null, newPath);
    
        setpathState({ open: true, oldPath, newPath });
        dispatch(getScream(screamId));
      };
    
    const handleClose = () => {
        window.history.pushState(null, null, pathState.oldPath);
        setpathState({ open: false })
        dispatch(clearErrors());
      };

      const { classes } = props;

        const dialogMarkup = loading ? (
           <div className={classes.spinnerDiv}>
                <CircularProgress size={200}
                thickness={2}
                />
          </div>
        ): (
            <Grid container spacing={10}>
                 <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                 </Grid>
                 <Grid item sm={7}>
                    <Typography
                    component={Link} to={`/users/${userHandle}`} color="primary" variant="h5">
                    @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:m a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comment</span>
                 </Grid>
                 <hr className={classes.visibleSeparator}/>
                 <CommentForm screamId={screamId}/>
                 <Comments comments={comments}/>
            </Grid>
        )

    return (
        <Fragment>
                <MyButton tip="Expand Scream" onClick={handleOpen} tipClassName={classes.expandButton}>
                <UnfoldMore color="primary"/>
               </MyButton>
               <Dialog
                open={pathState.open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm">
                    <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton} >
                    <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
    )
}

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func,
    getScream: PropTypes.func,
    screamId: PropTypes.string,
    userHandle: PropTypes.string,
    scream: PropTypes.object,
    UI: PropTypes.object,
}

export default withStyles(styles)(ScreamDialog);

// ScreamDialog.propTypes = {
//     clearErrors: PropTypes.func.isRequired,
//     getScream: PropTypes.func.isRequired,
//     screamId: PropTypes.string.isRequired,
//     userHandle: PropTypes.string.isRequired,
//     scream: PropTypes.object,
//     UI: PropTypes.object.isRequired,
// }
// const mapStateToProps = (state) =>({
//     scream: state.data.scream,
//     UI: state.UI
// })

// const mapActionsToProps = { getScream, clearErrors };

// export default connect(mapStateToProps, mapActionsToProps )(withStyles(styles)(ScreamDialog));