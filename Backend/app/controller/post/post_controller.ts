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
  getPostCommentsPostValidator,
  isHiddenPostValidator,
} from './post_validator.js'
import PostService from './post_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class PostController {
  constructor(protected postService: PostService) {}

  public async createPost(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(createPostValidator)
      const postCreated = await this.postService.createPost(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Posted your content!',
        data: postCreated,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  public async editpost(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(editpostPostValidator)
      const editedPost = await this.postService.editPost(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Post updated successfully!',
        data: editedPost,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  public async deletepost(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(deletepostPostValidator)
      await this.postService.deletePost(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Successfully deleted post',
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  public async likePost(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(likePostValidator)
      const data = await this.postService.likePost(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Post liked successfully!',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async isliked(ctx: HttpContext) {
    try {
      const { postId, userId } = ctx.request.body()
      if (!postId || !userId) {
        return ctx.response.status(400).json({
          status: 'error',
          messages: 'Post ID and User ID are required',
        })
      }

      const result = await this.postService.isLiked(postId, userId, ctx)
      return ctx.response.ok({
        status: 'success',
        data: result,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async dislikePost(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(dislikePostValidator)
      const data = await this.postService.dislikePost(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Post disliked successfully!',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async commentPost(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(commentPostValidator)
      const data = await this.postService.commentPost(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Comment added successfully',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async replyComment(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(replyPostValidator)
      const data = await this.postService.replyComment(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'You replied to a comment successfully',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async likeComment(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(likeCommentPostValidator)
      const data = await this.postService.likeComment(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'You liked a comment successfully',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async dislikeComment(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(dislikeCommentPostValidator)
      const data = await this.postService.dislikeComment(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'You disliked a comment successfully',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async likereplycomment(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(likeReplyCommentPostValidator)
      const data = await this.postService.likereplycomment(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'You liked a reply comment successfully',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async dislikereplycomment(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(dislikeReplyCommentPostValidator)
      const data = await this.postService.dislikereplycomment(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'You disliked a reply comment successfully',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getAllPosts(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(getAllPostsPostValidator)
      if (!payload?.current_user) {
        return ctx.response.status(400).json({
          status: 'error',
          messages: 'Current user is required',
        })
      }

      const posts = await this.postService.getAllPosts(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Posts fetched successfully',
        data: posts,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getPostLikes(ctx: HttpContext) {
    try {
      const postId = Number(ctx.params.postId)
      if (isNaN(postId) || postId <= 0) {
        return ctx.response.status(400).json({
          status: 'error',
          messages: 'Valid post ID is required',
        })
      }

      const likes = await this.postService.getPostLikes(postId, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Post likes fetched successfully',
        data: likes,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getPostComments(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(getPostCommentsPostValidator)
      const postId = Number((await payload).postId)

      if (isNaN(postId) || postId <= 0) {
        return ctx.response.status(400).json({
          status: 'error',
          messages: 'Valid post ID is required',
        })
      }

      const comments = await this.postService.getPostComments(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Post comments fetched successfully',
        data: comments,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getCommentReplies(ctx: HttpContext) {
    try {
      const commentId = Number(ctx.params.commentId)
      if (isNaN(commentId) || commentId <= 0) {
        return ctx.response.status(400).json({
          status: 'error',
          messages: 'Valid comment ID is required',
        })
      }

      const replies = await this.postService.getCommentReplies(commentId, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Comment replies fetched successfully',
        data: replies,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getReplyLikes(ctx: HttpContext) {
    try {
      const replyId = Number(ctx.params.replyId)
      if (isNaN(replyId) || replyId <= 0) {
        return ctx.response.status(400).json({
          status: 'error',
          messages: 'Valid reply ID is required',
        })
      }

      const likes = await this.postService.getReplyLikes(replyId, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Reply likes fetched successfully',
        data: likes,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async getCommentLikes(ctx: HttpContext) {
    try {
      const commentId = Number(ctx.params.commentId)
      if (isNaN(commentId) || commentId <= 0) {
        return ctx.response.status(400).json({
          status: 'error',
          messages: 'Valid comment ID is required',
        })
      }

      const likes = await this.postService.getCommentLikes(commentId, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Comment likes fetched successfully',
        data: likes,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async isHidden(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(isHiddenPostValidator)
      const data = await this.postService.isHidden(payload, ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Change Privacy successfully',
        data: data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }

  public async popularpost(ctx: HttpContext) {
    try {
      const data = await this.postService.popularpost(ctx)
      return ctx.response.ok({
        status: 'success',
        message: 'Popular post fetched successfully',
        data,
      })
    } catch (error) {
      return ctx.response.status(400).json({
        status: 'error',
        messages: error.message,
      })
    }
  }
}
