import {makeAutoObservable} from 'mobx'
export default class StudentsStore{
    constructor(){
        this._students= []
        makeAutoObservable(this)
    }

    setStudents(_students){
        this._students = _students
    }

    get students(){
        return this._students
    }
}