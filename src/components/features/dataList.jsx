import Trie from '../DataStructure/Trie.jsx';
import {oriPortfolios} from '../domain/startProgram.js';

export const dataList = (input) =>  {

    if (!input) {
        console.log('검색어가 입력되지 않음');
        return;
    }

    let trie = new Trie();

    for (let key of oriPortfolios.keys()) {
        trie.insert((oriPortfolios.get(key).title));
    }

    return new Set(trie.autoComplete(input));

}