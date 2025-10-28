import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/PageTransition';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import testimonial images
import testimonial1 from '@assets/generated_images/testimonial/Client_testimonial_portrait_1_27fc4be2.png';
import testimonial2 from '@assets/generated_images/testimonial/Client_testimonial_portrait_2_9a22527d.png';
import testimonial3 from '@assets/generated_images/testimonial/Client_testimonial_portrait_3_4d761665.png';
import testimonial4 from '@assets/generated_images/testimonial/Client_testimonial_portrait_4_e2c0752f.png';
import testimonial5 from '@assets/generated_images/testimonial/Client_testimonial_portrait_5_bd1ed4f0.png';
import testimonial6 from '@assets/generated_images/testimonial/Client_testimonial_portrait_6_fcc2d5f2.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    clientName: 'Jennifer Williams',
    clientRole: 'CEO',
    clientCompany: 'TechStart Inc',
    content: 'Nexus Blend transformed our online presence completely. Their attention to detail and innovative approach exceeded all our expectations. The team was professional, responsive, and delivered exactly what we envisioned.',
    rating: 5,
    image: testimonial1,
  },
  {
    id: 2,
    clientName: 'Michael Thompson',
    clientRole: 'Founder',
    clientCompany: 'GreenEarth Solutions',
    content: 'Working with Nexus Blend was an absolute pleasure. They took our complex requirements and created a beautiful, user-friendly platform that our customers love. Highly recommended!',
    rating: 5,
    image: testimonial2,
  },
  {
    id: 3,
    clientName: 'Lisa Anderson',
    clientRole: 'Marketing Director',
    clientCompany: 'Fashion Forward',
    content: 'The e-commerce platform they built for us has increased our online sales by 250%. The design is stunning and the functionality is flawless. Best investment we have made!',
    rating: 5,
    image: testimonial3,
  },
  {
    id: 4,
    clientName: 'Robert Chang',
    clientRole: 'CTO',
    clientCompany: 'DataDrive Analytics',
    content: 'Nexus Blend is technical expertise meets creative excellence. They built us a complex SaaS platform that scales beautifully. Their code quality is outstanding.',
    rating: 5,
    image: testimonial4,
  },
  {
    id: 5,
    clientName: 'Amanda Foster',
    clientRole: 'Product Manager',
    clientCompany: 'HealthPlus',
    content: 'From concept to launch, Nexus Blend guided us every step of the way. Their collaborative approach and deep understanding of user experience made all the difference.',
    rating: 5,
    image: testimonial5,
  },
  {
    id: 6,
    clientName: 'David Park',
    clientRole: 'VP of Operations',
    clientCompany: 'LogiTech Solutions',
    content: 'The team at Nexus Blend delivered our project ahead of schedule without compromising on quality. Their project management and communication were exceptional throughout.',
    rating: 5,
    image: testimonial6,
  },
];

export default function Testimonials() {
  useEffect(() => {
    const cards = gsap.utils.toArray('.testimonial-card');
    
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <PageTransition>
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <ThreeBackground variant="waves" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Client Testimonials
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Hear what our clients have to say about working with us
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card 
                key={testimonial.id} 
                className="p-8 hover-elevate transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-primary/50 group testimonial-card"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.clientName}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
                  />
                  <div className="flex-1">
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

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-card/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '100%', label: 'Client Satisfaction' },
              { number: '250+', label: 'Projects Completed' },
              { number: '98%', label: 'On-Time Delivery' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our growing list of satisfied clients
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-8 py-6 rounded-full font-semibold hover:shadow-xl hover:shadow-primary/20 transition-all">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      </div>
    </PageTransition>
  );
}
