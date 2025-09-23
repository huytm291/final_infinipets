// pages/api/upload/image.ts - Image upload endpoint

import { NextApiRequest, NextApiResponse } from 'next';
import { UploadResponse } from '../../../lib/types';
import { AuthService } from '../../../lib/auth';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    // Check authentication
    const user = await AuthService.getCurrentUser(req);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Parse the uploaded file
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      allowEmptyFiles: false,
      filter: ({ mimetype }) => {
        // Only allow image files
        return mimetype && mimetype.startsWith('image/');
      }
    });

    const [fields, files] = await form.parse(req);
    
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
    
    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded or invalid file type'
      });
    }

    // Generate unique filename
    const ext = path.extname(uploadedFile.originalFilename || '');
    const filename = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}${ext}`;
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Move file to uploads directory
    const newPath = path.join(uploadsDir, filename);
    fs.copyFileSync(uploadedFile.filepath, newPath);
    
    // Clean up temp file
    fs.unlinkSync(uploadedFile.filepath);
    
    // Return the public URL
    const publicUrl = `/uploads/${filename}`;
    
    res.status(200).json({
      success: true,
      url: publicUrl,
      filename,
      size: uploadedFile.size
    });

  } catch (error) {
    console.error('Upload API Error:', error);
    
    if (error instanceof Error && error.message.includes('maxFileSize')) {
      return res.status(413).json({
        success: false,
        error: 'File size too large. Maximum size is 5MB.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}