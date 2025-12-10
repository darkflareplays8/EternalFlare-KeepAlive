const mc = require('minecraft-protocol');

function connect() {
  const client = mc.createClient({
    host: 'DarkFlarePlays8.aternos.me',
    port: 37421,
    username: 'EternalFlare',
    version: '1.21.8',  // Use supported version (change if needed)
    auth: 'offline'
  });

  client.on('login', () => {
    console.log('Bot joined!');
    setInterval(() => {
      client.write('position', {x: 0, y: 100, z: 0, yaw: 0, pitch: 0, onGround: true});
    }, 20000);
  });

  client.on('end', () => {
    console.log('Disconnected, reconnecting...');
    setTimeout(connect, 5000);  // 5s reconnect (handles Replit sleep)
  });

  client.on('error', (err) => {
    console.log('Error:', err);
    setTimeout(connect, 5000);  // 5s retry on error
  });
}

connect();  // Auto-restart loop for 5min UptimeRobot pings
