'use client'
import {useSyncExternalStore} from 'react'
import {useCopy} from './context'
const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Lisbon',hour:'2-digit',minute:'2-digit',hour12:false})
const subscribe=(notify:()=>void)=>{const timer=setInterval(notify,15000);return()=>clearInterval(timer)}
export function LocalClock(){const t=useCopy(),time=useSyncExternalStore(subscribe,()=>formatter.format(new Date()),()=>'--:--');return <span className="sl-clock">{t('当地时间 · 里斯本','LOCAL TIME · LISBON')} <time>{time}</time></span>}
