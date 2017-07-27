/*AssociateViews*/
export class DepartmentSkillsetDBO {
    constructor (
            public DepartmentSkillsetID?: number,//primary key
            public DepartmentID?: number,
            public DepartmentDescr?: string,
            public SkillsetID?: number,
            public SkillsetDescr?: string){
        this.DepartmentSkillsetID = 0,
        this.DepartmentID = 0,
        this.DepartmentDescr = '',
        this.SkillsetID = 0,
        this.SkillsetDescr =''
    }
}