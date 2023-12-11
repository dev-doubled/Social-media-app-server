import AuthRouter from "./auth.js"
import UserRouter from "./user.js"
import PostRouter from "./post.js"
import PhotoRouter from "./photos.js"
import CommentRouter from "./comment.js"
import ReplyCommentRouter from "./replyComment.js"

const route = (app) => {
  app.use("/api/v1/auth", AuthRouter)
  app.use("/api/v1/user", UserRouter)
  app.use("/api/v1/post", PostRouter)
  app.use("/api/v1/photo", PhotoRouter)
  app.use("/api/v1/comment", CommentRouter)
  app.use("/api/v1/replyComment", ReplyCommentRouter)
}

export default route