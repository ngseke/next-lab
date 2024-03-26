import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Grid } from './Grid'
import { GridItem } from './GridItem'

const extensions = [
  StarterKit,
  Grid,
  GridItem,
]

const content = '<p>Hello World!</p>'

export function Tiptap () {
  const editor = useEditor({
    extensions,
    content,
    onUpdate (event) {
      console.log(event.editor.getHTML())
    },
  })

  return (
    <div>
      <div>
        <button className="border" type="button" onClick={() => {
          editor?.chain().focus().addGrid().run()
        }}
        >add grid</button>
        <button className="border" type="button" onClick={() => {
          editor?.chain().focus().addGridItem().run()
        }}
        >add grid item</button>
      </div>

      <EditorContent editor={editor} className="min-h-80 border" />
    </div>
  )
}
