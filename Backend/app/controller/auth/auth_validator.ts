import vine from '@vinejs/vine'

export const regUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine.string().trim().email().toLowerCase(),
    password: vine.string().minLength(2),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().toLowerCase(),
    password: vine.string(),
  })
)
