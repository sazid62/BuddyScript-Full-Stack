import AuthService from './auth_service.js'
import { HttpContext } from '@adonisjs/core/http'
import { regUserValidator, loginUserValidator } from './auth_validator.js'
import { inject } from '@adonisjs/core'
import { messages } from '@vinejs/vine/defaults'

@inject()
export default class AuthController {
  constructor(protected authService: AuthService) {}

  public async reg({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(regUserValidator)
      const user = await this.authService.regUser(payload)
      return response.status(201).json({
        status: 'success',
        data: user,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'User registration failed',
        error: error.message,
      })
    }
  }

  public async login({ response, request, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(loginUserValidator)
      const user = await this.authService.loginUser(payload)
      await auth.use('web').login(user)

      return response.status(200).json({
        status: 'success',
        data: await auth.use('web').user,
      })
    } catch (error) {
      return response.status(401).json({
        status: 'error',
        message: 'Authentication failed',
        error: error.message,
      })
    }
  }
  public async logout({ response, auth }: HttpContext) {
    const data = await auth.use('web').logout()
    response.send({ message: 'Successfully logged out', data })
  }
  public async islogin({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return user
  }
}
