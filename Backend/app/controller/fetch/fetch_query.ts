import Post from '#models/post'
import User from '#models/user'
import PostLike from '#models/post_like'
import { messages } from '@vinejs/vine/defaults'
import PostComment from '#models/post_comment'
import CommentReply from '#models/comment_reply'
import CommentLike from '#models/coment_like'
import CommentReplyLike from '#models/comment_replies_likes'
import CommentRepliesLike from '#models/comment_replies_likes'

export default class PostQuery {
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
    await PostLike.query().where('postLikesId', payload.post_id).delete()
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

    // Delete the existing like to "dislike" the comment
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
}
