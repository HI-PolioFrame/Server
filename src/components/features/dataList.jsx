import Trie from "../DataStructure/Trie.jsx";
import { oriProjects } from "../domain/startProgram.js";
import { oriHackathons } from "../domain/startProgram.js";

export const dataList = (input) => {
  if (!input) {
    console.log("검색어가 입력되지 않음");
    return;
  }

  let trie = new Trie();

  for (let key of oriProjects.keys()) {
    trie.insert(oriProjects.get(key).projectTitle);
  }

  return new Set(trie.autoComplete(input));
};


export const HackdataList = (input) => {
  if (!input) {
    console.log("검색어가 입력되지 않음");
    return;
  }

  let trie = new Trie();

  for (let key of oriHackathons.keys()) {
    trie.insert(oriHackathons.get(key).hackName);
  }

  return new Set(trie.autoComplete(input));
};
