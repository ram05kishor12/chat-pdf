
import FileUpload from '@/components/fileupload';
import Type from '@/components/typewriter';
import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs';
import Link from 'next/link';
import { getstring } from './actions/getstring/route';


export default async function Home() {
  const userId = await auth();
  const isAuth = !!userId;
  return (
    <div className='w-screem min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className='flex flex-col items-center justify-center py-52 space-y-5'>
        {isAuth ? <UserButton /> : null}
        <h1 className='"text-4xl sm:text-5xl md:text-6xl lg:text-6xl space-y-5 font-bold'>Welcome to Chat PDF</h1>
        <Type />
        <p className='mt-3 text-lg text-center text-gray-600 '>A simple chat app that generates PDFs</p>

        <div className='mt-6'>
          {isAuth ? (
            <FileUpload />
          ) : (
            <Link href='/sign-in'>
              <Button>Get Started</Button>
            </Link>
          )}
          <form action={getstring}>

            <Button className='ml-3' variant='outline'>
              Learn More
            </Button>
          </form>

        </div>
      </div>

    </div>
  )
}
