import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AboutDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About SoundVault</DialogTitle>
        </DialogHeader>
        <div>
          <p>SoundVault is a music discovery app built for COMP 4513 Assignment 2.</p>
          <br />
          <p><strong>Technologies Used</strong></p>
          <p>React, Vite, React Router, Recharts, shadcn/ui, Tailwind CSS</p>
          <br />
          <p><strong>Data</strong></p>
          <p>Spotify song, artist, and genre data via a custom Node.js/Express API</p>
          <br />
          <p><strong>Developer</strong></p>
          <p>Koddy Rae</p>
          <br />
          <p><strong>GitHub</strong></p>
          <a href="https://github.com/koddyrae/COMP4513-Assign2" target="_blank" rel="noreferrer">
            github.com/koddyrae/COMP4513-Assign2
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}