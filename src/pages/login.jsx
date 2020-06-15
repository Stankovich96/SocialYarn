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
import { loginUser } from '../redux/actions/userActions';


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


//  class Login extends Component {

    
//          state = {
//             email:'',
//             password:'',
//             errors:{}
//         }
    

//      componentWillReceiveProps(nextProps){
//         if(nextProps.UI.errors){
//             this.setState({ errors: nextProps.UI.errors});
//         }
//      }
//      handleSubmit = (event) =>{
//         event.preventDefault();
       
//         const userData = {
//             email: this.state.email,
//             password: this.state.password
//         }
//         this.props.loginUser(userData, this.props.history); 
//     };

//     handleChange = (event) =>{
//        this.setState({
//            [event.target.name]: event.target.value
//        })
//     }
//     render() {
//         const {classes, UI:{ loading }} = this.props;
//         const { errors } = this.state;
//         return (
//             <Grid container className={classes.form}>
//                 <Grid item sm/>
//                 <Grid item sm>
//                     <img src={AppIcon} alt="Social Yarn"/>
//                     <Typography variant="h2" className={classes.pageTitle}>
//                         Login
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
//                             {errors.general && (
//                                 <Typography variant="body2" className={classes.customError}>
//                                     {errors.general}
//                                 </Typography>
//                             )}
//                         <Button type="submit" variant="contained" color="primary" className={classes.button}
//                         disabled={loading}
//                         >LOGIN
//                         {loading &&(<CircularProgress size={20} className={classes.progress}/>)}
//                         </Button>
//                         <br/>
//                           <small>Don't have an account ? sign up <Link to="/signup"> here</Link></small>

//                     </form>
//                 </Grid>
//                 <Grid item sm/>
//             </Grid>
//         );
//     };
// }


 const Login = (props) => {
     const {classes} = props;

     const [inputState, setinputState] = useState({
        email: '',
        password: '',
        errors:{}
    })

    const { user, UI } = useSelector(state => ({
        user: state.user,
        UI: state.UI
      }));

      const { loading, errors } = UI;

    //   const {general, email, password} = errors;

      const dispatch = useDispatch();

      const [errorState, seterrorState] = useState({
        general:'', 
        email:'', 
        password:''
      });

    const {email, password} = inputState;

    useEffect(() => {
        if(UI.errors){
            setinputState({ 
                errors: UI.errors
            });
        }
    }, []);

   const handleChange = (event) =>{
       const {name, value} = event.target;
     setinputState( inputState =>({...inputState, [name]:value}))
    };
   
    const handleSubmit = (event) =>{
        event.preventDefault();
       
        const userData = {
            email: inputState.email,
            password: inputState.password
        }
        dispatch(loginUser(userData, props.history)); 
    };
    
    return (
        <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="Social Yarn"/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={handleSubmit}>
                        
                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.TextField} 
                         error={inputState.errors.email ? true : false} 
                         helperText={inputState.errors.email}
                        value={inputState.email } 
                        onChange={handleChange} fullWidth />

                        <TextField 
                        id="password"
                         name="password"
                          type="password"
                           label="Password" 
                           className={classes.TextField} 
                            helperText={inputState.errors.password} 
                           error={inputState.errors.password ? true : false} 
                           value={inputState.password } onChange={handleChange} fullWidth />
                            {inputState.errors.general && (
                                <Typography variant="body2" className={classes.customError}>
                                    {inputState.errors.general}
                                </Typography>
                            )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button}
                        disabled={loading}
                        >LOGIN
                        {loading &&(<CircularProgress size={20} className={classes.progress}/>)}
                        </Button>
                        <br/>
                          <small>Don't have an account ? sign up <Link to="/signup"> here</Link></small>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
    );
}


Login.propTypes ={
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

// const mapStateToProps = (state) => ({
//     user: state.user,
//     UI: state.UI
// });

// const mapActionsToProps = {
//     loginUser
// }

// connect(mapStateToProps, mapActionsToProps)()

export default withStyles(styles)(Login);