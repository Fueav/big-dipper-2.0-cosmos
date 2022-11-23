import type { Categories } from '@/models/msg/types';

class MsgSubmitMisbehaviour {
  public category: Categories;

  public type: string;

  public signer: string;

  public clientId: string;

  public json: any;

  constructor(payload: any) {
    this.category = 'ibc';
    this.type = payload.type;
    this.signer = payload.signer;
    this.clientId = payload.clientId;
    this.json = payload.json;
  }

  static fromJson(json: any): MsgSubmitMisbehaviour {
    return {
      category: 'ibc',
      json,
      type: json['@type'],
      signer: json.signer,
      clientId: json.client_id,
    };
  }
}

export default MsgSubmitMisbehaviour;
