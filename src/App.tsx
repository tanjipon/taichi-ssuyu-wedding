import { useEffect, useRef, useState } from 'react';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import './App.css'

import bgm from './assets/bgm.mp3';
import bgImg from './assets/cover-bg.webp';
import photo1 from './assets/photo-1.webp';
import photo2 from './assets/photo-2.webp';
import photo3 from './assets/photo-3.webp';

import taichiSingle from './assets/taichi-single.webp';
import ssuyuSingle from './assets/ssuyu-single.webp';

import thankYouPhoto from './assets/thank_you-photo.webp';

import coverTaichiAndSsuYuText from './assets/cover-page_taichi-and-ssuyu_white.webp';
import coverWeddingText from './assets/cover-page_wedding_white.webp';
import seeYouOn0128 from './assets/see-you-on_0128.webp';

import letterBgImg from './assets/taichi-and-ssuyu.webp';
import dazhidenhuaLocation from './assets/dazhidenhua-location.webp';
import dazhidenhuaTrans from './assets/dazhidenhua-transport.webp';

import welcomeLetterText from './assets/welcom-letter.json'

import qSsuyu from './assets/ssuyu-q.webp';
import qTaichi from './assets/taichi-q.webp';

import { animated, useSpring } from '@react-spring/web';

import { TypeAnimation } from 'react-type-animation';

