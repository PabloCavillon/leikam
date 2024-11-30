export const formatNumber = (number: number): string => {

    const formattedNumber = new Intl.NumberFormat('es-ES', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);

    return formattedNumber

}