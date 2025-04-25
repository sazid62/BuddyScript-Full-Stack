import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'email': 'Please provide a valid email address',

  'name.minLength': 'Name must be at least {{ min }} characters long',
  'name.maxLength': 'Name cannot exceed {{ max }} characters',
  'password.minLength': 'Password must be at least {{ min }} characters long',

  // General messages
  'required': 'The {{ field }} field is required',
  'string': 'The {{ field }} must be a string',
})
