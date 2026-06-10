<script lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue'
</script>

<script setup lang="ts" generic="TItem extends DescriptionItem = DescriptionItem">
import { computed } from 'vue'
import { cn } from '#utils'

export type DescriptionValue = string | number | boolean | null | undefined
export type DescriptionDirection = 'horizontal' | 'vertical'
export type DescriptionSize = 'sm' | 'default' | 'lg'

export interface DescriptionItemBase {
  key?: string
  label?: string
  value?: DescriptionValue
  span?: number
  class?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  valueClass?: HTMLAttributes['class']
}

export type DescriptionItem<
  TExtra extends Record<string, any> = Record<string, any>,
> = DescriptionItemBase & Omit<TExtra, keyof DescriptionItemBase>

export interface DescriptionsProps<
  TItem extends DescriptionItem = DescriptionItem,
> {
  items?: TItem[]
  column?: number
  direction?: DescriptionDirection
  border?: boolean
  labelWidth?: string | number
  size?: DescriptionSize
  emptyText?: string
  class?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  valueClass?: HTMLAttributes['class']
}

export interface DescriptionSlotProps<
  TItem extends DescriptionItem = DescriptionItem,
> {
  item: TItem
  index: number
  label: TItem['label']
  value: TItem['value']
}

type LabelSlotName = `label-${string}`
type ValueSlotName = `value-${string}`
type DescriptionsSlots<TItem extends DescriptionItem = DescriptionItem> = {
  [key: LabelSlotName]: ((props: DescriptionSlotProps<TItem>) => any) | undefined
} & {
  [key: ValueSlotName]: ((props: DescriptionSlotProps<TItem>) => any) | undefined
}

interface ResolvedDescriptionItem<TItem extends DescriptionItem = DescriptionItem> {
  item: TItem
  index: number
  span: number
}

interface DescriptionRow<TItem extends DescriptionItem = DescriptionItem> {
  items: ResolvedDescriptionItem<TItem>[]
  span: number
  rest: number
}

defineOptions({
  name: 'BuiltInDescriptions',
})

const props = withDefaults(defineProps<DescriptionsProps<TItem>>(), {
  column: 3,
  direction: 'horizontal',
  border: false,
  size: 'default',
  emptyText: '-',
})

defineSlots<DescriptionsSlots<TItem>>()

const cellSizeClasses: Record<DescriptionSize, string> = {
  sm: 'px-3 py-2 text-xs',
  default: 'px-4 py-3 text-sm',
  lg: 'px-5 py-4 text-base',
}

const normalizedColumn = computed(() => normalizeColumn(props.column))

const rows = computed(() => createRows(props.items ?? [], normalizedColumn.value))

const rootClass = computed(() => cn(
  'w-full overflow-hidden',
  props.border && 'rounded-lg border',
  props.class,
))

const tableClass = computed(() => cn(
  'w-full table-fixed border-collapse',
  !props.border && 'border-separate border-spacing-0',
))

const labelColStyle = computed<CSSProperties | undefined>(() => {
  if (props.direction !== 'horizontal') {
    return undefined
  }

  const width = resolveSize(props.labelWidth)
  return width ? { width } : undefined
})

function normalizeColumn(column?: number) {
  const resolved = Number(column)
  return Number.isFinite(resolved) && resolved > 0 ? Math.floor(resolved) : 1
}

function normalizeSpan(span: number | undefined, column: number) {
  const resolved = Number(span)

  if (!Number.isFinite(resolved) || resolved <= 0) {
    return 1
  }

  return Math.min(Math.floor(resolved), column)
}

function createRows(items: TItem[], column: number): DescriptionRow<TItem>[] {
  const rows: DescriptionRow<TItem>[] = []
  let currentItems: ResolvedDescriptionItem<TItem>[] = []
  let currentSpan = 0

  function pushCurrentRow() {
    if (!currentItems.length) {
      return
    }

    rows.push({
      items: currentItems,
      span: currentSpan,
      rest: Math.max(column - currentSpan, 0),
    })
    currentItems = []
    currentSpan = 0
  }

  items.forEach((item, index) => {
    const span = normalizeSpan(item.span, column)

    if (currentItems.length && currentSpan + span > column) {
      pushCurrentRow()
    }

    currentItems.push({
      item,
      index,
      span,
    })
    currentSpan += span

    if (currentSpan >= column) {
      pushCurrentRow()
    }
  })

  pushCurrentRow()

  return rows
}

function resolveSize(size?: string | number) {
  if (size == null || size === '') {
    return undefined
  }

  return typeof size === 'number' ? `${size}px` : size
}

function isEmptyValue(value: DescriptionValue) {
  return value === null || value === undefined || value === ''
}

function resolveValue(value: DescriptionValue) {
  return isEmptyValue(value) ? props.emptyText : value
}

function getLabelSlotName(item: TItem): LabelSlotName | undefined {
  return item.key ? `label-${item.key}` : undefined
}

function getValueSlotName(item: TItem): ValueSlotName | undefined {
  return item.key ? `value-${item.key}` : undefined
}

function getRowClass(isLastRow: boolean) {
  return cn(props.border && !isLastRow && 'border-b')
}

