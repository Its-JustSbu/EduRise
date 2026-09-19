<script setup lang="ts">
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { createSignUpForm } from '@/composables/useFormValidation'
import { modules } from '@/data/siteContent'
import BaseButton from './BaseButton.vue'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const { form, errors, validate, reset } = createSignUpForm()
const status = ref<Status>('idle')

async function handleSubmit() {
  if (form.honeypot) {
    // Silently drop likely-bot submissions.
    status.value = 'success'
    reset()
    return
  }

  if (!validate()) {
    status.value = 'idle'
    return
  }

  status.value = 'submitting'

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        subject: 'New EduRise Academy sign-up enquiry',
        from_name: form.guardianName,
        guardian_name: form.guardianName,
        learner_name: form.learnerName,
        email: form.email,
        phone: form.phone,
        grade_or_age: form.gradeOrAge,
        modules_interested: form.modules.join(', '),
        preferred_contact_method: form.contactMethod,
        message: form.message,
      }),
    })

    const result = await response.json()
    if (result.success) {
      status.value = 'success'
      reset()
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <AnimatePresence mode="wait">
    <motion.div
      v-if="status === 'success'"
      key="success"
      class="signup-form__success"
      :initial="{ opacity: 0, scale: 0.9 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }"
    >
      <div class="signup-form__success-icon" aria-hidden="true">&#10003;</div>
      <h3>Thank you!</h3>
      <p>
        Your enquiry has been sent to our program directors. We'll be in touch using your
        preferred contact method shortly.
      </p>
      <BaseButton variant="outline" @click="status = 'idle'">Send another enquiry</BaseButton>
    </motion.div>

    <form v-else key="form" class="signup-form" novalidate @submit.prevent="handleSubmit">
      <div class="signup-form__row">
        <label class="signup-form__field">
          <span>Parent / Guardian name</span>
          <input v-model="form.guardianName" type="text" autocomplete="name" />
          <span v-if="errors.guardianName" class="signup-form__error">{{ errors.guardianName }}</span>
        </label>

        <label class="signup-form__field">
          <span>Learner name</span>
          <input v-model="form.learnerName" type="text" />
          <span v-if="errors.learnerName" class="signup-form__error">{{ errors.learnerName }}</span>
        </label>
      </div>

      <div class="signup-form__row">
        <label class="signup-form__field">
          <span>Contact email</span>
          <input v-model="form.email" type="email" autocomplete="email" />
          <span v-if="errors.email" class="signup-form__error">{{ errors.email }}</span>
        </label>

        <label class="signup-form__field">
          <span>Contact phone</span>
          <input v-model="form.phone" type="tel" autocomplete="tel" />
          <span v-if="errors.phone" class="signup-form__error">{{ errors.phone }}</span>
        </label>
      </div>

      <label class="signup-form__field">
        <span>Learner age or grade</span>
        <input v-model="form.gradeOrAge" type="text" placeholder="e.g. Grade 7, age 12" />
        <span v-if="errors.gradeOrAge" class="signup-form__error">{{ errors.gradeOrAge }}</span>
      </label>

      <fieldset class="signup-form__fieldset">
        <legend>Which module(s) are you interested in?</legend>
        <label v-for="module in modules" :key="module.id" class="signup-form__checkbox">
          <input v-model="form.modules" type="checkbox" :value="module.title" />
          <span>{{ module.title }}</span>
        </label>
        <span v-if="errors.modules" class="signup-form__error">{{ errors.modules }}</span>
      </fieldset>

      <fieldset class="signup-form__fieldset">
        <legend>Preferred contact method</legend>
        <label v-for="method in ['Email', 'Phone', 'WhatsApp']" :key="method" class="signup-form__radio">
          <input v-model="form.contactMethod" type="radio" :value="method" name="contactMethod" />
          <span>{{ method }}</span>
        </label>
      </fieldset>

      <label class="signup-form__field">
        <span>Message (optional)</span>
        <textarea v-model="form.message" rows="3"></textarea>
      </label>

      <!-- Honeypot: hidden from real users, catches simple bots -->
      <label class="signup-form__honeypot" aria-hidden="true">
        <span>Leave this field empty</span>
        <input v-model="form.honeypot" type="text" tabindex="-1" autocomplete="off" />
      </label>

      <p v-if="status === 'error'" class="signup-form__error signup-form__error--banner">
        Something went wrong sending your enquiry. Please try again, or email us directly at
        <a href="mailto:mphomabesela26@gmail.com">mphomabesela26@gmail.com</a>.
      </p>

      <BaseButton type="submit" :disabled="status === 'submitting'">
        {{ status === 'submitting' ? 'Sending…' : 'Send enquiry' }}
      </BaseButton>
    </form>
  </AnimatePresence>
</template>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.signup-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}

.signup-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-navy-900);
}

.signup-form__field input,
.signup-form__field textarea {
  border: 1.5px solid rgba(14, 27, 51, 0.15);
  border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-4);
  font-weight: 400;
  background: var(--color-white);
  transition: border-color 0.2s var(--ease-out-soft), transform 0.15s var(--ease-out-soft);
}

.signup-form__field input:focus,
.signup-form__field textarea:focus {
  outline: none;
  border-color: var(--color-gold-500);
  transform: scale(1.01);
}

.signup-form__fieldset {
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.signup-form__fieldset legend {
  font-weight: 600;
  margin-bottom: var(--space-2);
  padding: 0;
}

.signup-form__checkbox,
.signup-form__radio {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.9rem;
}

.signup-form__error {
  color: #b3261e;
  font-size: 0.8rem;
  font-weight: 500;
}

.signup-form__error--banner {
  background: rgba(179, 38, 30, 0.08);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
}

.signup-form__honeypot {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.signup-form__success {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-7) var(--space-4);
}

.signup-form__success-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: var(--color-gold-500);
  color: var(--color-navy-900);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

@media (max-width: 640px) {
  .signup-form__row {
    grid-template-columns: 1fr;
  }
}
</style>
