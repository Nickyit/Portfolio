import { Terminal, Code, Briefcase, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Code className="w-4 h-4 transition-colors duration-300" />, href: 'https://github.com/Nickyit', label: 'GitHub', hoverClass: 'hover:bg-[#333] hover:border-[#333]' },
    { icon: <Briefcase className="w-4 h-4 transition-colors duration-300" />, href: 'https://linkedin.com/in/nikita-digodiya', label: 'LinkedIn', hoverClass: 'hover:bg-[#0077b5] hover:border-[#0077b5]' },
    { icon: <Mail className="w-4 h-4 transition-colors duration-300" />, href: 'mailto:nikitadigodiya31@gmail.com', label: 'Email', hoverClass: 'hover:bg-[#dd4b39] hover:border-[#dd4b39]' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a] pt-8 pb-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-blue-500/5 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-3 group inline-flex">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Terminal className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">Nikita Digodiya</span>
            </a>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className={`w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white border border-white/10 transition-all duration-300 ${link.hoverClass}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Navigation</h3>
            <ul className="flex flex-col gap-2">
              {['About', 'Skills', 'Projects', 'Experience'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors text-xs">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Legal</h3>
            <ul className="flex flex-col gap-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © {currentYear} AI Engineer Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Designed with</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-glow" />
            <span>by an AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
