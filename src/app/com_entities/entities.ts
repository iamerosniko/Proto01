/*AssociateViews*/
export class AssociateDepartmentSkillsets {
    constructor (
        public AssociateDepartmentSkillsetID: number,//primary key
        public AssociateID: number,
        public DepartmentSkillsetID : number,
    ){}
}

/*AssociateViews*/
export class DepartmentSkillsets {
    constructor (
        public DepartmentSkillsetID: number,//primary key
        public DepartmentID: number,
        public SkillsetID: number,
    ){}
}

export class Associate {
    constructor (
        public AssociateID: number,
        public UserName : string,
        public PhoneNumber : string,
        public VPN : Boolean,
        public DepartmentID : number,
        public LocationID : number,
        public UpdatedOn : Date,
        public IsActive : Boolean,
    ){}
}

export class Department {
    constructor (
        public DepartmentID: number,//primary key
        public DepartmentDescr: string,
        public IsActive : Boolean,
    ){}
}

export class Skillset {
    constructor (
        public SkillsetID: number,//primary key
        public SkillsetDescr: string,
        public IsActive : Boolean,
    ){}
}

export class Location {
    constructor (
        public LocationID: number,//primary key
        public LocationDescr: string,
        public IsActive : Boolean,
    ){}
}

/*BTSS*/

export class Set_Module {
    constructor (
        public mod_id: string,//primary key
        public mod_name: string,
        public mod_desc : string,
        public created_date : Date
    ){}
}

export class Set_Group {
    constructor (
        public grp_id: string,//primary key
        public grp_name: string,
        public grp_desc : string,
        public created_date : Date
    ){}
}

export class Set_User {
    constructor (
        public user_id: string,//primary key
        public user_name: string,
        public user_last_name: string,
        public user_first_name: string,
        public user_middle_name: string,
        public can_PROD: Boolean,
        public can_UAT: Boolean,
        public can_PEER: Boolean,
        public can_DEV: Boolean,
        public created_date : Date
    ){}
}

export class User {
    constructor (
        public id:number,//dummy id
        public UserName:string
    ){}
}
