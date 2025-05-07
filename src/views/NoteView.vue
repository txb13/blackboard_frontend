<script setup lang="ts">
//TODO: this page just exists to help styling notes, it needs to be removed when the styling is done
import { ref } from 'vue'
import type { Node } from '@vue-flow/core'
import { VueFlow } from '@vue-flow/core'

import CustomNode from '../components/CustomNode.vue'
// import SpecialNode from '../components/SpecialNode.vue'

//TODO: move CustomData, CustomEvents, etc. to CustomNode.vue
/*
  TODO: CustomData needs to hold all values existing in backend:
    see Note.java in backend:
      private int id = 0;
      private String title;
      private String content;
      private String author;
      private String color;
      private Date creationDate;
      private Date terminationDate;
      private int xPosition;
      private int yPosition;
      private int width;
      private int height;
 */
export interface CustomData {
  title: string,
  author: string,
  content: string,
  creationDate: string,
  color: string
}

export interface CustomEvents {
  onCustomEvent: (event: MouseEvent) => void
}

type CustomNodeTypes = 'custom' | 'special'
type CustomNode = Node<CustomData, never, CustomNodeTypes>


const nodes = ref<CustomNode[]>([
  { id: '1',
    data: {
      title: 'Example',
      author: 'Felix' ,
      content: 'On top of the default node types mentioned earlier, you can create as many custom node-types as you need.',
      creationDate: new Date().toLocaleDateString(),
      color: "#c61111"},
    type: 'custom',
    position: { x: 50, y: 50 } },
  { id: '2',
    data: {
      title: 'Example',
      author: 'Felix' ,
      content: 'On top of the default node types mentioned earlier, you can create as many custom node-types as you need.',
      creationDate: new Date().toLocaleDateString(),
      color: "#ffffff"
    },
    type: 'custom',
    position: { x: 50, y: 50 } }
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
