import { Node, mergeAttributes } from '@tiptap/core'

export const GridItem = Node.create({
  name: 'gridItem',

  group: 'gridContent', // 创建一个特定的组，而不是直接使用 'block'，以避免嵌套

  content: 'block+',
  draggable: true,

  defining: true,

  parseHTML () {
    return [
      {
        tag: 'div[data-type="gridItem"]',
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-type': 'gridItem',
      style: `
        background: #eee;
        min-height: 1rem;
        padding: 1rem;
      `,
    }), 0]
  },

  addCommands () {
    return {
      addGridItem: () => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          content: [{ type: 'paragraph' }],
        })
      },
    }
  },
})
