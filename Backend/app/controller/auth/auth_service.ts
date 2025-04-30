import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import AuthQuery from './auth_query.js'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthService {
  constructor(protected authQuery: AuthQuery) {}

  public async regUser(payload: { name: string; email: string; password: string }) {
    const userExist = await User.query().where('email', payload.email).first()
    if (userExist) {
      throw new Exception('Email already exists')
    }
    return await this.authQuery.regUser(payload)
  }

  public async loginUser(payload: { email: string; password: string }) {
    const userExist = await User.query().where('email', payload.email).first()
    const user = await this.authQuery.loginUser(payload)
    if (!userExist || !user) {
      throw new Exception('Authentication Failed')
    }
    return user
  }
}
