import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-screem min-h-screen bg-gradient-to-r from-rose-100 to-teal-100' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-rose-100 to-teal-100'>
       <div className='flex flex-col items-center text-center '>
        <div className='flex items-center'>
          <h1 className='text-4xl font-bold text-gray-900'>Chat PDF</h1>
          </div>
       </div>
      
      </div> 
    </div>
  )
}
