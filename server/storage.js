import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.services = new Map();
    this.teamMembers = new Map();
    this.testimonials = new Map();
    this.contacts = new Map();
    
    // Seed initial data
    this.seedData();
  }

  async seedData() {
    // Seed admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    await this.createUser({ username: 'admin', password: hashedPassword });

    // Seed projects
    const projectsData = [
      {
        title: 'ShopHub E-commerce Platform',
        description: 'A modern e-commerce platform with seamless shopping experience, advanced product filtering, and secure payment integration.',
        category: 'E-commerce',
        image: '/attached_assets/generated_images/E-commerce_platform_website_mockup_2ca066b6.png',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: 'https://shophub.example.com',
        featured: true,
      },
      {
        title: 'FinanceFlow Banking App',
        description: 'Secure mobile banking application with real-time transactions, budget tracking, and financial insights dashboard.',
        category: 'Fintech',
        image: '/attached_assets/generated_images/Fintech_mobile_banking_app_a8b24e45.png',
        technologies: ['React Native', 'Express', 'PostgreSQL', 'AWS'],
        liveUrl: 'https://financeflow.example.com',
        featured: true,
      },
      {
        title: 'PropertyHub Real Estate',
        description: 'Comprehensive real estate platform featuring advanced property search, virtual tours, and appointment scheduling.',
        category: 'Real Estate',
        image: '/attached_assets/generated_images/Real_estate_platform_mockup_d24d2764.png',
        technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Google Maps API'],
        liveUrl: 'https://propertyhub.example.com',
        featured: true,
      },
      {
        title: 'MediConnect Telemedicine',
        description: 'Healthcare platform connecting patients with doctors through secure video consultations and digital prescriptions.',
        category: 'Healthcare',
        image: '/attached_assets/generated_images/Healthcare_telemedicine_platform_mockup_9ec0c5ec.png',
        technologies: ['Vue.js', 'Django', 'WebRTC', 'PostgreSQL'],
        liveUrl: 'https://mediconnect.example.com',
        featured: false,
      },
      {
        title: 'TaskFlow Project Manager',
        description: 'Team collaboration tool with kanban boards, time tracking, and real-time updates for project management.',
        category: 'SaaS',
        image: '/attached_assets/generated_images/SaaS_project_management_tool_3d04317f.png',
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        liveUrl: 'https://taskflow.example.com',
        featured: false,
      },
      {
        title: 'Gourmet Restaurant Portal',
        description: 'Elegant restaurant website with online reservations, menu management, and customer review system.',
        category: 'Web App',
        image: '/attached_assets/generated_images/Premium_restaurant_website_mockup_d194160c.png',
        technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
        liveUrl: 'https://gourmet.example.com',
        featured: false,
      },
      {
        title: 'FitTrack Wellness App',
        description: 'Fitness tracking mobile app with workout plans, nutrition tracking, and progress analytics.',
        category: 'Mobile',
        image: '/attached_assets/generated_images/Fitness_wellness_app_mockup_3040722e.png',
        technologies: ['React Native', 'Firebase', 'TensorFlow', 'HealthKit'],
        liveUrl: 'https://fittrack.example.com',
        featured: false,
      },
      {
        title: 'LearnHub E-Learning',
        description: 'Online learning platform with interactive courses, video streaming, and student progress tracking.',
        category: 'Web App',
        image: '/attached_assets/generated_images/Online_learning_platform_mockup_197e2560.png',
        technologies: ['Angular', 'Express', 'MongoDB', 'AWS S3'],
        liveUrl: 'https://learnhub.example.com',
        featured: false,
      },
      {
        title: 'CryptoTrade Exchange',
        description: 'Cryptocurrency trading platform with real-time charts, secure wallet integration, and advanced trading features.',
        category: 'Fintech',
        image: '/attached_assets/generated_images/Crypto_trading_platform_mockup_78383d50.png',
        technologies: ['React', 'Node.js', 'Redis', 'WebSocket'],
        liveUrl: 'https://cryptotrade.example.com',
        featured: false,
      },
    ];

    for (const project of projectsData) {
      await this.createProject(project);
    }

    // Seed services
    const servicesData = [
      {
        title: 'Web Development',
        description: 'Custom websites and web applications built with cutting-edge technologies',
        features: [
          'Responsive design for all devices',
          'SEO optimization',
          'Performance optimization',
          'Custom CMS integration',
          'E-commerce solutions',
        ],
        icon: 'Code',
        order: 1,
      },
      {
        title: 'UI/UX Design',
        description: 'Beautiful and intuitive interfaces that users love',
        features: [
          'User research and testing',
          'Wireframing and prototyping',
          'Visual design systems',
          'Interaction design',
          'Accessibility compliance',
        ],
        icon: 'Palette',
        order: 2,
      },
      {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications',
        features: [
          'iOS and Android development',
          'React Native expertise',
          'App Store optimization',
          'Push notifications',
          'Offline functionality',
        ],
        icon: 'Smartphone',
        order: 3,
      },
      {
        title: 'Digital Marketing',
        description: 'Strategic marketing to grow your online presence',
        features: [
          'SEO and SEM strategies',
          'Social media management',
          'Content marketing',
          'Analytics and reporting',
          'Email campaigns',
        ],
        icon: 'TrendingUp',
        order: 4,
      },
    ];

    for (const service of servicesData) {
      await this.createService(service);
    }

    // Seed team members
    const teamData = [
      {
        name: 'Sarah Chen',
        role: 'CEO & Founder',
        bio: 'Visionary leader with 15+ years in tech, passionate about creating digital excellence.',
        image: '/attached_assets/generated_images/Tech_CEO_headshot_ee04c5a7.png',
        linkedinUrl: 'https://linkedin.com/in/sarachen',
        twitterUrl: 'https://twitter.com/sarachen',
        githubUrl: null,
        order: 1,
      },
      {
        name: 'Marcus Rodriguez',
        role: 'Creative Director',
        bio: 'Award-winning designer who brings creativity and innovation to every project.',
        image: '/attached_assets/generated_images/Creative_director_headshot_acc2e206.png',
        linkedinUrl: 'https://linkedin.com/in/marcusr',
        twitterUrl: 'https://twitter.com/marcusr',
        githubUrl: null,
        order: 2,
      },
      {
        name: 'David Kim',
        role: 'Lead Developer',
        bio: 'Full-stack expert specializing in scalable architectures and clean code.',
        image: '/attached_assets/generated_images/Lead_developer_headshot_9286ec5e.png',
        linkedinUrl: 'https://linkedin.com/in/davidkim',
        twitterUrl: null,
        githubUrl: 'https://github.com/davidkim',
        order: 3,
      },
      {
        name: 'Emily Johnson',
        role: 'UX Designer',
        bio: 'User-centered designer crafting intuitive experiences that delight.',
        image: '/attached_assets/generated_images/UX_designer_headshot_9a22b576.png',
        linkedinUrl: 'https://linkedin.com/in/emilyjohnson',
        twitterUrl: 'https://twitter.com/emilyjohnson',
        githubUrl: null,
        order: 4,
      },
      {
        name: 'Alex Morgan',
        role: 'Marketing Director',
        bio: 'Strategic marketer driving growth through data-driven campaigns.',
        image: '/attached_assets/generated_images/Marketing_director_headshot_4b9b1ee6.png',
        linkedinUrl: 'https://linkedin.com/in/alexmorgan',
        twitterUrl: 'https://twitter.com/alexmorgan',
        githubUrl: null,
        order: 5,
      },
      {
        name: 'Jordan Lee',
        role: 'Senior Engineer',
        bio: 'Backend specialist building robust and efficient systems.',
        image: '/attached_assets/generated_images/Senior_engineer_headshot_8829536e.png',
        linkedinUrl: 'https://linkedin.com/in/jordanlee',
        twitterUrl: null,
        githubUrl: 'https://github.com/jordanlee',
        order: 6,
      },
      {
        name: 'Rachel Martinez',
        role: 'Project Manager',
        bio: 'Organized professional ensuring projects deliver on time and exceed expectations.',
        image: '/attached_assets/generated_images/Project_manager_headshot_dd05acfe.png',
        linkedinUrl: 'https://linkedin.com/in/rachelmartinez',
        twitterUrl: null,
        githubUrl: null,
        order: 7,
      },
      {
        name: 'Kevin Patel',
        role: 'Operations Director',
        bio: 'Streamlining processes and optimizing workflows for maximum efficiency.',
        image: '/attached_assets/generated_images/Operations_director_headshot_fa8e7024.png',
        linkedinUrl: 'https://linkedin.com/in/kevinpatel',
        twitterUrl: null,
        githubUrl: null,
        order: 8,
      },
    ];

    for (const member of teamData) {
      await this.createTeamMember(member);
    }

    // Seed testimonials
    const testimonialsData = [
      {
        clientName: 'Jennifer Williams',
        clientRole: 'CEO',
        clientCompany: 'TechStart Inc',
        content: 'Nexus Blend transformed our online presence completely. Their attention to detail and innovative approach exceeded all our expectations. The team was professional, responsive, and delivered exactly what we envisioned.',
        rating: 5,
        image: '/attached_assets/generated_images/Client_testimonial_portrait_1_27fc4be2.png',
      },
      {
        clientName: 'Michael Thompson',
        clientRole: 'Founder',
        clientCompany: 'GreenEarth Solutions',
        content: 'Working with Nexus Blend was an absolute pleasure. They took our complex requirements and created a beautiful, user-friendly platform that our customers love. Highly recommended!',
        rating: 5,
        image: '/attached_assets/generated_images/Client_testimonial_portrait_2_9a22527d.png',
      },
      {
        clientName: 'Lisa Anderson',
        clientRole: 'Marketing Director',
        clientCompany: 'Fashion Forward',
        content: 'The e-commerce platform they built for us has increased our online sales by 250%. The design is stunning and the functionality is flawless. Best investment we have made!',
        rating: 5,
        image: '/attached_assets/generated_images/Client_testimonial_portrait_3_4d761665.png',
      },
      {
        clientName: 'Robert Chang',
        clientRole: 'CTO',
        clientCompany: 'DataDrive Analytics',
        content: 'Nexus Blend is technical expertise meets creative excellence. They built us a complex SaaS platform that scales beautifully. Their code quality is outstanding.',
        rating: 5,
        image: '/attached_assets/generated_images/Client_testimonial_portrait_4_e2c0752f.png',
      },
      {
        clientName: 'Amanda Foster',
        clientRole: 'Product Manager',
        clientCompany: 'HealthPlus',
        content: 'From concept to launch, Nexus Blend guided us every step of the way. Their collaborative approach and deep understanding of user experience made all the difference.',
        rating: 5,
        image: '/attached_assets/generated_images/Client_testimonial_portrait_5_bd1ed4f0.png',
      },
      {
        clientName: 'David Park',
        clientRole: 'VP of Operations',
        clientCompany: 'LogiTech Solutions',
        content: 'The team at Nexus Blend delivered our project ahead of schedule without compromising on quality. Their project management and communication were exceptional throughout.',
        rating: 5,
        image: '/attached_assets/generated_images/Client_testimonial_portrait_6_fcc2d5f2.png',
      },
    ];

    for (const testimonial of testimonialsData) {
      await this.createTestimonial(testimonial);
    }
  }

  // Users
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Projects
  async getAllProjects() {
    return Array.from(this.projects.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  async getProject(id) {
    return this.projects.get(id);
  }

  async createProject(insertProject) {
    const id = randomUUID();
    const project = { ...insertProject, id, createdAt: new Date() };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id, updates) {
    const project = this.projects.get(id);
    if (!project) return null;
    const updated = { ...project, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id) {
    return this.projects.delete(id);
  }

  // Services
  async getAllServices() {
    return Array.from(this.services.values()).sort((a, b) => a.order - b.order);
  }

  async getService(id) {
    return this.services.get(id);
  }

  async createService(insertService) {
    const id = randomUUID();
    const service = { ...insertService, id, createdAt: new Date() };
    this.services.set(id, service);
    return service;
  }

  async updateService(id, updates) {
    const service = this.services.get(id);
    if (!service) return null;
    const updated = { ...service, ...updates };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id) {
    return this.services.delete(id);
  }

  // Team Members
  async getAllTeamMembers() {
    return Array.from(this.teamMembers.values()).sort(
      (a, b) => a.order - b.order
    );
  }

  async getTeamMember(id) {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertTeamMember) {
    const id = randomUUID();
    const teamMember = { ...insertTeamMember, id, createdAt: new Date() };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }

  async updateTeamMember(id, updates) {
    const teamMember = this.teamMembers.get(id);
    if (!teamMember) return null;
    const updated = { ...teamMember, ...updates };
    this.teamMembers.set(id, updated);
    return updated;
  }

  async deleteTeamMember(id) {
    return this.teamMembers.delete(id);
  }

  // Testimonials
  async getAllTestimonials() {
    return Array.from(this.testimonials.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  async getTestimonial(id) {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial) {
    const id = randomUUID();
    const testimonial = { ...insertTestimonial, id, createdAt: new Date() };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id, updates) {
    const testimonial = this.testimonials.get(id);
    if (!testimonial) return null;
    const updated = { ...testimonial, ...updates };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id) {
    return this.testimonials.delete(id);
  }

  // Contacts
  async getAllContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  async getContact(id) {
    return this.contacts.get(id);
  }

  async createContact(insertContact) {
    const id = randomUUID();
    const contact = { ...insertContact, id, createdAt: new Date() };
    this.contacts.set(id, contact);
    return contact;
  }

  async deleteContact(id) {
    return this.contacts.delete(id);
  }
}

export const storage = new MemStorage();
