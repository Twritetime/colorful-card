import { useState, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { X, Upload } from 'lucide-react'
import { uploadToBlob } from '@/lib/blob'

interface MediaUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete: (url: string) => void
  type: 'image' | 'video'
}

const MAX_FILE_SIZE = {
  image: 5 * 1024 * 1024, // 5MB
  video: 100 * 1024 * 1024 // 100MB
}

const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/webm', 'video/ogg']
}

const MediaUploadDialog = ({ isOpen, onClose, onUploadComplete, type }: MediaUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    // 检查文件类型
    if (!ALLOWED_TYPES[type].includes(selectedFile.type)) {
      setError(`不支持的文件类型。请上传 ${ALLOWED_TYPES[type].join(', ')} 格式的文件。`)
      return
    }

    // 检查文件大小
    if (selectedFile.size > MAX_FILE_SIZE[type]) {
      setError(`文件大小不能超过 ${MAX_FILE_SIZE[type] / 1024 / 1024}MB`)
      return
    }

    setFile(selectedFile)
    setError(null)

    // 创建预览
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // 如果是视频，加载元数据
    if (type === 'video' && videoRef.current) {
      videoRef.current.src = objectUrl
    }
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setUploadProgress(0)
      setError(null)

      // 模拟上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 500)

      const url = await uploadToBlob(file)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      onUploadComplete(url)
      
      // 清理
      setTimeout(() => {
        setFile(null)
        setPreview(null)
        setUploadProgress(0)
        onClose()
      }, 1000)
    } catch (error) {
      setError('上传失败，请重试')
      setUploadProgress(0)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      const fakeEvent = {
        target: { files: [droppedFile] }
      } as unknown as React.ChangeEvent<HTMLInputElement>
      handleFileSelect(fakeEvent)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold">
                {type === 'image' ? '上传图片' : '上传视频'}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <div
              className="border-2 border-dashed rounded-lg p-8 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {!file ? (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600"
                    >
                      <span>选择文件</span>
                      <input
                        id="file-upload"
                        ref={fileInputRef}
                        type="file"
                        className="sr-only"
                        accept={ALLOWED_TYPES[type].join(',')}
                        onChange={handleFileSelect}
                      />
                    </label>
                    <p className="pl-1">或拖放文件到此处</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    {type === 'image' ? 'PNG, JPG, GIF 最大 5MB' : 'MP4, WebM, OGG 最大 100MB'}
                  </p>
                </div>
              ) : (
                <div>
                  {type === 'image' ? (
                    <img
                      src={preview!}
                      alt="预览"
                      className="max-h-[400px] mx-auto"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={preview!}
                      controls
                      className="max-h-[400px] mx-auto"
                    />
                  )}
                </div>
              )}
            </div>

            {uploadProgress > 0 && (
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  上传进度：{uploadProgress}%
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleUpload}
                disabled={!file || uploadProgress > 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
              >
                上传
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default MediaUploadDialog 