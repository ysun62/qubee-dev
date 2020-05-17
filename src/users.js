export const users = [
  {
    _id: "1",
    firstName: "Marc",
    lastName: "Joseph",
    email: "marc@c-istudios.com",
    password: "temp123!"
  },
  {
    _id: "2",
    firstName: "Joshua",
    lastName: "Miller",
    email: "joshua@c-istudios.com",
    password: "temp123!"
  },
  {
    _id: "3",
    firstName: "Demo",
    lastName: "Demo",
    email: "demo@demo.com",
    password: "test123"
  }
];

export function getUsers() {
  return users.filter(u => u);
}
