import { type SortableNode } from '@/app/types/SortableNode'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { type ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'

export function SortableItem ({ node, renderBody }: {
  node: SortableNode
  renderBody?: (id: SortableNode['id']) => ReactNode
}) {
  const { id } = node
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  })

  const { setNodeRef: setNodeRefEmpty } = useSortable({
    id: `${id}-empty`,
    data: {
      type: 'empty',
      parentId: id,
    },
  })

  const { children } = node

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <div
      className={clsx('relative flex gap-2 rounded-md border border-neutral-200 bg-white p-2', {
        'z-10': isDragging,
      })}
      style={style}
      ref={setNodeRef}
    >
      <div
        className="size-4 rounded-md bg-neutral-200"
        {...attributes}
        {...listeners}
      />

      <div className="flex flex-1 flex-col gap-1">
        <div>
          {renderBody?.(id)}
        </div>

        <SortableContext items={children} strategy={verticalListSortingStrategy}>
          <div className="flex min-h-8 flex-col gap-2 rounded-md bg-neutral-100 p-2" ref={setNodeRefEmpty}>
            {!isDragging &&
              children.map((node) => (
                <SortableItem
                  node={node}
                  renderBody={renderBody}
                  key={node.id}
                />
              ))
            }
          </div>
        </SortableContext>
      </div>
    </div>
  )
}
