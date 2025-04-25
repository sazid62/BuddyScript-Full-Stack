import router from '@adonisjs/core/services/router'
import PostController from './post_controller.js'

router.group(() => {
  // Existing routes
  router.post('/createpost', [PostController, 'createPost'])
  router.post('/deletepost', [PostController, 'deletepost'])
  router.post('/likepost', [PostController, 'likePost'])
  router.post('/dislikepost', [PostController, 'dislikePost'])
  router.post('/commentpost', [PostController, 'commentPost'])
  router.post('/replycomment', [PostController, 'replyComment'])
  router.post('/likecomment', [PostController, 'likeComment'])
  router.post('/dislikecomment', [PostController, 'dislikeComment'])
  router.post('/likereplycomment', [PostController, 'likereplycomment'])
  router.post('/dislikereplycomment', [PostController, 'dislikereplycomment'])

  // New data fetching routes
  router.get('/posts', [PostController, 'getAllPosts'])
  router.get('/posts/:postId/likes', [PostController, 'getPostLikes'])
  router.get('/posts/:postId/comments', [PostController, 'getPostComments'])
  router.get('/comments/:commentId/replies', [PostController, 'getCommentReplies'])
  router.get('/replies/:replyId/likes', [PostController, 'getReplyLikes'])

  router.get('/comments/:commentId/likes', [PostController, 'getCommentLikes'])

  router.post('/isliked', [PostController, 'isliked'])
})
