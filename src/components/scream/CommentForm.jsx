import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//MUISTUFF
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//REDUX
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from '../../redux/actions/dataActions';


const styles = theme =>({
    submitButton:{
        position:'relative',
        float:'right',
        marginTop:10
    },
    visibleSeparator:{
        width:'100%',
        borderBottom:'1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      }
})

// class CommentForm extends Component {
//     state ={
//         body:'',
//         errors:{}
//     }

//     componentWillReceiveProps(nextProps){
//         if(nextProps.UI.errors){
//             this.setState({
//                 errors: nextProps.UI.errors
//             })
//         }
//         if(!nextProps.UI.errors && !nextProps.UI.loading){
//             this.setState({ body:''});
//         }
//     }

//     handleChange = (event) =>{
//      this.setState({
//         [event.target.name]: event.target.value
//      })
//     }
    
//     handleSubmit = (event) => {
//         event.preventDefault();
//         this.props.submitComment(this.props.screamId, {body: this.state.body});
        
//       };

//     render(){
//         const { classes, authenticated } = this.props;
//         const errors = this.state.errors;
//         const commentForMarkup = authenticated ? (
//             <Grid item sm={12} style={{ textAlign: 'center'}}>
//                 <form onSubmit={this.handleSubmit}>
//                     <TextField
//                     name="body"
//                     type="text"
//                     label="Comment on scream"
//                     error={errors.comment ? true: false}
//                     helperText={errors.comment}
//                     className={classes.textField}
//                     value={this.state.body}
//                     onChange={this.handleChange}
//                     fullWidth
//                     />
//                      <Button type="submit" variant="contained" color="primary"
//                           className={classes.button}>
//                               Submit
//                           </Button>
//                 </form>
//                 <hr className={classes.visibleSeparator}/>
//             </Grid>
//         ) : null
//         return commentForMarkup;
//     }
// }
// CommentForm.propTypes ={
//     submitComment: PropTypes.func.isRequired,
//     UI: PropTypes.object.isRequired,
//     classes: PropTypes.object.isRequired,
//     screamId: PropTypes.string.isRequired,
//     authenticated: PropTypes.bool.isRequired,
// }

// const mapStateToProps = state => ({
//     UI: state.UI,
//     authenticated: state.user.authenticated
// })

// const mapActionsToProps = { submitComment };
// export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));


const CommentForm = (props) => {
    const { classes,screamId } = props;

    const {UI, authenticated} = useSelector(state => ({
        UI: state.UI,
        authenticated: state.user.authenticated
    }));

    const {loading, errors} = UI;

    const dispatch = useDispatch();

    const [commentState, setCommentState] = useState({
        body:'',
        errors:{}
    })

    useEffect(() => {
        if(UI.errors){
            setCommentState({
                errors: UI.errors
            })
        }
        if(!UI.errors && !UI.loading){
            setCommentState({ body:'',errors:{} });
        }
    }, []);

     const handleChange = (event) =>{
        const {name, value} = event.target;
        setCommentState( commentState =>({...commentState, [name]:value}))
     };
       
    const handleSubmit = (event) => {
           event.preventDefault();
           dispatch(submitComment(screamId, {body: commentState.body}));
           
         };

    const commentForMarkup = authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center'}}>
            <form onSubmit={handleSubmit}>
                <TextField
                name="body"
                type="text"
                label="Comment on scream"
                error={commentState.errors.comment ? true: false}
                helperText={commentState.errors.comment}
                className={classes.textField}
                value={commentState.body}
                onChange={handleChange}
                fullWidth
                />
                 <Button type="submit" variant="contained" color="primary"
                      className={classes.button}>
                          Submit
                      </Button>
            </form>
            <hr className={classes.visibleSeparator}/>
        </Grid>
    ) : null

    return commentForMarkup;
}

CommentForm.propTypes ={
    submitComment: PropTypes.func,
    UI: PropTypes.object,
    classes: PropTypes.object,
    screamId: PropTypes.string,
    authenticated: PropTypes.bool,
}

export default withStyles(styles)(CommentForm)
