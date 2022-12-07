import win from '../heroes/win.wav'
import lose from '../heroes/lose.wav'
import {Howl} from 'howler';

export const soundWin = () => {

    const sound = new Howl({
        src: [win],
        autoplay: true
    })

    sound.play()
}

export const soundLose = () => {

    const sound = new Howl({
        src: [lose],
        autoplay: true
    })

    sound.play()
}