'use client'
import Link from 'next/link'
import {usePage,useCopy,useHref} from './context'
import {Title} from './Motion'
import {ProductBox} from './products'
import {products} from '../content/catalog'
export function PageHero({eyebrow,title,description,number='01'}:{eyebrow:string;title:string;description:string;number?:string}){const t=useCopy(),href=useHref();return <section className="sl-page-hero"><div><div className="sl-breadcrumbs"><Link href={href()}>{t('首页','HOME')}</Link><span>/</span><span>{eyebrow}</span></div><p className="sl-eyebrow">№ {number} · {eyebrow}</p><Title hero>{title}</Title><p>{description}</p></div><div className="sl-mini-shelf" aria-hidden="true">{products.slice(0,3).map(product=><ProductBox key={product.id} product={product}/>)}</div></section>}
export function Breadcrumbs({label}:{label:string}){const {locale}=usePage(),href=useHref();return <div className="sl-breadcrumbs"><Link href={href()}>{locale==='zh'?'首页':'HOME'}</Link><span>·</span><Link href={href('products')}>{locale==='zh'?'商品':'PRODUCTS'}</Link><span>·</span><span>{label}</span></div>}
