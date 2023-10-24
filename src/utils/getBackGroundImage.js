import imagen3 from '../heroes/image3.jpg'
import imagen4 from '../heroes/image4.jpg'
import imagen5 from '../heroes/image5.jpg'
import imagen6 from '../heroes/imagen1.jpg'

export const getBackGroundImage = () => {
    const images = [imagen3, imagen4, imagen5, imagen6];
    
    const random = Math.abs(Math.floor( Math.random() * ( images.length - 1 ) ))

    return images[random]
}