import { ref } from 'vue'
import NoteService from '@/services/NoteService'
import { useVueFlow } from '@vue-flow/core'
import type {PbNote} from "@/types/notes.ts";

const pbNotes = ref<PbNote[]>([])
const noteService = new NoteService()

export function useNoteStore() {
    const { setNodes, fitView } = useVueFlow()

    async function refresh() {
        const notes = await noteService.getNotes()
        pbNotes.value = notes.map(note => ({
            id: String(note.id),
            type: 'custom',
            position: { x: note.xPosition, y: note.yPosition },
            data: {
                title: note.title,
                content: note.content,
                author: note.author,
                color: note.color,
                creationDate: note.creationDate,
                terminationDate: note.terminationDate
            }
        }))
        setNodes(pbNotes.value)
        await fitView({ duration: 500 })
    }

    return { pbNotes, refresh }
}