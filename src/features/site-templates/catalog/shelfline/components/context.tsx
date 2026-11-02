'use client'
import {createContext,useContext,useSyncExternalStore} from 'react'
import {findProduct,bundles,type Locale} from '../content/catalog'
export const PageContext=createContext<{locale:Locale;basePath:string;slug:string}>({locale:'zh',basePath:'',slug:''})
export const usePage=()=>useContext(PageContext)
export function useCopy(){const {locale}=usePage();return(zh:string,en:string)=>locale==='zh'?zh:en}
export function useHref(){const {locale,basePath}=usePage();return(path='')=>`${basePath}${locale==='en'?'/en':''}${path?'/'+path:'/'}`}
export interface CartLine {id:string;quantity:number}
// 购物车只保存在当前浏览器内存；外部订阅使客户端切页后仍可共享数量和价格。
const empty:CartLine[]=[]
let cart:CartLine[]=empty
const listeners=new Set<()=>void>()
const subscribe=(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener)}}
export function useCart(){
  const items=useSyncExternalStore(subscribe,()=>cart,()=>empty)
  return{items,count:items.reduce((sum,item)=>sum+item.quantity,0),total:items.reduce((sum,item)=>sum+item.quantity*itemInfo(item.id).price,0),add:(id:string)=>updateCart(id,1),change:updateCart,clear:()=>{cart=[];listeners.forEach(fn=>fn())}}
}
export function itemInfo(id:string){const bundle=bundles.find(item=>item.id===id);if(bundle)return{name:bundle.name,price:bundle.price,image:findProduct(bundle.items[0]).image};return findProduct(id)}
function updateCart(id:string,delta:number){itemInfo(id);const existing=cart.find(item=>item.id===id);cart=existing?cart.map(item=>item.id===id?{...item,quantity:Math.max(0,item.quantity+delta)}:item).filter(item=>item.quantity>0):delta>0?[...cart,{id,quantity:delta}]:cart;console.debug('[shelfline:cart]',{action:delta>0?'add':'remove',id,lines:cart.length});listeners.forEach(fn=>fn())}
