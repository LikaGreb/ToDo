export function clearSrorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('activeID');
  localStorage.removeItem('loginField');
  sessionStorage.clear();
}