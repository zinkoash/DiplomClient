import {makeAutoObservable} from 'mobx'
export default class TheoryesStore{
    constructor(){
        this._theoryes= []
        makeAutoObservable(this)
    }

    setTheoryes(_theoryes){
        this._theoryes = _theoryes
    }

    get theoryes(){
        return this._theoryes
    }
}