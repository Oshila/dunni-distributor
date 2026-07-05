// Cloudinary upload function - Fixed version
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dunni_products'); // Must match your preset name

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    
    if (!cloudName) {
      throw new Error('Cloudinary cloud name is missing. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to .env.local');
    }

    console.log('Uploading to Cloudinary...', { cloudName, fileName: file.name });

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();
    console.log('Cloudinary response:', data);

    if (!response.ok) {
      console.error('Cloudinary error:', data);
      throw new Error(data.error?.message || 'Upload failed');
    }

    return data.secure_url;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Upload failed');
  }
};

// Test upload function
export const testUpload = async () => {
  try {
    // Create a small test image
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx!.fillStyle = 'red';
    ctx!.fillRect(0, 0, 100, 100);
    
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/png');
    });
    
    const testFile = new File([blob], 'test.png', { type: 'image/png' });
    const url = await uploadImage(testFile);
    console.log('Test upload successful:', url);
    alert('✅ Cloudinary is working! Image URL: ' + url);
    return true;
  } catch (error: any) {
    console.error('Test upload failed:', error);
    alert('❌ Cloudinary test failed: ' + error.message);
    return false;
  }
};