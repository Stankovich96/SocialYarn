import React, { Component,useEffect,useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.jpg';
import { Link } from 'react-router-dom';

//MUI stuffs
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

//REDUX Stuff
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from '../redux/actions/userActions';

const styles = {
    form:{
        textAlign:'center'
    },
    image:{
        margin:'10px auto 10px auto'  
    },
    pageTitle:{
        margin:'20px auto 20px auto'  
    },
    textField:{
        margin:'10px auto 10px auto'
    },
    button:{
        marginTop:20,
        position:'relative'
    },
    customError:{
        color:'red',
        fontSize:'0.8rem',
        marginTop:10
    }, 
    progress:{
        position:'absolute'
    }
};

//  class signup extends Component {

//      constructor(){
//          super();
//          this.state ={
//             email:'',
//             password:'',
//             confirmPassword:'',
//             handle:'',
//             errors:{}
//         }
//      }


//      componentWillReceiveProps(nextProps){
//         if(nextProps.UI.errors){
//             this.setState({ errors: nextProps.UI.errors});
//         }
//      }

//      handleSubmit = (event) =>{
//         event.preventDefault();

//         const newUserData = {
//             email: inputState.email,
//             password: this.state.password,
//             confirmPassword: this.state.confirmPassword,
//             handle: this.state.handle
//         }
//         this.props.signupUser(newUserData, this.props.history);
//     };

//     handleChange = (event) =>{
//        this.setState({
//            [event.target.name]: event.target.value
//        })
//     }
//     render() {
//         const {classes, UI:{ loading }} = this.props;
//         const { errors} = this.state;
//         return (
//             <Grid container className={classes.form}>
//                 <Grid item sm/>
//                 <Grid item sm>
//                     <img src={AppIcon} alt="Social Yarn"/>
//                     <Typography variant="h2" className={classes.pageTitle}>
//                         Signup
//                     </Typography>
//                     <form noValidate onSubmit={this.handleSubmit}>
                        
//                         <TextField 
//                         id="email" 
//                         name="email" 
//                         type="email" 
//                         label="Email" 
//                         className={classes.TextField} helperText={errors.email}
//                         error={errors.email ? true : false} value={this.state.email} 
//                         onChange={this.handleChange} fullWidth />

//                         <TextField 
//                         id="password"
//                          name="password"
//                           type="password"
//                            label="Password" 
//                            className={classes.TextField} helperText={errors.password} error={errors.password ? true : false} 
//                            value={this.state.password} onChange={this.handleChange} fullWidth />

//                         <TextField 
//                         id="confirmPassword"
//                          name="confirmPassword"
//                           type="password"
//                            label="Confirm Password" 
//                            className={classes.TextField} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} 
//                            value={this.state.confirmPassword} onChange={this.handleChange} fullWidth />

//                         <TextField 
//                         id="handle"
//                          name="handle"
//                           type="text"
//                            label="Handle" 
//                            className={classes.TextField} helperText={errors.handle} error={errors.handle ? true : false} 
//                            value={this.state.handle} onChange={this.handleChange} fullWidth />



//                             {errors.general && (
//                                 <Typography variant="body2" className={classes.customError}>
//                                     {errors.general}
//                                 </Typography>
//                             )}
//                         <Button type="submit" variant="contained" color="primary" className={classes.button}
//                         disabled={loading}
//                         >Signup
//                         {loading &&(<CircularProgress size={20} className={classes.progress}/>)}
//                         </Button>
//                         <br/>
//                           <small>Already have an account ? login<Link to="/login"> here</Link></small>

//                     </form>
//                 </Grid>
//                 <Grid item sm/>
//             </Grid>
//         );
//     };
// }


const Signup = (props) => {

    const {classes} = props;

    const [inputState, setinputState] = useState({
        email:'',
        password:'',
        confirmPassword:'',
        handle:'',
        errors:{}
    });

    const { user, UI } = useSelector(state => ({
        user: state.user,
        UI: state.UI
      }));

      const { loading, errors } = UI

    const dispatch = useDispatch();

    useEffect(() => {
        if(UI.errors){
            setinputState({ 
                errors: UI.errors
            });
        }
    }, [UI]);

   const handleChange = (event) =>{
       const {name, value} = event.target;
     setinputState( inputState =>({...inputState, [name]:value}))
    };
   
    const handleSubmit = (event) =>{
        event.preventDefault();
       
        const newUserData = {
            email: inputState.email,
            password: inputState.password,
            confirmPassword: inputState.confirmPassword,
            handle: inputState.handle
        }
        dispatch(signupUser(newUserData, props.history)); 
    };
    
    return (
        <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
            <img src={AppIcon} alt="Social Yarn"/>
            <Typography variant="h2" className={classes.pageTitle}>
                Signup
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
                
                <TextField 
                id="email" 
                name="email" 
                type="email" 
                label="Email" 
                className={classes.TextField} 
                // helperText={errors.email}
                // error={errors.email ? true : false}
                value={inputState.email} 
                onChange={handleChange} fullWidth />

                <TextField 
                id="password"
                 name="password"
                  type="password"
                   label="Password" 
                   className={classes.TextField} 
                //    helperText={errors.password}
                //    error={errors.password ? true : false} 
                   value={inputState.password} onChange={handleChange} fullWidth />

                <TextField 
                id="confirmPassword"
                 name="confirmPassword"
                  type="password"
                   label="Confirm Password" 
                   className={classes.TextField} 
                //    helperText={errors.confirmPassword} 
                //    error={errors.confirmPassword ? true : false} 
                   value={inputState.confirmPassword} onChange={handleChange} fullWidth />

                <TextField 
                id="handle"
                 name="handle"
                  type="text"
                   label="Handle" 
                   className={classes.TextField} 
                //    helperText={errors.handle} 
                //    error={errors.handle ? true : false} 
                   value={inputState.handle} onChange={handleChange} fullWidth />

                    {/* {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )} */}

                <Button type="submit" variant="contained" color="primary" className={classes.button}
                disabled={loading}
                >Signup
                {loading &&(<CircularProgress size={20} className={classes.progress}/>)}
                </Button>
                <br/>
                  <small>Already have an account ? login<Link to="/login"> here</Link></small>

            </form>
        </Grid>
        <Grid item sm/>
    </Grid>
    )
}


Signup.propTypes ={
    classes: PropTypes.object,
    user: PropTypes.object,
    UI: PropTypes.object,
    signupUser: PropTypes.func
}
// const mapStateToProps = (state) => ({
//     user: state.user,
//     UI: state.UI
// })

// const mapActionsToProps = {
//     signupUser
// }

export default withStyles(styles)(Signup);