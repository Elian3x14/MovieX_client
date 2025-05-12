
import React from "react";
import { Link } from "react-router-dom";
import { Film, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-cinema-text pt-12 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-cinema-primary">
              <Film size={28} />
              <span>CinemaPlus</span>
            </Link>
            <p className="text-cinema-muted mt-2">
              Book movie tickets online for the latest films in theaters.
              Experience the best cinema and entertainment.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/movies" className="text-cinema-muted hover:text-cinema-primary transition">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/cinemas" className="text-cinema-muted hover:text-cinema-primary transition">
                  Cinemas
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-cinema-muted hover:text-cinema-primary transition">
                  Promotions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cinema-muted hover:text-cinema-primary transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/terms" className="text-cinema-muted hover:text-cinema-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-cinema-muted hover:text-cinema-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-cinema-muted hover:text-cinema-primary transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-cinema-muted hover:text-cinema-primary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1" size={16} />
                <span className="text-cinema-muted">123 Main Street, City Center, Country</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1" size={16} />
                <span className="text-cinema-muted">+1 234 567 8901</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1" size={16} />
                <span className="text-cinema-muted">support@cinemaplus.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-cinema-muted text-sm">
          <p>© {new Date().getFullYear()} CinemaPlus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
