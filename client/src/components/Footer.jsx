import { Link } from 'wouter';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-about">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/team">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-team">
                    Our Team
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-contact">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-services">
                    All Services
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-portfolio">
                    Portfolio
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-testimonials">
                    Testimonials
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <a href="mailto:hello@nexusblend.com" className="hover:text-primary transition-colors">
                  hello@nexusblend.com
                </a>
              </li>
              <li className="text-muted-foreground">
                +1 (555) 123-4567
              </li>
              <li className="text-muted-foreground">
                San Francisco, CA
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover-elevate flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover-elevate flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover-elevate flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@nexusblend.com"
                className="w-10 h-10 rounded-full bg-muted hover-elevate flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Nexus Blend. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Blending Design and Code into Digital Perfection.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
