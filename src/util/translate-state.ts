

export const translateState = (state: string): string => {
    const translate: { [key: string]: string } = {
        'Pending': 'Pendiente',
        'Accepted': 'Aceptado',
        'Canceled': 'Cancelado',
    };

    return translate[state] || state;
};