import { createServer } from "http";
import { storage } from "./storage.js";

export async function registerRoutes(app) {
  // put application routes here
  // prefix all routes with /api

  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // For now, return a dummy token; replace with JWT or similar in production
    const token = 'dummy-admin-token';
    return res.json({ token });
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
