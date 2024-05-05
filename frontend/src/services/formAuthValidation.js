import { isLength } from 'validator'
const validateRegisterForm = (formData) => {
  const errors = {}
  if (typeof formData === 'object') {
    if (!isLength(formData.username, 2, undefined)) {
      errors.username = 'First name is too short'
    }
    if (!isLength(formData.password, 2, undefined)) {
      errors.password = 'Last name is too short'
    }
  } else {
    throw new Error('Invalid parameter type')
  }
  return errors
}
export { validateRegisterForm }
