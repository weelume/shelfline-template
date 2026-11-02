'use client'
import {motion,useReducedMotion} from 'framer-motion'
import {useEffect,useSyncExternalStore} from 'react'
import {products} from '../content/catalog'
import {useCopy,usePage} from './context'
import {useHost} from '../host'
let done=false
const listeners=new Set<()=>void>()
const subscribe=(fn:()=>void)=>{listeners.add(fn);return()=>{listeners.delete(fn)}}
// 仅保存本标签页的非个人化开场标记，避免客户端切页或刷新反复播放。
export const useIntroDone=()=>useSyncExternalStore(subscribe,()=>done||window.sessionStorage.getItem('shelfline:intro')==='done',()=>false)
export function IntroLoader(){
  const ready=useIntroDone(),reduce=useReducedMotion(),t=useCopy(),{locale}=usePage(),host=useHost()
  useEffect(()=>{if(ready||reduce)return;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';const timer=setTimeout(()=>{window.sessionStorage.setItem('shelfline:intro','done');done=true;listeners.forEach(fn=>fn())},3300);return()=>{clearTimeout(timer);document.body.style.overflow=overflow}},[ready,reduce])
  if(ready||reduce)return null
  return <div className="sl-intro" aria-label={t('正在布置货架','Stocking the shelf')}><motion.div className="sl-intro-half sl-intro-top" initial={{y:0}} animate={{y:'-100%'}} transition={{delay:2.6,duration:.7,ease:[.7,0,.2,1]}}/><motion.div className="sl-intro-half sl-intro-bottom" initial={{y:0}} animate={{y:'100%'}} transition={{delay:2.6,duration:.7,ease:[.7,0,.2,1]}}/><motion.div className="sl-intro-center" initial={{opacity:1}} animate={{opacity:0}} transition={{delay:2.6,duration:.3}}><div className="sl-intro-objects">{products.map((p,i)=><motion.i key={p.id} style={{height:45+(i%3)*12,background:p.color}} initial={{y:-46,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:i*.2,duration:.55,type:'spring',bounce:.35}}/>)}</div><motion.div className="sl-intro-plank" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:.7,ease:[.2,.8,.2,1]}}/><motion.div className="sl-intro-progress" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:2.6,ease:'linear'}}/><motion.div className="sl-intro-tag" initial={{rotate:-14}} animate={{rotate:[-14,5,0]}} transition={{duration:1.6,ease:[.34,1.56,.64,1]}}><strong>{host.brandName[locale]}</strong><span>{t('正在布置货架','STOCKING THE SHELF')}</span><span className="sl-intro-count">{products.map((_,i)=><motion.b key={i} initial={{opacity:0}} animate={{opacity:[0,1,1,0]}} transition={{times:[0,.01,.85,1],delay:i*.25,duration:.25}}>{String(i+1).padStart(2,'0')} / 09</motion.b>)}</span></motion.div></motion.div></div>
}
