// Constantes
const DESTINOS = {
    paris: { costoBase: 1200, descuento: 0.1 },
    ecatepec: { costoBase: 2000, descuento: 0.15 },
    ny: { costoBase: 800, descuento: 0.05 },
    mordor: { costoBase: 500, descuento: 0 }
  };
  
  const TRANSPORTES = {
    avion: 1.5,
    TrenMaya: 1.2,
    Tsuru: 1.0,
    barco: 1.3
  };
  
  // Variables
  let viajes = [];
  
  // Funciones
  const registrarDestino = (destino, fecha, transporte, personas = 1) => {
    const nuevoViaje = {
      destino,
      fecha,
      transporte,
      personas,
      costo: calcularCosto(destino, transporte, personas)
    };
    viajes.push(nuevoViaje);
    return nuevoViaje;
  };
  
  const calcularCosto = (destino, transporte, personas = 1) => {
    const infoDestino = DESTINOS[destino] || { costoBase: 1000, descuento: 0 };
    const multiplicadorTransporte = TRANSPORTES[transporte] || 1.0;
    
    let costo = infoDestino.costoBase * multiplicadorTransporte * personas;
    
    // Aplicar descuento por grupo
    if (personas >= 4) {
      costo *= (1 - infoDestino.descuento);
    }
    
    return Math.round(costo);
  };
  
  const obtenerViajes = () => [...viajes];
  
  const limpiarViajes = () => {
    viajes = [];
  };
  
  export { registrarDestino, calcularCosto, obtenerViajes, limpiarViajes, DESTINOS, TRANSPORTES };