import { computed, reactive } from 'vue'

export interface SignUpFormState {
  guardianName: string
  learnerName: string
  email: string
  phone: string
  gradeOrAge: string
  modules: string[]
  contactMethod: string
  message: string
  honeypot: string
}

export function createSignUpForm() {
  const form = reactive<SignUpFormState>({
    guardianName: '',
    learnerName: '',
    email: '',
    phone: '',
    gradeOrAge: '',
    modules: [],
    contactMethod: 'email',
    message: '',
    honeypot: '',
  })

  const errors = reactive<Partial<Record<keyof SignUpFormState, string>>>({})

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^[+()\d][\d\s()+-]{6,}$/

  function validate(): boolean {
    Object.keys(errors).forEach((key) => delete errors[key as keyof SignUpFormState])

    if (!form.guardianName.trim()) errors.guardianName = 'Please enter a parent/guardian name.'
    if (!form.learnerName.trim()) errors.learnerName = 'Please enter the learner’s name.'

    if (!form.email.trim()) {
      errors.email = 'Please enter a contact email.'
    } else if (!emailPattern.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!form.phone.trim()) {
      errors.phone = 'Please enter a contact phone number.'
    } else if (!phonePattern.test(form.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.'
    }

    if (!form.gradeOrAge.trim()) errors.gradeOrAge = 'Please enter the learner’s age or grade.'
    if (form.modules.length === 0) errors.modules = 'Please select at least one module.'

    return Object.keys(errors).length === 0
  }

  const hasErrors = computed(() => Object.keys(errors).length > 0)

  function reset() {
    form.guardianName = ''
    form.learnerName = ''
    form.email = ''
    form.phone = ''
    form.gradeOrAge = ''
    form.modules = []
    form.contactMethod = 'email'
    form.message = ''
    form.honeypot = ''
    Object.keys(errors).forEach((key) => delete errors[key as keyof SignUpFormState])
  }

  return { form, errors, validate, hasErrors, reset }
}
