import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

class Element {
  constructor(tag) { this.tagName=tag; this.children=[]; this.listeners={}; this.textContent=''; this.value=''; this.classList={remove(){},add(){}}; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children=nodes; }
  addEventListener(name,fn) { this.listeners[name]=fn; }
  querySelector(tag) { return this.children.find(child=>child.tagName===tag); }
  remove() {}
}
async function page({role='student',lessons=[],failure}={}) {
  const ids=Object.fromEntries(['status','lessons','reload','sweep','import-status','import-form','import-results','legacy-file','rollback-form','batch-key','migration','maintenance'].map(id=>['#'+id,new Element(id)]));
  const requests=[];
  const context=vm.createContext({document:{querySelector:id=>ids[id],createElement:tag=>new Element(tag)},location:{assign(){}},Date,TextEncoder,crypto:webcrypto,Blob,URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},fetch:async(path,options)=>{
    requests.push({path,...options});
    let body=path==='/api/auth/me'?{user:{role}}:path==='/api/csrf'?{token:'csrf-test'}:path.endsWith('/import')?{entries:JSON.parse(options.body).entries.map(entry=>({...entry,disposition:'legacy'}))}:path==='/api/ai-board/lessons'?{lessons}:{};
    const denied=failure && path.endsWith('/review');
    return {ok:!denied,status:denied?403:200,json:async()=>body};
  }});
  const source=await readFile(new URL('../public/js/ai-board-lessons.js',import.meta.url),'utf8');
  await vm.runInContext(`(async()=>{${source}\n})()`,context);
  return {ids,requests};
}
const flatten=node=>[node,...node.children.flatMap(flatten)];
const settle=async()=>{for(let i=0;i<8;i++)await new Promise(resolve=>setImmediate(resolve));};
async function completed(button) {
  const deadline=Date.now()+5000;
  while(button.disabled && Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(button.disabled,false,'UI operation completed');
}
const lesson={id:7,version:2,state:'proposed',text:'<img src=x onerror=alert(1)>',kind:'proposed',visibility:'private',eligibility_reason:'proposed',ticket_id:1,run_id:2,evidence_trace_id:3};

test('owner review renders lesson text safely and sends current version with CSRF',async()=>{
  const {ids,requests}=await page({lessons:[lesson]});
  const nodes=flatten(ids['#lessons']);
  assert.equal(nodes.find(node=>node.className==='lesson-text').textContent,lesson.text);
  assert.equal(nodes.some(node=>node.tagName==='img'),false);
  assert.equal(ids['#maintenance'].hidden,true);
  assert.equal(nodes.some(node=>node.textContent==='Chia sẻ trong repository'),false);
  const verify=nodes.find(node=>node.textContent==='Xác minh từ evidence'); verify.listeners.click(); await settle();
  const post=requests.find(request=>request.path.endsWith('/7/review'));
  assert.equal(post.headers['X-CSRF-Token'],'csrf-test');
  assert.deepEqual(JSON.parse(post.body),{version:2,operation:'verify'});
});
test('admin sees promotion only for an eligible lesson; denied mutation shows recovery',async()=>{
  const {ids}=await page({role:'admin',lessons:[{...lesson,state:'verified',eligibility_reason:null}],failure:true});
  assert.equal(ids['#maintenance'].hidden,false);
  const promote=flatten(ids['#lessons']).find(node=>node.textContent==='Chia sẻ trong repository');
  assert.ok(promote); promote.listeners.click(); await settle();
  assert.match(ids['#status'].textContent,/không còn quyền/);
  assert.equal(promote.disabled,false);
});

test('a corrected proposal can submit fresh accepted evidence for verification',async()=>{
  const {ids,requests}=await page({lessons:[{...lesson,eligibility_reason:'source_expired'}]});
  const nodes=flatten(ids['#lessons']);
  const submit=nodes.find(node=>node.textContent==='Kiểm lại bằng evidence mới');
  const form=nodes.find(node=>node.tagName==='form' && node.children.includes(submit));
  const inputs=flatten(form).filter(node=>node.tagName==='input');
  inputs[0].value='12'; inputs[1].value='4';
  form.listeners.submit({preventDefault(){}}); await settle();
  const post=requests.find(request=>request.path.endsWith('/7/review'));
  assert.deepEqual(JSON.parse(post.body),{version:2,operation:'verify',run_id:12,gate:4});
});
test('legacy import maps old JSONL fields and retries with identical batch identity',async()=>{
  const {ids,requests}=await page();
  const raw=JSON.stringify({ticket:4,reason:'Known issue',gate:4,files:['public/test.js'],at:123})+'\n';
  ids['#legacy-file'].files=[{name:'lessons.jsonl',size:raw.length,text:async()=>raw}];
  const submit=new Element('button');
  ids['#import-form'].listeners.submit({preventDefault(){},submitter:submit}); await completed(submit);
  ids['#import-form'].listeners.submit({preventDefault(){},submitter:submit}); await completed(submit);
  const imports=requests.filter(request=>request.path.endsWith('/import')).map(request=>JSON.parse(request.body));
  assert.equal(imports.length,2); assert.equal(imports[0].batch_key,imports[1].batch_key);
  assert.deepEqual(imports[0].entries,[{entry_key:'1',ticket_id:4,gate:4,text:'Known issue',files:['public/test.js']}]);
  assert.ok(ids['#import-results'].querySelector('a').download.endsWith('.json'));
});
