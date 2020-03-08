import { getInputData, ILib } from './file-reader'
import { ILibFlow, createAnswer } from './file-writer'

const calcLibEfficiency = (deadline: number, lib: ILib) => {
    return 1 / lib.signup_time * (deadline - lib.signup_time) * lib.books_per_day * lib.total_potential_score
}

const calcTotalPotentialScore = (lib: ILib) => lib.desc_score_books.reduce((a, v) => a + v.score, 0)

const run = (filename: string) => {
    let { deadline, libs } = getInputData(filename)
    const lib_flow: ILibFlow[] = []
    const use_counter: {
        [key: string]: number
    } = {}
    const repeated: {
        [key: string]: number
    } = {}
    libs.forEach(l => {
        l.desc_score_books.forEach(({ id }) => {
            if (!(id in use_counter)) {
                use_counter[id] = 0
            }
            use_counter[id]++
            if (use_counter[id] > 5) {
                repeated[id] = use_counter[id]
            }
        })
    })
    libs.forEach(l => {
        l.desc_score_books.forEach((b) => {
            if (b.id in repeated) {
                b.score = b.score / repeated[b.id]
            }
        })
        l.desc_score_books = l.desc_score_books.sort((a, b) => b.score - a.score)
        l.total_potential_score = calcTotalPotentialScore(l)
    })
    const sorter = (l: ILib) => calcLibEfficiency(deadline, l)
    while (deadline > 0) {
        libs.sort((a, b) => sorter(b) - sorter(a))
        const l = libs.shift()
        if (!l) {
            break
        }
        deadline -= l.signup_time
        if (deadline < 1) {
            break
        }
        const book_order = l.desc_score_books.map(b => b.id)
        lib_flow.push({
            index: l.index,
            book_order,
        })
    }
    createAnswer({ filename, lib_flow })
    console.log('created', {
        filename,
        repeated: Object.keys(repeated).length,
    })
}

run('a_example.txt')
run('b_read_on.txt')
run('c_incunabula.txt')
run('d_tough_choices.txt')
run('e_so_many_books.txt')
run('f_libraries_of_the_world.txt')
