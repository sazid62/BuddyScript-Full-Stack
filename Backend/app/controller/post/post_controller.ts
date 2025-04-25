import type { HttpContext } from '@adonisjs/core/http'
import {
  createPostValidator,
  likePostValidator,
  commentPostValidator,
  replyPostValidator,
  dislikePostValidator,
  likeCommentPostValidator,
  dislikeCommentPostValidator,
  likeReplyCommentPostValidator,
  dislikeReplyCommentPostValidator,
  postIdValidator,
  commentIdValidator,
  replyIdValidator,
  deletepostPostValidator,
} from './post_validator.js'
import PostService from './post_service.js'
import { inject } from '@adonisjs/core'
import PostLike from '#models/post_like'
import Post from '#models/post'

@inject()
export default class PostController {
  constructor(protected postService: PostService) {}

  // Existing methods
  public async createPost({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createPostValidator)
      const postCreated = await this.postService.createPost(payload)
      return response.ok({
        status: 'success',
        message: 'Posted your content!',
        postCreated,
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        error: error.message,
      })
    }
  }
  public async deletepost({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(deletepostPostValidator)
      const { userId, postId } = payload
      await Post.query().where('post_id', postId).where('user_id', userId).delete()
      return response.ok({
        status: 'success',
        message: 'successfully Deleted Post',
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  public async likePost({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(likePostValidator)
      const data = await this.postService.likePost(payload)
      return response.ok({ status: 'success', message: 'Post liked suceefull!', data })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }
  public async isliked({ request, response }: HttpContext) {
    const { postId, userId } = request.body()
    return await PostLike.query().where('post_id', postId).where('user_id', userId).first()
  }

  public async dislikePost({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(dislikePostValidator)
      const data = await this.postService.dislikePost(payload)
      return response.ok({ status: 'success', message: 'Post Disliked suceefull!', data })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async commentPost({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(commentPostValidator)
      const data = await this.postService.commentPost(payload)
      return response.ok({
        status: 'success',
        message: 'Comment added Succesfully',
        data,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async replyComment({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(replyPostValidator)
      const data = await this.postService.replyComment(payload)
      return response.ok({
        status: 'success',
        message: 'You reply a comment  Succesfully',
        data,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async likeComment({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(likeCommentPostValidator)
      const data = await this.postService.likeComment(payload)
      return response.ok({
        status: 'success',
        message: 'You liked a commment successfully',
        data,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async dislikeComment({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(dislikeCommentPostValidator)
      const data = await this.postService.dislikeComment(payload)
      return response.ok({
        status: 'success',
        message: 'You disliked a commment successfully',
        data,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async likereplycomment({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(likeReplyCommentPostValidator)
      const data = await this.postService.likereplycomment(payload)
      return response.ok({
        status: 'success',
        message: 'You liked a reply commment successfully',
        data,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async dislikereplycomment({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(dislikeReplyCommentPostValidator)
      const data = await this.postService.dislikereplycomment(payload)
      return response.ok({
        status: 'success',
        message: 'You disliked a reply commment successfully',
        data,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  // New methods for fetching data
  public async getAllPosts({ response }: HttpContext) {
    try {
      const posts = await this.postService.getAllPosts()
      return response.ok({
        status: 'success',
        message: 'Posts fetched successfully',
        data: posts,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getPostLikes({ params, response }: HttpContext) {
    try {
      const postId = Number(params.postId)
      const likes = await this.postService.getPostLikes(postId)
      return response.ok({
        status: 'success',
        message: 'Post likes fetched successfully',
        data: likes,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getPostComments({ params, response }: HttpContext) {
    try {
      const postId = Number(params.postId)
      const comments = await this.postService.getPostComments(postId)
      return response.ok({
        status: 'success',
        message: 'Post comments fetched successfully',
        data: comments,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getCommentReplies({ params, response }: HttpContext) {
    try {
      const commentId = Number(params.commentId)
      const replies = await this.postService.getCommentReplies(commentId)
      return response.ok({
        status: 'success',
        message: 'Comment replies fetched successfully',
        data: replies,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getReplyLikes({ params, response }: HttpContext) {
    try {
      const replyId = Number(params.replyId)
      const likes = await this.postService.getReplyLikes(replyId)
      return response.ok({
        status: 'success',
        message: 'Reply likes fetched successfully',
        data: likes,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getCommentLikes({ params, response }: HttpContext) {
    try {
      const commentId = Number(params.commentId)
      const likes = await this.postService.getCommentLikes(commentId)
      return response.ok({
        status: 'success',
        message: 'Comment likes fetched successfully',
        data: likes,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }
}
