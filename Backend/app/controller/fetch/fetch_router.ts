import router from '@adonisjs/core/services/router'
import PostController from './post_controller.js'

router.group(() => {
  router.post('/createpost', [PostController, 'createPost'])
  router.post('/likepost', [PostController, 'likePost'])
  router.post('/dislikepost', [PostController, 'dislikePost'])
  router.post('/commentpost', [PostController, 'commentPost'])
  router.post('/replycomment', [PostController, 'replyComment'])

  router.post('/likecomment', [PostController, 'likeComment'])
  router.post('/dislikecomment', [PostController, 'dislikeComment'])

  router.post('/likereplycomment', [PostController, 'likereplycomment'])
  router.post('/dislikereplycomment', [PostController, 'dislikereplycomment'])
})
