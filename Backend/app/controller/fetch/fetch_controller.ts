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
} from './post_validator.js'
import PostService from './post_service.js'
import { inject } from '@adonisjs/core'
import { messages } from '@vinejs/vine/defaults'

@inject()
export default class PostController {
  constructor(protected postService: PostService) {}

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
}
