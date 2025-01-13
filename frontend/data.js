


// Funkce vrátí Promise, která se vyřeší s náhodným číslem v intervalu 0-100
export async function getData() {
  return new Promise((resolve) => {
    const randomValue = Math.floor(Math.random() * 100);
    setTimeout(() => resolve(randomValue), 200); // Simulace asynchronního volání
  });
}
