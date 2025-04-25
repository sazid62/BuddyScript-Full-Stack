import Post from '#models/post'
import User from '#models/user'
import PostLike from '#models/post_like'
import PostComment from '#models/post_comment'
import CommentReply from '#models/comment_reply'
import CommentLike from '#models/coment_like'
import CommentRepliesLike from '#models/comment_replies_likes'
import db from '@adonisjs/lucid/services/db'

export default class PostQuery {
  // Existing methods
  public async createPost(payload: { user_id: number; post_text: string }) {
    const newPost = new Post()
    newPost.userId = payload.user_id
    newPost.postText = payload.post_text

    await newPost.save()

    const post = await Post.query()
      .where('post_id', newPost.postId)
      .preload('user', (q) => {
        q.select('name')
      })
      .firstOrFail()

    return {
      user_id: payload.user_id,
      user_name: post.user.name,
      post_text: payload.post_text,
    }
  }

  public async likePost(payload: { userId: number; postId: number }) {
    const newLike = new PostLike()
    newLike.userId = payload.userId
    newLike.postId = payload.postId

    await newLike.save()
    return payload
  }

  public async dislikePost(payload: { post_id: number }) {
    await PostLike.query().where('postId', payload.post_id).delete()
    return {
      messages: 'Deleted Succesfully',
    }
  }

  public async commentPost(payload: { userId: number; postId: number; commentText: string }) {
    const newComment = new PostComment()
    newComment.userId = payload.userId
    newComment.postId = payload.postId
    newComment.commentText = payload.commentText
    await newComment.save()

    return newComment
  }

  public async replyComment(payload: { userId: number; commentId: number; replyText: string }) {
    const newReply = new CommentReply()
    newReply.userId = payload.userId
    newReply.commentId = payload.commentId
    newReply.replyText = payload.replyText
    await newReply.save()

    return newReply
  }

  public async dislikeComment(payload: { commentId: number; userId: number }) {
    const commentLikeExist = await CommentLike.query()
      .where('commentId', payload.commentId)
      .where('userId', payload.userId)
      .first()

    if (!commentLikeExist) {
      return {
        message: 'This comment like does not exist.',
      }
    }

    await commentLikeExist.delete()

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
      messages: 'Liked Reply Comment Succesfully',
    }
  }

  public async dislikereplycomment(payload: { replyId: number; userId: number }) {
    const newReplydislikeOnComment = await CommentRepliesLike.query()
      .where('replyId', payload.replyId)
      .where('userId', payload.userId)
      .first()

    await newReplydislikeOnComment.delete()
    return {
      messages: 'Disliked Reply Comment Succesfully',
    }
  }

  // New methods for fetching data
  public async getAllPosts() {
    const posts = await Post.query()
      .preload('user', (query) => {})
      .orderBy('postCreatedAt', 'desc')

    return posts
  }

  public async getPostLikes(postId: number) {
    const totalLikes = await PostLike.query().where('postId', postId).count('*', 'total').first()
    // console.log(totalLikes, 'sajid')

    const latestLikes = await PostLike.query()
      .where('postId', postId)
      .preload('user', (query) => {
        // query.select('user_id', 'email')
      })
      .orderBy('likedAt', 'desc')
      .limit(10)

    // Format the response
    const userNames = latestLikes.map((like) => ({
      email: like.user.email,
    }))

    return {
      last10users: userNames,
      totalLikes: totalLikes ? Number(totalLikes.$extras.total) : 0,
    }
  }

  public async getPostComments(postId: number) {
    // Fetch all comments on a specific post with user information
    const comments = await PostComment.query()
      .where('postId', postId)
      .preload('user', (query) => {})
      .orderBy('commentedAt', 'desc')

    const result = comments.map((comment) => {
      return {
        commentId: comment.commentId,
        postId: comment.postId,
        userId: comment.userId,
        commentText: comment.commentText,
        commentedAt: comment.commentedAt,
        isEdited: comment.isEdited,
        userName: comment.user?.email || null, // optional chaining
      }
    })
    return result
  }

  public async getCommentReplies(commentId: number) {
    // Fetch all replies to a specific comment with user information
    const replies = await CommentReply.query()
      .where('commentId', commentId)
      .preload('user', (query) => {
        query.select('email', 'name')
      })
      .orderBy('repliedAt', 'desc')

    return replies
  }

  public async getReplyLikes(replyId: number) {
    // Get total count of likes on a reply comment
    const totalLikes = await CommentRepliesLike.query()
      .where('replyId', replyId)
      .count('*', 'total')
      .first()

    // Get 10 latest users who liked the reply
    const latestLikes = await CommentRepliesLike.query()
      .where('replyId', replyId)
      .preload('user', (query) => {
        query.select('user_id', 'name')
      })
      .orderBy('likedAt', 'desc')
      .limit(10)

    // Format the response
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
    // Get total count of likes on a comment
    const totalLikes = await CommentLike.query()
      .where('commentId', commentId)
      .count('*', 'total')
      .first()

    // Get 10 latest users who liked the comment
    const latestLikes = await CommentLike.query()
      .where('commentId', commentId)
      .preload('user', (query) => {
        query.select('user_id', 'name')
      })
      .orderBy('likedAt', 'desc')
      .limit(10)

    // Format the response
    const userNames = latestLikes.map((like) => ({
      user_id: like.userId,
      name: like.user.name,
    }))

    return {
      total_likes: totalLikes ? totalLikes.total : 0,
      latest_users: userNames,
    }
  }
}
