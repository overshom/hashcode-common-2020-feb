import { getInputData } from './file-reader'

const run = () => {
    const data = getInputData('c_incunabula.txt')
    console.log(data)
}

run()