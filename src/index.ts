import { getInputData } from './file-reader'

const run = () => {
    const data = getInputData('a_example.txt')
    console.log(data)
}

run()