import {makeAutoObservable} from 'mobx'
export default class PracticesStore{
    constructor(){
        this._practices = []
        makeAutoObservable(this)
    }

    setPractices(practices){
        this._practices = practices
    }

    get practices(){
        return this._practices
    }
}