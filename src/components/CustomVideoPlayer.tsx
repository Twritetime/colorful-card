import { useState, useRef, useEffect } from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward
} from 'lucide-react'

interface CustomVideoPlayerProps {
  src: string
  poster?: string
  className?: string
}

const CustomVideoPlayer = ({ src, poster, className = '' }: CustomVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return

    const time = parseFloat(e.target.value)
    videoRef.current.currentTime = time
    setCurrentTime(time)
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return

    const value = parseFloat(e.target.value)
    videoRef.current.volume = value
    setVolume(value)
    setIsMuted(value === 0)
  }

  const toggleMute = () => {
    if (!videoRef.current) return

    if (isMuted) {
      videoRef.current.volume = volume || 1
      setIsMuted(false)
    } else {
      videoRef.current.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      try {
        await containerRef.current.requestFullscreen()
      } catch (error) {
        console.error('全屏模式不可用:', error)
      }
    } else {
      try {
        await document.exitFullscreen()
      } catch (error) {
        console.error('退出全屏模式失败:', error)
      }
    }
  }

  const skip = (seconds: number) => {
    if (!videoRef.current) return

    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const showControlsTemporarily = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlay}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* 进度条 */}
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleProgress}
          className="w-full h-1 mb-4 rounded-full appearance-none bg-gray-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            {/* 播放控制 */}
            <button onClick={() => skip(-10)} className="p-1 hover:bg-white/20 rounded">
              <SkipBack size={20} />
            </button>
            <button onClick={togglePlay} className="p-1 hover:bg-white/20 rounded">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={() => skip(10)} className="p-1 hover:bg-white/20 rounded">
              <SkipForward size={20} />
            </button>

            {/* 时间显示 */}
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* 音量控制 */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="p-1 hover:bg-white/20 rounded">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                className="w-20 h-1 rounded-full appearance-none bg-gray-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>

            {/* 全屏控制 */}
            <button onClick={toggleFullscreen} className="p-1 hover:bg-white/20 rounded">
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomVideoPlayer 