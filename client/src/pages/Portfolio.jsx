import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PageTransition } from '@/components/PageTransition';
import { ThreeBackground } from '@/components/ThreeBackground';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import portfolio images
import cryptoImg from '@assets/generated_images/portfolio/Crypto_trading_platform_mockup_78383d50.png';
import ecommerceImg from '@assets/generated_images/portfolio/E-commerce_platform_website_mockup_2ca066b6.png';
import fintechImg from '@assets/generated_images/portfolio/Fintech_mobile_banking_app_a8b24e45.png';
import fitnessImg from '@assets/generated_images/portfolio/Fitness_wellness_app_mockup_3040722e.png';
import healthcareImg from '@assets/generated_images/portfolio/Healthcare_telemedicine_platform_mockup_9ec0c5ec.png';
import learningImg from '@assets/generated_images/portfolio/Online_learning_platform_mockup_197e2560.png';
import restaurantImg from '@assets/generated_images/portfolio/Premium_restaurant_website_mockup_d194160c.png';
import realEstateImg from '@assets/generated_images/portfolio/Real_estate_platform_mockup_d24d2764.png';
import saasImg from '@assets/generated_images/portfolio/SaaS_project_management_tool_3d04317f.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: 'ShopHub E-commerce Platform',
    category: 'E-commerce',
    description: 'A modern e-commerce platform with seamless shopping experience, advanced product filtering, and secure payment integration.',
    image: ecommerceImg,
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
    liveUrl: 'https://outfitters.com.pk/',
    featured: true,
  },
  {
    id: 2,
    title: 'FinanceFlow Banking App',
    category: 'Fintech',
    description: 'Secure mobile banking application with real-time transactions, budget tracking, and financial insights dashboard.',
    image: fintechImg,
    technologies: ['React Native', 'Express', 'PostgreSQL', 'AWS'],
    liveUrl: 'https://financeflow.eu/',
    featured: true,
  },
  {
    id: 3,
    title: 'Magma Real Estate',
    category: 'Real Estate',
    description: 'Comprehensive real estate platform featuring advanced property search, virtual tours, and appointment scheduling.',
    image: realEstateImg,
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Google Maps API'],
    liveUrl: 'https://thisismagma.com',
    featured: true,
  },
  {
    id: 4,
    title: 'MediConnect Telemedicine',
    category: 'Healthcare',
    description: 'Healthcare platform connecting patients with doctors through secure video consultations and digital prescriptions.',
    image: healthcareImg,
    technologies: ['Vue.js', 'Django', 'WebRTC', 'PostgreSQL'],
    liveUrl: 'https://mediconnectai.com/',
    featured: false,
  },
  {
    id: 5,
    title: 'TaskFlow Project Manager',
    category: 'SaaS',
    description: 'Team collaboration tool with kanban boards, time tracking, and real-time updates for project management.',
    image: saasImg,
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://taskflowapp.com/',
    featured: false,
  },
  {
    id: 6,
    title: 'Gourmet Restaurant Portal',
    category: 'Web App',
    description: 'Elegant restaurant website with online reservations, menu management, and customer review system.',
    image: restaurantImg,
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://gourmetfoods.pk/',
    featured: false,
  },
  {
    id: 7,
    title: 'FitTrack Wellness App',
    category: 'Mobile',
    description: 'Fitness tracking mobile app with workout plans, nutrition tracking, and progress analytics.',
    image: fitnessImg,
    technologies: ['React Native', 'Firebase', 'TensorFlow', 'HealthKit'],
    liveUrl: 'https://tryfittrack.com/',
    featured: false,
  },
  {
    id: 8,
    title: 'LearnHub E-Learning',
    category: 'Web App',
    description: 'Online learning platform with interactive courses, video streaming, and student progress tracking.',
    image: learningImg,
    technologies: ['Angular', 'Express', 'MongoDB', 'AWS S3'],
    liveUrl: 'https://learninghub.pk/',
    featured: false,
  },
  {
    id: 9,
    title: 'CryptoTrade Exchange',
    category: 'Fintech',
    description: 'Cryptocurrency trading platform with real-time charts, secure wallet integration, and advanced trading features.',
    image: cryptoImg,
    technologies: ['React', 'Node.js', 'Redis', 'WebSocket'],
    liveUrl: 'https://www.revolut.com/',
    featured: false,
  },
];

const categories = ['All', 'Web App', 'E-commerce', 'Mobile', 'SaaS', 'Healthcare', 'Real Estate', 'Fintech'];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const cards = gsap.utils.toArray('.project-card');
    
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
  }, [filteredProjects, selectedCategory]);

  return (
    <PageTransition>
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <ThreeBackground variant="particles" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Explore our recent work and success stories
          </p>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="rounded-full font-medium"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id}
                className="overflow-hidden hover-elevate transition-all duration-300 hover:-translate-y-2 cursor-pointer project-card group border-border/50 hover:border-primary/50"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">View Details</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's create something amazing together
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-8 py-6 rounded-full font-semibold">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold mb-2">{selectedProject.title}</DialogTitle>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium inline-block w-fit">
                  {selectedProject.category}
                </span>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="aspect-video overflow-hidden rounded-xl">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Project Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.liveUrl && (
                  <div>
                    <Button asChild className="rounded-full font-semibold">
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        View Live Site 
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      </div>
    </PageTransition>
  );
}
