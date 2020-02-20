import { getInputData, ILib } from './file-reader'
import { ILibFlow, createAnswer } from './file-writer'

const calcLibEfficiency = (deadline: number, lib: ILib) => {
    return (deadline - lib.signup_time) / lib.books_per_day
}

const run = (file: string) => {
    let { deadline, libs } = getInputData(file)
    libs.sort((a, b) => calcLibEfficiency(deadline, b) - calcLibEfficiency(deadline, a))
    const lib_flow: ILibFlow[] = []
    for (const l of libs) {
        deadline -= l.signup_time
        if (deadline < 1) {
            break
        }
        lib_flow.push({
            index: l.index,
            book_order: l.desc_score_books.map(b => b.id),
        })
    }
    createAnswer({ filename: file, lib_flow })
    console.log('created', file)
}

// run('a_example.txt')
// run('b_read_on.txt')
// run('c_incunabula.txt')
// run('d_tough_choices.txt')
// run('e_so_many_books.txt')
// run('f_libraries_of_the_world.txt')
