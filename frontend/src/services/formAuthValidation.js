import { isLength } from 'validator'
const validateRegisterForm = (formData) => {
  const errors = {}
  if (typeof formData === 'object') {
    if (!isLength(formData.username, 2, undefined)) {
      errors.username = 'Prénom trop court'
    }
    if (!isLength(formData.password, 2, undefined)) {
      errors.password = 'Nom trop court'
    }
  } else {
    throw new Error('Invalid parameter type')
  }
  return errors
}
export { validateRegisterForm }
