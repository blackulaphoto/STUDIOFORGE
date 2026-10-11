/** Server-only director provider. Billing/approval reservations belong to the caller. */
export const openaiDirector={
 id:'openai',
 async generate({apiKey,payload,fetcher=fetch}){
  return fetcher('https://api.openai.com/v1/responses',{
   method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
   body:JSON.stringify(payload),signal:AbortSignal.timeout(90000),
  });
 },
};
