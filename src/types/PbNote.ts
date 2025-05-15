
export interface PbNote {
  id: string
  type: 'custom'
  position: { x: number; y: number }
  data: {
    title: string
    content: string
    author: string
    creationDate?: string | null
    terminationDate?: string | null
    color?: string | null
  }
}
