import { Router } from "express";

const router = new Router();

router.post('/api/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

router.get('/api/projects', (req, res) => {
  res.json({ message: 'Register endpoint' });
});

export const authRoutes = router;