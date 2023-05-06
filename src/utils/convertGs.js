export function convertGs(num) {
    const formatoMoneda = 'es-PY'; // El formato que quieres utilizar para mostrar la moneda
    const montoEnGuaranies = num.toLocaleString(formatoMoneda, {
        style: 'currency',
        currency: 'PYG',
    });
    return montoEnGuaranies;
}



