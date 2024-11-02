const debounce = (callBack: any, delay = 300) => {
    let id: number;
    return (...args: any) => {
        clearTimeout(id);
        id = setTimeout(() => callBack(...args), delay);
    }
}

export default debounce;