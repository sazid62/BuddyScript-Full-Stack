import type { HttpContext } from '@adonisjs/core/http'
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

  private async authorizeUser(ctx: HttpContext, userId: number | string) {
    const owner = await ctx.auth.authenticate()

    if (owner.$original.userId === userId) {
      return
    }
    if (owner.$original.email === userId) {
      return
    }

    throw new Exception('Unauthorized action')
  }

  public async createPost(payload: { user_id: number; post_text: string }, ctx: HttpContext) {
    console.log(payload, 'ss')
    await this.authorizeUser(ctx, payload.user_id)

    const userExistOrNot = await User.query().where('user_id', payload.user_id).first()
    if (!userExistOrNot) {
      throw new Exception("User doesn't exist")
    }

    if (!payload.post_text || payload.post_text.trim() === '') {
      throw new Exception('Post text cannot be empty')
    }

    return await this.postQuery.createPost(payload)
  }

  public async editPost(
    payload: { postId: number; userId: number; postText: string },
    ctx: HttpContext
  ) {
    await this.authorizeUser(ctx, payload.userId)

    const post = await Post.query()
      .where('post_id', payload.postId)
      .where('user_id', payload.userId)
      .first()

    if (!post) {
      throw new Exception("Post not found or you don't have permission to edit it")
    }

    if (!payload.postText || payload.postText.trim() === '') {
      throw new Exception('Post text cannot be empty')
    }

    return await this.postQuery.editPost(payload)
  }

  public async deletePost(payload: { userId: number; postId: number }, ctx: HttpContext) {
    await this.authorizeUser(ctx, payload.userId)

    const postExists = await Post.query()
      .where('post_id', payload.postId)
      .where('user_id', payload.userId)
      .first()

    if (!postExists) {
      throw new Exception("Post not found or you don't have permission to delete it")
    }

    return await this.postQuery.deletePost(payload)
  }

  public async likePost(payload: { userId: number; postId: number }, ctx: HttpContext) {
    await this.authorizeUser(ctx, payload.userId)

    const userExist = await User.query().where('user_id', payload.userId).first()
    if (!userExist) {
      throw new Exception('User not found')
    }

    const postExist = await Post.query().where('post_id', payload.postId).first()
    if (!postExist) {
      throw new Exception('Post not found')
    }

    const alreadyLiked = await PostLike.query()
      .where('userId', payload.userId)
      .where('postId', payload.postId)
      .first()

    if (alreadyLiked) {
      throw new Exception('You have already liked this post')
    }

    return await this.postQuery.likePost(payload)
  }

  public async isLiked(postId: number, userId: number, ctx: HttpContext) {
    await this.authorizeUser(ctx, userId)

    const userExist = await User.query().where('user_id', userId).first()
    if (!userExist) {
      throw new Exception('User not found')
    }

    const postExist = await Post.query().where('post_id', postId).first()
    if (!postExist) {
      throw new Exception('Post not found')
    }

    return await this.postQuery.isLiked(postId, userId)
  }

  public async dislikePost(payload: { post_id: number; user_id: number }, ctx: HttpContext) {
    await this.authorizeUser(ctx, payload.user_id)
    // console.log(payload)
    const postLikeExist = await PostLike.query()
      .where('postId', payload.post_id)
      .where('userId', payload.user_id)
      .first()

    if (!postLikeExist) {
      throw new Exception('You have not liked this post')
    }

    return await this.postQuery.dislikePost(payload)
  }

  public async commentPost(
    payload: { userId: number; postId: number; commentText: string },
    ctx: HttpContext
  ) {
    await this.authorizeUser(ctx, payload.userId)

    const postExist = await Post.find(payload.postId)
    if (!postExist) {
      throw new Exception('Post not found')
    }

    const userExist = await User.find(payload.userId)
    if (!userExist) {
      throw new Exception('User not found')
    }

    if (!payload.commentText || payload.commentText.trim() === '') {
      throw new Exception('Comment text cannot be empty')
    }

    return await this.postQuery.commentPost(payload)
  }

  public async replyComment(
    payload: { userId: number; commentId: number; replyText: string },
    ctx: HttpContext
  ) {
    await this.authorizeUser(ctx, payload.userId)

    const commentExist = await PostComment.find(payload.commentId)
    if (!commentExist) {
      throw new Exception('Comment not found')
    }

    const userExist = await User.find(payload.userId)
    if (!userExist) {
      throw new Exception('User not found')
    }

    if (!payload.replyText || payload.replyText.trim() === '') {
      throw new Exception('Reply text cannot be empty')
    }

    return await this.postQuery.replyComment(payload)
  }

  public async likeComment(payload: { userId: number; commentId: number }, ctx: HttpContext) {
    await this.authorizeUser(ctx, payload.userId)

    const commentExist = await PostComment.find(payload.commentId)
    if (!commentExist) {
      throw new Exception('Comment not found')
    }

    const userExist = await User.find(payload.userId)
    if (!userExist) {
      throw new Exception('User not found')
    }

    const alreadyLiked = await CommentLike.query()
      .where('userId', payload.userId)
      .where('commentId', payload.commentId)
      .first()

    if (alreadyLiked) {
      throw new Exception('You have already liked this comment')
    }

    return await this.postQuery.likeComment(payload)
  }

  public async dislikeComment(payload: { commentId: number; userId: number }, ctx: HttpContext) {
    await this.authorizeUser(ctx, payload.userId)

    const commentLikeExist = await CommentLike.query()
      .where('commentId', payload.commentId)
      .where('userId', payload.userId)
      .first()

    if (!commentLikeExist) {
      throw new Exception('You have not liked this comment')
    }

    return await this.postQuery.dislikeComment(payload)
  }

  public async likereplycomment(payload: { replyId: number; userId: number }, ctx: HttpContext) {
    await this.authorizeUser(ctx, payload.userId)

    const replyExist = await CommentReply.find(payload.replyId)
    if (!replyExist) {
      throw new Exception('Reply not found')
    }

    const userExist = await User.find(payload.userId)
    if (!userExist) {
      throw new Exception('User not found')
    }

    const replyCommentLikeExist = await CommentRepliesLike.query()
      .where('replyId', payload.replyId)
      .where('userId', payload.userId)
      .first()

    if (replyCommentLikeExist) {
      throw new Exception('You have already liked this reply')
    }

    return await this.postQuery.likereplycomment(payload)
  }

  public async dislikereplycomment(payload: { replyId: number; userId: number }, ctx: HttpContext) {
    await this.authorizeUser(ctx, payload.userId)

    const replyExist = await CommentReply.find(payload.replyId)
    if (!replyExist) {
      throw new Exception('Reply not found')
    }

    const userExist = await User.find(payload.userId)
    if (!userExist) {
      throw new Exception('User not found')
    }

    const replyCommentDislikeExist = await CommentRepliesLike.query()
      .where('replyId', payload.replyId)
      .where('userId', payload.userId)
      .first()

    if (!replyCommentDislikeExist) {
      throw new Exception('You have not liked this reply')
    }

    return await this.postQuery.dislikereplycomment(payload)
  }

  public async getAllPosts(
    payload: { current_user: string; page_number: number },
    ctx: HttpContext
  ) {
    await this.authorizeUser(ctx, payload.current_user)

    const { current_user, page_number } = payload

    if (!current_user || current_user.trim() === '') {
      throw new Exception('Valid user email is required')
    }

    return await this.postQuery.getAllPosts(payload)
  }

  public async getPostLikes(postId: number, ctx: HttpContext) {
    if (!postId || postId <= 0) {
      throw new Exception('Valid post ID is required')
    }

    const postExist = await Post.find(postId)
    if (!postExist) {
      throw new Exception('Post not found')
    }

    return await this.postQuery.getPostLikes(postId)
  }

  public async getPostComments(payload: { postId: number; pageNumber: number }, ctx: HttpContext) {
    // No user-specific authorization needed for viewing comments
    if (!payload.postId || payload.postId <= 0) {
      throw new Exception('Valid post ID is required')
    }

    const postExist = await Post.find(payload.postId)
    if (!postExist) {
      throw new Exception('Post not found')
    }
    return await this.postQuery.getPostComments(payload)
  }

  public async getCommentReplies(commentId: number, ctx: HttpContext) {
    // No user-specific authorization needed for viewing replies
    if (!commentId || commentId <= 0) {
      throw new Exception('Valid comment ID is required')
    }

    const commentExist = await PostComment.find(commentId)
    if (!commentExist) {
      throw new Exception('Comment not found')
    }

    return await this.postQuery.getCommentReplies(commentId)
  }

  public async getReplyLikes(replyId: number, ctx: HttpContext) {
    // No user-specific authorization needed for viewing reply likes
    if (!replyId || replyId <= 0) {
      throw new Exception('Valid reply ID is required')
    }

    const replyExist = await CommentReply.find(replyId)
    if (!replyExist) {
      throw new Exception('Reply not found')
    }

    return await this.postQuery.getReplyLikes(replyId)
  }

  public async getCommentLikes(commentId: number, ctx: HttpContext) {
    // No user-specific authorization needed for viewing comment likes
    if (!commentId || commentId <= 0) {
      throw new Exception('Valid comment ID is required')
    }

    const commentExist = await PostComment.find(commentId)
    if (!commentExist) {
      throw new Exception('Comment not found')
    }

    return await this.postQuery.getCommentLikes(commentId)
  }

  public async isHidden(payload: { postId: number; userId: number }, ctx: HttpContext) {
    await this.authorizeUser(ctx, payload.userId)

    if (payload.userId <= 0 || payload.postId <= 0) {
      throw new Exception('Valid ID is required')
    }

    const postExist = await Post.query()
      .where('postId', payload.postId)
      .where('userId', payload.userId)
      .first()
    if (!postExist) {
      throw new Exception('Unauthorize action')
    }

    return await this.postQuery.isHidden(payload)
  }

  public async popularpost(ctx: HttpContext) {
    const validUser = await ctx.auth.authenticate()

    if (!validUser.$original.email) {
      throw new Exception('Unauthorized action')
    }
    try {
      const data = await this.postQuery.popularpost()
      console.log(data, 'service')
      return data
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }
}
