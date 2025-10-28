import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageTransition } from '@/components/PageTransition';
import { ThreeBackground } from '@/components/ThreeBackground';
import { 
  ArrowRight, 
  Code, 
  Palette, 
  Smartphone, 
  TrendingUp,
  Search,
  Image,
  Globe,
  SmartphoneIcon,
  Megaphone,
  Rocket,
  Monitor,
  Paintbrush,
  Target
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      icon: Code,
      description: 'Custom websites and web applications built with cutting-edge technologies and modern frameworks.',
      features: [
        'Custom website development',
        'E-commerce solutions',
        'Web application development',
        'API integration',
        'Database design',
        'Performance optimization'
      ]
    },
    {
      id: 2,
      title: 'Web Design',
      icon: Monitor,
      description: 'Beautiful, responsive designs that captivate your audience and convert visitors into customers.',
      features: [
        'Responsive design',
        'UI/UX design',
        'Wireframing & prototyping',
        'Brand identity design',
        'Design systems',
        'Interactive prototypes'
      ]
    },
    {
      id: 3,
      title: 'SEO (Search Engine Optimization)',
      icon: Search,
      description: 'Boost your visibility on search engines and drive organic traffic to your website.',
      features: [
        'Keyword research',
        'On-page optimization',
        'Technical SEO',
        'Link building',
        'Content strategy',
        'Analytics & reporting'
      ]
    },
    {
      id: 4,
      title: 'Graphic Design',
      icon: Paintbrush,
      description: 'Stunning visuals that represent your brand and communicate your message effectively.',
      features: [
        'Logo design',
        'Brand identity',
        'Print design',
        'Digital graphics',
        'Social media graphics',
        'Illustration'
      ]
    },
    {
      id: 5,
      title: 'Mobile App Development',
      icon: Smartphone,
      description: 'Native and cross-platform mobile applications for iOS and Android devices.',
      features: [
        'iOS development',
        'Android development',
        'React Native',
        'App store optimization',
        'Push notifications',
        'User testing'
      ]
    },
    {
      id: 6,
      title: 'Digital Marketing',
      icon: Megaphone,
      description: 'Strategic marketing campaigns to grow your online presence and reach your target audience.',
      features: [
        'Social media marketing',
        'Content marketing',
        'Email campaigns',
        'PPC advertising',
        'Influencer marketing',
        'Marketing automation'
      ]
    },
    {
      id: 7,
      title: 'E-commerce Solutions',
      icon: Globe,
      description: 'Complete e-commerce platforms that help you sell products online effectively.',
      features: [
        'Online store setup',
        'Payment gateway integration',
        'Inventory management',
        'Shopping cart systems',
        'Order processing',
        'Customer management'
      ]
    },
    {
      id: 8,
      title: 'Brand Strategy',
      icon: Target,
      description: 'Comprehensive branding strategies that establish your unique identity in the market.',
      features: [
        'Brand positioning',
        'Brand messaging',
        'Market research',
        'Competitor analysis',
        'Brand guidelines',
        'Voice & tone development'
      ]
    },
  ];

  return (
    <PageTransition>
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <ThreeBackground variant="geometric" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="p-8 hover:elevate transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/50"
                >
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href="/contact">
                    <Button className="w-full rounded-full font-semibold" variant="outline">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can help bring your vision to life
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-8 py-6 rounded-full font-semibold">
              Contact Us Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      </div>
    </PageTransition>
  );
}
