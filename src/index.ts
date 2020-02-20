
import { getInputData, ILib } from './file-reader'
import { ILibFlow, createAnswer } from './file-writer'
import { cachedDataVersionTag } from 'v8'

const calcLibEfficiency = (deadline: number, lib: ILib) => {
    return (deadline - lib.signup_time) / lib.books_per_day
}

const libAmount = (signUpTime: number, bookPerDay: number, listOfBooks: [{ id: number, score: number }] & any, deadline: number, subDedline: number) => {
    const workDays = deadline - signUpTime - subDedline;
    const countOfBook = workDays * bookPerDay;
    let amount = 0;
    for(let t = 0; t < countOfBook && t < listOfBooks.length; t++){
        amount += listOfBooks[t].score;
    }
    return amount;
    };

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

const run_my = () => {
    const data: any = getInputData('a_example.txt')
    data.libs = data.libs.map((r: any, index: number) => (
        {
            lib_id: index,
            profit: 0,
            pureDate: r,
        }))
const resultDate = [];
let subIndexAmount = 0;
let countOfLibs = 0;

for(let index = 0; index < data.total_libs; index ++) {
    const libScoupe = data.libs;
    data.libs = [];
    for(let t = 0; t < libScoupe.length; t++){
        data.libs.push({lib_id: libScoupe[t].lib_id,
            profit: libAmount(libScoupe[t].pureDate.signup_time, libScoupe[t].pureDate.ship_time,libScoupe[t].pureDate.desc_score_books, data.deadline, subIndexAmount),
        pureDate: libScoupe[t].pureDate});
    }
    data.libs.sort((a: any, b: any) => {
        return a.profit - b.profit;
      })
      const element = data.libs.pop();
      subIndexAmount += element.pureDate.signup_time;
      resultDate.push(element);
      if(data.deadline - subIndexAmount - element.signup_time >= 0){
        countOfLibs++;
      }
}

const finalObject = {
    filename: 'result.txt',
    lib_flow: resultDate.map(i => {
return {
    index: i.lib_id,
    book_order: i.pureDate.desc_score_books.map((u: any) => u.id)
}
    }),
};

      createAnswer({ filename: file, finalObject })
    console.log('created', file)

}

run()
