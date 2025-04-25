import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const AuthController = () => import('./auth_controller.js')

router.post('/login', [AuthController, 'login'])
router.post('/reg', [AuthController, 'reg'])
router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
router.get('/islogin', [AuthController, 'islogin']).use(middleware.auth())