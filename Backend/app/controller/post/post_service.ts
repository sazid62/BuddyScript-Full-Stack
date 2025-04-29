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

    if (!payload.post_text || payload.post_text.trim() === '') {
      throw new Exception('Post text cannot be empty')
    }

    return await this.postQuery.createPost(payload)
  }

  public async editPost(payload: { postId: number; userId: number; postText: string }) {
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

  public async deletePost(payload: { userId: number; postId: number }) {
    const postExists = await Post.query()
      .where('post_id', payload.postId)
      .where('user_id', payload.userId)
      .first()

    if (!postExists) {
      throw new Exception("Post not found or you don't have permission to delete it")
    }

    return await this.postQuery.deletePost(payload)
  }

  public async likePost(payload: { userId: number; postId: number }) {
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

  public async isLiked(postId: number, userId: number) {
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

  public async dislikePost(payload: { post_id: number; user_id: number }) {
    const postLikeExist = await PostLike.query()
      .where('postId', payload.post_id)
      .where('userId', payload.user_id)
      .first()

    if (!postLikeExist) {
      throw new Exception('You have not liked this post')
    }

    return await this.postQuery.dislikePost(payload)
  }

  public async commentPost(payload: { userId: number; postId: number; commentText: string }) {
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

  public async replyComment(payload: { userId: number; commentId: number; replyText: string }) {
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

  public async likeComment(payload: { userId: number; commentId: number }) {
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

  public async dislikeComment(payload: { commentId: number; userId: number }) {
    const commentLikeExist = await CommentLike.query()
      .where('commentId', payload.commentId)
      .where('userId', payload.userId)
      .first()

    if (!commentLikeExist) {
      throw new Exception('You have not liked this comment')
    }

    return await this.postQuery.dislikeComment(payload)
  }

  public async likereplycomment(payload: { replyId: number; userId: number }) {
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

  public async dislikereplycomment(payload: { replyId: number; userId: number }) {
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

  public async getAllPosts(payload: { current_user: string; page_number: number }) {
    const { current_user, page_number } = payload

    if (!current_user || current_user.trim() === '') {
      throw new Exception('Valid user email is required')
    }

    return await this.postQuery.getAllPosts(payload)
  }

  public async getPostLikes(postId: number) {
    if (!postId || postId <= 0) {
      throw new Exception('Valid post ID is required')
    }

    const postExist = await Post.find(postId)
    if (!postExist) {
      throw new Exception('Post not found')
    }

    return await this.postQuery.getPostLikes(postId)
  }

  public async getPostComments(postId: number) {
    if (!postId || postId <= 0) {
      throw new Exception('Valid post ID is required')
    }

    const postExist = await Post.find(postId)
    if (!postExist) {
      throw new Exception('Post not found')
    }

    return await this.postQuery.getPostComments(postId)
  }

  public async getCommentReplies(commentId: number) {
    if (!commentId || commentId <= 0) {
      throw new Exception('Valid comment ID is required')
    }

    const commentExist = await PostComment.find(commentId)
    if (!commentExist) {
      throw new Exception('Comment not found')
    }

    return await this.postQuery.getCommentReplies(commentId)
  }

  public async getReplyLikes(replyId: number) {
    if (!replyId || replyId <= 0) {
      throw new Exception('Valid reply ID is required')
    }

    const replyExist = await CommentReply.find(replyId)
    if (!replyExist) {
      throw new Exception('Reply not found')
    }

    return await this.postQuery.getReplyLikes(replyId)
  }

  public async getCommentLikes(commentId: number) {
    if (!commentId || commentId <= 0) {
      throw new Exception('Valid comment ID is required')
    }

    const commentExist = await PostComment.find(commentId)
    if (!commentExist) {
      throw new Exception('Comment not found')
    }

    return await this.postQuery.getCommentLikes(commentId)
  }
}
