import { ref } from 'vue'

const isEditing = ref(false)
const currentEditingId = ref<string | null>(null)

export function useEditStore() {
    function startEditing(nodeId: string) {
        isEditing.value = true
        currentEditingId.value = nodeId
    }

    function stopEditing() {
        isEditing.value = false
        currentEditingId.value = null
    }

    function toggleEdit(nodeId: string) {
        if (currentEditingId.value === nodeId) {
            stopEditing()
        } else {
            startEditing(nodeId)
        }
    }

    return {
        isEditing,
        currentEditingId,
        toggleEdit,
        startEditing,
        stopEditing
    }
}