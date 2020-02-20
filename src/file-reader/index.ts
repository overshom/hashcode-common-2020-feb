import { readFileSync } from 'fs'

export const getInputData = (file: string) => {
    const str = readFileSync('input-data/' + file, { encoding: 'ascii' })
    const lines = str.split('\n').slice(0, -1)
    let total_books = 0
    let total_libs = 0
    let deadline = 0
    let all_scores: number[] = []
    const libs: {
        total_books: number
        signup_time: number
        ship_time: number
        books: {
            id: number
            score: number
        }[]
    }[] = []
    for (let i = 0; i < lines.length; i++) {
        const nums = lines[i].split(' ').map(e => +e)
        if (i === 0) {
            const [b, l, d] = nums
            total_books = b
            total_libs = l
            deadline = d
        } else if (i === 1) {
            all_scores = nums
        } else {
            const [total_books, signup_time, ship_time] = nums
            const id_books = lines[++i].split(' ').map(e => +e)
            const books = id_books.map(id => {
                return {
                    id,
                    score: all_scores[id],
                }
            })
            libs.push({
                total_books,
                signup_time,
                ship_time,
                books,
            })
        }
    }
    return {
        total_books,
        total_libs,
        deadline,
        all_scores,
        libs,
    }
}
