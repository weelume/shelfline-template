'use client'
import {motion,useInView,useReducedMotion,useScroll,useTransform} from 'framer-motion'
import {useRef,useState,type ReactNode} from 'react'
import {motionConfig} from '../config/brand'
import {useIntroDone} from './IntroLoader'

export function Title({children,hero=false}:{children:string;hero?:boolean}){
  const ref=useRef<HTMLHeadingElement>(null),visible=useInView(ref,{once:true,margin:'0px 0px -30px 0px'}),reduce=useReducedMotion()
  const ready=useIntroDone(),[settled,setSettled]=useState(false)
  const Tag=hero?'h1':'h2'
  const explicitLines=children.includes(' / '),parts=explicitLines?children.split(' / '):children.split(' ')
  return <Tag ref={ref} className={hero?'sl-title sl-display':'sl-title'} data-title-state={settled||reduce?'settled':'pending'} aria-label={children.replaceAll(' / ',' ')}><span aria-hidden="true">{parts.map((word,index)=><span className={`sl-word ${explicitLines?'sl-title-line':''}`} key={`${word}-${index}`}><motion.span initial={{y:reduce?0:'108%'}} animate={{y:visible&&ready||reduce?0:'108%'}} transition={{duration:reduce?0:motionConfig.titleDuration,delay:index*motionConfig.titleStagger,ease:motionConfig.ease}} onAnimationComplete={()=>{if(index===parts.length-1&&(visible&&ready||reduce)){setSettled(true);console.debug('[shelfline:heading]',{title:children,state:'settled'})}}}>{word}</motion.span>{!explicitLines&&index<parts.length-1?' ':''}</span>)}</span></Tag>
}
export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}){const reduce=useReducedMotion();return <motion.div className={className} initial={reduce?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'0px 0px -25px 0px'}} transition={{duration:.9,delay,ease:motionConfig.ease}}>{children}</motion.div>}
export function Picture({src,alt,className=''}:{src:string;alt:string;className?:string}){
  const ref=useRef<HTMLDivElement>(null),reduce=useReducedMotion(),{scrollYProgress}=useScroll({target:ref,offset:['start end','end start']}),y=useTransform(scrollYProgress,[0,1],['-4%','4%'])
  return <motion.div ref={ref} className={`sl-picture ${className}`} initial={reduce?false:{clipPath:'inset(15% 0 15% 0)'}} whileInView={{clipPath:'inset(0% 0 0% 0)'}} viewport={{once:true}} transition={{duration:1.35,ease:[.7,0,.2,1]}}><motion.img src={src} alt={alt} style={{y:reduce?0:y}} initial={reduce?false:{scale:1.28}} whileInView={{scale:1.08}} viewport={{once:true}} transition={{duration:1.9,ease:[.16,.84,.24,1]}}/></motion.div>
}

