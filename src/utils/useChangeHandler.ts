import { useVueFlow } from '@vue-flow/core'
import type { NodeChange, NodePositionChange } from '@vue-flow/core'
import type { Ref } from 'vue'
import type {PbNote} from "@/types/notes.ts";
import NoteService from '@/services/NoteService';
import type {Note} from "@/services/NoteService";

interface UseNodeChangeHandlerOptions {
    pbNotes: Ref<PbNote[]>;
    noteService: NoteService;
}

export function useNodeChangeHandler({ pbNotes, noteService }: UseNodeChangeHandlerOptions) {
    const { onNodesChange, applyNodeChanges } = useVueFlow()

    let selectedId = 0
    let posChanges: NodePositionChange[] = []

    onNodesChange((changes: NodeChange[]) => {
        const nextChanges: NodeChange[] = []

        for (const change of changes) {
            if (change.type === 'remove') {
                console.log('Removing node:', change.id)
                pbNotes.value = pbNotes.value.filter(node => node.id !== String(change.id))
                console.log('Removing node data:', noteService.getNote(Number(change.id)))

                noteService.deleteNote(Number(change.id))
                    .then(() => console.log('Node removed successfully:', change.id))
                    .catch(console.error)

            } else if (change.type === 'select') {
                selectedId = Number(change.id)
                console.log(selectedId)
                nextChanges.push(change)

            } else if (change.type === 'position') {
                const posChange = change as NodePositionChange
                console.log('Position change detected for node:', change.id)
                selectedId = Number(change.id)

                if (posChange.dragging === true) {
                    posChanges.push(posChange)
                    nextChanges.push(posChange)

                } else if (posChange.dragging === false) {
                    nextChanges.push(posChange)
                    const lastPosChange = posChanges.filter(c => (c as NodePositionChange).dragging).at(-1)

                    if (lastPosChange) {
                        console.log('Moved Node:', selectedId, 'to', lastPosChange.position.x, lastPosChange.position.y)
                        noteService.getNote(selectedId).then((notes: Note) => {
                            const updatedNote = {
                                ...notes,
                                xPosition: Math.floor(lastPosChange.position.x),
                                yPosition: Math.floor(lastPosChange.position.y)
                            }
                            console.log(updatedNote)
                            noteService.updateNote(updatedNote, selectedId)
                                .then(() => console.log('Node updated successfully:', selectedId))
                                .catch(console.error)
                        })
                    }

                    posChanges = []
                }
            } else {
                nextChanges.push(change)
            }
        }

        console.log('Changes', nextChanges)
        applyNodeChanges(nextChanges)
    })
}
