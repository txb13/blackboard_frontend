import { describe, it, expect } from 'vitest'
import  NoteGui from '../NoteGui.vue'
import { mount } from '@vue/test-utils'

describe('NoteGui', () => {
  it('renders properly', () => {
    const wrapper = mount(NoteGui, { props: { msg: 'Pinboard' } })
    expect(wrapper.text()).toContain('Pinboard')
  })
})
