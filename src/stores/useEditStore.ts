import { ref } from 'vue'
import type { PbNoteData } from '../types/notes'
import type { Note } from '../services/NoteService'
import type NoteService from '../services/NoteService'
import { useNoteStore } from './useNoteStore'

interface EditingChanges {
    title: string;
    content: string;
    author: string;
}

const isEditing = ref(false)
const currentEditingId = ref<string | null>(null)
const pendingChanges = ref<EditingChanges | null>(null)

export function useEditStore() {
    const { refresh } = useNoteStore()

    function startEditing(nodeId: string, initialData: PbNoteData) {
        isEditing.value = true
        currentEditingId.value = nodeId
        pendingChanges.value = {
            title: initialData.title,
            content: initialData.content,
            author: initialData.author
        }
    }

    function stopEditing() {
        isEditing.value = false
        currentEditingId.value = null
        pendingChanges.value = null
    }

    function updateField(field: keyof EditingChanges, value: string) {
        if (pendingChanges.value) {
            pendingChanges.value[field] = value
        }
    }

    async function saveChanges(noteService: NoteService, originalNote: Note) {
        if (currentEditingId.value && pendingChanges.value) {
            try {
                const updatedNote: Note = {
                    ...originalNote,
                    title: pendingChanges.value.title,
                    content: pendingChanges.value.content,
                    author: pendingChanges.value.author
                }
                await noteService.updateNote(updatedNote, Number(currentEditingId.value))
                await refresh()
                stopEditing()
                return true
            } catch (error) {
                console.error('Failed to save changes:', error)
                return false
            }
        }
        return false
    }

    function getPendingChanges() {
        return pendingChanges.value
    }

    function toggleEdit(nodeId: string, initialData: PbNoteData) {
        if (currentEditingId.value === nodeId) {
            stopEditing()
        } else {
            startEditing(nodeId, initialData)
        }
    }

    return {
        isEditing,
        currentEditingId,
        toggleEdit,
        updateField,
        getPendingChanges,
        saveChanges
    }
}

