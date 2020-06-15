import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../utils/ScreamSkeleton';
import ProfileSkeleton from '../utils/ProfileSkeleton';

//REDUX
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { getUserData} from '../redux/actions/dataActions';

//  class user extends Component { 
//      state = {
//          profile: null,
//          screamIdParam:null
//      }
     
//      componentDidMount(){
//          const handle = this.match.params.handle;
//          const screamId = this.props.match.params.screamId;

//          if(screamId) this.setState({ screamIdParam: screamId});

//          this.props.getUserData(handle);
//          axios.get(`https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/user/${handle}`)
//             .then((res)=>{
//                 this.setState({
//                     profile:res.data.user
//                 })
//             })
//             .catch(err => console.log(err));
//      }
     
//     render() {
//           const { screams, loading} = this.props.data;
//           const { screamIdParam} = this.state;

//           const screamsMarkup = loading ? (
//             <ScreamSkeleton />
//           ) : screams === null ? (
//               <p>No screams from this user</p>
//           ) : !screamIdParam ? (
//               screams.map((scream) => <Scream key={scream.screamId} scream={scream}/>)
//           ) : (
//             screams.map((scream) => {
//                 if(scream.screamId !== screamIdParam)
//                 return <Scream key={scream.screamId} scream={scream}/>
//                 else return <Scream key={scream.screamId} scream={scream} openDialog/>
//             }) 
//           )

//         return (
//             <Grid container spacing={10}>
//                 <Grid item sm={8} xs={12}>
//                    {screamsMarkup}
//                 </Grid>
//                 <Grid item sm={4} xs={12}>
//                   {this.state.profile === null ?(
//                       <ProfileSkeleton/>
//                   ) : (
//                     <StaticProfile profile={this.state.profile}/>
//                   )} 
//                 </Grid>
//             </Grid>
//         )
//     }
// }


const User = (props) => {

    const {match} = props;

    const [UserState, setUserState] = useState({
        profile: null,
        screamIdParam:null,
        handle:null
    })

    

    const { data } = useSelector(state => ({
        data: state.data
      }));

    const { screams, loading} = data;
    const { screamIdParam} = UserState;

    const dispatch = useDispatch();

    useEffect(() => {
        const handle = match.params.handle;
        const screamId = match.params.screamId;

        if(screamId) setUserState({ screamIdParam: screamId});

        
        axios.get(`https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/user/${handle}`)
           .then((res)=>{
            setUserState({
                   profile:res.data.user,
                   handle:match.params.handle
               })
           })
           .catch(err => console.log(err));
           dispatch(getUserData(handle));

           return () => {
            axios.Cancel()
        }
    }, []);

    

    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
        <p>No screams from this user</p>
    ) : !screamIdParam ? (
        screams.map((scream) => <Scream key={scream.screamId} scream={scream}/>)
    ) : (
      screams.map((scream) => {
          if(scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream}/>
          else return <Scream key={scream.screamId} scream={scream} openDialog/>
      }) 
    )

    return (
        <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
           {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {UserState.profile === null ?(
              <ProfileSkeleton/>
          ) : (
            <StaticProfile profile={UserState.profile} handle={UserState.handle} />
          )} 
        </Grid>
    </Grid>
    )
}



User.propTypes = {
    getUserData: PropTypes.func,
    data: PropTypes.object
}

// const mapStateToProps = state =>({
//     data: state.data
// })

// const mapActionToProps = { getUserData };

export default User;

// connect(mapStateToProps, mapActionToProps)