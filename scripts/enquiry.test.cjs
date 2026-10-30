'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {validate,send,message,validEndpoint} = require('../assets/enquiry-core.js');
const {sanitize} = require('../assets/analytics.js');
const raw={name:'Test Buyer',company:'Example Company',email:'buyer@example.com',product:'Urea (Granular)',quantity:'',destination:'Example port',terms:'To be discussed',message:''};
const config={formEndpoint:'https://formspree.io/f/testonly',formVerified:true};
test('Unconfirmed quantity is accepted; invalid or negative quantities are rejected',()=>{
  assert.equal(validate(raw).quantity,'To be confirmed');
  for(const quantity of ['-10','Infinity','abc','1000001']) assert.throws(()=>validate({...raw,quantity}));
  assert.equal(validate({...raw,quantity:'100'}).quantity,'100 MT');
  assert.match(message(validate(raw)),/Quantity: To be confirmed/);
});
test('Contacts and products must be valid; inputs are trimmed and limited',()=>{
  assert.equal(validate({...raw,name:'  Buyer  '}).name,'Buyer');
  for(const patch of [{email:'invalid'},{product:'Injected product'},{destination:'  '},{message:'a'.repeat(1501)}]) assert.throws(()=>validate({...raw,...patch}));
});
test('Unverified configuration cannot transmit any enquiry',async()=>{
  let called=false;
  await assert.rejects(send(validate(raw),{...config,formVerified:false},{fetch:()=>{called=true;}}),{code:'not_configured'});
  assert.equal(called,false);
  assert.equal(validEndpoint('https://evil.example/f/test'),false);
  assert.equal(validEndpoint('https://formspree.io/f/test?secret=x'),false);
});
test('Only an explicit provider acknowledgement counts as acceptance',async()=>{
  let request;
  const result=await send(validate(raw),config,{fetch:async(url,options)=>{
    request={url,...options};return {ok:true,status:200,json:async()=>({ok:true})};
  }});
  assert.deepEqual(result,{accepted:true});
  assert.equal(request.referrerPolicy,'no-referrer');
  assert.equal(request.credentials,'omit');
  assert.equal(JSON.parse(request.body).email,raw.email);
  for(const response of [
    {ok:true,status:200,json:async()=>({})},
    {ok:true,status:200,json:async()=>{throw Error('HTML redirect');}},
    {ok:true,status:200,json:async()=>({ok:false})},
    {ok:false,status:422,json:async()=>({errors:[{message:'Invalid field'}]})}
  ]) await assert.rejects(send(validate(raw),config,{fetch:async()=>response}));
});
test('Rate limits, network failures and timeouts never report acceptance',async()=>{
  await assert.rejects(send(validate(raw),config,{fetch:async()=>({ok:false,status:429,json:async()=>({})})}),{code:'rate_limited'});
  await assert.rejects(send(validate(raw),config,{fetch:async()=>{throw new TypeError('Network failure');}}),{code:'network'});
  await assert.rejects(send(validate(raw),config,{timeoutMs:10,fetch:async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Object.assign(new Error('Aborted'),{name:'AbortError'}))))}),{code:'timeout'});
});
test('Analytics drops personal data, arbitrary properties and unknown event values',()=>{
  const event=sanitize('generate_lead',{product:'urea',channel:'web',name:'Buyer',email:raw.email,company:'Private',destination:'Port',quantity:100,message:'Private',page_location:'https://site/?email=private'},'/index.html');
  assert.deepEqual(event,{name:'generate_lead',detail:{page_path:'/',product:'urea',channel:'web'}});
  assert.equal(sanitize('generate_lead',{},'/index.html?email=private'),null);
  assert.equal(sanitize('arbitrary',{},'/'),null);
  assert.deepEqual(sanitize('contact_click',{channel:'someone@example.com',product:'private'},'/').detail,{page_path:'/'});
  assert.notEqual(sanitize('contact_click',{channel:'email'},'/').name,'generate_lead');
});
