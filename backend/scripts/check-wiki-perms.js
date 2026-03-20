/**
 * Diagnostic script — queries the local SQLite DB to reveal 
 * the current admin_permissions rows for the wiki-js-admin role.
 * Run from the /backend directory: node scripts/check-wiki-perms.js
 */
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '.tmp', 'data.db');
console.log(`Opening DB: ${dbPath}`);

let db;
try {
    db = new Database(dbPath, { readonly: true });
} catch (err) {
    console.error('Could not open DB:', err.message);
    process.exit(1);
}

// 1. Find the wiki-js-admin role
const roleRow = db.prepare("SELECT id, name, code FROM admin_roles WHERE code = 'wiki-js-admin'").get();
if (!roleRow) {
    console.error('❌ wiki-js-admin role NOT FOUND in database. The bootstrap never ran for this role.');
    process.exit(1);
}
console.log(`\n✅ Role found: id=${roleRow.id}, name=${roleRow.name}, code=${roleRow.code}`);

// 2. Find all permissions for that role
const perms = db.prepare(`
    SELECT p.subject, p.action 
    FROM admin_permissions p
    JOIN admin_permissions_role_links l ON p.id = l.permission_id
    WHERE l.role_id = ?
    ORDER BY p.subject, p.action
`).all(roleRow.id);

if (perms.length === 0) {
    console.error('❌ NO permissions found for wiki-js-admin role. The bootstrap permission seeding failed.');
} else {
    const subjects = [...new Set(perms.map(p => p.subject))];
    console.log(`\n📋 Found ${perms.length} permission rows across ${subjects.length} subjects:`);
    subjects.forEach(s => {
        const actions = perms.filter(p => p.subject === s).map(p => p.action.split('.').pop());
        console.log(`  - ${s}  [${actions.join(', ')}]`);
    });
}

// 3. Check the admin_permissions_role_links join table
console.log('\n--- Checking join table (admin_permissions_role_links) ---');
const linkTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%permission%'").all();
console.log('Permission-related tables:', linkTables.map(t => t.name).join(', '));

// 4. Check the wiki admin user
const user = db.prepare("SELECT id, email, username FROM admin_users WHERE email LIKE '%wikiadmin%'").get();
if (user) {
    console.log(`\n✅ Wiki admin user found: id=${user.id}, email=${user.email}`);
    // Check role assignment
    const userRoleTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%users_roles%'").all();
    userRoleTables.forEach(t => {
        const link = db.prepare(`SELECT * FROM ${t.name} WHERE user_id = ?`).get(user.id);
        console.log(`  -> ${t.name}: user_id=${user.id} → role_id=${link ? link.role_id : 'NOT FOUND'}`);
    });
} else {
    console.error('❌ Wiki admin user NOT FOUND');
}

db.close();
