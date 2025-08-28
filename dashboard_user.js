// dashboard_user.js
const currentUser = window.__ZENV_USER || null;

function renderVault(user){
  document.getElementById('welcome').textContent = 'Welcome, ' + user.full_name;
  document.getElementById('role').textContent = user.role;
  const vaultList = document.getElementById('vaultList');
  vaultList.innerHTML = '';
  if(user.vault && user.vault.length>5){
    vaultList.innerHTML = '<div class="small" style="margin-top:8px;color:#00ff88">you need to get subscription for have unlimited accounts for rs.199/month</div>';
    return;
  }
  if(!user.vault || user.vault.length === 0){
    vaultList.innerHTML = '<div class="small" style="margin-top:8px">No credentials yet.</div>';
    return;
  }
  user.vault.forEach((it, idx)=>{
    const div = document.createElement('div');
    div.className = 'vault-item';
    div.innerHTML = '<div><b>'+it.site+'</b><div class="small">'+it.username+'</div></div><div><button class="btn" onclick="alert(\'Password: '+it.password+'\')">Reveal</button></div>';
    vaultList.appendChild(div);
  });
}

document.getElementById('logout').addEventListener('click', ()=>{
  localStorage.removeItem('zen_user');
  window.location.href='index_user.html';
});

document.getElementById('addDummy').addEventListener('click', ()=>{
  const u = JSON.parse(localStorage.getItem('zen_user') || '{}');
  u.vault = u.vault || [];
  u.vault.push({site:'DemoSite', username:'demo_user', password:'Demo@123'});
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
  window.location.href='index_user.html';
} else {
  try{
    const u = JSON.parse(stored);
    window.__ZENV_USER = u;
    const allowedUsers = ['vishwa_user','user1','user2','user3','user4','user5'];
    if(!allowedUsers.includes(u.username)){
      alert('Access denied');
      localStorage.removeItem('zen_user');
      window.location.href='index_user.html';
    } else {
      renderVault(u);
    }
  } catch(e){
    window.location.href='index_user.html';
  }
}
