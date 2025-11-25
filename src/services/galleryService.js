  import api from './api';

  // Get all gallery posts
  export const getAllGalleryImages = async () => {
    const response = await api.get('/gallery');
    return response.data;
  };

  // Get single gallery post
  export const getGalleryImage = async (id) => {
    const response = await api.get(`/gallery/${id}`);
    return response.data;
  };

  // Create gallery post with multiple images (protected)
  export const createGalleryImage = async (postData) => {
    const response = await api.post('/gallery', postData);
    return response.data;
  };

  // Update gallery post (protected)
  export const updateGalleryImage = async (id, postData) => {
    const response = await api.put(`/gallery/${id}`, postData);
    return response.data;
  };

  // Add image to existing post (protected)
  export const addImageToPost = async (id, imageData) => {
    const response = await api.post(`/gallery/${id}/images`, imageData);
    return response.data;
  };

  // Remove image from post (protected)
  export const removeImageFromPost = async (id, imageIndex) => {
    const response = await api.delete(`/gallery/${id}/images/${imageIndex}`);
    return response.data;
  };

  // Delete entire gallery post (protected)
  export const deleteGalleryImage = async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  };
