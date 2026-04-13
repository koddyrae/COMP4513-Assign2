import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

export default function SongRadar({ song }) {
  const radarData = [
    { subject: "Danceability", value: song.danceability },
    { subject: "Energy", value: song.energy },
    { subject: "Valence", value: song.valence },
    { subject: "Liveness", value: song.liveness },
    { subject: "Speechiness", value: song.speechiness },
    { subject: "Acousticness", value: song.acousticness },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar dataKey="value" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
}