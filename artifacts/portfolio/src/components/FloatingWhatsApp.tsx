import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "252656042512";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Abdimaalik%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20work%20with%20you!`;

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-floating-whatsapp"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25d366] text-white rounded-full shadow-lg shadow-[#25d366]/30 hover:shadow-[#25d366]/60 transition-all"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="pl-4 pr-1 py-3 font-semibold text-sm hidden sm:block">Chat on WhatsApp</span>
      <span className="flex items-center justify-center w-14 h-14 rounded-full">
        <FaWhatsapp size={26} />
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30 pointer-events-none" />
    </motion.a>
  );
}
