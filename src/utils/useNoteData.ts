import NoteService, {type Note} from "@/services/NoteService";
import {type Ref, ref} from "vue";
import type { PbNote } from '@/types/notes'
import type {FitView} from "@vue-flow/core";

import {useZoom} from "@/utils/useZoom.ts";

export function useNoteData(noteService: NoteService, pbNotes: Ref<PbNote[]>, fitView: FitView) {
    const { zoomToNote } = useZoom(pbNotes, fitView)
    const titleField = ref('')
    const authorField = ref('')
    const contentField = ref('')

    function pickColor(){
        const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF', '#B9FBC0', '#FFF5BA'];
        return colors[Math.floor(Math.random() * colors.length)]
    }

    async function getNotes() {
        noteService.getNotes().then((notes: Note[]) => {
            let index: number = 0;
            for (const note of notes) {
                console.log('note:', index)
                console.log('note-id:', note.id)
                pbNotes.value.push({
                    id: String(note.id),
                    type: 'custom',
                    position: { x: note.xPosition, y: note.yPosition },
                    data: {
                        color:  note.color || pickColor(),
                        title:   note.title,
                        content: note.content,
                        author:  note.author,
                        creationDate: note.creationDate,
                        terminationDate: note.terminationDate
                    },
                })
                index++;
            }
        })
    }

    async function refresh() {
        const notes = await noteService.getNotes()
        console.log('notes:', notes)
        pbNotes.value = notes.map((note) => ({
            id: String(note.id),
            type: 'custom',
            position: {x: note.xPosition, y: note.yPosition},
            data: { title:   note.title,
                color: note.color,
                content: note.content,
                author:  note.author,
                creationDate: note.creationDate,
                terminationDate: note.terminationDate
            },
        }))
        await fitView({duration: 500})
    }

    async function addNote() {
        if (!contentField.value.trim()) return
        const noteColor =  pickColor()
        await refresh()
        await noteService.addNote({
            id: undefined,
            title: titleField.value.trim(),
            content: contentField.value.trim(),
            author: authorField.value.trim(),
            color: noteColor,
            creationDate: undefined,
            terminationDate: undefined,
            xPosition: Math.floor(Math.random() * 1000),
            yPosition: Math.floor(Math.random() * 400),
            width: 100,
            height: 100
        });
        await refresh()
        setTimeout(() => {
            zoomToNote(String(pbNotes.value.length - 1))
        }, 50)
        // contentField.value = ''
    }

    return {
        getNotes,
        addNote,
        refresh,
        titleField,
        authorField,
        contentField,
    }
}
