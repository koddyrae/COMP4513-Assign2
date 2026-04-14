import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AboutDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border border-zinc-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">About SoundVault</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p className="text-zinc-300">
            SoundVault is a music discovery app built for COMP 4513 Assignment 2. <br />
            An interactive interface that allows users to explore songs, artists, and genres, create playlists, and visualize song features with interactive charts.
          </p>
          <div className="space-y-1  mt-2">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Technologies Used</p>
            <p className="text-zinc-300">React, Vite, React Router, Recharts, shadcn/ui, Tailwind CSS</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Data</p>
            <p className="text-zinc-300">Spotify song, artist, and genre data via a custom Node.js/Express/SQLite API</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Developer</p>
            <p className="text-zinc-300">Koddy Rae Madriaga</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">GitHub</p>
            <div className="space-y-1">
              <a
                href="https://github.com/koddyrae/COMP4513-Assign2"
                target="_blank"
                rel="noreferrer"
                className="block text-violet-400 hover:text-violet-300 transition-colors"
              >
                SoundVault — github.com/koddyrae/COMP4513-Assign2
              </a>
              <a
                href="https://github.com/koddyrae/COMP4513-assign1"
                target="_blank"
                rel="noreferrer"
                className="block text-violet-400 hover:text-violet-300 transition-colors"
              >
                Custom API — github.com/koddyrae/COMP4513-assign1
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}