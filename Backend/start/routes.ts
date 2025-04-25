/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import '../app/controller/post/post_router.ts'
import '../app/controller/auth/auth_router.ts'
import router from '@adonisjs/core/services/router'
import PostLike from '#models/post_like'

router.get('/ssss', async ({ request, response }) => {
  const { postId } = request.qs()

  const liker = await PostLike.query().where('postId', postId).count('* as total')
  console.log(liker)

  return response.ok({ totalLikes: liker[0].$extras.total })
})
