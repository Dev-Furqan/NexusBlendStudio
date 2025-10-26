import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageTransition } from '@/components/PageTransition';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Target, Eye, Heart, Users, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const timeline = [
  { year: '2016', title: 'Founded', description: 'Nexus Blend was born with a vision to revolutionize web development' },
  { year: '2018', title: 'Expansion', description: 'Grew to a team of 10 talented designers and developers' },
  { year: '2020', title: 'Recognition', description: 'Won Best Digital Agency award' },
  { year: '2022', title: 'Global Reach', description: 'Expanded services to clients worldwide' },
  { year: '2024', title: 'Innovation', description: 'Pioneering AI-powered design solutions' },
];

const values = [
  { icon: Target, title: 'Excellence', description: 'We strive for perfection in every project we undertake' },
  { icon: Heart, title: 'Passion', description: 'We love what we do and it shows in our work' },
  { icon: Users, title: 'Collaboration', description: 'We work closely with clients to bring their vision to life' },
];

export default function About() {
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
  }, []);

  return (
    <PageTransition>
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <ThreeBackground variant="waves" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6" data-testid="text-about-title">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              About Nexus Blend
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            We're a team of passionate designers and developers dedicated to creating exceptional digital experiences that drive results.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32 animate-on-scroll">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To empower businesses with cutting-edge digital solutions that blend beautiful design with robust code, creating experiences that not only look stunning but perform exceptionally.
              </p>
            </Card>

            <Card className="p-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the leading agency that sets the standard for innovation in web development, where every project is a masterpiece of design and technology working in perfect harmony.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 bg-card/50 animate-on-scroll">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              From humble beginnings to industry leaders
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} data-testid={`timeline-item-${idx}`}>
                  {/* Year bubble */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center font-bold text-sm z-10">
                    {item.year}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} pl-24 md:pl-0`}>
                    <Card className={`p-6 ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </Card>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32 animate-on-scroll">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <Card key={idx} className="p-8 text-center hover-elevate transition-all duration-300" data-testid={`value-card-${idx}`}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get to know the talented individuals behind our success
          </p>
          <Link href="/team">
            <Button size="lg" className="px-8 py-6 rounded-full font-semibold" data-testid="button-meet-team">
              Meet the Team <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      </div>
    </PageTransition>
  );
}
