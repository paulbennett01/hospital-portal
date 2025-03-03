import React from "react";

const Videos = () => {
    return (
        <>
        <div className="video-info">
        <h1 className="video-text">Watch this video on: X-ray</h1>
        <iframe className="video" width="560" height="315" src="https://www.youtube.com/embed/fdwI5AzTDQQ?si=uACzsSngOTjTm8va" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div className="video-info">
        <h1 className="video-text">Watch this video on: Blood Tests</h1>
        <iframe className="video" width="560" height="315" src="https://www.youtube.com/embed/jU3vG1h-VXE?si=Vda4x5cl-oNNVvi7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div className="video-info">
        <h1 className="video-text">Watch this video on: Surgical Theatre</h1>
        <iframe className="video" width="560" height="315" src="https://www.youtube.com/embed/NlV2zLkOqjI?si=qZh348EaYRBc6RXQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div className="video-info">
        <h1 className="video-text">Watch this video on: Neurology</h1>
        <iframe className="video" width="560" height="315" src="https://www.youtube.com/embed/ndDpjT0_IM0?si=nWEZSRZs6ybbg67x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        </>
    )
};

export default Videos;
