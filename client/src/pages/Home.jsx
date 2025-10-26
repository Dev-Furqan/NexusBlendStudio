import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThreeBackground } from '@/components/ThreeBackground';
import { PageTransition } from '@/components/PageTransition';
import { ArrowRight, Code, Palette, Smartphone, TrendingUp, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ecommerceImg from '@assets/generated_images/E-commerce_platform_website_mockup_2ca066b6.png';
import fintechImg from '@assets/generated_images/Fintech_mobile_banking_app_a8b24e45.png';
import realEstateImg from '@assets/generated_images/Real_estate_platform_mockup_d24d2764.png';
import testimon1 from '@assets/generated_images/Client_testimonial_portrait_1_27fc4be2.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceIcons = {
  Code: Code,
  Palette: Palette,
  Smartphone: Smartphone,
  TrendingUp: TrendingUp,
};

export default function Home() {
  const sectionRef = useRef(null);
  
  const { data: services } = useQuery({ 
    queryKey: ['/api/services'],
  });
  
  const { data: projects } = useQuery({ 
    queryKey: ['/api/projects'],
  });
  
  const { data: testimonials } = useQuery({ 
    queryKey: ['/api/testimonials'],
  });

  const featuredProjects = projects?.filter(p => p.featured).slice(0, 3) || [];
  const displayTestimonial = testimonials?.[0];

  useEffect(() => {
    const sections = gsap.utils.toArray('.animate-on-scroll');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [services, projects, testimonials]);

  return (
    <PageTransition>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ThreeBackground variant="particles" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Blending Design and Code
            </span>
            <br />
            <span className="text-foreground">into Digital Perfection</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            We craft exceptional digital experiences that seamlessly merge stunning design with powerful code.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/portfolio">
              <Button size="lg" className="px-8 py-6 rounded-full font-semibold text-lg" data-testid="button-hero-portfolio">
                View Our Work <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8 py-6 rounded-full font-semibold text-lg backdrop-blur-sm bg-background/20" data-testid="button-hero-contact">
                Get in Touch
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-32 animate-on-scroll">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4" data-testid="text-services-title">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive solutions for your digital needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services?.slice(0, 4).map((service) => {
              const IconComponent = serviceIcons[service.icon] || Code;
              return (
                <Card key={service.id} className="p-8 hover-elevate transition-all duration-300 hover:-translate-y-2" data-testid={`card-service-${service.id}`}>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" className="rounded-full font-semibold" data-testid="button-view-all-services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 md:py-32 bg-card/50 animate-on-scroll">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4" data-testid="text-projects-title">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Showcasing our latest and greatest work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover-elevate transition-all duration-300 hover:-translate-y-2" data-testid={`card-project-${project.id}`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button className="rounded-full font-semibold px-8" data-testid="button-view-portfolio">
                View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 animate-on-scroll">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '8+', label: 'Years Experience' },
              { number: '25+', label: 'Team Members' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center" data-testid={`stat-${idx}`}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Preview */}
      {displayTestimonial && (
        <section className="py-20 md:py-32 bg-card/50 animate-on-scroll">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
              "{displayTestimonial.content}"
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <img 
                src={displayTestimonial.image} 
                alt={displayTestimonial.clientName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold">{displayTestimonial.clientName}</div>
                <div className="text-muted-foreground text-sm">
                  {displayTestimonial.clientRole} at {displayTestimonial.clientCompany}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/testimonials">
                <Button variant="outline" className="rounded-full font-semibold" data-testid="button-view-testimonials">
                  View All Testimonials <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <ThreeBackground variant="geometric" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's create something amazing together
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-8 py-6 rounded-full font-semibold text-lg" data-testid="button-cta-contact">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </PageTransition>
  );
}
