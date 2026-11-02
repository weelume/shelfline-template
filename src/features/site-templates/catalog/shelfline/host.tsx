'use client'
import {createContext,useContext,type ReactNode} from 'react'
import {brand} from './config/brand'
import type {Copy} from './content/catalog'
export interface HostConfig {brandName:Copy;logo?:string;lightLogo?:string;marketplaceHref?:string;marketplaceLabel?:Copy;marketplaceAriaLabel?:Copy;filing?:ReactNode}
const Host=createContext<HostConfig>({brandName:brand.name})
export function ShelflineHostProvider({children,...value}:HostConfig&{children:ReactNode}){return <Host.Provider value={value}>{children}</Host.Provider>}
export const useHost=()=>useContext(Host)
