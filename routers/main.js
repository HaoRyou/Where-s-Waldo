import express from 'express';

const router = express.Router();

const files = [];

function addScore(name, score) {
  files.push({ name, score });
  files.sort((a, b) => a.score - b.score);
}

router.get('/', async (req, res, next) => {
  try {
    res.render('homepage', { score: files });
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res) => {
  const { name, score } = req.body;

  addScore(name, score);

  return res.status(200).json({ message: 'Score saved' });
});

router.get('/gamestart', async (req, res, next) => {
  res.render('gameboard'); // just show the page
});

export default router;
