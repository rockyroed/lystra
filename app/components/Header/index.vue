<script setup>
import { dark, experimental__simple } from '@clerk/themes';

const colorMode = useColorMode();
</script>

<template>
  <div class="flex justify-between items-center px-28 py-4">
    <UButton class="cursor-pointer" variant="ghost" :square="true" color="neutral" to="/">
      <NuxtImg
        :src="colorMode.value === 'dark' ? '/lystra-logo-dark.svg' : '/lystra-logo-light.svg'"
        alt="Lystra logo"
        width="40"
        height="40"
        fit="contain"
        background="transparent"
      />
      <h1 class="text-gray-900 dark:text-white text-lg font-bold">Lystra</h1>
    </UButton>
    <div class="flex items-center gap-1.5">
      <UColorModeButton class="cursor-pointer">
        <template #fallback>
          <UButton loading variant="ghost" color="neutral" />
        </template>
      </UColorModeButton>
      <SignedOut>
        <SignInButton>
          <UButton
            class="cursor-pointer"
            variant="ghost"
            size="md"
            icon="lucide:log-in"
            :square="true"
            color="neutral"
          />
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          :appearance="{ baseTheme: colorMode.value === 'dark' ? dark : experimental__simple }"
        />
      </SignedIn>
    </div>
  </div>
</template>
