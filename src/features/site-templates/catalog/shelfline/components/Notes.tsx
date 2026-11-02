'use client'
import Link from 'next/link'
import {notes} from '../content/editorial'
import {asset} from '../content/catalog'
import {usePage,useCopy,useHref} from './context'
import {Picture} from './Motion'
import {SectionHead} from './sections'
export function Notes(){const {locale}=usePage(),t=useCopy(),href=useHref();return <section className="sl-section sl-notes"><SectionHead eyebrow={t('工作室手记','NOTES')} title={t('来自后场的 / 创作笔记','Notes from the back room.')} description={t('关于定价、发布，以及销售数字文件的心得。','Pricing, launches and what we learned selling files.')} path="notes" label={t('全部手记','All notes')}/><div className="sl-notes-grid">{notes.map(note=><Link className="sl-note-card" href={href(`notes/${note.id}`)} key={note.id}><div className="sl-note-image"><Picture src={asset(note.image)} alt={note.title[locale]}/><span className="sl-note-summary">{note.summary[locale]}</span></div><p className="sl-mono">{note.date} · {note.minutes} {t('分钟','MIN')}</p><span className="sl-eyebrow">{note.category[locale]}</span><h3>{note.title[locale]}</h3></Link>)}</div></section>}
