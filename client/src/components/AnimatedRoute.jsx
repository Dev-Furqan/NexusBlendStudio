import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

export function AnimatedRoute({ children }) {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <div key={location}>
        {children}
      </div>
    </AnimatePresence>
  );
}
