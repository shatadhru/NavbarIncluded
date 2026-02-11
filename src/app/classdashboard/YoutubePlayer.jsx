"use client";

import React from "react";
import "youtube-video-element";

import {
    MediaController,
    MediaControlBar,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
    MediaVolumeRange,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaPlaybackRateButton,
    MediaFullscreenButton,
    MediaLoadingIndicator,
} from "media-chrome/react";

import {
    Play,
    SkipBack,
    SkipForward,
    Volume2,
    Maximize,
    Gauge,
} from "lucide-react";

export default function YoutubePlayer({classUrl}) {
    return (
      <div className="w-full max-w-[820px] aspect-video">
        <MediaController style={{ width: "100%", height: "100%" , borderRadius: "15px" }}>

            <youtube-video
                className="w-full h-full"
                slot="media"
                    src={classUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
                crossorigin
                style={{ width: "100%", height: "100%"  }}
            />

            <MediaLoadingIndicator slot="centered-chrome" />

            <MediaControlBar>

                <MediaPlayButton >
                    <Play size={18} />
                </MediaPlayButton>

                <MediaSeekBackwardButton>
                    <SkipBack size={18} />
                </MediaSeekBackwardButton>

                <MediaSeekForwardButton>
                    <SkipForward size={18} />
                </MediaSeekForwardButton>

                <MediaTimeRange />

                <MediaTimeDisplay showDuration remaining />

             

                <MediaPlaybackRateButton>
                    <Gauge size={18} />
                </MediaPlaybackRateButton>

                <MediaFullscreenButton>
                    <Maximize size={18} />
                </MediaFullscreenButton>

            </MediaControlBar>

        </MediaController>
      </div>
    );
}
