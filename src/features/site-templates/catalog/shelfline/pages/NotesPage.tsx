'use client'
import {useState} from 'react'
import Link from 'next/link'
import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {PageHero} from '../components/PageHero'
import {Title,Picture} from '../components/Motion'
import {Notes} from '../components/Notes'
import {CTA} from '../components/sections'
import {usePage,useCopy,useHref} from '../components/context'
import {notes} from '../content/editorial'
import {asset} from '../content/catalog'
export default function NotesPage(props:SiteTemplatePageProps&{id?:string}){return <Shell {...props} slug={props.id?`notes/${props.id}`:'notes'}><Editorial id={props.id}/></Shell>}
function Editorial({id}:{id?:string}){const {locale}=usePage(),t=useCopy(),href=useHref(),[copyStatus,setCopyStatus]=useState(''),note=notes.find(n=>n.id===id);async function copyLink(){try{await navigator.clipboard.writeText(window.location.href);setCopyStatus(t('链接已复制','Link copied'))}catch(error){console.error('[shelfline:copy-link]',error);setCopyStatus(t('复制失败，请从地址栏复制链接。','Copy failed. Copy the URL from your address bar.'))}}return <>{note?<article className="sl-article"><div className="sl-breadcrumbs"><Link href={href('notes')}>{t('工作室手记','NOTES')}</Link><span>·</span>{note.category[locale]}</div><Title hero>{note.title[locale]}</Title><p>{note.summary[locale]}</p><p className="sl-mono">{t('工作室撰写','WRITTEN BY STUDIO')} · {note.date} · {note.minutes} {t('分钟','MIN')}</p><div className="sl-article-cover"><Picture src={asset(note.image)} alt={note.title[locale]}/></div>{note.sections.map(section=><section key={section.title.en}><h2>{section.title[locale]}</h2><p>{section.body[locale]}</p></section>)}<button className="sl-text-button" onClick={copyLink}>{t('复制文章链接','Copy link')}</button>{copyStatus&&<p role="status">{copyStatus}</p>}<div className="sl-demo-notice">{t('文中数据与案例为参考模板示例。','Figures and examples in this note are sample template content.')}</div><Link href={href(`notes/${notes[(notes.indexOf(note)+1)%notes.length].id}`)}>{t('下一篇','Next note')} · {notes[(notes.indexOf(note)+1)%notes.length].title[locale]}</Link></article>:<PageHero number="05" eyebrow={t('工作室手记','NOTES')} title={t('来自后场的 / 创作笔记','Notes from the back room.')} description={t('关于定价、发布，以及销售数字文件的心得。','Pricing, launches and what we learned selling files.')}/>}<Notes/><CTA/></>}