function App() {
  const queryParameters: URLSearchParams = new URLSearchParams(window.location.search);
  const receiver: string | null = queryParameters.get("r");

  const parallax = useRef<IParallax>(null!);

  const audioPlayer = useRef<HTMLAudioElement>(null); 

  const [currPage, setCurrPage] = useState(0);
  function getWelcomLetter(currentPage: number){
    if (currentPage === 1){
      return (
        <TypeAnimation
          className='w-full h-full text-center text-xl lg:text-3xl md:text-xl sm:text-xl'
          sequence={[
            // Same substring at the start will only be typed once, initially
            getLetterText(receiver),
          ]}
          speed={10}
          style={{ whiteSpace: 'pre-line', color: '#3D464E', fontFamily: 'chenyuluoyan-mono' }}
          cursor={false}
          wrapper='div' 
        />
      );
    } else {
      return <></>;
    }
  }

  function getLetterText(receiver: string | null): string {
    let txt: string = welcomeLetterText.default;

    Object.entries(welcomeLetterText).forEach(e => {
      if (e[0] === receiver){
        txt = e[1];
      }
    });
    return txt;
  }

  const [lastOffset, setLastOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const pageHeight: number = parallax.current.space;
      const currentOffset: number = parallax.current.current / pageHeight;
      const currentPage: number = Math.trunc(currentOffset);
      const currentPageOffset: number = currentOffset - currentPage;

      if (currentOffset > lastOffset && currentPageOffset >= 0.1){
        parallax.current.scrollTo(Math.ceil(currentOffset));
        setCurrPage(Math.ceil(currentOffset));
      } else if (currentOffset < lastOffset && currentPageOffset <= 0.9){
        parallax.current.scrollTo(Math.floor(currentOffset));
        setCurrPage(Math.floor(currentOffset));
      }
      
      setLastOffset(currentOffset);
    }

    const container = parallax.current.container.current
    container.addEventListener('scroll', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [lastOffset]);

  window.addEventListener('click', () => {
    audioPlayer.current?.play();
    // if(audioPlayer.current){
    //   audioPlayer.current.muted = false;
    // }
  });

  window.addEventListener('touchstart', () => {
    audioPlayer.current?.play();
    // if(audioPlayer.current){
    //   audioPlayer.current.muted = false;
    // }
  });

  useEffect(() => {
    if(audioPlayer.current){
      audioPlayer.current.muted = false;
    }
  }, []);

  const [p1Springs] = useSpring(
    () => ({
      from: {
        top: '52.5%',
        left: '-2%',
        opacity: '0',
        transform: 'rotate(9deg)',
        filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
      },
      to: { 
        top: '42.5%',
        left: '-2%',
        opacity: '1',
        transform: 'rotate(9deg))',
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      },
      config: {
        duration: 1250,
      },
    }),
    [currPage]
  );

  const [p2Springs] = useSpring(
    () => ({
      from: {
        top: '50%',
        right: '2%',
        opacity: '0',
        transform: 'rotate(-15deg)',
        filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))'  
      },
      to: { 
        top: '40%',
        right: '2%',
        opacity: '1',
        transform: 'rotate(-15deg)',
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
      },
      delay: 250,
      config: {
        duration: 1250
      },
    }),
    [currPage]
  );

  const [p3Springs] = useSpring(
    () => ({
      from: {
        top: '63%',
        right: '20%',
        opacity: '0',
        transform: 'rotate(-8deg)',
        filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))'  
      },
      to: { 
        top: '53%',
        right: '20%',
        opacity: '1',
        transform: 'rotate(-8deg)',
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
      },
      delay: 500,
      config: {
        duration: 1250
      },
    }),
    [currPage]
  );

  return (
    <>
      <audio ref={audioPlayer} src={bgm} loop autoPlay muted />
      <Parallax className='bg-no-repeat bg-center bg-cover' ref={parallax} pages={6} style={{ top: '0', left: '0', backgroundImage: `url(${bgImg})` }}>
        <ParallaxLayer className='relative' offset={0} speed={0}>
          <animated.div
            className='absolute bg-white p-1 rounded w-6/12 lg:w-3/12 md:w-4/12 sm:w-4/12 shadow-xl' 
            style={p1Springs}
          >
            <img className='w-full' src={photo1} />
          </animated.div>
          <animated.div 
            className='absolute bg-white p-1 rounded w-4/12 lg:w-2/12 md:w-3/12 sm:w-3/12 shadow-xl' 
            style={p2Springs}
          >
            <img className='w-full' src={photo2} />
          </animated.div>
          <animated.div 
            className='absolute bg-white p-1 rounded w-6/12 lg:w-3/12 md:w-4/12 sm:w-4/12 shadow-xl' 
            style={p3Springs}
          >
            <img className='w-full' src={photo3} />
          </animated.div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.15} speed={-0.2}>
          <div className='w-full'>
            <div className='flex justify-center w-full'>
              <img
                  src={coverTaichiAndSsuYuText}
                  width={'65%'}
              />
            </div>
            <div className='flex justify-center w-full'>
              <img
                  src={coverWeddingText}
                  width={'30%'}
              />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='relative w-full' sticky={{ start: 1, end: 5 }} speed={0}>
            <div className='absolute w-7/12 lg:w-2/12 md:w-4/12 sm:w-4/12 flex justify-center items-center animate-wiggle-more animate-infinite animate-duration-[2500ms] animate-delay-500 animate-ease-in' style={{ bottom: '4px', left: '-40px' }}>
              <img className='w-full' src={qSsuyu} />
            </div>
            <div className='absolute w-7/12 lg:w-2/12 md:w-4/12 sm:w-4/12 flex justify-center items-center animate-wiggle-more animate-infinite animate-duration-[2500ms] animate-ease-in' style={{ top: '4px', right: '-40px' }}>
              <img className='w-full' src={qTaichi} />
            </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex justify-center items-center' offset={1} speed={0}>
          <div className='w-11/12 lg:w-6/12 md:w-10/12 sm:w-10/12 h-4/6 bg-no-repeat bg-center bg-contain' style={{ backgroundImage: `url(${letterBgImg})` }}>
            <div className='p-4 shadow-lg rounded-md w-full h-full' style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
              { getWelcomLetter(currPage) }
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='relative' offset={2} speed={0}>
          <div className='absolute flex flex-row justify-center items-center w-full left-1/20 lg:-left-1/4 md:-left-1/4 sm:-left-1/4' style={{ top: '18%' }}>
            <div 
              className='bg-white p-1 rounded w-5/12 lg:w-2/12 md:w-3/12 sm:w-3/12 shadow-xl'
              style={{ transform: 'rotate(-3deg)' }} 
            >
              <img className='w-full' src={ssuyuSingle} />
            </div>
            <div className='flex flex-col pl-4 text-2xl lg:text-5xl md:text-4xl sm:text-3xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
              <div>新娘 游思愉</div>
              <div className='mt-7'>新娘家長</div>
              <div>游象銘 高玉娟</div>
            </div>
          </div>
          <div className='absolute flex flex-row justify-center items-center w-full right-1/20 lg:-right-1/4 md:-right-1/4 sm:-right-1/4' style={{ bottom: '18%' }}>
            <div className='flex flex-col pr-4 text-2xl lg:text-5xl md:text-4xl sm:text-3xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
              <div>新郎 彭泰淇</div>
              <div className='mt-7'>新郎家長</div>
              <div>彭文良 賴儀娟</div>
            </div>
            <div 
              className='bg-white p-1 rounded w-5/12 lg:w-2/12 md:w-3/12 sm:w-3/12 shadow-xl' 
              style={{ transform: 'rotate(5deg)' }}
            >
              <img className='w-full' src={taichiSingle} />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={3} speed={0}>
          <div style={{ fontSize: '3em', fontFamily: 'chenyuluoyan-mono', color: '#3D464E', fontWeight: 'bolder' }}>
            <p>婚宴資訊</p>
          </div>
          <div className='text-3xl lg:text-3xl md:text-3xl sm:text-2xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
            <p>大直典華 6F 花田盛事</p>
          </div>
          <div className='text-3xl lg:text-3xl md:text-3xl sm:text-2xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
            <p>台北市中山區植福路8號</p>
          </div>
          <div className='mb-2 text-3xl lg:text-3xl md:text-3xl sm:text-2xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
            <p>2023 .01 .28　11:50 入席</p>
          </div>
          <div className='p-1 shadow-md w-10/12 lg:w-5/12 md:w-8/12 sm:w-9/12' style={{ backgroundColor: 'white'}}>
            <img
              className='w-full'
              src={dazhidenhuaLocation}
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={4} speed={0}>
          <div className='p-1 shadow-md w-11/12 lg:w-4/12 md:w-5/12 sm:w-7/12' style={{ backgroundColor: 'white'}}>
            <img
              className='w-full'
              src={dazhidenhuaTrans}
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={5} speed={0}>
         <div className='mb-4 flex justify-center w-11/12 lg:w-4/12 md:w-4/12 sm:w-4/12'>
              <img
                  className='w-full'
                  src={seeYouOn0128}
              />
          </div>
          <div className='rounded-full w-8/12 lg:w-3/12 md:w-6/12 sm:w-5/12' style={{ backgroundColor: 'white', opacity: '80%'}}>
            <img
              className='w-full rounded-full'
              src={thankYouPhoto}
            />
          </div>
        </ParallaxLayer>
      </Parallax>
    </>
  )
}

export default App;
