


// Funkce vrátí Promise, která se vyřeší s náhodným číslem v intervalu 0-100
// export async function getData() {
//   return new Promise((resolve) => {
//     const randomValue = Math.floor(Math.random() * 100);
//     setTimeout(() => resolve(randomValue), 200); // Simulace asynchronního volání
//   });
// }

// Funkce pro načítání dat z API serveru (Node.js server)
export async function getData() {
  try {
    const response = await fetch('http://localhost:3000/get-plc-data');
    const data = await response.json();
    return data.value; // Vrátí hodnotu z PLC
  } catch (error) {
    console.error('Chyba při načítání dat z API:', error);
    return 0; // Pokud dojde k chybě, vrátí 0
  }
}
