"use client";

import axios from "axios";
import { useState } from "react";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (imageFile: File) => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!imgbbApiKey) {
        throw new Error("IMGBB API Key not found.");
      }

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      if (res.data.success) {
        return res.data.data.url as string;
      } else {
        throw new Error("Image upload failed");
      }
    } catch {
      setError("Unknown error");
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, error };
};
