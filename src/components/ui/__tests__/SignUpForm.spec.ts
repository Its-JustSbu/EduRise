import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import SignUpForm from '../SignUpForm.vue'

function fieldFor(wrapper: VueWrapper, labelText: string) {
  const label = wrapper.findAll('label').find((el) => el.text().includes(labelText))
  if (!label) throw new Error(`No field found for label "${labelText}"`)
  return label.find('input, textarea')
}

describe('SignUpForm', () => {
  it('shows validation errors and does not submit when required fields are empty', async () => {
    const wrapper = mount(SignUpForm)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Please enter a parent/guardian name.')
    expect(wrapper.text()).toContain('Please enter a contact email.')
    expect(wrapper.find('.signup-form__success').exists()).toBe(false)
  })

  it('rejects an invalid email address', async () => {
    const wrapper = mount(SignUpForm)

    await fieldFor(wrapper, 'Parent / Guardian name').setValue('Jane Doe')
    await fieldFor(wrapper, 'Learner name').setValue('John Doe')
    await fieldFor(wrapper, 'Contact email').setValue('not-an-email')
    await fieldFor(wrapper, 'Contact phone').setValue('0821234567')
    await fieldFor(wrapper, 'Learner age or grade').setValue('Grade 7')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Please enter a valid email address.')
  })
})
