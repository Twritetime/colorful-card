import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Extension } from '@tiptap/core'
import { createRoot } from 'react-dom/client'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Video
} from 'lucide-react'
import MediaUploadDialog from './MediaUploadDialog'
import CustomVideoPlayer from './CustomVideoPlayer'

// 自定义视频扩展
const VideoExtension = Extension.create({
  name: 'video',
  addAttributes() {
    return {
      src: {
        default: null,
      },
      poster: {
        default: null,
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-video-player]',
        getAttrs: (element) => {
          if (!(element instanceof HTMLElement)) return false
          return {
            src: element.getAttribute('data-src'),
            poster: element.getAttribute('data-poster'),
          }
        },
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { 
        'data-video-player': '',
        'data-src': HTMLAttributes.src,
        'data-poster': HTMLAttributes.poster,
      },
      [
        'custom-video-player',
        {
          src: HTMLAttributes.src,
          poster: HTMLAttributes.poster,
          class: 'w-full aspect-video rounded-lg overflow-hidden',
        },
      ],
    ]
  },
  addNodeView() {
    return ({ node }) => {
      const container = document.createElement('div')
      container.setAttribute('data-video-player', '')
      container.setAttribute('data-src', node.attrs.src)
      if (node.attrs.poster) {
        container.setAttribute('data-poster', node.attrs.poster)
      }

      const player = document.createElement('div')
      const root = createRoot(player)
      root.render(
        <CustomVideoPlayer
          src={node.attrs.src}
          poster={node.attrs.poster}
          className="w-full aspect-video rounded-lg overflow-hidden"
        />
      )
      container.appendChild(player)

      return {
        dom: container,
        destroy: () => {
          root.unmount()
        },
      }
    }
  },
  addCommands() {
    return {
      setVideo: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },
})

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

const RichTextEditor = ({ content, onChange, placeholder = '在此输入产品描述...' }: RichTextEditorProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      VideoExtension,
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('输入链接URL:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }

    editor.chain().focus().setLink({ href: url }).run()
  }

  const handleMediaUpload = (type: 'image' | 'video') => {
    setUploadType(type)
    setUploadDialogOpen(true)
  }

  const handleUploadComplete = (url: string) => {
    if (uploadType === 'image') {
      editor.chain().focus().setImage({ src: url }).run()
    } else {
      editor.chain().focus().setVideo({ src: url }).run()
    }
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <div className="border-b bg-gray-50 p-2 flex gap-2 flex-wrap">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            title="加粗"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            title="斜体"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
            title="下划线"
          >
            <UnderlineIcon size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            title="无序列表"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            title="有序列表"
          >
            <ListOrdered size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
            title="左对齐"
          >
            <AlignLeft size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
            title="居中对齐"
          >
            <AlignCenter size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
            title="右对齐"
          >
            <AlignRight size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
          <button
            onClick={toggleLink}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            title="添加链接"
          >
            <LinkIcon size={18} />
          </button>
          <button
            onClick={() => handleMediaUpload('image')}
            className="p-2 rounded hover:bg-gray-200"
            title="上传图片"
          >
            <ImageIcon size={18} />
          </button>
          <button
            onClick={() => handleMediaUpload('video')}
            className="p-2 rounded hover:bg-gray-200"
            title="上传视频"
          >
            <Video size={18} />
          </button>
        </div>
        <EditorContent editor={editor} className="prose max-w-none p-4" />
      </div>

      <MediaUploadDialog
        isOpen={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onUploadComplete={handleUploadComplete}
        type={uploadType}
      />
    </>
  )
}

export default RichTextEditor 