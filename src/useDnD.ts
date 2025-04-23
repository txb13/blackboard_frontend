import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'

let id = 0
const getId = () => `dndnode_${id++}`

type DragPayload = { type: string; label: string }     // ← neu

const state = {
  draggedPayload: ref<DragPayload | null>(null),       // ← statt draggedType
  isDragOver: ref(false),
  isDragging: ref(false),
}

export default function useDragAndDrop() {
  const { draggedPayload, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  /* ----------------------------- dragstart ----------------------------------- */
  function onDragStart(event: DragEvent, payload: DragPayload) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', JSON.stringify(payload))
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedPayload.value = payload
    isDragging.value = true
    document.addEventListener('drop', onDragEnd)
  }

  /* ----------------------------- dragover & leave ---------------------------- */
  function onDragOver(event: DragEvent) {
    event.preventDefault()
    if (draggedPayload.value) {
      isDragOver.value = true
      event.dataTransfer && (event.dataTransfer.dropEffect = 'move')
    }
  }
  const onDragLeave = () => (isDragOver.value = false)

  /* ----------------------------- drop ---------------------------------------- */
  function onDrop(event: DragEvent) {
    if (!draggedPayload.value) return

    const position = screenToFlowCoordinate({ x: event.clientX, y: event.clientY })
    const nodeId   = getId()

    const newNode = {
      id: nodeId,
      type: draggedPayload.value.type,
      position,
      data: { label: draggedPayload.value.label },
      style: {
        backgroundColor: '#ffd84d',   // Hintergrund
        color: '#111',                // Text
        border: '1px solid #c7a600',  // optional
      },// als JSon String in DB schreiben
    }

    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2,
        },
      }))
      off()
    })

    addNodes(newNode)
    onDragEnd()                                         // Status zurücksetzen
  }

  /* ----------------------------- dragend -------------------------------------- */
  function onDragEnd() {
    isDragging.value = false
    isDragOver.value = false
    draggedPayload.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  return { draggedPayload, isDragOver, isDragging, onDragStart, onDragLeave, onDragOver, onDrop }
}
