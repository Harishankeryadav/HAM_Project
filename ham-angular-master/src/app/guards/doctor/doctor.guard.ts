import { CanActivateFn } from '@angular/router';

export const doctorGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  if (user?.role === 'Doctor') {
    return true;
  } else {
    alert('Access Denied: Doctors only!');
    window.history.back();
    return false; 
  }
};

