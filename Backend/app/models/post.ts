import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { DateTime } from 'luxon'
import PostLike from './post_like.js'
import PostComment from './post_comment.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare postId: number

  @column()
  declare userId: number

  @column()
  declare postText: string | null

  @column()
  declare isHidden: boolean

  @column.dateTime({ autoCreate: true })
  declare postCreatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => PostLike, {
    foreignKey: 'postId',
  })
  declare likes: HasMany<typeof PostLike>

  @hasMany(() => PostComment, {
    foreignKey: 'postId',
  })
  declare comments: HasMany<typeof PostComment>
}

// import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
// import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

// import User from './user.js'
// import { DateTime } from 'luxon'
// import PostLike from './post_like.js'
// import PostComment from './post_comment.js'
// export default class Post extends BaseModel {
//   @column({ isPrimary: true })
//   declare postId: number

//   @column()
//   declare userId: number

//   @column()
//   declare postText: string | null

//   @column.dateTime({ autoCreate: true })
//   declare postCreatedAt: DateTime

//   @belongsTo(() => User, {
//     foreignKey: 'userId',
//   })
//   declare user: BelongsTo<typeof User>

//   @hasMany(() => PostLike, {
//     foreignKey: 'postId',
//   })
//   declare likes: HasMany<typeof PostLike>

//   @hasMany(() => PostComment, {
//     foreignKey: 'postId',
//   })
//   declare postComments: HasMany<typeof PostComment>
//   // @hasMany(() => PostComment, {
//   //   foreignKey: 'postId',
//   // })
//   // public comments: HasMany<typeof PostComment>
// }
