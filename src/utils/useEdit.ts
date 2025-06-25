import {ref} from "vue";
import type { PbNote } from '@/types/notes'
import {useZoom} from "@/utils/useZoom.ts";

import {type FitView} from "@vue-flow/core";

import NoteService from "@/services/NoteService.ts";
const noteService = new NoteService()

const pbNotes = ref<PbNote[]>([])


import type {PbNoteData} from '@/types/notes'

import type {NodeProps } from '@vue-flow/core'
import type {Note} from "@/services/NoteService.ts";

export function useEdit(props: NodeProps<PbNoteData>, fitView: FitView) {
    const {zoomToNote} = useZoom(pbNotes, fitView)

    function editNote() {
        console.log("Editing Note:", props.id)
    }
    
    function sendChanges() {
        console.log("Sending Changes")
        const selectedId: number = Number(props.id)
        noteService.getNote(selectedId).then((notes: Note) => {
            const updatedNote = {
                ...notes,
                title: props.data.title
            }
            console.log(updatedNote)
            noteService.updateNote(updatedNote, selectedId)
                .then(() => console.log('Node updated successfully:', selectedId))
                .catch(console.error)
        })
    }


    return {
        editNote,
        sendChanges
    }
}