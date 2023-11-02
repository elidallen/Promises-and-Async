// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

const dbs = {
  db1,
  db2,
  db3,
};

async function getUserInfo(id) {
  if (typeof id !== 'number' || id < 1 || id > 10) {
    return Promise.reject('Invalid id');
  }

  try {
    // Step 1: Fetch the database identifier from the central database
    const databaseId = await central(id);

    // Step 2: Fetch basic user information from the identified database
    const userData = await dbs[databaseId](id);

    // Step 3: Fetch personal data from the vault
    const personalData = await vault(id);

    // Step 4: Combine all the information into a single user object
    const user = {
      id,
      name: personalData.name,
      username: userData.username,
      email: personalData.email,
      address: userData.address,
      phone: personalData.phone,
      website: userData.website,
      company: userData.company,
    };

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}

// Usage:
getUserInfo(5)
  .then((user) => {
    console.log('User Information:', user);
  })
  .catch((error) => {
    console.error('Error:', error);
  });