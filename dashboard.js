// dashboard.js
const currentUser = window.__ZENV_USER || null;
const users = [
  { username:'abishek_us', password:'src', full_name:'Abishek US', role:'Founder', vault:[{site:'AXIS Bank', username:'abishek_bank', password:'5791'}, {site:'Gmail', username:'abishek_gmail', password:'Abishek@123'}] },
  { username:'vishwa_user', password:'1234', full_name:'Vishwa', role:'User', vault:[{site:'Facebook', username:'vishwa_fb', password:'Vishwa@123'}] },
  { username:'ram', password:'ram123', full_name:'Ram', role:'User', vault:[{site:'Twitter', username:'ram_tw', password:'Ram@456'}] },
  { username:'raj', password:'raj123', full_name:'Raj', role:'User', vault:[{site:'LinkedIn', username:'raj_li', password:'Raj@789'}] },
  { username:'aditya', password:'aditya123', full_name:'Aditya', role:'User', vault:[{site:'Instagram', username:'aditya_ig', password:'Aditya@321'}] },
  { username:'sathya', password:'sathya123', full_name:'Sathya', role:'User', vault:[{site:'Reddit', username:'sathya_rd', password:'Sathya@654'}] },
];

function renderVault(user){
  document.getElementById('welcome').textContent = 'Welcome, ' + user.full_name;
  document.getElementById('role').textContent = user.role;
  const vaultList = document.getElementById('vaultList');
  vaultList.innerHTML = '';
  if(!user.vault || user.vault.length === 0){
    vaultList.innerHTML = '<div class="small" style="margin-top:8px">No credentials yet.</div>';
  } else if(user.vault.length>5 && user.role==='User'){
    vaultList.innerHTML = '<div class="small" style="margin-top:8px;color:#00ff88">you need to get subscription for have unlimited accounts for rs.199/month</div>';
  } else {
    user.vault.forEach((it, idx)=>{
      const div = document.createElement('div');
      div.className = 'vault-item';
      const editable = user.role==='User' ? `<input type="text" value="${it.password}" onchange="updatePass(${idx}, this.value)">` : `<button class="btn" onclick="alert('Password: ${it.password}')">Reveal</button>`;
      div.innerHTML = `<div><b>${it.site}</b><div class="small">${it.username}</div></div><div>${editable}</div>`;
      vaultList.appendChild(div);
    });
  }
}

function updatePass(idx, val){
  const u = JSON.parse(localStorage.getItem('zen_user') || '{}');
  u.vault[idx].password = val;
  localStorage.setItem('zen_user', JSON.stringify(u));
}

document.getElementById('logout').addEventListener('click', ()=>{
  localStorage.removeItem('zen_user');
  window.location.href='index.html';
});

document.getElementById('addDummy').addEventListener('click', ()=>{
  const u = JSON.parse(localStorage.getItem('zen_user') || '{}');
  const site = prompt('Enter site name:', '');
  if(!site) return;
  const username = prompt('Enter username:', '');
  if(!username) return;
  const password = prompt('Enter password:', '');
  if(!password) return;
  u.vault = u.vault || [];
  u.vault.push({site, username, password});
  localStorage.setItem('zen_user', JSON.stringify(u));
  renderVault(u);
});

document.getElementById('exportBtn').addEventListener('click', ()=>{
  const u = JSON.parse(localStorage.getItem('zen_user') || '{}');
  const data = JSON.stringify(u, null, 2);
  const blob = new Blob([data], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (u.username || 'user') + '_vault.json';
  a.click();
});

const stored = localStorage.getItem('zen_user');
if(!stored){
  window.location.href='index.html';
} else {
  try{
    const u = JSON.parse(stored);
    window.__ZENV_USER = u;
    if(u.role==='Founder'){
      document.getElementById('adminSection').style.display='block';
      const allDiv = document.getElementById('allUsers');
      allDiv.innerHTML='';
      users.forEach(us=>{
        const d = document.createElement('div');
        d.className='vault-item';
        d.innerHTML = `<div><b>${us.full_name}</b> (${us.username})</div><div class="small">Vault items: ${us.vault?us.vault.length:0}</div>`;
        allDiv.appendChild(d);
      });
    }
    renderVault(u);
  } catch(e){
    window.location.href='index.html';
  }
}
