const A = 'option_1'
const B = 'option_2'
const C = 'option_3'
const D = 'option_4'
export const getOption = (option: string): string => {
    switch (option) {
        case A: return 'A'
        case B: return 'B';
        case C: return 'C'
        default: return 'D';
    }
}