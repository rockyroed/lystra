<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';

const toast = useToast();
const { signIn, isLoaded } = useSignIn();

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
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',
  },
];

const isLoading = ref(false);

async function signInWithOAuth(provider: 'oauth_google' | 'oauth_github') {
  if (!isLoaded.value || !signIn.value) return;

  try {
    await signIn.value.authenticateWithRedirect({
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
    onClick: () => signInWithOAuth('oauth_google'),
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => signInWithOAuth('oauth_github'),
  },
];

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!isLoaded.value || !signIn.value) return;

  isLoading.value = true;

  try {
    const result = await signIn.value.create({
      identifier: event.data.email,
      password: event.data.password,
    });

    if (result.status === 'complete') {
      await navigateTo('/');
      toast.add({
        title: 'Success',
        description: 'You have been signed in successfully.',
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
        : 'Failed to sign in';

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
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        :loading="isLoading"
        @submit="onSubmit"
      />
    </UPageCard>
    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
      Don't have an account?
      <NuxtLink to="/signup" class="font-bold hover:underline">Sign up here</NuxtLink>
    </div>
  </section>
</template>
