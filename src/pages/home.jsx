import React, {  Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../utils/ScreamSkeleton';

//REDUX
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { getScreams } from '../redux/actions/dataActions';

const Home = (props) =>{

    const { data } = useSelector(state => ({
        data: state.data
      }));
      const dispatch = useDispatch();

    // const { getScreams, data } = props; 
    
    useEffect(() => {
        dispatch(getScreams())
    },[]);

    const { screams, loading} = data
    let recentScreamsMarkup = !loading ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
   <ScreamSkeleton/>
    );

   

    return (
        <Fragment>
            <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
               {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
               <Profile/> 
            </Grid>
        </Grid>
        </Fragment>
    );
}

Home.propTypes ={
    getScreams: PropTypes.func,
    data: PropTypes.object
}

// const mapStateToProps = state =>({
//     data: state.data
// })

export default Home;

// connect(mapStateToProps, { getScreams})(Home);