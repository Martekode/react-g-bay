export default class User{
    constructor(id, userName, password, email) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }
    getId(){
        return this.id;
    }
    getUserName(){
        return this.userName;
    }
    getPassword(){
        return this.password;
    }
    getEmail(){
        return this.email;
    }
}