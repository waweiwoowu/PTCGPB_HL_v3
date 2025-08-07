# Pokemon Trading Card Game Bot (PTCGPB_HL_v3)

A Node.js-based automation bot for the Pokemon Trading Card Game mobile application. This bot provides automated functionality for account management, friend requests, pack opening, and various game interactions.

## 🎯 Features

### Core Functionality
- **Account Management**: Automated login and session management
- **Friend System**: Auto-approve friend requests, manage friend lists
- **Pack Operations**: Automated pack opening with smart healing system
- **Social Features**: Share pack openings, view friend feeds
- **Multi-Account Support**: Manage multiple game accounts simultaneously

### Automation Features
- **Auto Friend Approval**: Automatically accepts incoming friend requests
- **Session Management**: Handles login sessions with automatic renewal
- **Discord Integration**: Webhook notifications for bot activities
- **Error Recovery**: Automatic retry mechanisms with exponential backoff

## 🏗️ Project Structure

```
PTCGPB_HL_v3/
├── config/                 # Configuration files
│   ├── main.json.example   # Main bot configuration template
│   ├── server.json.example # Server configuration template
│   └── static.json         # Static app configuration
├── lib/                    # Core libraries
│   ├── Grpc.js            # gRPC communication layer
│   ├── client.js          # gRPC client management
│   ├── axiosClient.js     # HTTP client wrapper
│   ├── Units.js           # Utility functions
│   └── packer/            # Data encryption/decryption
├── steps/                  # Game operation modules
│   ├── Login.js           # Authentication
│   ├── SystemClient.js    # System operations
│   ├── PlayerProfileClient.js # Profile management
│   ├── FriendClient.js    # Friend system operations
│   ├── PackClient.js      # Pack management
│   ├── PackShopClient.js  # Shop operations
│   ├── FeedClient.js      # Social feed operations
│   ├── OpenPack.js        # Pack opening logic
│   └── GetJwt.js          # JWT token retrieval
├── server/                 # Server components
├── tester/                 # Interactive testing tool
├── generated/              # Generated files
├── approve.js             # Main automation script
├── scripts/               # Utility scripts
│   ├── switch-account.js  # Account switching helper
│   └── list-accounts.js   # Account listing utility
├── batch/                 # Windows batch files
│   ├── run-current-account.bat # Batch file for current account(s)
│   ├── run-selected-accounts.bat # Batch file for specific accounts
│   ├── run-account1.bat   # Batch file for Account 1
│   ├── run-account2.bat   # Batch file for Account 2
│   └── run-all-accounts.bat # Batch file for all accounts
└── package.json           # Dependencies and project info
```

## 🚀 Installation

### Prerequisites
- Node.js 22.2.0 (specified in package.json)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PTCGPB_HL_v3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the bot**
   ```bash
   # Copy configuration templates
   cp config/main.json.example config/main.json
   cp config/server.json.example config/server.json
   ```

4. **Edit configuration files**
   - `config/main.json`: Add your game accounts and Discord webhook
   - `config/server.json`: Configure the JWT server endpoint

## ⚙️ Configuration

### Main Configuration (`config/main.json`)

```json
{
  "activeAccountIndex": 0,
  "deviceAccounts": [
    {
      "id": "your_game_account_id",
      "password": "your_game_password",
      "name": "Account 1"
    },
    {
      "id": "your_second_account_id",
      "password": "your_second_password",
      "name": "Account 2"
    }
  ],
  "testAccount": {
    "id": "test_account_id",
    "password": "test_account_password"
  },
  "webhook": "your_discord_webhook_url"
}
```

**Configuration Fields:**
- `activeAccountIndex`: Index of the account to run (0-based). Can be a single number or an array of numbers (e.g., `[0, 2]` to run accounts 0 and 2 simultaneously)
- `deviceAccounts`: Array of game accounts with optional `name` field for easier identification
- `testAccount`: Account for testing purposes
- `webhook`: Discord webhook URL for notifications

### Server Configuration (`config/server.json`)

```json
{
  "server": "http://your-jwt-server.com"
}
```

## 🎮 Usage

