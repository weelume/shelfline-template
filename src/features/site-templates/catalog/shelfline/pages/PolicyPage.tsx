'use client'
import Link from 'next/link'
import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {PageHero} from '../components/PageHero'
import {usePage,useCopy} from '../components/context'
import {policies} from '../content/editorial'
export default function PolicyPage(props:SiteTemplatePageProps&{id:string}){return <Shell {...props} slug={props.id}><Policy id={props.id}/></Shell>}
function Policy({id}:{id:string}){const {locale}=usePage(),t=useCopy(),policy=policies.find(p=>p.id===id);if(!policy)throw new Error(`Unknown policy: ${id}`);return <><PageHero eyebrow={policy.title[locale]} title={policy.title[locale]} description={policy.summary[locale]}/><section className="sl-section sl-policy-layout"><nav className="sl-policy-toc" aria-label={t('本页目录','On this page')}><p className="sl-eyebrow">{t('本页目录','ON THIS PAGE')}</p>{policy.sections.map((section,i)=><Link key={section.title.en} href={`#policy-${i}`}>0{i+1} · {section.title[locale]}</Link>)}</nav><div className="sl-policy-content"><p className="sl-mono">{t('示例条款 · 更新于 2026 年 9 月 26 日','DEMONSTRATION TERMS · UPDATED 26 SEPTEMBER 2026')}</p>{policy.sections.map((section,i)=><section key={section.title.en} id={`policy-${i}`}><p className="sl-eyebrow">0{i+1}</p><h2>{section.title[locale]}</h2><p>{section.body[locale]}</p></section>)}</div></section></>}
