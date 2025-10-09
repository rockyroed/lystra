<script setup lang="ts">
import type { FormError } from '@nuxt/ui';
import { useModalStore } from '~/stores/modals';
import type { ItemState } from '@/types/item';

const modal = useModalStore();
const UButton = resolveComponent('UButton');
const toast = useToast();

const platform = ref(['Facebook', 'Lazada', 'Shopee', 'Tiktok', 'Shein', 'Temu']);
const priority = ref(['Low', 'Medium', 'High']);
const status = ref(['In Cart', 'Ordered', 'Delivered', 'Cancelled']);
const tags = ref(['Placeholder1', 'Placeholder2', 'Placeholder3', 'Placeholder4']);

const state = reactive<ItemState>({
  item_name: undefined,
  price: undefined,
  link: undefined,
  platform: undefined,
  priority: undefined,
  status: undefined,
  tags: undefined,
});

const validate = (state: ItemState): FormError[] => {
  const errors = [];
  if (!state.item_name) errors.push({ name: 'item_name', message: 'Required' });
  if (!state.price) errors.push({ name: 'price', message: 'Required' });
  if (!state.link) errors.push({ name: 'link', message: 'Required' });
  if (!state.platform) errors.push({ name: 'platform', message: 'Required' });
  if (!state.priority) errors.push({ name: 'priority', message: 'Required' });
  if (!state.status) errors.push({ name: 'status', message: 'Required' });
  if (!state.tags) errors.push({ name: 'tags', message: 'Required' });
  return errors;
};

async function onSubmit() {
  modal.closeModal();
  toast.add({
    title: 'Your item has been edited.',
    color: 'success',
    icon: 'i-lucide-circle-check',
  });
}
</script>

<template>
  <div>
    <UModal v-model:open="modal.showModal" title="Edit Item">
      <template #body>
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <UFormField label="Item Name" name="item_name" required>
                <UInput v-model="state.item_name" class="w-full" />
              </UFormField>
            </div>
            <div>
              <UFormField label="Price" name="price" required>
                <UInput
                  v-model="state.price"
                  icon="pepicons-pop:peso"
                  class="w-full"
                  type="number"
                />
              </UFormField>
            </div>
          </div>
          <div>
            <UFormField label="Link" name="link" required>
              <UInput v-model="state.link" class="w-full" />
            </UFormField>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <UFormField label="Platform" name="platform" required>
                <UInputMenu v-model="state.platform" :items="platform" class="w-full" />
              </UFormField>
            </div>
            <div>
              <UFormField label="Priority" name="priority" required>
                <UInputMenu v-model="state.priority" :items="priority" class="w-full" />
              </UFormField>
            </div>
            <div>
              <UFormField label="Status" name="status" required>
                <UInputMenu v-model="state.status" :items="status" class="w-full" />
              </UFormField>
            </div>
          </div>
          <div>
            <UFormField label="Tags" name="tags" required>
              <UInputMenu v-model="state.tags" multiple :items="tags" class="w-full" />
            </UFormField>
          </div>
          <div class="flex justify-center pt-4">
            <UButton type="submit">Edit Item</UButton>
          </div>
        </UForm>
      </template>
    </UModal>
  </div>
</template>
