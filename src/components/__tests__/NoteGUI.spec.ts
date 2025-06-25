import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NoteGUI from '@/components/NoteGUI.vue'
import type { Note } from '@/services/NoteService'

// Define an emptyResponse mock for the notes
const emptyResponse: Note[] = []

// Mock all required dependencies
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

// Mock child components
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
        wrapper = shallowMount(NoteGUI)
        await wrapper.vm.$nextTick()
    })

    it('should render empty state message when no notes exist', () => {
        expect(wrapper.text()).toContain('keine Notizen vorhanden')
    })
})