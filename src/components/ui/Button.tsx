const Button = ({ children, ...args }: IButton) => {
  return (
    <button
      {...args}
      className='group relative inline-block overflow-hidden rounded border border-gray-100 bg-gray-200  px-12 py-3 text-sm font-medium text-slate-800 hover:text-gray-800 focus:outline-none focus:ring active:bg-gray-800 active:text-white'
    >
      <span className='ease absolute left-0 top-0 h-0 w-0 border-t-2 border-gray-600 transition-all duration-200 group-hover:w-full'></span>
      <span className='ease absolute right-0 top-0 h-0 w-0 border-r-2 border-gray-600 transition-all duration-200 group-hover:h-full'></span>
      <span className='ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-gray-600 transition-all duration-200 group-hover:w-full'></span>
      <span className='ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-gray-600 transition-all duration-200 group-hover:h-full'></span>
      {children}
    </button>
  )
}

export default Button

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  children: string
}
