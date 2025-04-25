import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import PostComment from './post_comment.js'
import CommentReplyLike from './comment_replies_likes.js'

export default class CommentReply extends BaseModel {
  public static table = 'comment_replies'

  @column({ isPrimary: true })
  declare replyId: number

  @column()
  declare commentId: number

  @column()
  declare userId: number

  @column()
  declare replyText: string

  @column.dateTime({ autoCreate: true, columnName: 'replied_at' })
  declare repliedAt: DateTime

  @column.dateTime({ autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime

  @column()
  declare isEdited: boolean

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => PostComment, {
    foreignKey: 'commentId',
  })
  declare comment: BelongsTo<typeof PostComment>

  @hasMany(() => CommentReplyLike, {
    foreignKey: 'replyId',
  })
  declare likes: HasMany<typeof CommentReplyLike>
}

// import { DateTime } from 'luxon'
// import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// import User from './user.js'
// import PostComment from './post_comment.js'

// export default class CommentReply extends BaseModel {
//   @column({ isPrimary: true })
//   declare replyId: number

//   @column()
//   declare commentId: number

//   @column()
//   declare userId: number

//   @column()
//   declare replyText: string

//   @column.dateTime({ columnName: 'replied_at' })
//   declare repliedAt: DateTime

//   @column.dateTime({ columnName: 'updated_at' })
//   declare updatedAt: DateTime

//   @column()
//   declare isEdited: boolean

//   // Optional relationships
//   @belongsTo(() => User)
//   declare user: BelongsTo<typeof User>

//   @belongsTo(() => PostComment)
//   declare postcomment: BelongsTo<typeof PostComment>
// }
