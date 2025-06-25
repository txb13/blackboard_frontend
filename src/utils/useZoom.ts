import {type Ref, ref} from "vue";
import type { PbNote } from '@/types/notes'
import type {FitView} from "@vue-flow/core";

export function useZoom(pbNotes: Ref<PbNote[]>, fitView: FitView) {
    const currentNodeIndex = ref(-1)

    function zoomToNote(target: string) {
        console.log("Zooming to Note:", target)
        fitView({
            nodes: [target],
            duration: 1000,
        }).then()
    }

    function zoomToPrevNote() {
        if (pbNotes.value.length === 0) return
        currentNodeIndex.value =
            (currentNodeIndex.value - 1 + pbNotes.value.length) % pbNotes.value.length
        zoomToNote(pbNotes.value[currentNodeIndex.value].id)
    }

    function zoomToNextNote() {
        if (pbNotes.value.length === 0) return
        currentNodeIndex.value = (currentNodeIndex.value + 1) % pbNotes.value.length
        zoomToNote(pbNotes.value[currentNodeIndex.value].id)
    }



    return {
        zoomToNote,
        zoomToPrevNote,
        zoomToNextNote,
    }
}