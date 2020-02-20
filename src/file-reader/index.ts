import { readFileSync } from 'fs'

export interface ILib {
    index: number
    total_books: number
    signup_time: number
    books_per_day: number
    total_potential_score: number
    desc_score_books: IBook[]
}

export interface IBook {
    id: number
    score: number
}

export const getInputData = (file: string) => {
    const str = readFileSync('input-data/' + file, { encoding: 'ascii' })
    const lines = str.split('\n').slice(0, -1)
    let total_books = 0
    let total_libs = 0
    let deadline = 0
    let all_scores: number[] = []
    const libs: ILib[] = []
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
            const [total_books, signup_time, books_per_day] = nums
            const new_line = lines[++i]
            if (!new_line) {
                break
            }
            const id_books = new_line.split(' ').map(e => +e)
            const desc_score_books = id_books.map(id => {
                return {
                    id,
                    score: all_scores[id],
                }
            })
            desc_score_books.sort((a, b) => b.score - a.score)
            libs.push({
                index: (i - 3) / 2,
                total_books,
                signup_time,
                books_per_day,
                total_potential_score: desc_score_books.reduce((a, v) => {
                    return a + v.score
                }, 0),
                desc_score_books,
            })
        }
    }
    if (libs.length !== total_libs) {
        console.error({ expected: total_libs, provided: libs.length })
        throw new Error('libs parsed not equal to libs count expected')
    }
    return {
        total_books,
        total_libs,
        deadline,
        all_scores,
        libs,
    }
}
