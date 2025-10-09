<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table';
import { h, resolveComponent } from 'vue';
import type { TableColumn, TableRow } from '@nuxt/ui';
import { useModalStore } from '~/stores/modals';

const table = useTemplateRef('table');
const UBadge = resolveComponent('UBadge');
const UCheckbox = resolveComponent('UCheckbox');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const UButton = resolveComponent('UButton');
const toast = useToast();

const modal = useModalStore();

type lystraTable = {
  id: string;
  item: string;
  amount: number;
  link: string;
  platform: 'facebook' | 'lazada' | 'shopee' | 'tiktok' | 'temu';
  tags: 'placeholder1' | 'placeholder2';
  priority: 'low' | 'medium' | 'high';
  status: 'in_cart' | 'ordered' | 'delivered' | 'cancelled';
};

const data = ref<lystraTable[]>([
  {
    id: '4600',
    item: 'Placeholder Item',
    amount: 594,
    link: 'Placeholder Link',
    platform: 'facebook',
    tags: 'placeholder1',
    priority: 'low',
    status: 'in_cart',
  },
  {
    id: '4599',
    item: 'Placeholder Item',
    amount: 276,
    link: 'Placeholder Link',
    platform: 'lazada',
    tags: 'placeholder2',
    priority: 'medium',
    status: 'ordered',
  },
  {
    id: '4598',
    item: 'Placeholder Item',
    amount: 315,
    link: 'Placeholder Link',
    platform: 'shopee',
    tags: 'placeholder1',
    priority: 'high',
    status: 'delivered',
  },
  {
    id: '4597',
    item: 'Placeholder Item',
    amount: 529,
    link: 'Placeholder Link',
    platform: 'tiktok',
    tags: 'placeholder2',
    priority: 'high',
    status: 'in_cart',
  },
  {
    id: '4596',
    item: 'Placeholder Item',
    amount: 639,
    link: 'Placeholder Link',
    platform: 'temu',
    tags: 'placeholder1',
    priority: 'low',
    status: 'cancelled',
  },
]);

const columns: TableColumn<lystraTable>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'aria-label': 'Select row',
      }),
  },
  {
    accessorKey: 'item',
    header: 'Item',
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-left' }, 'Price'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      }).format(amount);

      return h('div', { class: 'text-left font-medium' }, formatted);
    },
  },
  {
    accessorKey: 'link',
    header: 'Link',
  },
  {
    accessorKey: 'platform',
    header: 'Platform',
    cell: ({ row }) => {
      const color = {
        facebook: 'success' as const,
        lazada: 'error' as const,
        shopee: 'neutral' as const,
        tiktok: 'neutral' as const,
        temu: 'neutral' as const,
      }[row.getValue('platform') as string];

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('platform')
      );
    },
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const color = {
        placeholder1: 'neutral' as const,
        placeholder2: 'neutral' as const,
      }[row.getValue('tags') as string];

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('tags')
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const color = {
        low: 'success' as const,
        medium: 'warning' as const,
        high: 'error' as const,
      }[row.getValue('priority') as string];

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('priority')
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;

      const color = {
        in_cart: 'info' as const,
        ordered: 'warning' as const,
        delivered: 'success' as const,
        cancelled: 'neutral' as const,
      }[status];

      const label =
        {
          in_cart: 'In Cart',
          ordered: 'Ordered',
          delivered: 'Delivered',
          cancelled: 'Cancelled',
        }[status] || status;

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => label);
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      const items = [
        {
          type: 'label',
          label: 'Actions',
        },
        {
          label: 'Edit',
          onSelect() {
            modal.openModal();
          },
        },
        {
          label: 'Delete',
          onSelect() {
            toast.add({
              title: 'Your item has been deleted.',
              color: 'success',
              icon: 'i-lucide-circle-check',
            });
          },
        },
      ];

      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items,
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            })
        )
      );
    },
  },
];

const rowSelection = ref<Record<string, boolean>>({});

function onSelect(row: TableRow<lystraTable>) {
  row.toggleSelected(!row.getIsSelected());
}

const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
});
</script>

<template>
  <div class="border boder-white border-collapse rounded-lg rounded-m pb-4">
    <UTable
      ref="table"
      v-model:row-selection="rowSelection"
      v-model:pagination="pagination"
      :data="data"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      class="flex-1"
      @select="onSelect"
    />

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
