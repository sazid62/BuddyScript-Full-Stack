import Post from '#models/post'
import User from '#models/user'
import PostLike from '#models/post_like'
import PostComment from '#models/post_comment'
import CommentReply from '#models/comment_reply'
import CommentLike from '#models/coment_like'
import CommentRepliesLike from '#models/comment_replies_likes'
import db from '@adonisjs/lucid/services/db'
import { current } from '@reduxjs/toolkit'

export default class PostQuery {
  // Existing methods
  public async createPost(payload: { user_id: number; post_text: string }) {
    const newPost = new Post()
    newPost.userId = payload.user_id
    newPost.postText = payload.post_text

    await newPost.save()

    const post = await Post.query().where('post_id', newPost.postId).preload('user').firstOrFail() // ✅ Get a single post, not an array

    return {
      ...post.serialize(), // ✅ serialize() to convert into a plain object
      totalLikes: 0,
      last10users: [],
      commentCount: 0,
      liked: false,
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

    const userName = await User.query().where('user_id', payload.userId).first()

    //   {
    //     "commentId": 796,
    //     "postId": 281,
    //     "userId": 115,
    //     "commentText": "2222222222",
    //     "commentedAt": "2025-04-27T11:32:11.000+00:00",
    //     "isEdited": 0,
    //     "userName": "aaaaa@gmail.com",
    //     "totalReplies": 0
    // },
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

  public async getAllPosts(current_user_email: string) {
    const posts = await Post.query().preload('user').orderBy('postCreatedAt', 'desc')

    // Add await here and provide proper default value
    const currentUserInfo = (await User.query().where('email', current_user_email).first()) || {
      userId: null,
    }

    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        const likeInfo = await PostLike.query()
          .where('postId', post.postId)
          .count('*', 'totalLikes')
          .first()

        const last10Users = await PostLike.query()
          .where('postId', post.postId)
          .preload('user', (query) => {})
          .orderBy('likedAt', 'desc')
          .limit(10)

        // Only check likes if we have a valid userId
        let userLiked = null
        if (currentUserInfo.userId) {
          userLiked = await PostLike.query()
            .where('postId', post.postId)
            .andWhere('userId', currentUserInfo.userId)
            .first()
        }

        const commentCount = await PostComment.query()
          .where('postId', post.postId)
          .count('*', 'total')
          .first()

        return {
          ...post.serialize(),
          totalLikes: likeInfo ? Number(likeInfo.$extras.totalLikes) : 0,
          last10users: last10Users.map((like) => ({
            email: like.user.email,
            userId: like.user.userId,
          })),
          commentCount: commentCount ? Number(commentCount.$extras.total) : 0,
          liked: !!userLiked,
        }
      })
    )

    return enhancedPosts
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
      .preload('user')
      .preload('replies')
      .orderBy('commentedAt', 'desc')

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
