import React from 'react';
import img from '../files/7965b828-6745-45a6-a2ed-a9d1869d97fc.jpg';

function HomePage() {
  return (
    <div className='flex flex-col items-center w-full h-full bg-base-200 pt-10'>
      <div className='flex flex-col justify-center items-center p-4 gap-4'>
        <h1 className=' text-5xl font-bold '>
          It's time to <span className='text-neutral'>reserve</span>Book!
        </h1>
        <h3 className='text-2xl font-bold'>
          Check out highlighted books in our library
        </h3>
        <div className='p-20 max-w-5xl'>
          <div className='carousel p-4 space-x-4  rounded-box'>
            <div id='item1' className='carousel-item  max-w-[280px]'>
              <button className='btn-link'>
                <img src={img} alt='Book' />
              </button>
            </div>
            <div id='item2' className='carousel-item  max-w-[280px]'>
              <button className='btn-link'>
                <img src={img} alt='Book' />
              </button>
            </div>
            <div id='item3' className='carousel-item  max-w-[280px]'>
              <button className='btn-link'>
                <img src={img} alt='Book' />
              </button>
            </div>
            <div id='item4' className='carousel-item  max-w-[280px]'>
              <button className='btn-link'>
                <img src={img} alt='Book' />
              </button>
            </div>
            <div id='item5' className='carousel-item  max-w-[280px]'>
              <button className='btn-link'>
                <img src={img} alt='Book' />
              </button>
            </div>
          </div>
          <div className='flex justify-center w-full py-2 gap-2'>
            <a href='#item1' className='btn btn-xs'>
              1
            </a>
            <a href='#item2' className='btn btn-xs'>
              2
            </a>
            <a href='#item3' className='btn btn-xs'>
              3
            </a>
            <a href='#item4' className='btn btn-xs'>
              4
            </a>
            <a href='#item5' className='btn btn-xs'>
              5
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
