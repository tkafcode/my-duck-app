// File: src/app/components/FileTree.tsx
'use server'

import fs from 'fs/promises'
import path from 'path'

type FileNode = {
  name: string
  children?: FileNode[]
  mtime?: string
}

/** Recursively read directory and skip undesired folders */
async function readDirTree(dir: string): Promise<FileNode[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nodes: FileNode[] = []

  for (const entry of entries) {
    if (['node_modules', 'dist'].includes(entry.name)) continue

    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const children = await readDirTree(fullPath)
      nodes.push({ name: entry.name, children })
    } else {
      const stats = await fs.stat(fullPath)
      nodes.push({
        name: entry.name,
        mtime: stats.mtime.toISOString(),
      })
    }
  }

  return nodes
}

/** Render nodes to a tree‐like string, including comments for last modification */
function renderTree(nodes: FileNode[], indent = 0): string {
  return nodes
    .map(node => {
      const prefix = ' '.repeat(indent * 2) + '└── '
      if (node.children) {
        return (
          prefix +
          node.name +
          '\n' +
          renderTree(node.children, indent + 1)
        )
      }
      const modifiedComment = node.mtime
        ? `  // last modified: ${node.mtime}`
        : ''
      return prefix + node.name + modifiedComment
    })
    .join('\n')
}

export default async function FileTree() {
  const appDir = path.join(process.cwd(), 'src', 'app')
  const tree = await readDirTree(appDir)
  const treeText = `src\n${renderTree(tree, 1)}`

  return (
    <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto whitespace-pre font-mono">
      {treeText}
    </pre>
  )
}