function getBaseCellClass(isLastCell: boolean) {
  return cn(
    'align-middle break-words',
    cellSizeClasses[props.size],
    props.border && !isLastCell && 'border-r',
  )
}

function getLabelCellClass(entry: ResolvedDescriptionItem<TItem>, isLastCell: boolean) {
  return cn(
    getBaseCellClass(isLastCell),
    'text-left font-medium text-muted-foreground',
    props.border && 'bg-muted/50',
    entry.item.class,
    props.labelClass,
    entry.item.labelClass,
  )
}

function getValueCellClass(entry: ResolvedDescriptionItem<TItem>, isLastCell: boolean) {
  return cn(
    getBaseCellClass(isLastCell),
    'text-foreground',
    entry.item.class,
    props.valueClass,
    entry.item.valueClass,
  )
}

function getPlaceholderCellClass(isLastCell: boolean) {
  return cn(
    getBaseCellClass(isLastCell),
    props.border && 'bg-background',
  )
}

function isLastContentCell(row: DescriptionRow<TItem>, index: number) {
  return index === row.items.length - 1 && row.rest === 0
}
</script>

<template>
  <div v-if="rows.length" :class="rootClass" data-slot="descriptions">
    <table :class="tableClass" data-slot="descriptions-table">
      <colgroup v-if="direction === 'horizontal'">
        <template v-for="columnIndex in normalizedColumn" :key="columnIndex">
          <col :style="labelColStyle">
          <col>
        </template>
      </colgroup>
      <colgroup v-else>
        <col v-for="columnIndex in normalizedColumn" :key="columnIndex">
      </colgroup>

      <tbody>
        <template v-if="direction === 'vertical'">
          <template v-for="(row, rowIndex) in rows" :key="rowIndex">
            <tr :class="getRowClass(false)" data-slot="descriptions-label-row">
              <th
                v-for="(entry, entryIndex) in row.items"
                :key="`label-${entry.index}`"
                :colspan="entry.span"
                :class="getLabelCellClass(entry, isLastContentCell(row, entryIndex))"
                scope="col"
                data-slot="descriptions-label"
              >
                <slot
                  v-if="getLabelSlotName(entry.item)"
                  :name="getLabelSlotName(entry.item)"
                  :item="entry.item"
                  :index="entry.index"
                  :label="entry.item.label"
                  :value="entry.item.value"
                >
                  {{ entry.item.label }}
                </slot>
                <template v-else>
                  {{ entry.item.label }}
                </template>
              </th>
              <td
                v-if="row.rest"
                :colspan="row.rest"
                :class="getPlaceholderCellClass(true)"
                aria-hidden="true"
                data-slot="descriptions-placeholder"
              />
            </tr>
            <tr :class="getRowClass(rowIndex === rows.length - 1)" data-slot="descriptions-value-row">
              <td
                v-for="(entry, entryIndex) in row.items"
                :key="`value-${entry.index}`"
                :colspan="entry.span"
                :class="getValueCellClass(entry, isLastContentCell(row, entryIndex))"
                data-slot="descriptions-value"
              >
                <slot
                  v-if="getValueSlotName(entry.item)"
                  :name="getValueSlotName(entry.item)"
                  :item="entry.item"
                  :index="entry.index"
                  :label="entry.item.label"
                  :value="entry.item.value"
                >
                  {{ resolveValue(entry.item.value) }}
                </slot>
                <template v-else>
                  {{ resolveValue(entry.item.value) }}
                </template>
              </td>
              <td
                v-if="row.rest"
                :colspan="row.rest"
                :class="getPlaceholderCellClass(true)"
                aria-hidden="true"
                data-slot="descriptions-placeholder"
              />
            </tr>
          </template>
        </template>

        <template v-else>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            :class="getRowClass(rowIndex === rows.length - 1)"
            data-slot="descriptions-row"
          >
            <template v-for="(entry, entryIndex) in row.items" :key="entry.index">
              <th
                :class="getLabelCellClass(entry, false)"
                scope="row"
                data-slot="descriptions-label"
              >
                <slot
                  v-if="getLabelSlotName(entry.item)"
                  :name="getLabelSlotName(entry.item)"
                  :item="entry.item"
                  :index="entry.index"
                  :label="entry.item.label"
                  :value="entry.item.value"
                >
                  {{ entry.item.label }}
                </slot>
                <template v-else>
                  {{ entry.item.label }}
                </template>
              </th>
              <td
                :colspan="entry.span * 2 - 1"
                :class="getValueCellClass(entry, isLastContentCell(row, entryIndex))"
                data-slot="descriptions-value"
              >
                <slot
                  v-if="getValueSlotName(entry.item)"
                  :name="getValueSlotName(entry.item)"
                  :item="entry.item"
                  :index="entry.index"
                  :label="entry.item.label"
                  :value="entry.item.value"
                >
                  {{ resolveValue(entry.item.value) }}
                </slot>
                <template v-else>
                  {{ resolveValue(entry.item.value) }}
                </template>
              </td>
            </template>
            <td
              v-if="row.rest"
              :colspan="row.rest * 2"
              :class="getPlaceholderCellClass(true)"
              aria-hidden="true"
              data-slot="descriptions-placeholder"
            />
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
