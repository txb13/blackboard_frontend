import { describe, it, expect } from 'vitest'
import  NoteGui from '../NoteGUI.vue'
import { mount } from '@vue/test-utils'

describe('NoteGUI', () => {
  it('renders properly', () => {
    const wrapper = mount(NoteGui, { props: { msg: 'Pinboard' } })
    expect(wrapper.text()).toContain('Pinboard')
  })
})
