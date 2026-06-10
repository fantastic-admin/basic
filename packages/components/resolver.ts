import type { ImportsMap } from 'unplugin-auto-import/types'
import type { ComponentResolver, TypeImport } from 'unplugin-vue-components'
import { createRequire } from 'node:module'

const COMPONENT_PREFIX = 'Fa'
const PACKAGE_NAME = createRequire(import.meta.url)('./package.json').name

const BASIC_COMPONENT_NAMES = [
  'FaAlert',
  'FaAvatar',
  'FaBadge',
  'FaButton',
  'FaButtonGroup',
  'FaCard',
  'FaCheckbox',
  'FaCheckboxGroup',
  'FaCollapsible',
  'FaContextMenu',
  'FaDescriptions',
  'FaDivider',
  'FaDrawer',
  'FaDropdown',
  'FaFileUpload',
  'FaFixedBar',
  'FaHoverCard',
  'FaIcon',
  'FaImagePreview',
  'FaImageUpload',
  'FaInput',
  'FaInputOTP',
  'FaKbd',
  'FaKbdGroup',
  'FaLabel',
  'FaModal',
  'FaNumberField',
  'FaPageHeader',
  'FaPageMain',
  'FaPagination',
  'FaPasswordStrength',
  'FaPopover',
  'FaProgress',
  'FaRadioGroup',
  'FaScrollArea',
  'FaSearchBar',
  'FaSelect',
  'FaSlider',
  'FaSwitch',
  'FaTable',
  'FaTabs',
  'FaTag',
  'FaTextarea',
  'FaToast',
  'FaTooltip',
  'FaTrend',
] as const

const COMPONENT_NAMES = [
  ...BASIC_COMPONENT_NAMES,
] as const

const AUTO_IMPORT_NAMES = [
  'useFaDrawer',
  'useFaImagePreview',
  'useFaModal',
  'useFaToast',
] as const

export const ComponentsAutoImports: ImportsMap = {
  [PACKAGE_NAME]: [...AUTO_IMPORT_NAMES],
}

export function ComponentsResolver(): ComponentResolver {
  const names = new Set<string>(COMPONENT_NAMES)
  return {
    type: 'component',
    resolve(name: string) {
      if (name.startsWith(COMPONENT_PREFIX) && names.has(name)) {
        return {
          name,
          from: PACKAGE_NAME,
        }
      }
    },
  }
}

export const ComponentsType: TypeImport = {
  from: PACKAGE_NAME,
  names: [...COMPONENT_NAMES],
}
