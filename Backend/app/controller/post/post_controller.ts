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
  editpostPostValidator,
  getAllPostsPostValidator,
} from './post_validator.js'
import PostService from './post_service.js'
import { inject } from '@adonisjs/core'

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
        data: postCreated,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  public async editpost({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(editpostPostValidator)
      const editedPost = await this.postService.editPost(payload)
      return response.ok({
        status: 'success',
        message: 'Post updated successfully!',
        data: editedPost,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  public async deletepost({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(deletepostPostValidator)
      await this.postService.deletePost(payload)
      return response.ok({
        status: 'success',
        message: 'Successfully deleted post',
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  public async likePost({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(likePostValidator)
      const data = await this.postService.likePost(payload)
      return response.ok({
        status: 'success',
        message: 'Post liked successfully!',
        data,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async isliked({ request, response }: HttpContext) {
    try {
      const { postId, userId } = request.body()
      if (!postId || !userId) {
        return response.status(400).json({
          status: 'error',
          messages: 'Post ID and User ID are required',
        })
      }

      const result = await this.postService.isLiked(postId, userId)
      return response.ok({
        status: 'success',
        data: result,
      })
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
      return response.ok({
        status: 'success',
        message: 'Post disliked successfully!',
        data,
      })
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
        message: 'Comment added successfully',
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
        message: 'You replied to a comment successfully',
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
        message: 'You liked a comment successfully',
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
        message: 'You disliked a comment successfully',
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
        message: 'You liked a reply comment successfully',
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
        message: 'You disliked a reply comment successfully',
        data,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getAllPosts({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(getAllPostsPostValidator)
      if (!payload?.current_user) {
        return response.status(400).json({
          status: 'error',
          messages: 'Current user is required',
        })
      }

      const posts = await this.postService.getAllPosts(payload)
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
      if (isNaN(postId) || postId <= 0) {
        return response.status(400).json({
          status: 'error',
          messages: 'Valid post ID is required',
        })
      }

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
      if (isNaN(postId) || postId <= 0) {
        return response.status(400).json({
          status: 'error',
          messages: 'Valid post ID is required',
        })
      }

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
      if (isNaN(commentId) || commentId <= 0) {
        return response.status(400).json({
          status: 'error',
          messages: 'Valid comment ID is required',
        })
      }

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
      if (isNaN(replyId) || replyId <= 0) {
        return response.status(400).json({
          status: 'error',
          messages: 'Valid reply ID is required',
        })
      }

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
      if (isNaN(commentId) || commentId <= 0) {
        return response.status(400).json({
          status: 'error',
          messages: 'Valid comment ID is required',
        })
      }

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
