import vine from '@vinejs/vine'

// Existing validators
export const createPostValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    post_text: vine.string().maxLength(1000),
  })
)
export const editpostPostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    userId: vine.number(),
    postText: vine.string(),
  })
)

export const likePostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    userId: vine.number(),
  })
)
export const deletepostPostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    userId: vine.number(),
  })
)

export const dislikePostValidator = vine.compile(
  vine.object({
    post_id: vine.number(),
    user_id: vine.number(),
  })
)
export const getPostCommentsPostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    pageNumber: vine.number(),
  })
)
export const isHiddenPostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    userId: vine.number(),
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
export const getAllPostsPostValidator = vine.compile(
  vine.object({
    current_user: vine.string().email(),
    page_number: vine.number().optional(),
  })
)

// New validators for data fetching
export const postIdValidator = vine.compile(
  vine.object({
    postId: vine.number(),
  })
)

export const commentIdValidator = vine.compile(
  vine.object({
    commentId: vine.number(),
  })
)

export const replyIdValidator = vine.compile(
  vine.object({
    replyId: vine.number(),
  })
)
