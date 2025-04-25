import db from '@adonisjs/lucid/services/db'
import PostQuery from './post_query.js'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import Post from '#models/post'
import PostLike from '#models/post_like'
import PostComment from '#models/post_comment'
import CommentLike from '#models/coment_like'
import CommentReply from '#models/comment_reply'

import CommentRepliesLike from '#models/comment_replies_likes'
@inject()
export default class PostService {
  constructor(protected postQuery: PostQuery) {}

  public async createPost(payload: { user_id: number; post_text: string }) {
    const userExistOrNot = await User.query().where('user_id', payload.user_id).first()
    if (!userExistOrNot) {
      throw new Exception("User doesn't exist")
    }
    return await this.postQuery.createPost(payload)
  }

  public async likePost(payload: { userId: number; postId: number }) {
    const userExist = await User.query().where('user_id', payload.userId).first()
    const postExist = await Post.query().where('post_id', payload.postId).first()
    if (!userExist || !postExist) {
      throw new Exception('UserId/PostId not found..!')
    }
    return await this.postQuery.likePost(payload)
  }
  public async dislikePost(payload: { post_id: number }) {
    const postLikeIdExist = await PostLike.find(payload.post_id)

    if (!postLikeIdExist) {
      throw new Exception('Post not found..!')
    }

    return await this.postQuery.dislikePost(payload)
  }
  public async commentPost(payload: { userId: number; postId: number; commentText: string }) {
    const postExist = await Post.find(payload.postId)
    const userExist = await User.find(payload.userId)

    if (!postExist || !userExist) {
      throw new Exception('Please provide correct user/post id')
    }

    return await this.postQuery.commentPost(payload)
  }
  public async replyComment(payload: { userId: number; commentId: number; replyText: string }) {
    const commentExist = await PostComment.find(payload.commentId)
    const userExist = await User.find(payload.userId)

    if (!commentExist || !userExist) {
      throw new Exception('Please provide correct user/comment id')
    }

    return await this.postQuery.replyComment(payload)
  }

  public async likeComment(payload: { userId: number; commentId: number }) {
    const commentExist = await PostComment.find(payload.commentId)
    const userExist = await User.find(payload.userId)
    const alreadyLiked = await CommentLike.query()
      .where('userId', payload.userId)
      .where('commentId', payload.commentId)
      .first()

    if (!commentExist || !userExist) {
      throw new Exception('USer/comment wontt exist..')
    }
    if (alreadyLiked) {
      throw new Exception('You already Liked Boss')
    }

    return await this.postQuery.likeComment(payload)
  }

  public async dislikeComment(payload: { commentId: number; userId: number }) {
    const commentLikeExist = await CommentLike.query()
      .where('commentId', payload.commentId)
      .where('userId', payload.userId)
      .firstOrFail()

    if (!commentLikeExist) {
      throw new Exception('This ID of Comment Like wont Exist..')
    }
    // return commentLikeExist

    return await this.postQuery.dislikeComment(payload)
  }

  public async likereplycomment(payload: { replyId: number; userId: number }) {
    const replyCommentLikeExist = await CommentRepliesLike.query()
      .where('replyId', payload.replyId)
      .where('userId', payload.userId)
      .first()

    if (replyCommentLikeExist) {
      throw new Exception('Already you liked this reply Comment!')
    }

    return await this.postQuery.likereplycomment(payload)
  }

  public async dislikereplycomment(payload: { replyId: number; userId: number }) {
    const replyCommentDislikeExist = await CommentRepliesLike.query()
      .where('replyId', payload.replyId)
      .where('userId', payload.userId)
      .first()

    if (!replyCommentDislikeExist) {
      throw new Exception('Already you disliked this reply Comment!')
    }

    return await this.postQuery.dislikereplycomment(payload)
  }
}
