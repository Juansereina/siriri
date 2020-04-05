import { getData } from '../services/storage';

const createUser = ({name, state}) => `
<li class="user">
  <span class="user__name">name: <b>${name}</b></span>
  <span class="user__state">state: <b>${state}</b></span>
</li>
`;

export default (node) => {
  const usersList = node.querySelector('.users');

  if (usersList) {
    const users = getData('allGuests');

    for (const user of users) {
      const item = createUser(user);

      usersList.innerHTML += item;
    }
  }
}
