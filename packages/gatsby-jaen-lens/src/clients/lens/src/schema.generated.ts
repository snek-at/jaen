
import { proxy, arrayProxy, fnProxy, fnArrayProxy, t } from "snek-query";



export class Query {
    __typename: t.String;
    allService: LensService[];
    version: t.String;
    constructor() { this.__typename = ""; this.allService = arrayProxy(LensService); this.version = ""; }
}
export class LensService {
    __typename: t.String;
    id: t.String;
    label: t.Nullable<t.String>;
    defaultPath: t.Nullable<t.String>;
    fqdn: t.String;
    host: t.String;
    port: t.NotSupportedYet;
    constructor() { this.__typename = ""; this.id = ""; this.label = null; this.defaultPath = null; this.fqdn = ""; this.host = ""; this.port = null; }
}
export class Mutation {
    __typename: t.String;
    serviceLableUpdate: (args: {
        id: t.String;
        label: t.String;
    }) => LensService[];
    serviceDefaultPathUpdate: (args: {
        id: t.String;
        defaultPath: t.String;
    }) => LensService[];
    constructor() { this.__typename = ""; this.serviceLableUpdate = fnArrayProxy(LensService); this.serviceDefaultPathUpdate = fnArrayProxy(LensService); }
}

