import { describe, it, expect, vi, beforeEach } from 'vitest'
import {flushPromises, shallowMount, mount} from '@vue/test-utils'
import NoteGui from '../NoteGUI.vue'
import axios from 'axios'
import type { Note } from '@/services/NoteService'


const emptyResponse: Note[] = []
const mockNotes: Note[] = [{
    id: 1,
    title: " Test Notiz123",
    content: "Test Inhalt",
    author: "Test Autor",
    color: "#FFDDC1",
    creationDate: new Date().toISOString(),
    terminationDate: undefined,
    xPosition: 100,
    yPosition: 100,
    width: 100,
    height: 100
}]

vi.mock('@vue-flow/core', () => ({
    useVueFlow: () => ({
        onNodesChange: vi.fn(),
        applyNodeChanges: vi.fn(),
        fitView: vi.fn()
    }),
    VueFlow: {
        name: 'VueFlow',
        props: ['nodes'],
        template: `
    <div data-test="mocked-vueflow">
      <div v-for="node in nodes" :key="node.id" class="mock-node">{{ node.data.title }}</div>
    </div>
  `
    }
}))

vi.mock('axios')

describe('NoteGUI', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(axios.get).mockResolvedValue({
            data: mockNotes
        })
    })


    it('renders the component', async () => {
        const wrapper = shallowMount(NoteGui)

        await flushPromises()
        expect(wrapper.exists()).toBe(true)
    })

    it('render note from backend', async () => {
        const mockResponse = { data: mockNotes };
        // vi.mocked(axios.get).mockResolvedValueOnce(mockResponse);
        vi.mocked(axios, true).get.mockResolvedValueOnce(mockResponse);
        // mount wichtig, rendert auch kinder komponente -> vue-flow
        const wrapper = mount(NoteGui);
        await flushPromises();
        console.log(wrapper.html())

        expect(wrapper.text()).toContain('Notizen: 1');
        expect(wrapper.text()).toContain('Test Notiz123');

    })

    it('should show message when there are no notes', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: emptyResponse })

        const wrapper = mount(NoteGui)

        await flushPromises()

        expect(wrapper.text()).toContain('keine Notizen vorhanden')
    })
})
