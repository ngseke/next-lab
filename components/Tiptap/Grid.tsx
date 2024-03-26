import { Node, mergeAttributes } from '@tiptap/core'

export const Grid = Node.create({
  name: 'grid',

  group: 'block',

  content: 'gridItem+',

  parseHTML () {
    return [
      {
        tag: 'div[data-type="grid"]',
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-type': 'grid',
      style: `
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        background: yellow;
        padding: 1rem;
      `,
    }), 0]
  },

  addCommands () {
    return {
      addGrid: () => ({ commands }) => {
        return commands.insertContent([
          {
            type: 'grid',
            content: [
              { type: 'gridItem', content: [{ type: 'paragraph' }] },
              { type: 'gridItem', content: [{ type: 'paragraph' }] },
              { type: 'gridItem', content: [{ type: 'paragraph' }] },
              { type: 'gridItem', content: [{ type: 'paragraph' }] },
            ],
          },
        ])
      },
    }
  },
})
