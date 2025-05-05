import Post from '#models/post'
import User from '#models/user'
import PostLike from '#models/post_like'
import PostComment from '#models/post_comment'
import CommentReply from '#models/comment_reply'
import CommentLike from '#models/coment_like'
import CommentRepliesLike from '#models/comment_replies_likes'
import db from '@adonisjs/lucid/services/db'

export default class PostQuery {
  public async createPost(payload: { user_id: number; post_text: string }) {
    const newPost = new Post()
    newPost.userId = payload.user_id
    newPost.postText = payload.post_text

    await newPost.save()

    const post = await Post.query().where('post_id', newPost.postId).preload('user').firstOrFail()

    return {
      ...post.serialize(),
      totalLikes: 0,
      last10users: [],
      commentCount: 0,
      liked: false,
      isHidden: false,
    }
  }

  public async editPost(payload: { postId: number; userId: number; postText: string }) {
    const post = await Post.query().where('post_id', payload.postId).first()

    if (post) {
      post.postText = payload.postText
      await post.save()
    }

    return post
  }

  public async deletePost(payload: { userId: number; postId: number }) {
    await Post.query().where('post_id', payload.postId).where('user_id', payload.userId).delete()

    return {
      message: 'Post deleted successfully',
    }
  }

  public async likePost(payload: { userId: number; postId: number }) {
    const newLike = new PostLike()
    newLike.userId = payload.userId
    newLike.postId = payload.postId

    await newLike.save()
    return payload
  }

  public async isLiked(postId: number, userId: number) {
    const like = await PostLike.query().where('postId', postId).where('userId', userId).first()

    return like ? true : false
  }

  public async dislikePost(payload: { post_id: number; user_id: number }) {
    await PostLike.query()
      .where('postId', payload.post_id)
      .where('userId', payload.user_id)
      .delete()

    return {
      messages: 'Disliked Post Successfully',
    }
  }

  public async commentPost(payload: { userId: number; postId: number; commentText: string }) {
    const newComment = new PostComment()
    newComment.userId = payload.userId
    newComment.postId = payload.postId
    newComment.commentText = payload.commentText
    await newComment.save()

    const userName = await User.query().where('user_id', payload.userId).first()

    return {
      userId: newComment.userId,
      postId: newComment.postId,
      commentText: newComment.commentText,
      commentedAt: newComment.commentedAt,
      commentId: newComment.commentId,
      totalReplies: 0,
      isEdited: 0,
      userName: userName?.email,
    }
  }

  public async replyComment(payload: { userId: number; commentId: number; replyText: string }) {
    const newReply = new CommentReply()
    newReply.userId = payload.userId
    newReply.commentId = payload.commentId
    newReply.replyText = payload.replyText
    await newReply.save()

    const reply = await CommentReply.query()
      .where('reply_id', newReply.replyId)
      .preload('user')
      .first()

    return reply
  }

  public async dislikeComment(payload: { commentId: number; userId: number }) {
    const commentLike = await CommentLike.query()
      .where('commentId', payload.commentId)
      .where('userId', payload.userId)
      .first()

    if (commentLike) {
      await commentLike.delete()
    }

    return {
      message: 'Comment disliked successfully.',
    }
  }

  public async likeComment(payload: { commentId: number; userId: number }) {
    const newLike = new CommentLike()
    newLike.commentId = payload.commentId
    newLike.userId = payload.userId

    await newLike.save()

    return {
      message: 'Comment liked successfully.',
    }
  }

  public async likereplycomment(payload: { replyId: number; userId: number }) {
    const newReplyLikeOnComment = new CommentRepliesLike()
    newReplyLikeOnComment.userId = payload.userId
    newReplyLikeOnComment.replyId = payload.replyId
    await newReplyLikeOnComment.save()

    return {
      messages: 'Liked Reply Comment Successfully',
    }
  }

  public async dislikereplycomment(payload: { replyId: number; userId: number }) {
    const likeToRemove = await CommentRepliesLike.query()
      .where('replyId', payload.replyId)
      .where('userId', payload.userId)
      .first()

    if (likeToRemove) {
      await likeToRemove.delete()
    }

    return {
      messages: 'Disliked Reply Comment Successfully',
    }
  }

