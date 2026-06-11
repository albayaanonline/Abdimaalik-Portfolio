export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-background text-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} <span className="font-bold text-white">Abdimaalik Developer</span>. All rights reserved.
          </div>
          
          <div className="text-sm text-muted-foreground">
            Building modern web experiences and AI-powered solutions.
          </div>
          
          <div className="flex gap-6 text-sm font-medium">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}