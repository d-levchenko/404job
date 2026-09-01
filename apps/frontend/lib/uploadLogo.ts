import axios from 'axios';

interface CloudinaryUploadResponse {
  secure_url: string;
}

export const uploadLogo = async (file: File): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing');
  }

  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await axios.post<CloudinaryUploadResponse>(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
  );

  return response.data.secure_url;
};
