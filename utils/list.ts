class List {
    static remove = <T>(arr: Array<T>, index: number): Array<T> => {
        return arr.slice(0, index).concat(arr.slice(index + 1, arr.length))
    }

    static toString = (arr: Array<string>, seperator: string = ','): string => {
        let r = ''
        for (let i = 0; i < arr.length; i++) {
            if (i !== arr.length - 1) {
                r = r.concat(arr[i] + seperator)
            } else {
                r = r.concat(arr[i])
            }
        }
        return r
    }

    static shuffle = <T>(arr: Array<T>) => {
        let array = Array(...arr)
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }
}
export default List
