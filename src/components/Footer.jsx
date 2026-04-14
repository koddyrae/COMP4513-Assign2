export default function Footer() {
  return (
    <footer className="w-full bg-zinc-900 border-t border-zinc-800 px-6 py-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-violet-400 font-bold text-lg">SoundVault</p>
          <p className="text-zinc-500 text-sm">A music discovery app built with React</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-zinc-500 text-sm">COMP 4513 Assignment 2</p>
          <p className="text-zinc-500 text-sm">Koddy Rae Madriaga</p>
        </div>
        <a 
          href="https://github.com/koddyrae/COMP4513-Assign2" 
          target="_blank" 
          rel="noreferrer"
          className="text-sm text-violet-400 hover:text-violet-300 transition"
        >
          GitHub Repo →
        </a>
      </div>
    </footer>
  );
}