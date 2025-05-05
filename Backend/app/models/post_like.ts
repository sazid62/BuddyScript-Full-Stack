import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Post from './post.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class PostLike extends BaseModel {
  public static table = 'post_likes'

  @column({ isPrimary: true })
  declare postLikesId: number

  @column()
  declare userId: number

  @column()
  declare postId: number

  @column.dateTime({ autoCreate: true })
  declare likedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Post, {
    foreignKey: 'postId',
  })
  declare post: BelongsTo<typeof Post>
}

// import { BaseModel, column } from '@adonisjs/lucid/orm'
// import User from './user.js'
// import Post from './post.js'

// import { belongsTo } from '@adonisjs/lucid/orm'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'
// export default class PostLike extends BaseModel {
//   @column({ isPrimary: true })
//   declare postLikesId: number

//   @column()
//   declare userId: number

//   @column()
//   declare postId: number

//   @belongsTo(() => User, {
//     foreignKey: 'userId',
//   })
//   declare user: BelongsTo<typeof User>

//   @belongsTo(() => Post, {
//     foreignKey: 'postId',
//   })
//   declare post: BelongsTo<typeof Post>
// }
