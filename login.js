// login.js
// Demo credentials for admin/founder and users with unique app sites
const users = [
  { username:'abishek_us', password:'src', full_name:'Abishek US', role:'Founder', vault:[{site:'AXIS Bank', username:'abishek_bank', password:'5791'}, {site:'Gmail', username:'abishek_gmail', password:'Abishek@123'}] },
  { username:'vishwa_user', password:'1234', full_name:'Vishwa', role:'User', vault:[{site:'Facebook', username:'vishwa_fb', password:'Vishwa@123'}] },
  { username:'ram', password:'ram@123', full_name:'Ram', role:'User', vault:[{site:'Twitter', username:'ram_tw', password:'Ram@456'}] },
  { username:'raj', password:'raj@123', full_name:'Raj', role:'User', vault:[{site:'LinkedIn', username:'raj_li', password:'Raj@789'}] },
  { username:'aditya', password:'aditya@123', full_name:'Aditya', role:'User', vault:[{site:'Instagram', username:'aditya_ig', password:'Aditya@321'}] },
  { username:'sathya', password:'sathya@123', full_name:'Sathya', role:'User', vault:[{site:'Reddit', username:'sathya_rd', password:'Sathya@654'}] },
];

const msg = document.getElementById('msg');

document.getElementById('loginBtn').addEventListener('click', ()=>{
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value.trim();
  const user = users.find(x=>x.username===u && x.password===p);
  if(!user){
    msg.textContent='Invalid credentials';
    return;
  }
  localStorage.setItem('zen_user', JSON.stringify(user));
  window.__ZENV_USER = user;
  window.location.href='dashboard.html';
});

// Fingerprint login simulation
document.getElementById('fingerprintBtn').addEventListener('click', async ()=>{
  if(!window.PublicKeyCredential){
    msg.textContent='Fingerprint not supported';
    return;
  }
  try{
    const uname = document.getElementById('username').value.trim();
    const user = users.find(x=>x.username===uname);
    if(!user){
      msg.textContent='Enter valid username for fingerprint';
      return;
    }
    localStorage.setItem('zen_user', JSON.stringify(user));
    window.__ZENV_USER = user;
    window.location.href='dashboard.html';
  }catch(e){
    msg.textContent='Fingerprint authentication failed';
  }
});
