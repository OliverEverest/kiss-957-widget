import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music2, Radio, Disc3 } from "lucide-react";

export default function Kiss957Widget() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch from AzuraCast API every 10 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://azura.typicalmedia.net/api/nowplaying/kiss_95-7");
        const data = await res.json();
        setNowPlaying(data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching Now Playing:", e);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center text-white font-sans relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #f2bb13, #f2a516, #f2811d, #f24c27)`,
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .live-dot {
          width: 12px;
          height: 12px;
          background: #f24c27;
          border-radius: 50%;
          animation: pulse 1.2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.7; }
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[90%] max-w-6xl">
        {/* Left Side - Now Playing */}
        <Card className="bg-black/40 backdrop-blur-xl text-white border-none shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="live-dot"></div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Radio size={28} /> Now Playing
              </h1>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <motion.img
                  src={nowPlaying?.now_playing?.song?.art || "https://via.placeholder.com/300"}
                  alt="Album Art"
                  className="rounded-2xl shadow-lg w-64 h-64 object-cover mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <h2 className="text-2xl font-semibold">
                  {nowPlaying?.now_playing?.song?.title || "Unknown Song"}
                </h2>
                <p className="text-lg text-gray-300">
                  {nowPlaying?.now_playing?.song?.artist || "Unknown Artist"}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Right Side - Song Requests (View Only) */}
        <Card className="bg-black/40 backdrop-blur-xl text-white border-none shadow-xl">
          <CardContent className="p-8 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
                <Music2 size={28} /> Song Request
              </h1>
              <div className="rounded-xl bg-white/10 text-gray-300 p-6 text-center text-lg">
                Song requests are currently unavailable on this widget.<br />
                Visit <strong>KISS 95.7</strong> to submit a request.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Station Footer */}
      <div className="absolute bottom-6 text-center w-full opacity-80 text-sm tracking-wide">
        <Disc3 className="inline mr-2 animate-spin-slow" />
        <span>KISS 95.7 — Live from Typical Media</span>
      </div>
    </div>
  );
}
