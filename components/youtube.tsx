
import React from 'react';

interface YouTubeProps {
    videoId: string;
}

export default function YouTube({ videoId }: YouTubeProps) {

    return (
        <div >
            <div className=" rounded-2xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800">
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                    <iframe
                        className="rounded-2xl"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded YouTube"
                            style={{
                                width: '100%',
                                height: "380px"
                    }}
                    />
                </div>
            </div>
        </div>
    );
}
