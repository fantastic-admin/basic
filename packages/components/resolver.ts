import type { ImportsMap } from 'unplugin-auto-import/types'
import type { ComponentResolver, TypeImport } from 'unplugin-vue-components'

const COMPONENT_PREFIX = 'Fa'
const PACKAGE_NAME = '@fantastic-admin/components'

const COMPONENT_NAMES = [
  'FaAvatar',
  'FaButton',
  'FaButtonGroup',
  'FaCard',
  'FaCheckbox',
  'FaCollapsible',
  'FaContextMenu',
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
  'FaScrollArea',
  'FaSearchBar',
  'FaSelect',
  'FaSlider',
  'FaSwitch',
  'FaTabs',
  'FaTextarea',
  'FaToast',
  'FaTooltip',
  'FaTrend',
] as const

const AUTO_IMPORT_NAMES = [
  'useFaDrawer',
  'useFaImagePreview',
  'useFaModal',
  'faToast',
] as const

export const FantasticAutoImports: ImportsMap = {
  [PACKAGE_NAME]: [...AUTO_IMPORT_NAMES],
}

export function FantasticComponentsResolver(): ComponentResolver {
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

export const FantasticComponentsType: TypeImport = {
  from: PACKAGE_NAME,
  names: [...COMPONENT_NAMES],
}
