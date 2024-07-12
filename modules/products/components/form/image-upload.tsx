'use client'

import { CldImage, CldUploadWidget } from 'next-cloudinary'

import { Button } from '@/components/ui/button'
import { ImagePlus, Trash } from 'lucide-react'

interface ImageUploadProps {
  isDisabled?: boolean
  onChange: (url: string) => void
  onRemove: (url: string) => void
  imagesUrl: string[]
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  isDisabled,
  onChange,
  onRemove,
  imagesUrl,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <>
      <div className='mb-4 flex items-center gap-4 flex-wrap'>
        {imagesUrl.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
          >
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='destructive'
                size='icon'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>

            <CldImage
              crop='fill'
              className='object-cover'
              alt='Image'
              width={200}
              height={200}
              src={url}
            />
          </div>
        ))}
      </div>

      <div className='z-[60] inset-0 relative'>
        <CldUploadWidget
          onUpload={onUpload}
          uploadPreset='puapxgdr'
          options={{ sources: ['local', 'url', 'camera'] }}
        >
          {({ open }) => {
            return (
              <Button
                type='button'
                disabled={isDisabled}
                variant='secondary'
                onClick={() => {
                  open()
                }}
              >
                <ImagePlus className='h-4 w-4 mr-2' />
                Subir imágenes
              </Button>
            )
          }}
        </CldUploadWidget>
      </div>
    </>
  )
}
