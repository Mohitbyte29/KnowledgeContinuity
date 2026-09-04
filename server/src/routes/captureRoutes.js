import { Router } from "express";

const router = new Router();


router.post('/api/capture/daily-batch', (req, res) => {
  res.json({ message: 'Daily batch capture endpoint' });
});

router.post('/api/capture/offboarding/start', (req, res) => {
  res.json({ message: 'Weekly batch capture endpoint' });
});

router.get('/api/capture/offboarding/gap-check', (req, res) => {
    res.json({ message: 'Gap check capture endpoint' });
});

router.post('/api/capture/extract', (req, res) => {
    res.json({ message: 'Extract capture endpoint' });
});

router.post('/api/capture/interview', (req, res) => {
    res.json({ message: 'Interview capture endpoint' });
});

router.get('/api/capture/entries/pending', (req, res) => {
    res.json({ message: 'Pending entries capture endpoint' });
});

router.post('/api/capture/review', (req, res) => {
    res.json({ message: 'Pending entries capture endpoint' });
});

router.post('/api/capture/save', (req, res) => {
    res.json({ message: 'Save capture endpoint' });
});


export const captureRoutes = router;