import { isStorageAvailable, uploadImage, deleteImage, getDownloadURL } from "./firebase";

export { isStorageAvailable, uploadImage, deleteImage };

/**
 * Safely retrieves the download URL for an image at the given path.
 * Production Safe Fallback: Returns null upon failure or if storage is unavailable, never throws exceptions.
 */
export async function getImageUrl(pathAndFilename: string): Promise<string | null> {
  try {
    return await getDownloadURL(pathAndFilename);
  } catch (error) {
    console.warn(`[Storage Safe Fallback] Failed to retrieve download URL via storageService for path '${pathAndFilename}':`, error);
    return null;
  }
}
