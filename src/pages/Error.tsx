import { Link, useLocation } from 'react-router-dom'

const Error = () => {
  const { pathname } = useLocation()

  return (
    <div className='flex flex-col h-screen justify-center'>
      <section className='bg-gray-800 relative z-10 py-[120px]'>
        <div className='container mx-auto'>
          <div className='-mx-4 flex'>
            <div className='w-full px-4'>
              <div className='mx-auto max-w-[400px] text-center'>
                <h2 className='mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]'>
                  404
                </h2>
                <h4 className='mb-3 text-[22px] font-semibold leading-tight text-white'>
                  Oops! That {pathname} page can’t be found
                </h4>
                <p className='mb-8 text-lg text-white'>
                  The page you are looking for it maybe deleted
                </p>
                <Link
                  to='/'
                  className='inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-black'
                >
                  Go To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Error
