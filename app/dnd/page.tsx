'use client'

import { Sortable } from '@/components/Sortable/Sortable'
import { useState } from 'react'
import { type SortableNode } from '../types/SortableNode'

export default function Dnd () {
  const [root, setRoot] = useState<SortableNode>({
    id: 'root',
    children: [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              { id: 3, children: [] },
              { id: 4, children: [] },
              { id: 5, children: [] },
            ],
          },
          {
            id: 6,
            children: [
              { id: 7, children: [] },
            ],
          },
        ],
      },
      {
        id: 8,
        children: [
          { id: 9, children: [] },
        ],
      },
    ],
  })

  return (
    <div className="container mx-auto py-4">
      <Sortable
        root={root}
        onChangeRoot={setRoot}
        renderBody={(id) => (
          <div className="text-sm">{id}</div>
        )}
      />
    </div>
  )
}
