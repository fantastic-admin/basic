import { addCollection } from '@iconify/vue'

export async function downloadAndInstall() {
  const data = Object.freeze(await fetch('./icons/icons.json').then(r => r.json()))
  addCollection(data)
}
