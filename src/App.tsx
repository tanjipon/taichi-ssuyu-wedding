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

import { TypeAnimation } from 'react-type-animation';

import { useInView } from 'react-hook-inview'

import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";

function App() {
  const queryParameters: URLSearchParams = new URLSearchParams(window.location.search);
  const receiver: string | null = queryParameters.get("r");

  const parallax = useRef<IParallax>(null!);

  const audioPlayer = useRef<HTMLAudioElement>(null); 
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const toggleAudioControl = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const [letterRef, isLetterVisible] = useInView({
    threshold: 0,
  });

  const [coverTxtRef, isCoverTxtVisible] = useInView({
    threshold: 0,
  });
  
  const [taichiSingleRef, isTaichiSingleVisible] = useInView({
    threshold: 0,
  });

  const [ssuyuSingleRef, isSsuYuSingleVisible] = useInView({
    threshold: 0,
  });

  function getWelcomLetter(){
    if (isLetterVisible){
      return (
        <TypeAnimation
          className='w-full h-full text-center text-xl lg:text-3xl md:text-xl sm:text-xl'
          sequence={[
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

  useEffect(() => {
    if (isAudioPlaying){
      audioPlayer.current?.play();
    } else {
      audioPlayer.current?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    // const handleBgmPlay = () => {
    //   if (!isAudioPlaying){
    //     audioPlayer.current?.play();
    //     setIsAudioPlaying(!isAudioPlaying);
    //     if (audioPlayer.current){
    //       audioPlayer.current.volume = 0.1;
    //     }
    //   }
    // };
    if (audioPlayer.current){
      audioPlayer.current.volume = 0.1;
    }
    // window.addEventListener('click', handleBgmPlay, {once: true});
    // window.addEventListener('touchstart', handleBgmPlay, {once: true});
    // return () => {
    //   window.removeEventListener('click', handleBgmPlay);
    //   window.removeEventListener('touchstart', handleBgmPlay);
    // };
  }, []);

  return (
    <>
      <audio ref={audioPlayer} src={bgm} loop/>
      <Parallax className='bg-no-repeat bg-center bg-cover' ref={parallax} pages={8} style={{ top: '0', left: '0', backgroundImage: `url(${bgImg})`, backgroundColor: '#3D464E' }}>
        <ParallaxLayer className='relative' offset={0} speed={1}>
          <div
            hidden={!isCoverTxtVisible}
            className='absolute w-6/12 lg:w-3/12 md:w-4/12 sm:w-4/12 animate-fade-up animate-once animate-duration-[1500ms] animate-delay-[50ms] animate-ease-in-out' 
            style={{ 
              top: '42.5%',
              left: '-2%',
              backgroundColor: 'background-color:rgba(0, 0, 0, 0)'
            }}
          >
            <img className='w-full p-1 rounded shadow-xl rotate-[9deg]' style={{ filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))', backgroundColor: '#FFFAFA' }} src={photo1}/>
          </div>
          <div
            hidden={!isCoverTxtVisible}
            className='absolute w-4/12 lg:w-2/12 md:w-3/12 sm:w-3/12 animate-fade-up animate-once animate-duration-[1500ms] animate-delay-[250ms] animate-ease-in-out' 
            style={{ 
              top: '40%',
              right: '2%',
              backgroundColor: 'background-color:rgba(0, 0, 0, 0)'
            }}
          >
            <img className='w-full p-1 rounded shadow-xl rotate-[-15deg]' style={{ filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))', backgroundColor: '#FFFAFA' }} src={photo2}/>
          </div>
          <div
            hidden={!isCoverTxtVisible}
            className='absolute w-6/12 lg:w-3/12 md:w-4/12 sm:w-4/12 animate-fade-up animate-once animate-duration-[1500ms] animate-delay-[500ms] animate-ease-in-out' 
            style={{ 
              top: '53%',
              right: '20%',
              backgroundColor: 'background-color:rgba(0, 0, 0, 0)'
            }}
          >
            <img className='w-full p-1 rounded shadow-xl rotate-[-8deg]' style={{ filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))', backgroundColor: '#FFFAFA' }} src={photo3}/>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.15} speed={-0.2}>
          <div ref={coverTxtRef} className='w-full'>
            <div hidden={!isCoverTxtVisible} className='flex justify-center w-full animate-fade-down animate-once animate-duration-[1500ms] animate-delay-[50ms] animate-ease-in-out'>
              <img
                  src={coverTaichiAndSsuYuText}
                  width={'70%'}
              />
            </div>
            <div hidden={!isCoverTxtVisible} className='flex justify-center w-full animate-fade-down animate-once animate-duration-[1500ms] animate-delay-[50ms] animate-ease-in-out'>
              <img
                  src={coverWeddingText}
                  width={'35%'}
              />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='relative w-full' sticky={{ start: 1, end: 7 }} speed={0}>
            <div className='absolute w-5/12 lg:w-2/12 md:w-4/12 sm:w-4/12 flex justify-center items-center animate-wiggle-more animate-infinite animate-duration-[2500ms] animate-delay-500 animate-ease-in' style={{ bottom: '4px', left: '-40px' }}>
              <img className='w-full' src={qSsuyu} />
            </div>
            <div className='absolute w-5/12 lg:w-2/12 md:w-4/12 sm:w-4/12 flex justify-center items-center animate-wiggle-more animate-infinite animate-duration-[2500ms] animate-ease-in' style={{ top: '4px', right: '-40px' }}>
              <img className='w-full' src={qTaichi} />
            </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex justify-center items-center' offset={1} speed={0}>
          <div ref={letterRef} className='w-11/12 lg:w-6/12 md:w-10/12 sm:w-10/12 h-4/6 bg-no-repeat bg-center bg-contain' style={{ backgroundImage: `url(${letterBgImg})` }}>
            <div className='p-4 shadow-lg rounded-md w-full h-full' style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
              { getWelcomLetter() }
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={2} speed={0.2}>
        <div ref={taichiSingleRef} className='w-full h-full flex flex-col justify-center items-center'>
          {
            isTaichiSingleVisible? 
            <>
              <div 
                className='w-10/12 lg:w-3/12 md:w-5/12 sm:w-5/12 animate-fade-left animate-once animate-duration-[1500ms] animate-ease-in-out' 
              >
                <img className='w-full p-1 rounded shadow-xl' style={{ filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))', backgroundColor: '#FFFAFA' }} src={taichiSingle} />
              </div>
              <div className='flex flex-col text-4xl lg:text-5xl md:text-4xl sm:text-3xl mt-4 animate-fade-right animate-once animate-duration-[1500ms] animate-ease-in-out' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
                <div>新郎 彭泰淇</div>
              </div>
            </>
            :
            <></>
          }
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={3} speed={0.2}>
          <div ref={ssuyuSingleRef} className='w-full h-full flex flex-col justify-center items-center'>
            {
              isSsuYuSingleVisible?
              <>
                <div 
                  className='w-10/12 lg:w-3/12 md:w-5/12 sm:w-5/12 animate-fade-right animate-once animate-duration-[1500ms] animate-ease-in-out'
                >
                  <img className='w-full p-1 rounded shadow-xl' style={{ filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))', backgroundColor: '#FFFAFA' }} src={ssuyuSingle} />
                </div>
                <div className='flex flex-col text-4xl lg:text-5xl md:text-4xl sm:text-3xl mt-4 animate-fade-left animate-once animate-duration-[1500ms] animate-ease-in-out' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
                  <div>新娘 游思愉</div>
                </div>
              </>
              :
              <></>
            }
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={4} speed={0.2}>
          <div style={{ fontSize: '4em', fontFamily: 'chenyuluoyan-mono', color: '#3D464E', fontWeight: 'bolder' }}>
            <p>婚宴資訊</p>
          </div>
          <div className='mt-12 flex flex-row justify-center items-center'>
            <div className='flex flex-col justify-center items-center mr-3'>
              <div className='mt-3 text-4xl lg:text-5xl md:text-5xl sm:text-5xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
                新郎家長
              </div>
              <div className='text-3xl lg:text-5xl md:text-5xl sm:text-5xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
                彭文良 賴儀娟
              </div>
            </div>
            <div className='flex flex-col justify-center items-center ml-'>
              <div className='mt-3 text-4xl lg:text-5xl md:text-5xl sm:text-5xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
                新娘家長
              </div>
              <div className='text-3xl lg:text-5xl md:text-5xl sm:text-5xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
                游象銘 高玉娟
              </div>
            </div>
          </div>
          <div className='mt-12 text-3xl lg:text-4xl md:text-4xl sm:text-4xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
            <p>大直典華 6F 花田盛事</p>
          </div>
          <div className='text-3xl lg:text-4xl md:text-4xl sm:text-4xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
            <p>台北市中山區植福路8號</p>
          </div>
          <div className='mb-2 text-3xl lg:text-4xl md:text-4xl sm:text-4xl' style={{ fontFamily: 'chenyuluoyan-mono', color: '#3D464E' }}>
            <p>2024 .01 .28　11:50 入席</p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={5} speed={0.2}>
          <div className='p-1 shadow-md w-11/12 lg:w-5/12 md:w-8/12 sm:w-9/12' style={{ backgroundColor: 'white'}}>
            <img
              className='w-full'
              src={dazhidenhuaLocation}
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={6} speed={0.2}>
            <div className='p-1 shadow-md w-11/12 lg:w-4/12 md:w-7/12 sm:w-8/12' style={{ backgroundColor: 'white'}}>
              <img
                className='w-full'
                src={dazhidenhuaTrans}
              />
            </div>
        </ParallaxLayer>
        <ParallaxLayer className='flex flex-col justify-center items-center' offset={7} speed={0.2}>
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
        <ParallaxLayer className='relative w-full' sticky={{ start: 0, end: 7 }} speed={0}> 
          {
            isAudioPlaying?
            <div className='absolute flex justify-center items-center rounded-full border-2 cursor-pointer animate-spin animate-infinite animate-duration-[2000ms] animate-ease-in-out' style={{ bottom: '15px', right: '20px', backgroundColor: '#FFC0CB', borderColor: '#FFFAFA' }} onClick={toggleAudioControl}>
              <MdMusicNote className='text-2xl lg:text-5xl md:text-4xl sm:text-3xl' style={{ color: '#FFFAFA' }} />
            </div>
            :
            <div className='absolute flex justify-center items-center rounded-full border-2 cursor-pointer animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-in-out' style={{ bottom: '15px', right: '20px', backgroundColor: '#FFC0CB', borderColor: '#FFFAFA' }} onClick={toggleAudioControl}>
              <MdMusicOff className='text-2xl lg:text-5xl md:text-4xl sm:text-3xl' style={{ color: '#FFFAFA' }} />
            </div>
          }
        </ParallaxLayer>
      </Parallax>
    </>
  )
}

export default App;
