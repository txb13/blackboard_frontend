import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import NoteService from '@/services/NoteService'
import type { Note } from '@/services/NoteService'


vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
        create: vi.fn(() => ({
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn()
        }))
    }
}))

describe('NoteService', () => {
    const twoNotesResponse: Note[] = [
        {
            id: 1,
            title: 'First Note',
            content: 'Content 1',
            author: 'Author 1',
            color: '#FFDDC1',
            creationDate: new Date().toISOString(),
            terminationDate: undefined,
            xPosition: 100,
            yPosition: 100,
            width: 100,
            height: 100
        },
        {
            id: 2,
            title: 'Second Note',
            content: 'Content 2',
            author: 'Author 2',
            color: '#FFABAB',
            creationDate: new Date().toISOString(),
            terminationDate: undefined,
            xPosition: 200,
            yPosition: 200,
            width: 100,
            height: 100
        }
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should fetch notes from backend', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: twoNotesResponse })

        const noteService = new NoteService()
        const notes = await noteService.getNotes()

        expect(notes).toEqual(twoNotesResponse)
        expect(axios.get).toHaveBeenCalled()
    })

    it('should handle empty note list', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: [] })

        const noteService = new NoteService()
        const notes = await noteService.getNotes()

        expect(notes).toEqual([])
    })

    it('should add a new note', async () => {
        const newNote: Note = {
            id: undefined,
            title: 'New Note',
            content: 'New Content',
            author: 'New Author',
            color: '#FFDDC1',
            creationDate: undefined,
            terminationDate: undefined,
            xPosition: 100,
            yPosition: 100,
            width: 100,
            height: 100
        }

        const createdNote = { ...newNote, id: 3 }

        vi.mocked(axios.post).mockResolvedValue({ data: createdNote })

        const noteService = new NoteService()
        const result = await noteService.addNote(newNote)

        expect(axios.post).toHaveBeenCalledWith(
            '/notes',
            expect.objectContaining({
                title: 'New Note',
                content: 'New Content',
                author: 'New Author',
                color: '#FFDDC1',
                xPosition: 100,
                yPosition: 100,
                width: 100,
                height: 100
                // creationDate: undefined, ← optional
                // terminationDate: undefined ← optional
            })
        )
        expect(result).toEqual(createdNote)
    })
})
