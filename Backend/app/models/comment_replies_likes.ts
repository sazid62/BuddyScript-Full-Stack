import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import CommentReply from './comment_reply.js'

export default class CommentRepliesLike extends BaseModel {
  @column({ isPrimary: true })
  declare replyLikeId: number

  @column()
  declare replyId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true, columnName: 'liked_at' })
  declare likedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => CommentReply, {
    foreignKey: 'replyId',
  })
  declare reply: BelongsTo<typeof CommentReply>
}

// import { DateTime } from 'luxon'
// import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// import User from './user.js'
// import CommentReply from './coment_like.js'

// export default class CommentReplyLike extends BaseModel {
//   @column({ isPrimary: true })
//   declare replyLikeId: number

//   @column()
//   declare replyId: number

//   @column()
//   declare userId: number

//   @column.dateTime({ columnName: 'liked_at' })
//   declare likedAt: DateTime

//   @belongsTo(() => User)
//   declare user: BelongsTo<typeof User>

//   @belongsTo(() => CommentReply)
//   declare commentReply: BelongsTo<typeof CommentReply>
// }
