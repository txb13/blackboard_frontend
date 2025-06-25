import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import { ref } from 'vue'
import NoteGUI from '@/components/NoteGUI.vue'
import type { Note } from '@/services/NoteService'

// Leeres notes-Array als Mock-Daten
const emptyResponse: Note[] = []

// Definiere mockPbNotes als ref, damit es reaktiv ist
const mockPbNotes = ref([])

// Mock Pinia-Stores
vi.mock('@/stores/useNoteStore', () => ({
    useNoteStore: () => ({
        pbNotes: mockPbNotes,
        refresh: vi.fn()
    })
}))

vi.mock('@/stores/useEditStore', () => ({
    useEditStore: () => ({
        isEditing: false
    })
}))

// Mock NoteService, wie gehabt
vi.mock('@/services/NoteService', () => ({
    default: vi.fn().mockImplementation(() => ({
        getNotes: vi.fn().mockResolvedValue(emptyResponse)
    }))
}))

vi.mock('@vue-flow/core', () => ({
    useVueFlow: () => ({
        fitView: vi.fn()
    }),
    VueFlow: vi.fn()
}))

vi.mock('@vue-flow/background', () => ({
    Background: vi.fn()
}))

vi.mock('@/utils/useZoom', () => ({
    useZoom: () => ({
        zoomToNextNote: vi.fn(),
        zoomToPrevNote: vi.fn()
    })
}))

vi.mock('@/utils/useNoteData', () => ({
    useNoteData: () => ({
        getNotes: vi.fn(),
        addNote: vi.fn(),
        refresh: vi.fn(),
        titleField: '',
        authorField: '',
        contentField: ''
    })
}))

vi.mock('@/utils/useChangeHandler', () => ({
    useNodeChangeHandler: vi.fn()
}))

// Mock Child-Komponenten
vi.mock('@/components/ZoomControls.vue', () => ({
    default: {
        name: 'ZoomControls',
        render: () => {}
    }
}))

vi.mock('@/components/NoteForm.vue', () => ({
    default: {
        name: 'NoteForm',
        render: () => {}
    }
}))

vi.mock('@/components/RefreshButton.vue', () => ({
    default: {
        name: 'RefreshButton',
        render: () => {}
    }
}))

vi.mock('@/components/CustomNode.vue', () => ({
    default: {
        name: 'CustomNode',
        render: () => {}
    }
}))

describe('NoteGUI', () => {
    let wrapper: ReturnType<typeof shallowMount>

    beforeEach(async () => {
        // Sicherstellen, dass pbNotes leer ist
        mockPbNotes.value = []
        wrapper = shallowMount(NoteGUI)
        await flushPromises() // auf asynchrone onMounted-Calls warten
    })

    it('should render empty state message when no notes exist', () => {
        expect(wrapper.text()).toContain('keine Notizen vorhanden')
    })
})
