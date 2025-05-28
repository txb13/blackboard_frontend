// src/types/notes.ts
export interface PbNoteData {
  id?: number
  title: string
  content: string
  author: string
  creationDate?: string
  color?: string
  // …ggf. noch terminationDate, width, height, etc.
}

export interface PbNote {
  id: string
  type: 'custom'
  position: { x: number; y: number }
  data: PbNoteData
}
