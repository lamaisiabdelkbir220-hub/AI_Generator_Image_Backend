import { admin } from '@/lib/firebase';

/**
 * Delete an image from Firebase Storage using its public URL
 * @param imageUrl - The full public URL of the image (e.g., https://firebasestorage.googleapis.com/...)
 * @returns Promise<boolean> - True if deleted successfully, false otherwise
 */
export async function deleteImageFromFirebase(imageUrl: string): Promise<boolean> {
  try {
    // Check if Firebase is initialized
    if (!admin.apps.length) {
      console.warn('Firebase admin not initialized. Cannot delete image.');
      return false;
    }

    // Extract the file path from the Firebase Storage URL
    // URL format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encodedPath}?alt=media&token={token}
    const url = new URL(imageUrl);
    
    // Check if it's a Firebase Storage URL
    if (!url.hostname.includes('firebasestorage.googleapis.com')) {
      console.warn('URL is not a Firebase Storage URL:', imageUrl);
      return false;
    }

    // Extract the encoded path from the URL
    const pathMatch = url.pathname.match(/\/o\/(.+)$/);
    if (!pathMatch || !pathMatch[1]) {
      console.warn('Could not extract file path from URL:', imageUrl);
      return false;
    }

    // Decode the path
    const filePath = decodeURIComponent(pathMatch[1]);

    // Get the default bucket
    const bucket = admin.storage().bucket();

    // Delete the file
    await bucket.file(filePath).delete();

    console.log(`Successfully deleted image: ${filePath}`);
    return true;

  } catch (error) {
    console.error('Error deleting image from Firebase:', error);
    return false;
  }
}

/**
 * Check if a file exists in Firebase Storage
 * @param imageUrl - The full public URL of the image
 * @returns Promise<boolean> - True if file exists, false otherwise
 */
export async function imageExistsInFirebase(imageUrl: string): Promise<boolean> {
  try {
    if (!admin.apps.length) {
      return false;
    }

    const url = new URL(imageUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+)$/);
    
    if (!pathMatch || !pathMatch[1]) {
      return false;
    }

    const filePath = decodeURIComponent(pathMatch[1]);
    const bucket = admin.storage().bucket();
    const [exists] = await bucket.file(filePath).exists();

    return exists;
  } catch (error) {
    console.error('Error checking if image exists:', error);
    return false;
  }
}