import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base'>
        <div className='!py-8 flex justify-center lg:!py-6 md:!py-5 sm:!py-4 sm:text-xs'>
            <span>{new Date().getFullYear()} &copy; All Rights Reserved by Kwatt.io.</span>
        </div>
    </footer>
  )
}

export default Footer