import { reservationDatabase } from '@/db/reservations';
export async function POST(request:Request){
 try{
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Please submit your request from the café website.'},{status:403});
 const body=await request.text();if(body.length>5000)return Response.json({error:'Request is too large.'},{status:400});
 const b=JSON.parse(body);const name=String(b.name||'').trim(),email=String(b.email||'').trim(),date=String(b.date||''),time=String(b.time||''),guests=Number(b.guests),seating=String(b.seating||''),notes=String(b.notes||'').trim();
 const day=new Date(`${date}T00:00:00Z`),earliest=new Date(Date.now()-86400000).toISOString().slice(0,10),latest=new Date(Date.now()+366*86400000).toISOString().slice(0,10);
 if(!name||name.length>80||email.length>160||!/^\S+@\S+\.\S+$/.test(email)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(day.getTime())||day.toISOString().slice(0,10)!==date||date<earliest||date>latest||! /^(09|1[0-9]|20):00$/.test(time)||!Number.isInteger(guests)||guests<1||guests>8||!['Any available table','By the window','A quiet corner'].includes(seating)||notes.length>500)return Response.json({error:'Please check your details. Choose a valid date within the next year and 1–8 guests.'},{status:400});
 const db=reservationDatabase();
 const reference='VC-'+crypto.randomUUID().slice(0,8).toUpperCase();
 await db.prepare('INSERT INTO reservations (id,name,email,date,time,guests,seating,notes,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(reference,name,email,date,time,guests,seating,notes,'requested',new Date().toISOString()).run();
 return Response.json({reference,status:'requested'},{status:201});
 }catch(error){console.error('Reservation failed',error instanceof Error?error.message:'unknown');return Response.json({error:'We couldn’t save your request. Your details are still here; please try again.'},{status:503});}
}
