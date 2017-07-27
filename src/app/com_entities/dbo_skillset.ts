/*AssociateViews*/
export class DptSklDBO {
    constructor (
        public DepartmentSkillsetID: number,//primary key
        public DepartmentID: number,
        public DepartmentDescr: string,
        public SkillsetID: number,
        public SkillsetDescr: string,
    ){}
}