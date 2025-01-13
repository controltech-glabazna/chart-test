const express = require('express');
const { Controller, Tag } = require('ethernet-ip');

const app = express();
const port = 3000;

// Funkce pro načítání dat z PLC
async function getDataFromPLC() {
  const ipAddress = '192.168.5.233'; // Zde změň na IP adresu svého PLC
  try {
    const plc = new Controller()
    plc.connect(ipAddress, ).then(async () => {
      const tomas = new Tag("tomas")
      await plc.readTag(tomas)
      return tomas.value 
    })
  } catch (error) {
    console.error('Chyba při připojování k PLC:', error);
    return 0;
  }
}

// API endpoint pro získání dat z PLC
app.get('/get-plc-data', async (req, res) => {
  const data = await getDataFromPLC();
  res.json({ value: data });
});

app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});


