import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Post from './post.js'
import CommentLike from './coment_like.js'
import CommentReply from './comment_reply.js'

export default class PostComment extends BaseModel {
  public static table = 'post_comments'

  @column({ isPrimary: true, columnName: 'comment_id' })
  declare commentId: number

  @column({ columnName: 'post_id' })
  declare postId: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'comment_text' })
  declare commentText: string

  @column.dateTime({ autoCreate: true, columnName: 'commented_at' })
  declare commentedAt: DateTime

  @column({ columnName: 'is_edited' })
  declare isEdited: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Post, {
    foreignKey: 'postId',
  })
  declare post: BelongsTo<typeof Post>

  @hasMany(() => CommentLike, {
    foreignKey: 'commentId',
  })
  declare likes: HasMany<typeof CommentLike>

  @hasMany(() => CommentReply, {
    foreignKey: 'commentId',
  })
  declare replies: HasMany<typeof CommentReply>
}

// import { DateTime } from 'luxon'
// import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// import User from './user.js'
// import Post from './post.js'

// export default class PostComment extends BaseModel {
//   public static table = 'post_comments' // Explicitly setting table name

//   @column({ isPrimary: true, columnName: 'comment_id' })
//   declare commentId: number

//   @column({ columnName: 'post_id' })
//   declare postId: number

//   @column({ columnName: 'user_id' })
//   declare userId: number

//   @column({ columnName: 'comment_text' })
//   declare commentText: string

//   @column.dateTime({ autoCreate: true, columnName: 'commented_at' })
//   declare commentedAt: DateTime

//   @column({ columnName: 'is_edited' })
//   declare isEdited: number

//   @belongsTo(() => User, {
//     foreignKey: 'user_id',
//   })
//   declare user: BelongsTo<typeof User>

//   @belongsTo(() => Post, {
//     foreignKey: 'post_id',
//   })
//   declare post: BelongsTo<typeof Post>
// }
