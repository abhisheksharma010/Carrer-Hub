"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  Search,
  Heart,
  Shuffle,
  Repeat,
} from "lucide-react"

interface Track {
  id: string
  name: string
  artist: string
  album: string
  duration: number
  image: string
  preview_url?: string
}

interface SpotifyPlayerProps {
  className?: string
}

export function SpotifyPlayer({ className }: SpotifyPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [volume, setVolume] = useState([75])
  const [progress, setProgress] = useState([0])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Track[]>([])
  const [focusPlaylists, setFocusPlaylists] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock focus playlists
  useEffect(() => {
    setFocusPlaylists([
      {
        id: "1",
        name: "Deep Focus",
        artist: "Spotify",
        album: "Focus Playlist",
        duration: 3600,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "2",
        name: "Lofi Hip Hop",
        artist: "Chillhop Music",
        album: "Study Beats",
        duration: 2400,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "3",
        name: "Ambient Focus",
        artist: "Brian Eno",
        album: "Music for Airports",
        duration: 2800,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "4",
        name: "Classical Focus",
        artist: "Various Artists",
        album: "Classical Study Music",
        duration: 4200,
        image: "/placeholder.svg?height=60&width=60",
      },
    ])
  }, [])

  // Mock search function
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockResults: Track[] = [
        {
          id: "search1",
          name: searchQuery,
          artist: "Search Result Artist",
          album: "Search Album",
          duration: 180,
          image: "/placeholder.svg?height=60&width=60",
        },
        {
          id: "search2",
          name: `${searchQuery} (Instrumental)`,
          artist: "Instrumental Version",
          album: "Focus Music",
          duration: 240,
          image: "/placeholder.svg?height=60&width=60",
        },
      ]
      setSearchResults(mockResults)
      setIsLoading(false)
    }, 1000)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const selectTrack = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgress([0])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Simulate progress
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev[0] + 1
          return newProgress >= currentTrack.duration ? [0] : [newProgress]
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTrack])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search */}
      <Card className="glass-effect border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Music className="h-5 w-5 mr-2" />
            Focus Music
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search for focus music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">Search Results</h4>
              {searchResults.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
                  onClick={() => selectTrack(track)}
                >
                  <img src={track.image || "/placeholder.svg"} alt={track.name} className="w-10 h-10 rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{track.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Focus Playlists */}
      <Card className="glass-effect border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Recommended for Focus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focusPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => selectTrack(playlist)}
              >
                <img src={playlist.image || "/placeholder.svg"} alt={playlist.name} className="w-12 h-12 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{playlist.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{playlist.artist}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {formatTime(playlist.duration)}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-blue-600">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Now Playing */}
      {currentTrack && (
        <Card className="glass-effect border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <img
                src={currentTrack.image || "/placeholder.svg"}
                alt={currentTrack.name}
                className="w-16 h-16 rounded-lg shadow-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-blue-900 truncate">{currentTrack.name}</h4>
                <p className="text-sm text-blue-700 truncate">{currentTrack.artist}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-blue-600">{formatTime(progress[0])}</span>
                  <Slider
                    value={progress}
                    onValueChange={setProgress}
                    max={currentTrack.duration}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-blue-600">{formatTime(currentTrack.duration)}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <Button size="sm" variant="ghost" className="text-blue-600">
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-blue-600">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={togglePlayPause}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button size="sm" variant="ghost" className="text-blue-600">
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-blue-600">
                <Repeat className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume & Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <VolumeX className="h-4 w-4 text-blue-600" />
                <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-20" />
                <Volume2 className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-blue-600">
                  <Heart className="h-4 w-4" />
                </Button>
                {/* Music Visualizer */}
                {isPlaying && (
                  <div className="music-visualizer">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="music-bar" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
