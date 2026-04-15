<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import Alert from './components/alert.vue'
import Command from './components/command.vue'
import 'splitpanes/dist/splitpanes.css'

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <FaPageHeader title="Splitpanes">
      <template #description>
        <Command text="pnpm add splitpanes" />
        <Command text="pnpm add @types/splitpanes -D" />
      </template>
      <FaButton variant="outline" size="icon" @click="open('https://github.com/antoniandre/splitpanes')">
        <FaIcon name="i-simple-icons:github" />
      </FaButton>
    </FaPageHeader>
    <FaPageMain main-class="h-200">
      <Splitpanes class="default-theme">
        <Pane min-size="20">
          1
        </Pane>
        <Pane>
          <Splitpanes horizontal>
            <Pane>2</Pane>
            <Pane>3</Pane>
            <Pane>4</Pane>
          </Splitpanes>
        </Pane>
        <Pane>
          5
        </Pane>
      </Splitpanes>
    </FaPageMain>
  </div>
</template>

<style scoped>
.splitpanes__pane {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #999;
}
</style>
