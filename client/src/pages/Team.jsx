import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/PageTransition';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Linkedin, Twitter, Github, ArrowRight, Users } from 'lucide-react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import team images
import ceoImg from '@assets/generated_images/team/Tech_CEO_headshot_ee04c5a7.png';
import creativeImg from '@assets/generated_images/team/Creative_director_headshot_acc2e206.png';
import leadDevImg from '@assets/generated_images/team/Lead_developer_headshot_9286ec5e.png';
import uxImg from '@assets/generated_images/team/UX_designer_headshot_9a22b576.png';
import marketingImg from '@assets/generated_images/team/Marketing_director_headshot_4b9b1ee6.png';
import seniorImg from '@assets/generated_images/team/Senior_engineer_headshot_8829536e.png';
import projectImg from '@assets/generated_images/team/Project_manager_headshot_dd05acfe.png';
import operationsImg from '@assets/generated_images/team/Operations_director_headshot_fa8e7024.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in tech, passionate about creating digital excellence.',
    image: ceoImg,
    linkedinUrl: 'https://linkedin.com/in/sarachen',
    twitterUrl: 'https://twitter.com/sarachen',
    githubUrl: null,
    order: 1,
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Creative Director',
    bio: 'Award-winning designer who brings creativity and innovation to every project.',
    image: creativeImg,
    linkedinUrl: 'https://linkedin.com/in/marcusr',
    twitterUrl: 'https://twitter.com/marcusr',
    githubUrl: null,
    order: 2,
  },
  {
    id: 3,
    name: 'David Kim',
    role: 'Lead Developer',
    bio: 'Full-stack expert specializing in scalable architectures and clean code.',
    image: leadDevImg,
    linkedinUrl: 'https://linkedin.com/in/davidkim',
    twitterUrl: null,
    githubUrl: 'https://github.com/davidkim',
    order: 3,
  },
  {
    id: 4,
    name: 'Emily Johnson',
    role: 'UX Designer',
    bio: 'User-centered designer crafting intuitive experiences that delight.',
    image: uxImg,
    linkedinUrl: 'https://linkedin.com/in/emilyjohnson',
    twitterUrl: 'https://twitter.com/emilyjohnson',
    githubUrl: null,
    order: 4,
  },
  {
    id: 5,
    name: 'Alex Morgan',
    role: 'Marketing Director',
    bio: 'Strategic marketer driving growth through data-driven campaigns.',
    image: marketingImg,
    linkedinUrl: 'https://linkedin.com/in/alexmorgan',
    twitterUrl: 'https://twitter.com/alexmorgan',
    githubUrl: null,
    order: 5,
  },
  {
    id: 6,
    name: 'Jordan Lee',
    role: 'Senior Engineer',
    bio: 'Backend specialist building robust and efficient systems.',
    image: seniorImg,
    linkedinUrl: 'https://linkedin.com/in/jordanlee',
    twitterUrl: null,
    githubUrl: 'https://github.com/jordanlee',
    order: 6,
  },
  {
    id: 7,
    name: 'Rachel Martinez',
    role: 'Project Manager',
    bio: 'Organized professional ensuring projects deliver on time and exceed expectations.',
    image: projectImg,
    linkedinUrl: 'https://linkedin.com/in/rachelmartinez',
    twitterUrl: null,
    githubUrl: null,
    order: 7,
  },
  {
    id: 8,
    name: 'Kevin Patel',
    role: 'Operations Director',
    bio: 'Streamlining processes and optimizing workflows for maximum efficiency.',
    image: operationsImg,
    linkedinUrl: 'https://linkedin.com/in/kevinpatel',
    twitterUrl: null,
    githubUrl: null,
    order: 8,
  },
];

export default function Team() {
  useEffect(() => {
    const cards = gsap.utils.toArray('.team-card');
    
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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <ThreeBackground variant="geometric" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            The talented individuals behind every successful project
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card 
                key={member.id}
                className="overflow-hidden hover-elevate transition-all duration-300 hover:-translate-y-2 group border-border/50 hover:border-primary/50 team-card"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay with bio on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-4 font-medium">{member.role}</p>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-all"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.twitterUrl && (
                      <a
                        href={member.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-all"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {member.githubUrl && (
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-all"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 md:py-32 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Users className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for talented individuals who share our passion for excellence
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-8 py-6 rounded-full font-semibold hover:shadow-xl hover:shadow-primary/20 transition-all">
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      </div>
    </PageTransition>
  );
}
