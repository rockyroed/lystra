<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';

const toast = useToast();
const { signUp, isLoaded } = useSignUp();

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
  {
    name: 'first-name',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
  },
];

const isLoading = ref(false);

async function signUpWithOAuth(provider: 'oauth_google' | 'oauth_github') {
  if (!isLoaded.value || !signUp.value) return;

  try {
    await signUp.value.authenticateWithRedirect({
      strategy: provider,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    });
  } catch (error: unknown) {
    const providerName = provider.replace('oauth_', '');
    const errorMessage =
      error &&
      typeof error === 'object' &&
      'errors' in error &&
      Array.isArray(error.errors) &&
      error.errors[0] &&
      typeof error.errors[0] === 'object' &&
      'message' in error.errors[0]
        ? error.errors[0].message
        : `Failed to sign in with ${providerName}`;

    toast.add({
      title: 'Error',
      description: String(errorMessage),
      color: 'error',
    });
  }
}

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => signUpWithOAuth('oauth_google'),
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => signUpWithOAuth('oauth_github'),
  },
];

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  'first-name': z.string().min(1, 'First name is required'),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: Email verification functionality
  if (!isLoaded.value || !signUp.value) return;

  isLoading.value = true;

  try {
    const result = await signUp.value.create({
      emailAddress: event.data.email,
      password: event.data.password,
      firstName: event.data['first-name'],
    });

    if (result.status === 'complete') {
      await navigateTo('/');
      toast.add({
        title: 'Success',
        description: 'Account created successfully!',
        color: 'success',
      });
    }
  } catch (error: unknown) {
    const errorMessage =
      error &&
      typeof error === 'object' &&
      'errors' in error &&
      Array.isArray(error.errors) &&
      error.errors[0] &&
      typeof error.errors[0] === 'object' &&
      'message' in error.errors[0]
        ? error.errors[0].message
        : 'Failed to create account';

    toast.add({
      title: 'Error',
      description: String(errorMessage),
      color: 'error',
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="flex flex-col items-center justify-center gap-11 m-12">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Create Account"
        description="Enter your details to create your account."
        icon="i-lucide-user-plus"
        :fields="fields"
        :providers="providers"
        :loading="isLoading"
        @submit="onSubmit"
      />
    </UPageCard>

    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
      Already have an account?
      <NuxtLink to="/login" class="font-bold hover:underline">Login here</NuxtLink>
    </div>
  </section>
</template>