  public async getAllPosts(payload: { current_user: string; page_number: number }) {
    console.log(payload)
    try {
      const current_user_id = await User.query().where('email', payload.current_user).firstOrFail()
      const posts = await Post.query()
        .preload('user', (query) => {
          query.select('email', 'image')
        })
        .withCount('likes')
        .withCount('comments')
        .preload('likes', (query) => {
          query.select('post_id', 'user_id').preload('user', (query) => {
            query.select('email', 'image')
          })
        })
        .preload('liked', (query) => {
          query.where('post_likes.user_id', current_user_id.$attributes.userId)
        })
        .where((query) => {
          query.where('isHidden', false).orWhere('user_id', current_user_id.$attributes.userId)
        })
        .orderBy('postCreatedAt', 'desc')
        .forPage(payload.page_number, 10)

      const formattedPosts = posts.map((post) => {
        return {
          postId: post.postId,
          userId: post.userId,
          postCreatedAt: post.postCreatedAt,
          isHidden: post.isHidden,
          postText: post.postText,
          user: post.user,
          totalLikes: post.$extras.likes_count,
          commentCount: post.$extras.comments_count,
          last10users: post.likes.map((like) => {
            return like.user
          }),
          liked: post.liked.length >= 1,
        }
      })

      return formattedPosts
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`)
    }
  }
  public async getPostLikes(postId: number) {
    try {
      const totalLikes = await PostLike.query().where('postId', postId).count('*', 'total').first()

      const latestLikes = await PostLike.query()
        .where('postId', postId)
        .preload('user')
        .orderBy('likedAt', 'desc')
        .limit(10)

      const userNames = latestLikes.map((like) => ({
        email: like.user.email,
      }))

      return {
        last10users: userNames,
        totalLikes: totalLikes ? Number(totalLikes.$extras.total) : 0,
      }
    } catch (error) {
      throw new Error(`Failed to fetch post likes: ${error.message}`)
    }
  }
  public async getPostComments(payload: { postId: number; pageNumber: number }) {
    const { postId, pageNumber } = payload

    const comments = await PostComment.query()
      .where('postId', postId)
      .preload('user')
      .preload('replies')
      .orderBy('commentedAt', 'desc')
      .paginate(pageNumber, 5)

    const result = await Promise.all(
      comments.map(async (comment) => {
        const replyCount = await CommentReply.query()
          .where('commentId', comment.commentId)
          .count('* as total')
          .first()

        return {
          commentId: comment.commentId,
          postId: comment.postId,
          userId: comment.userId,
          commentText: comment.commentText,
          commentedAt: comment.commentedAt,
          isEdited: comment.isEdited,
          userName: comment.user?.email || null,
          totalReplies: replyCount ? Number(replyCount.$extras.total) : 0,
        }
      })
    )

    return result
  }

  public async getCommentReplies(commentId: number) {
    const replies = await CommentReply.query()
      .where('commentId', commentId)
      .preload('user', (query) => {
        query.select('email', 'name')
      })
      .orderBy('repliedAt', 'desc')

    return replies
  }

  public async getReplyLikes(replyId: number) {
    const totalLikes = await CommentRepliesLike.query()
      .where('replyId', replyId)
      .count('*', 'total')
      .first()

    const latestLikes = await CommentRepliesLike.query()
      .where('replyId', replyId)
      .preload('user', (query) => {
        query.select('user_id', 'name')
      })
      .orderBy('likedAt', 'desc')
      .limit(10)

    const userNames = latestLikes.map((like) => ({
      user_id: like.userId,
      name: like.user.name,
    }))

    return {
      total_likes: totalLikes ? totalLikes.total : 0,
      latest_users: userNames,
    }
  }

  public async getCommentLikes(commentId: number) {
    const totalLikes = await CommentLike.query()
      .where('commentId', commentId)
      .count('*', 'total')
      .first()

    const latestLikes = await CommentLike.query()
      .where('commentId', commentId)
      .preload('user', (query) => {
        query.select('user_id', 'name')
      })
      .orderBy('likedAt', 'desc')
      .limit(10)

    const userNames = latestLikes.map((like) => ({
      user_id: like.userId,
      name: like.user.name,
    }))

    return {
      total_likes: totalLikes ? totalLikes.total : 0,
      latest_users: userNames,
    }
  }
  public async isHidden(payload: { postId: number; userId: number }) {
    const post = await Post.query()
      .where('post_id', payload.postId)
      .where('user_id', payload.userId)
      .first()

    if (!post) {
      throw new Error('Post not found or user not authorized')
    }

    post.isHidden = !post.isHidden
    await post.save()
    return post
  }
  public async popularpost() {
    const postsWithLikes = await db
      .from('posts')
      .join('users', 'posts.user_id', '=', 'users.user_id')
      .leftJoin('post_likes', 'posts.post_id', '=', 'post_likes.post_id')
      .leftJoin('post_comments', 'posts.post_id', '=', 'post_comments.post_id')
      .select('posts.*')
      .select('users.name')
      .select(db.raw('COUNT(DISTINCT post_likes.post_likes_id) as totalLikes'))
      .select(db.raw('COUNT(DISTINCT post_comments.comment_id) as totalComments'))
      .groupBy('posts.post_id', 'users.name')
      .orderBy('totalLikes', 'desc')
      .orderBy('totalComments', 'desc')
      .limit(10)

    return postsWithLikes
  }
}
