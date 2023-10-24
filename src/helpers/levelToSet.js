export const levelToSet = ( total, aciertos ) => {

    let level = 'Avanzado'
    
    if ( total === 30 ) {

        if ( aciertos <= 10 ) {
            level = 'Tierno'  
        } else if ( aciertos >= 10 && aciertos <= 25 ) {
            level = 'Medio'
        } else if ( aciertos > 25 ) {
            level = 'Avanzado'
        }

    } else {
        if ( aciertos <= 5 ) {
            level = 'Tierno'  
        } else if ( aciertos >= 5 && aciertos <= 13 ) {
            level = 'Medio'
        } else if ( aciertos > 13 ) {
            level = 'Avanzado'
        }
    }

    return level
}