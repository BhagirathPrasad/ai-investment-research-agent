import bcrypt from 'bcryptjs';

const hash = '$2b$10$g9.TWgnuaz9K1rYFHxGiQ.XWD0q6AH.awCDIkye/NFMswtr9s8nQW';
const passwordsToTest = ['password', 'password123', '123456', '12345678', 'bhagirath', 'bhagirathkumar'];

async function run() {
  for (const p of passwordsToTest) {
    const match = await bcrypt.compare(p, hash);
    if (match) {
      console.log('MATCH FOUND:', p);
      return;
    }
  }
  console.log('No match found');
}
run();
