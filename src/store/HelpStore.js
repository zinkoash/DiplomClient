import {makeAutoObservable} from 'mobx'
export default class HelpStore{
    constructor(){
        this._helps= []
        makeAutoObservable(this)
    }

    setHelps(_helps){
        this._helps = _helps
    }

    get helps(){
        return this._helps
    }
}