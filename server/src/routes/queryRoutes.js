import { Router } from "express";

const router = new Router();

router.post('/api/query/search', (req, res) => {
  res.json({ message: 'Search query endpoint' });
});

router.post('/api/query/feedback', (req, res) => {
  res.json({ message: 'feedback query endpoint' });
});

router.get('/api/query/history', (req, res) => {
  res.json({ message: 'history query endpoint' });
});

export const queryRoutes = router;