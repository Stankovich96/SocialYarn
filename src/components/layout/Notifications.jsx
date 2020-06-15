import React, { Component, Fragment,useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { markNotificationsRead } from '../../redux/actions/userActions';

// class Notifications extends Component {
//   state = {
//     anchorEl: null
//   };
//   handleOpen = (event) => {
//     this.setState({ anchorEl: event.target });
//   };
//   handleClose = () => {
//     this.setState({ anchorEl: null });
//   };
//   onMenuOpened = () => {
//     let unreadNotificationsIds = this.props.notification.filter((not) => !not.read)
//       .map((not) => not.notificationId);
//     this.props.markNotificationsRead(unreadNotificationsIds);
//   };
//   render() {
//     const notification = this.props.notification;
//     const anchorEl = this.state.anchorEl;

//     dayjs.extend(relativeTime);

//     let notificationsIcon;
//     if (notification && notification.length > 0) {
//       notification.filter((not) => not.read === false).length > 0
//         ? (notificationsIcon = 
//             <Badge
//               badgeContent={
//                 notification.filter((not) => not.read === false).length
//               }
//               color="secondary">
//               <NotificationsIcon />
//             </Badge>
//           )
//         : (notificationsIcon = <NotificationsIcon />);
//     } else {
//       notificationsIcon = <NotificationsIcon />;
//     }
//     let notificationsMarkup =
//       notification && notification.length > 0 ? (
//         notification.map((not) => {
//           const verb = not.type === 'like' ? 'liked' : 'commented on';
//           const time = dayjs(not.createdAt).fromNow();
//           const iconColor = not.read ? 'primary' : 'secondary';
//           const icon =
//             not.type === 'like' ? (
//               <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
//             ) : (
//               <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
//             );

//           return (
//             <MenuItem key={not.createdAt} onClick={this.handleClose}>
//               {icon}
//               <Typography
//                 component={Link}
//                 color="primary"
//                 variant="body1"
//                 to={`/users/${not.recipient}/scream/${not.screamId}`}
//               >
//                 {not.sender} {verb} your scream {time}
//               </Typography>
//             </MenuItem>
//           );
//         })
//       ) : (
//         <MenuItem onClick={this.handleClose}>
//           You have no notifications yet
//         </MenuItem>
//       );
//     return (
//       <Fragment>
//         <Tooltip placement="top" title="Notifications">
//           <IconButton
//             aria-owns={anchorEl ? 'simple-menu' : undefined}
//             aria-haspopup="true"
//             onClick={this.handleOpen}
//           >
//             {notificationsIcon}
//           </IconButton>
//         </Tooltip>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={this.handleClose}
//           onEntered={this.onMenuOpened}
//         >
//           {notificationsMarkup}
//         </Menu>
//       </Fragment>
//     );
//   }
// }



const Notifications = (props) => {

  const {notification} = useSelector(state =>({
      notification: state.user.notification
    }));

  const dispatch = useDispatch();

  const [anchorState, setanchorState] = useState({
    anchorEl: null
  });

  const handleOpen = (event) => {
    setanchorState({ anchorEl: event.target });
  };
  const handleClose = () => {
    setanchorState({ anchorEl: null });
  };
  const onMenuOpened = () => {
    let unreadNotificationsIds = notification.filter((not) => !not.read)
      .map((not) => not.notificationId);
    dispatch(markNotificationsRead(unreadNotificationsIds));
  };

    const anchorEl = anchorState.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notification && notification.length > 0) {
      notification.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = 
            <Badge
              badgeContent={
                notification.filter((not) => not.read === false).length
              }
              color="#ff3d00">
              <NotificationsIcon />
            </Badge>
          )
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }
    let notificationsMarkup =
      notification && notification.length > 0 ? (
        notification.map((not) => {
          const verb = not.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={not.createdAt} onClick={handleClose}>
              {icon}
              <Typography
                component={Link}
                color="primary"
                variant="body1"
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={handleClose}>
          You have no notifications yet
        </MenuItem>
      );
  
  return (
    <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onEntered={onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
  );
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func,
  notification: PropTypes.array
};


export default Notifications;


// const mapStateToProps = (state) => ({
//   notification: state.user.notification
// });

// const mapActionToProps = {  markNotificationsRead }

// export default connect(
//   mapStateToProps,
//   mapActionToProps
// )(Notifications);