import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/PageTransition';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { data: testimonials, isLoading } = useQuery({ 
    queryKey: ['/api/testimonials'],
  });

  const currentTestimonial = testimonials?.[currentIndex];

  const nextTestimonial = () => {
    if (testimonials) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  useEffect(() => {
    if (currentTestimonial) {
      gsap.fromTo(
        '.testimonial-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [currentIndex, currentTestimonial]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <ThreeBackground variant="waves" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6" data-testid="text-testimonials-title">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Client Testimonials
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Hear what our clients have to say about working with us
          </p>
        </div>
      </section>

      {/* Main Testimonial Slider */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          {currentTestimonial && (
            <div className="testimonial-content">
              <Card className="p-12">
                <div className="flex justify-center mb-8">
                  {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium mb-12 text-center leading-relaxed">
                  "{currentTestimonial.content}"
                </blockquote>
                
                <div className="flex items-center justify-center gap-6">
                  <img 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.clientName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="text-xl font-semibold">{currentTestimonial.clientName}</div>
                    <div className="text-muted-foreground">
                      {currentTestimonial.clientRole}
                    </div>
                    <div className="text-primary text-sm font-medium">
                      {currentTestimonial.clientCompany}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Navigation */}
              {testimonials && testimonials.length > 1 && (
                <div className="flex items-center justify-center gap-8 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12"
                    onClick={prevTestimonial}
                    data-testid="button-prev-testimonial"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentIndex
                            ? 'bg-primary w-8'
                            : 'bg-muted-foreground/30'
                        }`}
                        onClick={() => setCurrentIndex(idx)}
                        data-testid={`dot-testimonial-${idx}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-12 h-12"
                    onClick={nextTestimonial}
                    data-testid="button-next-testimonial"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {!currentTestimonial && !isLoading && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No testimonials available yet</p>
            </div>
          )}
        </div>
      </section>

      {/* All Testimonials Grid */}
      {testimonials && testimonials.length > 1 && (
        <section className="py-20 md:py-32 bg-card/50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
              All Reviews
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 hover-elevate transition-all duration-300" data-testid={`card-testimonial-${testimonial.id}`}>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.clientName}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.clientRole} at {testimonial.clientCompany}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      </div>
    </PageTransition>
  );
}
