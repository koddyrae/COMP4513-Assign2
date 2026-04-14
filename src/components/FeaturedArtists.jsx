// src/components/FeaturedArtists.jsx
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FeaturedArtists({ artists }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Featured Artists</h2>
      <div className="relative">
        <Carousel 
            className="w-full"
            opts={{
                loop: true,
                align: "start",
                }}
        >
        <CarouselContent style={{ gap: "16px", marginLeft: "0", marginRight: "0" }}>
            {artists.map(artist => (
            <CarouselItem key={artist.artist_id} style={{ flex: "0 0 calc(25% - 12px)", paddingLeft: "0", paddingRight: "0" }}>
                <Link 
                    to={`/artists/${artist.artist_id}`}
                    className="flex flex-col group"
                >
                <div className="w-full aspect-square overflow-hidden rounded-lg border border-zinc-800 group-hover:border-violet-500 transition">
                <img
                    src={artist.artist_image_url}
                    alt={artist.artist_name}
                    onError={e => e.target.src = "https://placehold.co/300x300?text=No+Image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                </div>
                    <p className="text-sm font-medium text-zinc-300 group-hover:text-white mt-2 transition">{artist.artist_name}</p>
                    <p className="text-xs text-zinc-500">{artist.type_name}</p>
                </Link>
            </CarouselItem>
        ))}
        </CarouselContent>
            <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0 bg-zinc-800 hover:bg-violet-600 border-zinc-700 text-white" />
                <CarouselNext className="static translate-y-0 bg-zinc-800 hover:bg-violet-600 border-zinc-700 text-white" />
            </div>
        </Carousel>
      </div>
    </div>
  );
}