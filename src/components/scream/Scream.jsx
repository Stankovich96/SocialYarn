import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../../utils/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

//REDUX
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

//Icons
import ChatIcon from '@material-ui/icons/Chat';


const styles = {
    card:{
        position:'relative',
        display:'flex',
        marginBottom:20,
    },
    image:{
        minWidth:200,
    },
    content:{
        padding:25,
        objectFit:'cover'
    }
}
//  class Scream extends Component {
    
//     render() {
//         dayjs.extend(relativeTime);
//         const { classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount}, user:{
//             authenticated, credentials:{ handle }
//         } } = this.props;

       

//         const deleteButton = authenticated && userHandle === handle ?(
//             <DeleteScream screamId={screamId}/>
//         ): null
        
        
//         return (
//            <Card className={classes.card}>
//                <CardMedia 
//                image={userImage}
//                title="Profile image"
//                className={classes.image}
//                />
//                <CardContent className={classes.content}>
//                     <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
//                      {deleteButton}
//                     <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
//                     <Typography variant="body2">{body}</Typography> 
//                     <LikeButton screamId={screamId}/>
//                     <span>{likeCount} likes</span>
//                     <MyButton tip="comments">
//                         <ChatIcon color="primary"/>
//                     </MyButton>
//                     <span>{commentCount} comment</span>
//                     <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
//                </CardContent>
//            </Card>
//         );
//     }
// }


const Scream = (props) => {

    const {user} = useSelector(state => ({
        user: state.user 
    }));

    dayjs.extend(relativeTime);

    const { classes, scream} = props;

    const {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount} = scream;

    const {authenticated, credentials} = user;

    const { handle } = credentials;
   

    const deleteButton = authenticated && userHandle === handle ?(
        <DeleteScream screamId={screamId}/>
    ): null

    return (
        <Card className={classes.card}>
               <CardMedia 
               image={userImage}
               title="Profile image"
               className={classes.image}
               />
               <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                     {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body2">{body}</Typography> 
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comment</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={props.openDialog}/>
               </CardContent>
           </Card>
    )
}

Scream.propTypes = {
    user: PropTypes.object,
    scream: PropTypes.object,
    classes: PropTypes.object,
    openDialog: PropTypes.bool
}

export default withStyles(styles)(Scream);

// Scream.propTypes = {
//     user: PropTypes.object.isRequired,
//     scream: PropTypes.object.isRequired,
//     classes: PropTypes.object.isRequired,
//     openDialog: PropTypes.bool
// }

// // const mapStateToProps = state =>({
// //     user: state.user
// // })


// // export default connect(mapStateToProps)(withStyles(styles)(Scream));

