import test from 'node:test'
import assert from 'node:assert/strict'
import {readFile,access} from 'node:fs/promises'
import ts from 'typescript'
const source=await readFile(new URL('../src/features/site-templates/catalog/shelfline/content/catalog.ts',import.meta.url),'utf8')
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2023}}).outputText
const catalog=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'))
test('共享包声明的每个公开入口都指向实际交付文件',async()=>{const pkg=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));for(const [entry,path] of Object.entries(pkg.exports)){assert.equal(typeof path,'string',entry);await access(new URL('../'+path,import.meta.url))}})
test('商品和分类关系完整，双语与本地图片存在',async()=>{const ids=new Set();for(const p of catalog.products){assert.ok(!ids.has(p.id),`重复商品 ${p.id}`);ids.add(p.id);assert.ok(catalog.categories.some(c=>c.id===p.category));assert.ok(p.price>0);for(const copy of [p.name,p.kind,p.format,p.description,...p.includes]){assert.ok(copy.zh.trim());assert.ok(copy.en.trim())}await access(new URL('../public/templates/shelfline/images/'+p.image,import.meta.url))}assert.equal(ids.size,9)})
test('组合价格与商品引用一致，优惠不超过商品合计',()=>{for(const b of catalog.bundles){const members=b.items.map(catalog.findProduct);assert.equal(new Set(b.items).size,b.items.length);assert.ok(b.price>0&&b.price<members.reduce((sum,p)=>sum+p.price,0));assert.equal(members.length,3)}assert.throws(()=>catalog.findProduct('missing-product'))})
test('每个课程有双语标题、内容、模块与合法时长',()=>{assert.equal(catalog.lessons.length,8);for(const lesson of catalog.lessons){assert.ok(lesson.title.zh&&lesson.title.en&&lesson.description.zh&&lesson.description.en);assert.ok(lesson.module>=1&&lesson.module<=5);assert.match(lesson.duration,/^\d{2}:[0-5]\d$/)}})
