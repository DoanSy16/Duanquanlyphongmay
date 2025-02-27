import HomeRoute from './HomeRoute';
import AuthRoute from './AuthRoute';
import EmptyRoomRoute from './EmptyRoomRoute';
import ManageRoute from './ManageRoute';
import NotificationsRoute from './NotificationsRoute';
// import PostRoute from './PostRoute'
// import FollowRoute from './FollowRoute'
// import CommentRoute from './CommentRoute'
// import MessageRoute from './MessageRoute'
// import SearchRoute from './SearchRoute'

const initRoutes = (app) => {

  //   app.use('/api/v1/users', UsersRoute);
  app.use('/api/v1/oauth', AuthRoute);
  app.use('/api/v1/user/empty', EmptyRoomRoute);
  //   app.use('/api/v1/user/follow',FollowRoute);
  //   app.use('/api/v1/user/comment',CommentRoute);
  //   app.use('/api/v1/user/message',MessageRoute);
  //   app.use('/api/v1/user/search',SearchRoute);
  app.use('/api/v1/admin', ManageRoute);
  app.use('/api/v1/admin', NotificationsRoute);

  app.use('/api/home', HomeRoute);
  return app.use('/', (req, res) => {
    return res.send('server on');
  })
}
module.exports = initRoutes