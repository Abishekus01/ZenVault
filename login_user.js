// login_user.js
// Demo credentials
const users = [
  { username:'vishwa_user', password:'1234', full_name:'Vishwa', role:'User', vault:[] },
  { username:'user1', password:'u1', full_name:'User One', role:'User', vault:[] },
  { username:'user2', password:'u2', full_name:'User Two', role:'User', vault:[] },
  { username:'user3', password:'u3', full_name:'User Three', role:'User', vault:[] },
  { username:'user4', password:'u4', full_name:'User Four', role:'User', vault:[] },
  { username:'user5', password:'u5', full_name:'User Five', role:'User', vault:[] },
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
  window.location.href='dashboard_user.html';
});

// Fingerprint login simulation
document.getElementById('fingerprintBtn').addEventListener('click', async ()=>{
  if(!window.PublicKeyCredential){
    msg.textContent='Fingerprint not supported';
    return;
  }
  try{
    const u = users[0];
    localStorage.setItem('zen_user', JSON.stringify(u));
    window.__ZENV_USER = u;
    window.location.href='dashboard_user.html';
  }catch(e){
    msg.textContent='Fingerprint authentication failed';
  }
});
