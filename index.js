const mc = require('minecraft-protocol');

function connect() {
  const client = mc.createClient({
    host: 'DarkFlarePlays8.aternos.me',
    port: 37421,
    username: 'EternalFlare',
    version: '1.21.8',  // Now using 1.21.8
    auth: 'offline'
  });

  client.on('login', () => {
    console.log('✅ Bot joined 1.21.8!');
    
    // SAFE 1.21.8 anti-AFK: Chat only every 2 minutes
    setInterval(() => {
      try {
        client.chat('§7[Bot] Staying online...');
        console.log('🕐 2-min chat');
      } catch(e) {
        console.log('Chat failed');
      }
    }, 120000); // 2 minutes
    
    // Arm swing (super safe for all versions)
    setInterval(() => {
      try {
        client.write('arm_animation');
      } catch(e) {}
    }, 30000);
  });

  client.on('end', () => setTimeout(connect, 10000));
  client.on('error', (err) => {
    console.log('❌', err.message);
    setTimeout(connect, 10000);
  });
}

connect();

