import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Border from './_border.vue'
import BorderRaw from './_border.vue?raw'
import ColumnVisibility from './_column-visibility.vue'
import ColumnVisibilityRaw from './_column-visibility.vue?raw'
import CustomColumn from './_custom-column.vue'
import CustomColumnRaw from './_custom-column.vue?raw'
import FixedColumn from './_fixed-column.vue'
import FixedColumnRaw from './_fixed-column.vue?raw'
import FixedHeight from './_fixed-height.vue'
import FixedHeightRaw from './_fixed-height.vue?raw'
import MultipleSelection from './_multiple-selection.vue'
import MultipleSelectionRaw from './_multiple-selection.vue?raw'
import SingleSelection from './_single-selection.vue'
import SingleSelectionRaw from './_single-selection.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'
import Sorting from './_sorting.vue'
import SortingRaw from './_sorting.vue?raw'
import Stripe from './_stripe.vue'
import StripeRaw from './_stripe.vue?raw'
import Toolbar from './_toolbar.vue'
import ToolbarRaw from './_toolbar.vue?raw'
import Tree from './_tree.vue'
import TreeRaw from './_tree.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '固定高度',
    component: FixedHeight,
    componentRaw: FixedHeightRaw,
  },
  {
    title: '工具栏插槽',
    component: Toolbar,
    componentRaw: ToolbarRaw,
  },
  {
    title: '固定列',
    component: FixedColumn,
    componentRaw: FixedColumnRaw,
  },
  {
    title: '自定义列',
    component: CustomColumn,
    componentRaw: CustomColumnRaw,
  },
  {
    title: '树型数据',
    component: Tree,
    componentRaw: TreeRaw,
  },
  {
    title: '自定义插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
  {
    title: '排序',
    component: Sorting,
    componentRaw: SortingRaw,
  },
  {
    title: '行选择 - 单选',
    component: SingleSelection,
    componentRaw: SingleSelectionRaw,
  },
  {
    title: '行选择 - 多选',
    component: MultipleSelection,
    componentRaw: MultipleSelectionRaw,
  },
  {
    title: '斑马纹',
    component: Stripe,
    componentRaw: StripeRaw,
  },
  {
    title: '边框',
    component: Border,
    componentRaw: BorderRaw,
  },
  {
    title: '列可见性',
    component: ColumnVisibility,
    componentRaw: ColumnVisibilityRaw,
  },
]
