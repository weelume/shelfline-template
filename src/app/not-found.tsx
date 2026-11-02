'use client'
import {usePathname} from 'next/navigation'
import UtilityPage from '../features/site-templates/catalog/shelfline/pages/UtilityPage'
export default function NotFound(){const path=usePathname();return <UtilityPage kind="404" locale={path.startsWith('/en/')?'en':'zh'} basePath=""/>}
