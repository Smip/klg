export interface IScheme {
  'id': number;
  'name': string;
  'status': string;
  'modifyBy': string;
  'modifyDate': string;
  'description': string;
  'triggerdateLbman': boolean;
  'triggerdateSvcscat': boolean;
  'triggerdateItem': boolean;
  'isinterimtrigger': boolean;
  'constraintLbman': boolean;
  'constraintSvcscat': boolean;
  'constraintItem': boolean;
  'purma': boolean;
  'nntm': boolean;
  'pdbtm': boolean;
  'dsart': boolean;
  'trigger': number | string; // Have to be number, but there is no reference object
  'interimtrigger': number | string; // Have to be number, but there is no reference object
  'constraint': number | string; // Have to be number, but there is no reference object
  'lbmanEffectivedeadlineinfo': number | string; // Have to be number, but there is no reference object
  'lbmanProcbasisref': number | string; // Have to be number, but there is no reference object
  'editable': boolean;
}
