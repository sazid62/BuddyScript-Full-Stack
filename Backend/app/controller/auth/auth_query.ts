import User from '#models/user'

export default class AuthQuery {
  constructor() {}

  public async regUser(payload: { name: string; password: string; email: string }) {
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    })

    return user
  }

  public async loginUser(payload: { password: string; email: string }) {
    const user = await User.verifyCredentials(payload.email, payload.password)
    return user
  }
}
