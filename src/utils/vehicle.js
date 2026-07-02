// GD jak w Gdansk RP - bez liter latwych do pomylenia (I, O, Q).
const PLATE_LETTERS = 'ABCEFGHJKLMNPRSTUVWXYZ';
// Jak w prawdziwych numerach VIN - bez I, O, Q.
const VIN_CHARS = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';

function generatePlateNumber() {
  const letter = PLATE_LETTERS[Math.floor(Math.random() * PLATE_LETTERS.length)];
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `GD ${letter}${digits}`;
}

function generateVin() {
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += VIN_CHARS[Math.floor(Math.random() * VIN_CHARS.length)];
  }
  return vin;
}

module.exports = { generatePlateNumber, generateVin };
