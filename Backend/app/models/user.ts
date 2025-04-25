import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import PostLike from './post_like.js'
import PostComment from './post_comment.js'
import CommentLike from './coment_like.js'
import CommentReply from './comment_reply.js'
import CommentReplyLike from './comment_replies_likes.js'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'], //finding a user by a UID(username) and verifying their password before marking them as logged in.
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  serializeExtras = true
  @column({ isPrimary: true })
  declare userId: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @hasMany(() => Post, {
    foreignKey: 'userId',
  })
  declare posts: HasMany<typeof Post>

  @hasMany(() => PostLike, {
    foreignKey: 'userId',
  })
  declare postLikes: HasMany<typeof PostLike>

  @hasMany(() => PostComment, {
    foreignKey: 'userId',
  })
  declare postComments: HasMany<typeof PostComment>

  @hasMany(() => CommentLike, {
    foreignKey: 'userId',
  })
  declare commentLikes: HasMany<typeof CommentLike>

  @hasMany(() => CommentReply, {
    foreignKey: 'userId',
  })
  declare commentReplies: HasMany<typeof CommentReply>

  @hasMany(() => CommentReplyLike, {
    foreignKey: 'userId',
  })
  declare commentReplyLikes: HasMany<typeof CommentReplyLike>
}

// import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
// import type { HasMany } from '@adonisjs/lucid/types/relations'
// import Post from '../models/post.js'
// import PostLike from './post_like.js'
// import PostComment from './post_comment.js'
// export default class User extends BaseModel {
//   @column({ isPrimary: true })
//   declare userId: number

//   @column()
//   declare name: string

//   @column()
//   declare email: string

//   @column({ serializeAs: null })
//   declare password: string

//   @hasMany(() => Post, {
//     foreignKey: 'userId',
//   })
//   declare posts: HasMany<typeof Post>

//   @hasMany(() => PostLike, {
//     foreignKey: 'userId',
//   })
//   declare postlike: HasMany<typeof PostLike>

//   @hasMany(() => PostComment, {
//     foreignKey: 'userId',
//   })
//   declare postcomments: HasMany<typeof PostComment>
//   // @hasMany(() => PostLike, {
//   //   foreignKey: 'userId',
//   // })
//   // public postLikes: HasMany<typeof PostLike>

//   // @hasMany(() => PostComment, {
//   //   foreignKey: 'userId',
//   // })
//   // public comments: HasMany<typeof PostComment>

//   // @hasMany(() => CommentLike, {
//   //   foreignKey: 'userId',
//   // })
//   // public commentLikes: HasMany<typeof CommentLike>

//   // @hasMany(() => CommentReply, {
//   //   foreignKey: 'userId',
//   // })
//   // public replies: HasMany<typeof CommentReply>

//   // @hasMany(() => CommentReplyLike, {
//   //   foreignKey: 'userId',
//   // })
//   // public replyLikes: HasMany<typeof CommentReplyLike>
// }
