import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <Image src='/uber_banner.png' alt='uber-banner' width={900} height={900} className='object-contain h-full w-full' />
      <div className='absolute top-20 right-10'>
        <SignIn />
      </div>
    </div>
  )
}