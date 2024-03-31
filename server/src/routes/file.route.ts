import { Router } from 'express';
import { upload } from '../middleware/multer.middleware';
import path from 'path';

const router = Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('here')
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const imageUrl = `http://localhost:3000/api/v1/uploads/${req.file.filename}`

    res.status(201).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

export { router as FileRouter };