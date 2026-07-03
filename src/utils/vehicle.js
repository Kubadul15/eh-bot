// Jak w prawdziwych numerach VIN - bez I, O, Q.
const VIN_CHARS = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';

function generateVin() {
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += VIN_CHARS[Math.floor(Math.random() * VIN_CHARS.length)];
  }
  return vin;
}

module.exports = { generateVin };
