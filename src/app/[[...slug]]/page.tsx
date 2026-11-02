import {notFound} from 'next/navigation'
import {shelflineTemplate} from '../../features/site-templates/catalog/shelfline/meta'
export default async function Page({params}:{params:Promise<{slug?:string[]}>}){const parts=(await params).slug??[],locale=parts[0]==='en'?'en':'zh',slug=(locale==='en'?parts.slice(1):parts).join('/');const page=shelflineTemplate.surfaces[0].pages.find(p=>p.slug===slug);if(!page)notFound();const {default:View}=await page.load();return <View locale={locale} basePath=""/>}
