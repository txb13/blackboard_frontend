import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import { useNoteData } from '@/utils/useNoteData'
import type { Note } from '@/services/NoteService'
import type { PbNote } from '@/types/notes'

describe('useNoteData', () => {
  const pbNotes = ref<PbNote[]>([])
  const mockFitView = vi.fn()

  // Mock NoteService with all required methods
  const mockNoteService = {
    getNotes: vi.fn(),
    getNote: vi.fn(),
    addNote: vi.fn(),
    updateNote: vi.fn(),
    deleteNote: vi.fn()
  }

  // Mock useZoom
  vi.mock('@/utils/useZoom', () => ({
    useZoom: () => ({
      zoomToNote: vi.fn()
    })
  }))

  const mockNote: Note = {
    id: 1,
    title: "Test Note",
    content: "Test Content",
    author: "Test Author",
    color: "#FFDDC1",
    creationDate: new Date().toISOString(),
    terminationDate: undefined, // Changed from null to undefined
    xPosition: 100,
    yPosition: 100,
    width: 100,
    height: 100
  }

  const mockPbNote: PbNote = {
    id: String(mockNote.id),
    type: 'custom',
    position: { x: mockNote.xPosition, y: mockNote.yPosition },
    data: {
      color: mockNote.color,
      title: mockNote.title,
      content: mockNote.content,
      author: mockNote.author,
      creationDate: mockNote.creationDate,
      terminationDate: mockNote.terminationDate
    }
  }

  beforeEach(() => {
    pbNotes.value = []
    vi.clearAllMocks()
    mockNoteService.getNotes.mockResolvedValue([mockNote])
    mockNoteService.addNote.mockResolvedValue(mockNote)
    mockNoteService.getNote.mockResolvedValue(mockNote)
  })

  it('should fetch notes successfully', async () => {
    const { getNotes } = useNoteData(mockNoteService, pbNotes, mockFitView)

    await getNotes()

    expect(mockNoteService.getNotes).toHaveBeenCalled()
    expect(pbNotes.value).toHaveLength(1)
    expect(pbNotes.value[0]).toEqual(mockPbNote)
  })

  it('should add a new note successfully', async () => {
    const { addNote, titleField, contentField, authorField } = useNoteData(
        mockNoteService,
        pbNotes,
        mockFitView
    )

    titleField.value = 'New Test Note'
    contentField.value = 'New Test Content'
    authorField.value = 'Test Author'

    await addNote()

    expect(mockNoteService.addNote).toHaveBeenCalledTimes(1)
    const calledWith = mockNoteService.addNote.mock.calls[0][0]

    expect(calledWith.title).toBe('New Test Note')
    expect(calledWith.content).toBe('New Test Content')
    expect(calledWith.author).toBe('Test Author')
    expect(calledWith.id).toBeUndefined()
    expect(calledWith.color).toMatch(/^#/)
    expect(calledWith.width).toBe(100)
    expect(calledWith.height).toBe(100)
  })


  it('should not add note with empty content', async () => {
    const { addNote, contentField } = useNoteData(
        mockNoteService,
        pbNotes,
        mockFitView
    )

    contentField.value = '   '
    await addNote()

    expect(mockNoteService.addNote).not.toHaveBeenCalled()
  })

  it('should refresh notes successfully', async () => {
    const { refresh } = useNoteData(
        mockNoteService,
        pbNotes,
        mockFitView
    )

    await refresh()

    expect(mockNoteService.getNotes).toHaveBeenCalled()
    expect(mockFitView).toHaveBeenCalledWith({ duration: 500 })
    expect(pbNotes.value[0]).toEqual(mockPbNote)
  })
})