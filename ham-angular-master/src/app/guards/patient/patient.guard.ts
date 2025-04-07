import { CanActivateFn } from '@angular/router';

export const patientGuard: CanActivateFn = (route, state) => {
  

  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

if (user?.role === 'Patient') {
  return true;
} else {
  alert('Access Denied: Patients only!');
  window.history.back();
  return false;
}
};

