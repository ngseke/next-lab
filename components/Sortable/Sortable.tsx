import { DndContext, DragOverlay, type DragOverEvent } from '@dnd-kit/core'
import { SortableItem } from './SortableItem'
import { type SortableNode } from '@/app/types/SortableNode'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useId, type ReactNode } from 'react'

type Id = SortableNode['id']

function findNode (id: Id, root: SortableNode): SortableNode | undefined {
  if (root.id === id) return root
  for (const node of root.children) {
    const result = findNode(id, node)
    if (result) return result
  }
}

function findParent (id: Id, root: SortableNode): SortableNode | undefined {
  if (root.children.find(node => node.id === id)) return root
  for (const node of root.children) {
    const result = findParent(id, node)
    if (result) return result
  }
}

function findIndex (id: Id, array: SortableNode['children']) {
  return array.findIndex(item => item.id === id)
}

export function Sortable ({ root, onChangeRoot, renderBody }: {
  root: SortableNode
  onChangeRoot: (root: SortableNode) => void
  renderBody?: (id: SortableNode['id']) => ReactNode
}) {
  const { children } = root

  function handleDragOver ({ active, over }: DragOverEvent) {
    if (!active || !over) return

    const newRoot = structuredClone(root)

    const activeId = active.id
    const overId = over.id

    const activeParent = findParent(activeId, newRoot)
    const overParent = over.data.current?.type === 'empty'
      ? findNode(over.data.current.parentId as Id, newRoot)
      : findParent(overId, newRoot)

    if (!activeParent || !overParent) return

    const activeIndex = findIndex(activeId, activeParent.children)
    const overIndex = findIndex(overId, overParent.children)

    if (activeParent === overParent) {
      activeParent.children = arrayMove(activeParent.children, activeIndex, overIndex)
    } else {
      const node = findNode(activeId, newRoot)

      if (!node) return
      if (node === overParent) return

      activeParent.children.splice(activeIndex, 1)
      overParent.children.splice(overIndex, 0, node)
    }

    onChangeRoot(newRoot)
  }

  const dndContextId = useId()

  return (
    <DndContext id={dndContextId} onDragOver={handleDragOver}>
      <SortableContext items={children} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {
            children.map((node) => (
              <SortableItem
                node={node}
                renderBody={renderBody}
                key={node.id}
              />
            ))
          }
        </div>

        <DragOverlay dropAnimation={{ duration: 0 }}>
          <span className="inline-block size-4 rounded-md bg-neutral-200" />
        </DragOverlay>
      </SortableContext>
    </DndContext>
  )
}
