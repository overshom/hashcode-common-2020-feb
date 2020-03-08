import { writeFileSync } from 'fs'

export interface ILibFlow {
    index: number
    book_order: number[]
}

export const createAnswer = (config: {
    filename: string,
    lib_flow: ILibFlow[]
}) => {
    let data: string[] = []
    data.push(String(config.lib_flow.length))
    for (const lib of config.lib_flow) {
        data.push(`${lib.index} ${lib.book_order.length}`)
        data.push(lib.book_order.join(' '))
    }
    writeFileSync('output-data/' + config.filename, data.join('\n') + '\n')
}