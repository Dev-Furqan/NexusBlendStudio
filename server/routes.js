import { createServer } from "http";
import { storage } from "./storage.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { 
  insertProjectSchema, 
  insertServiceSchema, 
  insertTeamMemberSchema, 
  insertTestimonialSchema,
  insertContactSchema 
} from "../shared/schema.js";

export async function registerRoutes(app) {
  // Authentication middleware
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  };

  // Auth routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Projects routes
  app.get('/api/projects', async (req, res) => {
    const projects = await storage.getAllProjects();
    res.json(projects);
  });

  app.post('/api/projects', authenticateToken, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    const deleted = await storage.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  });

  // Services routes
  app.get('/api/services', async (req, res) => {
    const services = await storage.getAllServices();
    res.json(services);
  });

  app.post('/api/services', authenticateToken, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put('/api/services/:id', authenticateToken, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.updateService(req.params.id, validatedData);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/services/:id', authenticateToken, async (req, res) => {
    const deleted = await storage.deleteService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  });

  // Team routes
  app.get('/api/team', async (req, res) => {
    const team = await storage.getAllTeamMembers();
    res.json(team);
  });

  app.post('/api/team', authenticateToken, async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const teamMember = await storage.createTeamMember(validatedData);
      res.json(teamMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put('/api/team/:id', authenticateToken, async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const teamMember = await storage.updateTeamMember(req.params.id, validatedData);
      if (!teamMember) {
        return res.status(404).json({ message: 'Team member not found' });
      }
      res.json(teamMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/team/:id', authenticateToken, async (req, res) => {
    const deleted = await storage.deleteTeamMember(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted' });
  });

  // Testimonials routes
  app.get('/api/testimonials', async (req, res) => {
    const testimonials = await storage.getAllTestimonials();
    res.json(testimonials);
  });

  app.post('/api/testimonials', authenticateToken, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put('/api/testimonials/:id', authenticateToken, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validatedData);
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/testimonials/:id', authenticateToken, async (req, res) => {
    const deleted = await storage.deleteTestimonial(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted' });
  });

  // Contacts routes
  app.get('/api/contacts', authenticateToken, async (req, res) => {
    const contacts = await storage.getAllContacts();
    res.json(contacts);
  });

  app.post('/api/contacts', async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
    const deleted = await storage.deleteContact(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
