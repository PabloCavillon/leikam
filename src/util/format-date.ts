export const formatDate = (inputDate: string): string => {
    // Convertir la cadena de fecha a un objeto Date
    const dateObj = new Date(inputDate);

    // Verificar que la fecha sea válida
    if (isNaN(dateObj.getTime())) {
        throw new Error("Fecha inválida");
    }

    // Configurar opciones de formato
    const options: Intl.DateTimeFormatOptions = { 
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric" 
    };

    // Formatear la fecha con la localización en español
    const formato = new Intl.DateTimeFormat("es-ES", options);

    // Formatear y limpiar el resultado
    return formato.format(dateObj).replace(".", "");
}