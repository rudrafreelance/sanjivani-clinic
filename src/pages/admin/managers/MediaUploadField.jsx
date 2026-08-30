import { useState } from 'react'
import { uploadToCloudinary } from '../../../lib/cloudinary'

/**
 * A file input that uploads to Cloudinary and reports the resulting URL back
 * via onUploaded(url). Accepts images by default; pass accept="video/*" for video.
 */
export default function MediaUploadField({ label, accept = 'image/*', onUploaded, currentUrl }) {
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')

  const handleChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setProgress(0)
    try {
      const result = await uploadToCloudinary(file, { onProgress: setProgress })
      onUploaded(result.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setProgress(null)
    }
  }

  return (
    <div>
      {label && <label className="block text-sm font-semibold text-charcoal mb-3">{label}</label>}
      
      {currentUrl && (
        <div className="mb-4 rounded-lg overflow-hidden border-2 border-green-200 bg-green-50">
          {accept.startsWith('video') ? (
            <video src={currentUrl} className="w-full max-h-40 object-cover" controls />
          ) : (
            <img src={currentUrl} alt="" className="w-full max-h-40 object-cover" />
          )}
        </div>
      )}
      
      <div className="relative">
        <input 
          type="file" 
          accept={accept} 
          onChange={handleChange} 
          className="absolute inset-0 opacity-0 cursor-pointer" 
        />
        <label className="block bg-gradient-to-br from-cream to-sage rounded-lg border-2 border-dashed border-clay/30 hover:border-clay p-6 text-center cursor-pointer transition-all hover:bg-cream/80">
          <div className="text-3xl mb-2">{accept.startsWith('video') ? '🎬' : '📸'}</div>
          <p className="font-semibold text-charcoal text-sm mb-1">Choose file</p>
          <p className="text-xs text-charcoal/60">or drag and drop</p>
        </label>
      </div>
      
      {progress !== null && (
        <div className="mt-3">
          <div className="w-full bg-cream rounded-full h-2 overflow-hidden border border-clay/30">
            <div 
              className="bg-gradient-to-r from-clay to-clay-dark h-full transition-all" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-clay font-semibold mt-2 text-center">{progress}% Uploading…</p>
        </div>
      )}
      
      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2">
          <p className="text-xs text-red-700 font-medium">{error}</p>
        </div>
      )}
    </div>
  )
}
