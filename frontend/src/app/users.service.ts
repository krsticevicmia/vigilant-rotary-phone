import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password){
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  findUser(username){
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/findUser`, data);
  }

  findRequser(username){
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/findRequser`, data);
  }

  register(ime, prezime, username, password, mail,zanimanje,jmbg,pol,pitanje,odgovor,slika){
    const data = {
      ime: ime,
      prezime:prezime,
      username: username,
      password: password,
      mail:mail,
      zanimanje: zanimanje,
      jmbg : jmbg,
      pol: pol,
      tip: 0,
      pitanje : pitanje,
      odgovor: odgovor,
      slika:slika
    };
    return this.http.post(`${this.uri}/register`, data);
  }

  getRequests(){
    return this.http.get(`${this.uri}/requests`);
  }

  removeRequestUser(username){
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/getandremoveRequser`, data);
  }

   getAndRemoveRequser(username){
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/getandremoveRequser`, data);
  }

  saveUser(ime, prezime, username, password, mail,zanimanje,jmbg,pol,pitanje,odgovor){
    const data = {
      ime: ime,
      prezime:prezime,
      username: username,
      password: password,
      mail:mail,
      zanimanje: zanimanje,
      jmbg : jmbg,
      pol: pol,
      tip: 0,
      pitanje : pitanje,
      odgovor: odgovor
    };
    return this.http.post(`${this.uri}/saveUser`, data);
  }

  changePass(username,password){
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/changeUserPass`, data);
  }

  saveAnagram(zagonetka,resenje){
    const data = {
      zagonetka: zagonetka,
      resenje: resenje
    };

    return this.http.post(`${this.uri}/saveAnagram`, data);
  }

  getGeografija(slovo){
    const data = {
      slovo: slovo
    };
    return this.http.post(`${this.uri}/getGeografija`, data);
  }

  insertGeografija(slovo, odgovori){
    const data = {
      slovo: slovo,
      odgovori: odgovori
    };
    return this.http.post(`${this.uri}/insertGeografija`, data);
  }

  updateGeogafija(slovo, odgovori){
    const data = {
      slovo: slovo,
      odgovori: odgovori
    };
    return this.http.post(`${this.uri}/updateGeografija`, data);
  }

  getGeos(){
    return this.http.get(`${this.uri}/getGeos`);
  }

  getAnagrams(){
    return this.http.get(`${this.uri}/getAnagrams`);
  }

  saveIgra(igra, resenje1, resenje2, datum){
    const data = {
      igra: igra,
      anagram1: resenje1,
      anagram2: resenje2,
      datum: datum
    };
    return this.http.post(`${this.uri}/saveIgra`, data);
  }

  findDate(datum){
    const data = {  
      datum: datum
    };
    return this.http.post(`${this.uri}/findDate`, data);
  }

  findIgra(datum){
    const data = {  
      datum: datum
    };
    return this.http.post(`${this.uri}/findIgra`, data);
  }

  findAnagram(anagram){
    const data = {  
      resenje: anagram
    };
    return this.http.post(`${this.uri}/findAnagram`, data);
  }

  findAnagramResenje(anagram){
    const data = {  
      zagonetka: anagram
    };
    return this.http.post(`${this.uri}/findAnagramResenje`, data);
  }

  findGeos(slovo,kategorija,termin){
    const data = {  
      slovo: slovo,
      kategorija: kategorija,
      termin: termin
    };
    return this.http.post(`${this.uri}/findGeos`, data);
  }

  saveRang(datum,poeni,igra,username){
    const data = {  
      datum: datum,
      poeni: poeni,
      igra: igra,
      username: username
    };
    return this.http.post(`${this.uri}/saveRang`, data);
  }

  getRangs(datum,username){
    const data = {  
      datum: datum ,
      username : username
    };
    return this.http.post(`${this.uri}/getRang`, data);
  }

  getRangovi(datum){
    const data = {  
      datum: datum
    };
    return this.http.post(`${this.uri}/getRangs`, data);
  }

  saveProvera(datum,slovo,username,odgovori,poeni){
    const data = {  
      datum: datum,
      slovo: slovo,
      username: username,
      odgovori: odgovori,
      poeni: poeni

    };
    return this.http.post(`${this.uri}/saveProvera`, data);
  }

  getProvera(datum,username){
    const data = {  
      datum: datum ,
      username : username
    };
    return this.http.post(`${this.uri}/getProvera`, data);
  }

  getProveras(){
    return this.http.get(`${this.uri}/getProveras`);
  }

  updateProvera(datum,username,poeni){
    const data = {  
      datum: datum,
      username: username,
      poeni: poeni

    };
    return this.http.post(`${this.uri}/updateProvera`, data);
  }

  removeProvera(datum,username){
    const data = {  
      datum: datum,
      username: username,

    };
    return this.http.post(`${this.uri}/removeProvera`, data);
  }
}
