'use client'
import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {PageHero} from '../components/PageHero'
import {BundlePanel,Receipt,ProductGrid} from '../components/products'
import {bundles,findProduct} from '../content/catalog'
import {useCopy,usePage,useCart,useHref} from '../components/context'
import {FAQ,CTA} from '../components/sections'
import {useRouter} from 'next/navigation'
export default function BundlesPage(props:SiteTemplatePageProps&{id?:string}){return <Shell {...props} slug={props.id?`bundles/${props.id}`:'bundles'}><Bundles id={props.id}/></Shell>}
function Bundles({id}:{id?:string}){const {locale}=usePage(),t=useCopy(),{add}=useCart(),router=useRouter(),href=useHref(),bundle=bundles.find(b=>b.id===id);return <><PageHero number="02" eyebrow={t('组合套装','BUNDLES')} title={bundle?.name[locale]??t('成套工具 / 一起更划算','Better together, priced together.')} description={bundle?.description[locale]??t('三组彼此配合的工具，原价与优惠清晰可见。','Three sets that go together. The maths is on the receipt.')}/>{bundle?<><section className="sl-section sl-checkout-grid"><div><h2>{t('套装内包含','Inside the bundle')}</h2><p>{bundle.description[locale]}</p><div className="sl-demo-notice">{t('本页价格为美元示例。点击仅进入本地演示结算。','Prices are sample USD amounts. Continue to local demo checkout only.')}</div><button className="sl-tag-button" onClick={()=>{add(bundle.id);router.push(href('checkout'))}}>{t('整套加入','Get the bundle')} · ${bundle.price}</button></div><Receipt bundle={bundle}/></section><section className="sl-section"><ProductGrid items={bundle.items.map(findProduct)}/></section></>:<section className="sl-section sl-bundles">{bundles.map((b,i)=><BundlePanel key={b.id} bundle={b} index={i}/>)}</section>}<FAQ/><CTA/></>}
