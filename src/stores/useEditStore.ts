import { ref } from 'vue'
import type {PbNoteData} from '../types/notes'
import NoteService from "@/services/NoteService";


const noteService = new NoteService()


import {useNoteStore} from "@/stores/useNoteStore.ts";
const { refresh } = useNoteStore();

interface EditingChanges {
    title: string;
    content: string;
    author: string;
}

const isEditing = ref(false)
const currentEditingId = ref<string | null>(null)
const pendingChanges = ref<EditingChanges | null>(null)

export function useEditStore() {
    function startEditing(nodeId: string, initialData: PbNoteData) {
        isEditing.value = true
        currentEditingId.value = nodeId
        pendingChanges.value = {
            title: initialData.title,
            content: initialData.content,
            author: initialData.author
        }
    }

    async function stopEditing() {
        const saved = await saveChanges()
        if (saved) {
            console.log('Changes saved successfully')
        } else {
            console.log('Failed to save changes')
        }
        isEditing.value = false
        currentEditingId.value = null
        pendingChanges.value = null
    }

    function updateField(field: keyof EditingChanges, value: string) {
        if (pendingChanges.value) {
            pendingChanges.value[field] = value
        }
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

    async function saveChanges() {
        if (currentEditingId.value && pendingChanges.value) {
            const selectedId = Number(currentEditingId.value)
            try {
                const note = await noteService.getNote(selectedId)

                const updatedNote = {
                    ...note,
                    title: pendingChanges.value.title,
                    author: pendingChanges.value.author,
                    content: pendingChanges.value.content,
                }

                console.log("originalNote:", note)
                console.log("updatedNote:", updatedNote)

                await noteService.updateNote(updatedNote, selectedId)
                await refresh()
                console.log('Node updated successfully:', selectedId)
                return true
            } catch (error) {
                console.error('Failed to save changes:', error)
                return false
            }
        }
        return false
    }


    return {
        isEditing,
        currentEditingId,
        toggleEdit,
        updateField,
        getPendingChanges,
        stopEditing,
        saveChanges
    }
}
