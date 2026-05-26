import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CenterBorderLoading from './_center-border-loading.vue'
import CenterBorderLoadingRaw from './_center-border-loading.vue?raw'
import Closable from './_closable.vue'
import ClosableRaw from './_closable.vue?raw'
import CustomStyle from './_custom-style.vue'
import CustomStyleRaw from './_custom-style.vue?raw'
import Event from './_event.vue'
import EventRaw from './_event.vue?raw'
import Functional from './_functional.vue'
import FunctionalRaw from './_functional.vue?raw'
import HeaderFooter from './_header-footer.vue'
import HeaderFooterRaw from './_header-footer.vue?raw'
import OverlayBlur from './_overlay-blur.vue'
import OverlayBlurRaw from './_overlay-blur.vue?raw'
import Side from './_side.vue'
import SideRaw from './_side.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'
import TitleDescription from './_title-description.vue'
import TitleDescriptionRaw from './_title-description.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '弹出方向',
    component: Side,
    componentRaw: SideRaw,
  },
  {
    title: '标题描述',
    component: TitleDescription,
    componentRaw: TitleDescriptionRaw,
  },
  {
    title: '显示/隐藏关闭按钮',
    component: Closable,
    componentRaw: ClosableRaw,
  },
  {
    title: '居中/边框/载入',
    component: CenterBorderLoading,
    componentRaw: CenterBorderLoadingRaw,
  },
  {
    title: '遮罩/模糊',
    component: OverlayBlur,
    componentRaw: OverlayBlurRaw,
  },
  {
    title: '显示/隐藏头部底部',
    component: HeaderFooter,
    componentRaw: HeaderFooterRaw,
  },
  {
    title: '插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
  {
    title: '自定义样式',
    component: CustomStyle,
    componentRaw: CustomStyleRaw,
  },
  {
    title: '触发事件',
    component: Event,
    componentRaw: EventRaw,
  },
  {
    title: '函数式调用',
    component: Functional,
    componentRaw: FunctionalRaw,
  },
]