### Interactive Testing Tool

Run the interactive tester for manual operations:

```bash
node tester/tester.js
```

Available operations:
- Account switching
- Login/Registration
- Profile management
- Pack opening
- Friend management
- Social feed viewing

### Automated Bot

Run the main automation script:

```bash
node approve.js
```

The bot will:
1. Automatically log in to the selected account (based on `activeAccountIndex`)
2. Monitor and approve friend requests
3. Send notifications to Discord webhook
4. Handle session renewals and error recovery

### Account Management

The bot now supports single-account operation with easy switching:

#### Using Command Line
```bash
# List all available accounts
node scripts/switch-account.js list

# Switch to a specific account (0-based index)
node scripts/switch-account.js 0  # Switch to first account
node scripts/switch-account.js 1  # Switch to second account

# Switch to multiple accounts
node scripts/switch-account.js 0 2  # Switch to accounts 0 and 2
node scripts/switch-account.js 1 3 5  # Switch to accounts 1, 3, and 5

# Run the bot with the selected account(s)
node approve.js
```

#### Using Batch Files (Windows)
For Windows users, you can use the provided batch files for quick account switching:

```bash
# Run current selected account(s) (based on activeAccountIndex)
.\batch\run-current-account.bat

# Run specific accounts via command line
.\batch\run-selected-accounts.bat 0 2    # Run accounts 0 and 2
.\batch\run-selected-accounts.bat 1 3 5  # Run accounts 1, 3, and 5

# Run Account 1 (automatically switch to account 1)
.\batch\run-account1.bat

# Run Account 2 (automatically switch to account 2)
.\batch\run-account2.bat

# Run ALL accounts simultaneously
.\batch\run-all-accounts.bat
```

The batch files will automatically:
1. Check if Node.js is installed
2. Check if configuration file exists
3. Switch to the specified account (or load all accounts)
4. Start the bot
5. Keep the window open for monitoring

**Note**: 
- `run-current-account.bat` uses the `activeAccountIndex` from `config/main.json` without switching accounts
- `run-selected-accounts.bat` allows you to specify which accounts to run via command line arguments
- The `run-all-accounts.bat` runs all accounts simultaneously, which may be resource-intensive

## 🔧 Key Components

### Authentication System
- JWT-based authentication with external server
- Session token management
- Automatic login renewal

### gRPC Communication
- Encrypted communication with game servers
- Automatic retry with exponential backoff
- Error handling for various network conditions

### Friend Management
- Automatic friend request approval
- Friend list monitoring
- Request management (send/cancel/reject)

### Pack Operations
- Smart pack opening with healing system
- Transaction tracking
- Card result logging

## 🛡️ Security Features

- Encrypted gRPC communication
- Session token management
- Secure credential storage
- Rate limiting and retry mechanisms

## 📊 Monitoring

### Discord Integration
The bot can send notifications to Discord via webhook:
- Login success/failure notifications
- Friend request approvals
- Error alerts

### Logging
- Console-based logging with timestamps
- Error tracking and reporting
- Performance monitoring

## 🔄 Automation Features

### Session Management
- Automatic session renewal every 50 minutes
- Graceful handling of login conflicts
- Error recovery with exponential backoff

### Friend Request Automation
- Continuous monitoring of incoming requests
- Automatic approval with rate limiting
- Conflict detection and resolution

## 🚨 Error Handling

The bot includes comprehensive error handling:
- Network error recovery
- Session conflict resolution
- Rate limit management
- Graceful degradation

## 📝 Dependencies

- `@grpc/grpc-js`: gRPC communication
- `axios`: HTTP client
- `google-protobuf`: Protocol buffer support
- `inquirer`: Interactive CLI
- `uuid`: Unique identifier generation

## ⚠️ Disclaimer

This bot is for educational and personal use only. Please ensure compliance with the game's Terms of Service and use responsibly. The developers are not responsible for any account actions taken by game administrators.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include logs and configuration details

---

**Note**: This bot interacts with the Pokemon Trading Card Game mobile application. Use at your own risk and ensure compliance with the game's terms of service. 