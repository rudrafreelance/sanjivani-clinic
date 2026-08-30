const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

/**
 * Uploads a file (image or video) to Cloudinary using an unsigned upload preset.
 * Returns { url, publicId, resourceType } on success.
 *
 * Setup required in Cloudinary dashboard:
 * Settings -> Upload -> Add unsigned upload preset -> name it and paste into .env
 */
export async function uploadToCloudinary(file, { onProgress } = {}) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      'Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env'
    )
  }

  const isVideo = file.type.startsWith('video/')
  const resourceType = isVideo ? 'video' : 'image'
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', endpoint)

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    }

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText)
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            url: data.secure_url,
            publicId: data.public_id,
            resourceType: data.resource_type,
          })
        } else {
          reject(new Error(data.error?.message || 'Cloudinary upload failed'))
        }
      } catch (err) {
        reject(err)
      }
    }

    xhr.onerror = () => reject(new Error('Network error during Cloudinary upload'))
    xhr.send(formData)
  })
}
