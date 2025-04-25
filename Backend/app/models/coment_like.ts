import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import PostComment from './post_comment.js'

export default class CommentLike extends BaseModel {
  public static table = 'comment_likes'

  @column({ isPrimary: true })
  declare commentLikeId: number

  @column()
  declare commentId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true, columnName: 'liked_at' })
  declare likedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => PostComment, {
    foreignKey: 'commentId',
  })
  declare comment: BelongsTo<typeof PostComment>
}

// import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'
// import User from './user.js'
// import { DateTime } from 'luxon'
// import PostComment from './post_comment.js'

// export default class CommentLike extends BaseModel {
//   @column({ isPrimary: true })
//   declare commentLikesId: number

//   @column()
//   declare commentId: number

//   @column()
//   declare userId: number

//   @column.dateTime({ autoCreate: true })
//   declare likedAt: Date

//   @belongsTo(() => User, {
//     foreignKey: 'userId',
//   })
//   declare user: BelongsTo<typeof User>

//   @belongsTo(() => PostComment, {
//     foreignKey: 'commentId',
//   })
//   declare comment: BelongsTo<typeof PostComment>
// }
