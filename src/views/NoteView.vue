<script setup lang="ts">
import { ref } from 'vue'
import type { Node } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'

import CustomNode from '../components/CustomNode.vue'
// import SpecialNode from '../components/SpecialNode.vue'

export interface CustomData {
  title: string,
  author: string,
  content: string,
  creationDate: string
}

export interface CustomEvents {
  onCustomEvent: (event: MouseEvent) => void
}

type CustomNodeTypes = 'custom' | 'special'
type CustomNode = Node<CustomData, CustomEvents, CustomNodeTypes>

const nodes = ref<CustomNode[]>([
  { id: '1',
    data: {
      title: 'Example',
      author: 'Felix' ,
      content: 'On top of the default node types mentioned earlier, you can create as many custom node-types as you need.',
      creationDate: new Date().toLocaleDateString()},
    type: 'custom',
    position: { x: 50, y: 50 } },
])
</script>

<template>
  <div class="canvas">
    <VueFlow :nodes="nodes">
      <template #node-custom="customNodeProps">
        <CustomNode v-bind="customNodeProps" />
      </template>

<!--      <template #node-special="specialNodeProps">-->
<!--        <SpecialNode v-bind="specialNodeProps" />-->
<!--      </template>-->
    </VueFlow>
  </div>
</template>
