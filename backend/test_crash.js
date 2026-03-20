const { exec } = require('child_process');
exec('npx strapi develop', (err, stdout, stderr) => {
  const fs = require('fs');
  fs.writeFileSync('strapi_crash.txt', stdout + '\n' + stderr);
});
