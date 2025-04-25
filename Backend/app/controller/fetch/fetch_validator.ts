import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    post_text: vine.string().maxLength(1000),
  })
)

export const likePostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    userId: vine.number(),
  })
)
export const dislikePostValidator = vine.compile(
  vine.object({
    post_id: vine.number(),
    // userId: vine.number(),
  })
)

export const commentPostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    userId: vine.number(),
    commentText: vine.string(),
  })
)

export const replyPostValidator = vine.compile(
  vine.object({
    commentId: vine.number(),
    userId: vine.number(),
    replyText: vine.string().minLength(2),
  })
)

export const likeCommentPostValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    commentId: vine.number(),
  })
)
export const dislikeCommentPostValidator = vine.compile(
  vine.object({
    commentId: vine.number(),
    userId: vine.number(),
  })
)
export const likeReplyCommentPostValidator = vine.compile(
  vine.object({
    replyId: vine.number(),
    userId: vine.number(),
  })
)

export const dislikeReplyCommentPostValidator = vine.compile(
  vine.object({
    replyId: vine.number(),
    userId: vine.number(),
  })
)
