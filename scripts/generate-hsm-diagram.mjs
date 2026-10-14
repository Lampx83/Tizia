import fs from 'node:fs';
import { publicContract } from '../server/ai-board/hsm/contract.js';
import { contractDiagram } from '../public/js/ai-board-hsm.js';

const contract=publicContract();
const diagram=`<!-- Generated from server/ai-board/hsm/contract.json; run node scripts/generate-hsm-diagram.mjs. -->
<section id="hsm-gate4-implemented"><h2>Gate 4 · hợp đồng HSM đã triển khai</h2>
<p>Ngày 2026-10-11: worker nhận quyền chạy static-check qua BEGIN; server lưu state path theo ticket/run/attempt trong PostgreSQL. Event và guard quyết transition, không suy từ phase. Duplicate BEGIN không chạy lại action. Gate khác, UnknownWrite, deep history và resume qua worker khác vẫn thuộc HSM/02–07.</p>
${contractDiagram(contract)}
<p>Contract hash: <code>${contract.hash}</code>. Diagram sinh từ cùng hợp đồng với runtime và trang admin. Parent guards hiện kiểm lease, owner/folder scope, plan đã được cho phép, contract và version; chưa chứng minh guard kế thừa ở mọi tool.</p>
<details><summary>Transition source</summary><pre>${contract.diagram}</pre></details></section>`;
const file=new URL('../docs/local/ai-board-architecture.html',import.meta.url);
const html=fs.readFileSync(file,'utf8');
const begin='<!-- BEGIN GENERATED GATE4 HSM -->',end='<!-- END GENERATED GATE4 HSM -->';
const block=`${begin}\n${diagram}\n${end}`;
const existing=html.indexOf(begin);
fs.writeFileSync(file,existing<0?html.replace('<main>','<main>\n'+block):html.slice(0,existing)+block+html.slice(html.indexOf(end,existing)+end.length));
