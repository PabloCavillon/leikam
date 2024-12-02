export const formatNumber = (number: number, cantDecimal: number): string => {

    const formattedNumber = new Intl.NumberFormat('es-ES', {
        style: 'decimal',
        minimumFractionDigits: cantDecimal,
        maximumFractionDigits: cantDecimal
    }).format(number);

    return formattedNumber

}