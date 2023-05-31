import {makeAutoObservable} from 'mobx'
export default class ControlStore{
    constructor(){
        this._controls= []
        makeAutoObservable(this)
    }

    setControls(_controls){
        this._controls = _controls
    }

    get controls(){
        return this._controls
    }
}