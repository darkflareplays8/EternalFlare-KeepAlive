const mc = require('minecraft-protocol');

function connect() {
  const client = mc.createClient({
    host: 'DarkFlarePlays8.aternos.me',
    port: 37421,
    username: 'EternalFlare',
    version: '1.21.4',
    auth: 'offline'
  });

  client.on('login', () => {
    console.log('✅ Bot joined!');
    
    // Anti-AFK every 2 minutes (beats Aternos timeout)
    setInterval(() => {
      client.write('position_look', {
        x: 0, y: 100, z: 0, 
        yaw: 0, pitch: 0, onGround: true
      });
      console.log('🕐 2-min anti-AFK');
    }, 120000); // Exactly 2 minutes
    
    // Extra chat safety every 4 min
    setInterval(() => {
      client.chat('§7[Bot] Online');
    }, 240000);
  });

  client.on('end', () => {
    console.log('Disconnected, retrying...');
    setTimeout(connect, 10000);
  });

  client.on('error', (err) => {
    console.log('❌', err.message);
    setTimeout(connect, 10000);
  });
}

connect();
