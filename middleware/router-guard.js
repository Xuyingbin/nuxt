export default function ({ route, redirect }) {
  // If the user is not authenticated
  // console.log(route);
  // let storage = sessionStorage.getItem('qutouPhone');
  if (route.path === '/invest') {
    return redirect('/invest/investCon');
  }

  if (route.path === '/departmentDetail') {
    return redirect('/departmentDetail/history');
  }

  if (route.path === '/personCenter') {
    return redirect('/personCenter/department');
  }
}