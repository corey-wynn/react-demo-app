const BASE_URL: string = 'http://interview-data.herokuapp.com';
const CACHE: {[key: string]: Map<string, any>} = {};

export const makeCall = (url: string): Promise<Map<string, any>> => {
    url = `${BASE_URL}/${url}`;
    if (CACHE[url]) return new Promise((res) => res(CACHE[url]));

    return fetch(url)
        .then((response) => {
            if (response.ok) return response.json();
            else throw new Error("Status code error :" + response.status)
        })
        .then((res) => {
            const map = res.reduce((map: any, value: any) => {
                map.set(value.id, value);
                return map;
            }, new Map());
            CACHE[url] =  map;
            return map;
        })
        .catch(e => console.error(e))
}