const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config', 'main.json');

function loadConfig() {
  try {
    const data = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config file:', error.message);
    process.exit(1);
  }
}

function saveConfig(config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Error writing config file:', error.message);
    process.exit(1);
  }
}

function listAccounts(config) {
  console.log('Available accounts:');
  config.deviceAccounts.forEach((acc, index) => {
    console.log(`  ${index}: ${acc.name || `Account ${index + 1}`} (${acc.id.substring(0, 8)}...)`);
  });
}

function switchAccount(newIndexes) {
  const config = loadConfig();
  
  // Convert to array if single number
  const indexes = Array.isArray(newIndexes) ? newIndexes : [newIndexes];
  
  // Validate indexes
  const invalidIndexes = indexes.filter(index => 
    index < 0 || index >= config.deviceAccounts.length
  );
  
  if (invalidIndexes.length > 0) {
    console.error(`❌ Invalid account indexes: ${invalidIndexes.join(', ')}`);
    listAccounts(config);
    process.exit(1);
  }
  
  // Set activeAccountIndex (can be single number or array)
  config.activeAccountIndex = indexes.length === 1 ? indexes[0] : indexes;
  
  saveConfig(config);
  
  if (indexes.length === 1) {
    console.log(`✅ Switched to account ${indexes[0]}: ${config.deviceAccounts[indexes[0]].name || `Account ${indexes[0] + 1}`}`);
  } else {
    console.log(`✅ Switched to accounts: [${indexes.join(', ')}]`);
    indexes.forEach(index => {
      console.log(`  ${index}: ${config.deviceAccounts[index].name || `Account ${index + 1}`}`);
    });
  }
}

function showUsage() {
  console.log('Usage:');
  console.log('  node switch-account.js list                    - List all accounts');
  console.log('  node switch-account.js <index>                 - Switch to single account (0-based)');
  console.log('  node switch-account.js <index1> <index2> ...   - Switch to multiple accounts');
  console.log('');
  console.log('Examples:');
  console.log('  node switch-account.js 0                       - Switch to account 0');
  console.log('  node switch-account.js 0 2                     - Switch to accounts 0 and 2');
  console.log('  node switch-account.js 1 3 5                   - Switch to accounts 1, 3, and 5');
}

// Main execution logic
const args = process.argv.slice(2);

if (args.length === 0) {
  showUsage();
  process.exit(1);
}

if (args[0] === 'list') {
  const config = loadConfig();
  listAccounts(config);
} else {
  // Parse indexes (support both single and multiple)
  const indexes = args.map(arg => {
    const index = parseInt(arg);
    if (isNaN(index)) {
      console.error(`❌ Invalid index: ${arg}`);
      process.exit(1);
    }
    return index;
  });
  
  switchAccount(indexes);
}
