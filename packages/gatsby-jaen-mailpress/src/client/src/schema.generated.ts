
import { proxy, arrayProxy, fnProxy, fnArrayProxy, t } from "snek-query";

export enum OAuthProvider {
    GOOGLE = "GOOGLE",
    AZURE = "AZURE"
}
export enum OAuthProviderInput {
    GOOGLE = "GOOGLE",
    AZURE = "AZURE"
}
export enum SortOrderInput {
    asc = "asc",
    desc = "desc"
}

export type ConnectionArgumentsInput = {
    first?: t.Number;
    after?: t.String;
    last?: t.Number;
    before?: t.String;
};
export type EmailTemplateWhereInputInput = {
    AND?: EmailTemplateWhereInputInput[];
    OR?: EmailTemplateWhereInputInput[];
    NOT?: EmailTemplateWhereInputInput[];
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: WithoutInput_18AndEmailEnvelopeWhereInputInput;
    parent?: WithoutInput_20AndEmailTemplateWhereInputInput;
    links?: EmailTemplateListRelationFilterInput;
    variables?: VariableDefinitionListRelationFilterInput;
    creator?: WithoutInput_22AndUserWhereInputInput;
};
export type WithoutInput_18AndEmailEnvelopeWhereInputInput = {
    is?: EmailEnvelopeWhereInputInput;
    isNot?: EmailEnvelopeWhereInputInput;
    AND?: EmailEnvelopeWhereInputInput[];
    OR?: EmailEnvelopeWhereInputInput[];
    NOT?: EmailEnvelopeWhereInputInput[];
    id?: t.String;
    subject?: t.String;
    to?: StringNullableListFilterInput;
    replyTo?: t.String;
    emailTemplateId?: t.String;
    emailTemplate?: WithoutInput_24AndEmailTemplateWhereInputInput;
};
export type EmailEnvelopeWhereInputInput = {
    AND?: EmailEnvelopeWhereInputInput[];
    OR?: EmailEnvelopeWhereInputInput[];
    NOT?: EmailEnvelopeWhereInputInput[];
    id?: t.String;
    subject?: t.String;
    to?: StringNullableListFilterInput;
    replyTo?: t.String;
    emailTemplateId?: t.String;
    emailTemplate?: WithoutInput_24AndEmailTemplateWhereInputInput;
};
export type StringNullableListFilterInput = {
    equals?: t.String[];
    has?: t.String;
    hasEvery?: t.String[];
    hasSome?: t.String[];
    isEmpty?: t.Boolean;
};
export type WithoutInput_24AndEmailTemplateWhereInputInput = {
    is?: EmailTemplateWhereInputInput;
    isNot?: EmailTemplateWhereInputInput;
    AND?: EmailTemplateWhereInputInput[];
    OR?: EmailTemplateWhereInputInput[];
    NOT?: EmailTemplateWhereInputInput[];
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: WithoutInput_18AndEmailEnvelopeWhereInputInput;
    parent?: WithoutInput_20AndEmailTemplateWhereInputInput;
    links?: EmailTemplateListRelationFilterInput;
    variables?: VariableDefinitionListRelationFilterInput;
    creator?: WithoutInput_22AndUserWhereInputInput;
};
export type WithoutInput_20AndEmailTemplateWhereInputInput = {
    is?: EmailTemplateWhereInputInput;
    isNot?: EmailTemplateWhereInputInput;
    AND?: EmailTemplateWhereInputInput[];
    OR?: EmailTemplateWhereInputInput[];
    NOT?: EmailTemplateWhereInputInput[];
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: WithoutInput_18AndEmailEnvelopeWhereInputInput;
    parent?: WithoutInput_20AndEmailTemplateWhereInputInput;
    links?: EmailTemplateListRelationFilterInput;
    variables?: VariableDefinitionListRelationFilterInput;
    creator?: WithoutInput_22AndUserWhereInputInput;
};
export type EmailTemplateListRelationFilterInput = {
    every?: EmailTemplateWhereInputInput;
    some?: EmailTemplateWhereInputInput;
    none?: EmailTemplateWhereInputInput;
};
export type VariableDefinitionListRelationFilterInput = {
    every?: VariableDefinitionWhereInputInput;
    some?: VariableDefinitionWhereInputInput;
    none?: VariableDefinitionWhereInputInput;
};
export type VariableDefinitionWhereInputInput = {
    AND?: VariableDefinitionWhereInputInput[];
    OR?: VariableDefinitionWhereInputInput[];
    NOT?: VariableDefinitionWhereInputInput[];
    id?: t.String;
    name?: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
    emailTemplateId?: t.String;
    emailTemplate?: WithoutInput_20AndEmailTemplateWhereInputInput;
};
export type WithoutInput_22AndUserWhereInputInput = {
    is?: UserWhereInputInput;
    isNot?: UserWhereInputInput;
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    id?: t.String;
    organizationId?: t.String;
    emailTemplates?: EmailTemplateListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type UserWhereInputInput = {
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    id?: t.String;
    organizationId?: t.String;
    emailTemplates?: EmailTemplateListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type WithoutInput_26AndEmailWhereInputInput = {
    is?: EmailWhereInputInput;
    isNot?: EmailWhereInputInput;
    AND?: EmailWhereInputInput[];
    OR?: EmailWhereInputInput[];
    NOT?: EmailWhereInputInput[];
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    smtpConfig?: WithoutInput_30AndSMTPConfigWhereInputInput;
    oauthConfig?: WithoutInput_32AndOAuthConfigWhereInputInput;
    user?: WithoutInput_34AndUserWhereInputInput;
    organization?: WithoutInput_36AndOrganizationWhereInputInput;
};
export type EmailWhereInputInput = {
    AND?: EmailWhereInputInput[];
    OR?: EmailWhereInputInput[];
    NOT?: EmailWhereInputInput[];
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    smtpConfig?: WithoutInput_30AndSMTPConfigWhereInputInput;
    oauthConfig?: WithoutInput_32AndOAuthConfigWhereInputInput;
    user?: WithoutInput_34AndUserWhereInputInput;
    organization?: WithoutInput_36AndOrganizationWhereInputInput;
};
export type WithoutInput_30AndSMTPConfigWhereInputInput = {
    is?: SMTPConfigWhereInputInput;
    isNot?: SMTPConfigWhereInputInput;
    AND?: SMTPConfigWhereInputInput[];
    OR?: SMTPConfigWhereInputInput[];
    NOT?: SMTPConfigWhereInputInput[];
    id?: t.String;
    host?: t.String;
    port?: t.Number;
    username?: t.String;
    password?: t.String;
    secure?: t.Boolean;
    emailId?: t.String;
    email?: WithoutInput_38AndEmailWhereInputInput;
};
export type SMTPConfigWhereInputInput = {
    AND?: SMTPConfigWhereInputInput[];
    OR?: SMTPConfigWhereInputInput[];
    NOT?: SMTPConfigWhereInputInput[];
    id?: t.String;
    host?: t.String;
    port?: t.Number;
    username?: t.String;
    password?: t.String;
    secure?: t.Boolean;
    emailId?: t.String;
    email?: WithoutInput_38AndEmailWhereInputInput;
};
export type WithoutInput_38AndEmailWhereInputInput = {
    is?: EmailWhereInputInput;
    isNot?: EmailWhereInputInput;
    AND?: EmailWhereInputInput[];
    OR?: EmailWhereInputInput[];
    NOT?: EmailWhereInputInput[];
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    smtpConfig?: WithoutInput_30AndSMTPConfigWhereInputInput;
    oauthConfig?: WithoutInput_32AndOAuthConfigWhereInputInput;
    user?: WithoutInput_34AndUserWhereInputInput;
    organization?: WithoutInput_36AndOrganizationWhereInputInput;
};
export type WithoutInput_32AndOAuthConfigWhereInputInput = {
    is?: OAuthConfigWhereInputInput;
    isNot?: OAuthConfigWhereInputInput;
    AND?: OAuthConfigWhereInputInput[];
    OR?: OAuthConfigWhereInputInput[];
    NOT?: OAuthConfigWhereInputInput[];
    id?: t.String;
    provider?: EnumOAuthProviderFilterInput;
    accessToken?: t.String;
    accessTokenExpiresAt?: t.String;
    refreshToken?: t.String;
    emailId?: t.String;
    email?: WithoutInput_38AndEmailWhereInputInput;
};
export type OAuthConfigWhereInputInput = {
    AND?: OAuthConfigWhereInputInput[];
    OR?: OAuthConfigWhereInputInput[];
    NOT?: OAuthConfigWhereInputInput[];
    id?: t.String;
    provider?: EnumOAuthProviderFilterInput;
    accessToken?: t.String;
    accessTokenExpiresAt?: t.String;
    refreshToken?: t.String;
    emailId?: t.String;
    email?: WithoutInput_38AndEmailWhereInputInput;
};
export type EnumOAuthProviderFilterInput = {
    equals?: t.String;
    in?: OAuthProviderInput[];
    notIn?: OAuthProviderInput[];
    not?: t.String;
};
export type WithoutInput_34AndUserWhereInputInput = {
    is?: UserWhereInputInput;
    isNot?: UserWhereInputInput;
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    id?: t.String;
    organizationId?: t.String;
    emailTemplates?: EmailTemplateListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type WithoutInput_28AndOrganizationWhereInputInput = {
    is?: OrganizationWhereInputInput;
    isNot?: OrganizationWhereInputInput;
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    id?: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    oAuthApps?: OAuthAppListRelationFilterInput;
};
export type OrganizationWhereInputInput = {
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    id?: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    oAuthApps?: OAuthAppListRelationFilterInput;
};
export type UserListRelationFilterInput = {
    every?: UserWhereInputInput;
    some?: UserWhereInputInput;
    none?: UserWhereInputInput;
};
export type OAuthAppListRelationFilterInput = {
    every?: OAuthAppWhereInputInput;
    some?: OAuthAppWhereInputInput;
    none?: OAuthAppWhereInputInput;
};
export type OAuthAppWhereInputInput = {
    AND?: OAuthAppWhereInputInput[];
    OR?: OAuthAppWhereInputInput[];
    NOT?: OAuthAppWhereInputInput[];
    id?: t.String;
    clientId?: t.String;
    clientSecret?: t.String;
    type?: t.String;
    organizationId?: t.String;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type WithoutInput_36AndOrganizationWhereInputInput = {
    is?: OrganizationWhereInputInput;
    isNot?: OrganizationWhereInputInput;
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    id?: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    oAuthApps?: OAuthAppListRelationFilterInput;
};
export type EmailTemplateOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    description?: SortOrderInput;
    content?: SortOrderInput;
    verifyReplyTo?: t.String;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: SortOrderInput;
    updatedAt?: SortOrderInput;
    creatorId?: SortOrderInput;
    envelope?: EmailEnvelopeOrderByWithRelationInputInput;
    parent?: EmailTemplateOrderByWithRelationInputInput;
    links?: EmailTemplateOrderByRelationAggregateInputInput;
    variables?: VariableDefinitionOrderByRelationAggregateInputInput;
    creator?: UserOrderByWithRelationInputInput;
};
export type EmailEnvelopeOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    subject?: t.String;
    to?: SortOrderInput;
    replyTo?: t.String;
    emailTemplateId?: SortOrderInput;
    emailTemplate?: EmailTemplateOrderByWithRelationInputInput;
};
export type EmailTemplateOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type VariableDefinitionOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type UserOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    organizationId?: SortOrderInput;
    emailTemplates?: EmailTemplateOrderByRelationAggregateInputInput;
    email?: EmailOrderByWithRelationInputInput;
    organization?: OrganizationOrderByWithRelationInputInput;
};
export type EmailOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    isEnabled?: SortOrderInput;
    email?: SortOrderInput;
    userId?: t.String;
    smtpConfig?: SMTPConfigOrderByWithRelationInputInput;
    oauthConfig?: OAuthConfigOrderByWithRelationInputInput;
    user?: UserOrderByWithRelationInputInput;
    organization?: OrganizationOrderByWithRelationInputInput;
};
export type SMTPConfigOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    host?: SortOrderInput;
    port?: SortOrderInput;
    username?: SortOrderInput;
    password?: SortOrderInput;
    secure?: SortOrderInput;
    emailId?: SortOrderInput;
    email?: EmailOrderByWithRelationInputInput;
};
export type OAuthConfigOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    provider?: SortOrderInput;
    accessToken?: SortOrderInput;
    accessTokenExpiresAt?: SortOrderInput;
    refreshToken?: SortOrderInput;
    emailId?: SortOrderInput;
    email?: EmailOrderByWithRelationInputInput;
};
export type OrganizationOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserOrderByRelationAggregateInputInput;
    email?: EmailOrderByWithRelationInputInput;
    oAuthApps?: OAuthAppOrderByRelationAggregateInputInput;
};
export type UserOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type OAuthAppOrderByRelationAggregateInputInput = {
    _count?: SortOrderInput;
};
export type OmitInput_8 = {
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedCreateNestedOneWithoutEmailTemplateInputInput;
    parent?: EmailTemplateCreateNestedOneWithoutLinksInputInput;
    links?: EmailTemplateUncheckedCreateNestedManyWithoutParentInputInput;
    variables?: VariableDefinitionUncheckedCreateNestedManyWithoutEmailTemplateInputInput;
    creator?: UserCreateNestedOneWithoutEmailTemplatesInputInput;
};
export type EmailEnvelopeUncheckedCreateNestedOneWithoutEmailTemplateInputInput = {
    create?: ObjectAndEmailEnvelopeUncheckedCreateWithoutEmailTemplateInputInput;
    connectOrCreate?: EmailEnvelopeCreateOrConnectWithoutEmailTemplateInputInput;
    connect?: WhereInput_11AndWhereInput_12;
};
export type ObjectAndEmailEnvelopeUncheckedCreateWithoutEmailTemplateInputInput = {
    id?: t.String;
    subject?: t.String;
    to?: t.String[];
    replyTo?: t.String;
};
export type EmailEnvelopeCreateOrConnectWithoutEmailTemplateInputInput = {
    where: WhereInput_11AndWhereInput_12;
    create: ObjectAndEmailEnvelopeUncheckedCreateWithoutEmailTemplateInputInput;
};
export type WhereInput_11AndWhereInput_12 = {
    id?: t.String;
    emailTemplateId?: t.String;
    AND?: EmailEnvelopeWhereInputInput[];
    OR?: EmailEnvelopeWhereInputInput[];
    NOT?: EmailEnvelopeWhereInputInput[];
    subject?: t.String;
    to?: StringNullableListFilterInput;
    replyTo?: t.String;
    emailTemplate?: WithoutInput_24AndEmailTemplateWhereInputInput;
};
export type EmailTemplateCreateNestedOneWithoutLinksInputInput = {
    create?: WithoutInput_40AndEmailTemplateUncheckedCreateWithoutLinksInputInput;
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutLinksInputInput;
    connect?: WhereInputAndWhereInput_1;
};
export type WithoutInput_40AndEmailTemplateUncheckedCreateWithoutLinksInputInput = {
    parent?: EmailTemplateCreateNestedOneWithoutLinksInputInput;
    creator?: UserCreateNestedOneWithoutEmailTemplatesInputInput;
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedCreateNestedOneWithoutEmailTemplateInputInput;
    variables?: VariableDefinitionUncheckedCreateNestedManyWithoutEmailTemplateInputInput;
};
export type UserCreateNestedOneWithoutEmailTemplatesInputInput = {
    create?: WithoutInput_42AndUserUncheckedCreateWithoutEmailTemplatesInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutEmailTemplatesInputInput;
    connect?: WhereInput_19AndWhereInput_20;
};
export type WithoutInput_42AndUserUncheckedCreateWithoutEmailTemplatesInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    email?: EmailUncheckedCreateNestedOneWithoutUserInputInput;
};
export type OrganizationCreateNestedOneWithoutUsersInputInput = {
    create?: WithoutInput_44AndOrganizationUncheckedCreateWithoutUsersInputInput;
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInputInput;
    connect?: WhereInput_7AndWhereInput_8;
};
export type WithoutInput_44AndOrganizationUncheckedCreateWithoutUsersInputInput = {
    email?: EmailCreateNestedOneWithoutOrganizationInputInput;
    id: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    oAuthApps?: OAuthAppUncheckedCreateNestedManyWithoutOrganizationInputInput;
};
export type EmailCreateNestedOneWithoutOrganizationInputInput = {
    create?: WithoutInput_46AndEmailUncheckedCreateWithoutOrganizationInputInput;
    connectOrCreate?: EmailCreateOrConnectWithoutOrganizationInputInput;
    connect?: WhereInput_3AndWhereInput_4;
};
export type WithoutInput_46AndEmailUncheckedCreateWithoutOrganizationInputInput = {
    user?: UserCreateNestedOneWithoutEmailInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email: t.String;
    userId?: t.String;
    smtpConfig?: SMTPConfigUncheckedCreateNestedOneWithoutEmailInputInput;
    oauthConfig?: OAuthConfigUncheckedCreateNestedOneWithoutEmailInputInput;
};
export type UserCreateNestedOneWithoutEmailInputInput = {
    create?: WithoutInput_48AndUserUncheckedCreateWithoutEmailInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutEmailInputInput;
    connect?: WhereInput_19AndWhereInput_20;
};
export type WithoutInput_48AndUserUncheckedCreateWithoutEmailInputInput = {
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
    id: t.String;
    organizationId?: t.String;
    emailTemplates?: EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputInput;
};
export type EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputInput = {
    create?: WithoutInput_50AndEmailTemplateUncheckedCreateWithoutCreatorInputInput;
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutCreatorInputInput[];
    createMany?: EmailTemplateCreateManyCreatorInputEnvelopeInput;
    connect?: WhereInput_2AndWhereInput_1;
};
export type WithoutInput_50AndEmailTemplateUncheckedCreateWithoutCreatorInputInput = {
    parent?: EmailTemplateCreateNestedOneWithoutLinksInputInput;
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    envelope?: EmailEnvelopeUncheckedCreateNestedOneWithoutEmailTemplateInputInput;
    links?: EmailTemplateUncheckedCreateNestedManyWithoutParentInputInput;
    variables?: VariableDefinitionUncheckedCreateNestedManyWithoutEmailTemplateInputInput;
};
export type EmailTemplateUncheckedCreateNestedManyWithoutParentInputInput = {
    create?: WithoutInput_52AndEmailTemplateUncheckedCreateWithoutParentInputInput;
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutParentInputInput[];
    createMany?: EmailTemplateCreateManyParentInputEnvelopeInput;
    connect?: WhereInput_2AndWhereInput_1;
};
export type WithoutInput_52AndEmailTemplateUncheckedCreateWithoutParentInputInput = {
    creator?: UserCreateNestedOneWithoutEmailTemplatesInputInput;
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedCreateNestedOneWithoutEmailTemplateInputInput;
    links?: EmailTemplateUncheckedCreateNestedManyWithoutParentInputInput;
    variables?: VariableDefinitionUncheckedCreateNestedManyWithoutEmailTemplateInputInput;
};
export type VariableDefinitionUncheckedCreateNestedManyWithoutEmailTemplateInputInput = {
    create?: ObjectAndVariableDefinitionUncheckedCreateWithoutEmailTemplateInputInput;
    connectOrCreate?: VariableDefinitionCreateOrConnectWithoutEmailTemplateInputInput[];
    createMany?: VariableDefinitionCreateManyEmailTemplateInputEnvelopeInput;
    connect?: WhereInput_17AndWhereInput_16;
};
export type ObjectAndVariableDefinitionUncheckedCreateWithoutEmailTemplateInputInput = {
    id?: t.String;
    name: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
};
export type VariableDefinitionCreateOrConnectWithoutEmailTemplateInputInput = {
    where: WhereInput_15AndWhereInput_16;
    create: ObjectAndVariableDefinitionUncheckedCreateWithoutEmailTemplateInputInput;
};
export type WhereInput_15AndWhereInput_16 = {
    id?: t.String;
    emailTemplateId_name?: VariableDefinitionEmailTemplateIdNameCompoundUniqueInputInput;
    AND?: VariableDefinitionWhereInputInput[];
    OR?: VariableDefinitionWhereInputInput[];
    NOT?: VariableDefinitionWhereInputInput[];
    name?: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
    emailTemplateId?: t.String;
    emailTemplate?: WithoutInput_20AndEmailTemplateWhereInputInput;
};
export type VariableDefinitionEmailTemplateIdNameCompoundUniqueInputInput = {
    emailTemplateId: t.String;
    name: t.String;
};
export type VariableDefinitionCreateManyEmailTemplateInputEnvelopeInput = {
    data?: VariableDefinitionCreateManyEmailTemplateInputInput[];
    skipDuplicates?: t.Boolean;
};
export type VariableDefinitionCreateManyEmailTemplateInputInput = {
    id?: t.String;
    name: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
};
export type WhereInput_17AndWhereInput_16 = {
    id?: t.String;
    emailTemplateId_name?: VariableDefinitionEmailTemplateIdNameCompoundUniqueInputInput;
    AND?: VariableDefinitionWhereInputInput[];
    OR?: VariableDefinitionWhereInputInput[];
    NOT?: VariableDefinitionWhereInputInput[];
    name?: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
    emailTemplateId?: t.String;
    emailTemplate?: WithoutInput_20AndEmailTemplateWhereInputInput;
};
export type EmailTemplateCreateOrConnectWithoutParentInputInput = {
    where: WhereInputAndWhereInput_1;
    create: WithoutInput_52AndEmailTemplateUncheckedCreateWithoutParentInputInput;
};
export type WhereInputAndWhereInput_1 = {
    id?: t.String;
    AND?: EmailTemplateWhereInputInput[];
    OR?: EmailTemplateWhereInputInput[];
    NOT?: EmailTemplateWhereInputInput[];
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: WithoutInput_18AndEmailEnvelopeWhereInputInput;
    parent?: WithoutInput_20AndEmailTemplateWhereInputInput;
    links?: EmailTemplateListRelationFilterInput;
    variables?: VariableDefinitionListRelationFilterInput;
    creator?: WithoutInput_22AndUserWhereInputInput;
};
export type EmailTemplateCreateManyParentInputEnvelopeInput = {
    data?: EmailTemplateCreateManyParentInputInput[];
    skipDuplicates?: t.Boolean;
};
export type EmailTemplateCreateManyParentInputInput = {
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId: t.String;
};
export type WhereInput_2AndWhereInput_1 = {
    id?: t.String;
    AND?: EmailTemplateWhereInputInput[];
    OR?: EmailTemplateWhereInputInput[];
    NOT?: EmailTemplateWhereInputInput[];
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: WithoutInput_18AndEmailEnvelopeWhereInputInput;
    parent?: WithoutInput_20AndEmailTemplateWhereInputInput;
    links?: EmailTemplateListRelationFilterInput;
    variables?: VariableDefinitionListRelationFilterInput;
    creator?: WithoutInput_22AndUserWhereInputInput;
};
export type EmailTemplateCreateOrConnectWithoutCreatorInputInput = {
    where: WhereInputAndWhereInput_1;
    create: WithoutInput_50AndEmailTemplateUncheckedCreateWithoutCreatorInputInput;
};
export type EmailTemplateCreateManyCreatorInputEnvelopeInput = {
    data?: EmailTemplateCreateManyCreatorInputInput[];
    skipDuplicates?: t.Boolean;
};
export type EmailTemplateCreateManyCreatorInputInput = {
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
};
export type UserCreateOrConnectWithoutEmailInputInput = {
    where: WhereInput_19AndWhereInput_20;
    create: WithoutInput_48AndUserUncheckedCreateWithoutEmailInputInput;
};
export type WhereInput_19AndWhereInput_20 = {
    id?: t.String;
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    organizationId?: t.String;
    emailTemplates?: EmailTemplateListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type SMTPConfigUncheckedCreateNestedOneWithoutEmailInputInput = {
    create?: ObjectAndSMTPConfigUncheckedCreateWithoutEmailInputInput;
    connectOrCreate?: SMTPConfigCreateOrConnectWithoutEmailInputInput;
    connect?: WhereInput_22AndWhereInput_23;
};
export type ObjectAndSMTPConfigUncheckedCreateWithoutEmailInputInput = {
    id?: t.String;
    host: t.String;
    port: t.Number;
    username: t.String;
    password: t.String;
    secure: t.Boolean;
};
export type SMTPConfigCreateOrConnectWithoutEmailInputInput = {
    where: WhereInput_22AndWhereInput_23;
    create: ObjectAndSMTPConfigUncheckedCreateWithoutEmailInputInput;
};
export type WhereInput_22AndWhereInput_23 = {
    id?: t.String;
    emailId?: t.String;
    AND?: SMTPConfigWhereInputInput[];
    OR?: SMTPConfigWhereInputInput[];
    NOT?: SMTPConfigWhereInputInput[];
    host?: t.String;
    port?: t.Number;
    username?: t.String;
    password?: t.String;
    secure?: t.Boolean;
    email?: WithoutInput_38AndEmailWhereInputInput;
};
export type OAuthConfigUncheckedCreateNestedOneWithoutEmailInputInput = {
    create?: ObjectAndOAuthConfigUncheckedCreateWithoutEmailInputInput;
    connectOrCreate?: OAuthConfigCreateOrConnectWithoutEmailInputInput;
    connect?: WhereInput_26AndWhereInput_27;
};
export type ObjectAndOAuthConfigUncheckedCreateWithoutEmailInputInput = {
    id?: t.String;
    provider: OAuthProviderInput;
    accessToken: t.String;
    accessTokenExpiresAt: t.String;
    refreshToken: t.String;
};
export type OAuthConfigCreateOrConnectWithoutEmailInputInput = {
    where: WhereInput_26AndWhereInput_27;
    create: ObjectAndOAuthConfigUncheckedCreateWithoutEmailInputInput;
};
export type WhereInput_26AndWhereInput_27 = {
    id?: t.String;
    emailId?: t.String;
    AND?: OAuthConfigWhereInputInput[];
    OR?: OAuthConfigWhereInputInput[];
    NOT?: OAuthConfigWhereInputInput[];
    provider?: EnumOAuthProviderFilterInput;
    accessToken?: t.String;
    accessTokenExpiresAt?: t.String;
    refreshToken?: t.String;
    email?: WithoutInput_38AndEmailWhereInputInput;
};
export type EmailCreateOrConnectWithoutOrganizationInputInput = {
    where: WhereInput_3AndWhereInput_4;
    create: WithoutInput_46AndEmailUncheckedCreateWithoutOrganizationInputInput;
};
export type WhereInput_3AndWhereInput_4 = {
    id?: t.String;
    userId?: t.String;
    AND?: EmailWhereInputInput[];
    OR?: EmailWhereInputInput[];
    NOT?: EmailWhereInputInput[];
    isEnabled?: t.Boolean;
    email?: t.String;
    smtpConfig?: WithoutInput_30AndSMTPConfigWhereInputInput;
    oauthConfig?: WithoutInput_32AndOAuthConfigWhereInputInput;
    user?: WithoutInput_34AndUserWhereInputInput;
    organization?: WithoutInput_36AndOrganizationWhereInputInput;
};
export type OAuthAppUncheckedCreateNestedManyWithoutOrganizationInputInput = {
    create?: ObjectAndOAuthAppUncheckedCreateWithoutOrganizationInputInput;
    connectOrCreate?: OAuthAppCreateOrConnectWithoutOrganizationInputInput[];
    createMany?: OAuthAppCreateManyOrganizationInputEnvelopeInput;
    connect?: WhereInput_32AndWhereInput_31;
};
export type ObjectAndOAuthAppUncheckedCreateWithoutOrganizationInputInput = {
    id?: t.String;
    clientId: t.String;
    clientSecret: t.String;
    type: OAuthProviderInput;
};
export type OAuthAppCreateOrConnectWithoutOrganizationInputInput = {
    where: WhereInput_30AndWhereInput_31;
    create: ObjectAndOAuthAppUncheckedCreateWithoutOrganizationInputInput;
};
export type WhereInput_30AndWhereInput_31 = {
    id?: t.String;
    organizationId_type?: OAuthAppOrganizationIdTypeCompoundUniqueInputInput;
    AND?: OAuthAppWhereInputInput[];
    OR?: OAuthAppWhereInputInput[];
    NOT?: OAuthAppWhereInputInput[];
    clientId?: t.String;
    clientSecret?: t.String;
    type?: t.String;
    organizationId?: t.String;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type OAuthAppOrganizationIdTypeCompoundUniqueInputInput = {
    organizationId: t.String;
    type: OAuthProviderInput;
};
export type OAuthAppCreateManyOrganizationInputEnvelopeInput = {
    data?: OAuthAppCreateManyOrganizationInputInput[];
    skipDuplicates?: t.Boolean;
};
export type OAuthAppCreateManyOrganizationInputInput = {
    id?: t.String;
    clientId: t.String;
    clientSecret: t.String;
    type: OAuthProviderInput;
};
export type WhereInput_32AndWhereInput_31 = {
    id?: t.String;
    organizationId_type?: OAuthAppOrganizationIdTypeCompoundUniqueInputInput;
    AND?: OAuthAppWhereInputInput[];
    OR?: OAuthAppWhereInputInput[];
    NOT?: OAuthAppWhereInputInput[];
    clientId?: t.String;
    clientSecret?: t.String;
    type?: t.String;
    organizationId?: t.String;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type OrganizationCreateOrConnectWithoutUsersInputInput = {
    where: WhereInput_7AndWhereInput_8;
    create: WithoutInput_44AndOrganizationUncheckedCreateWithoutUsersInputInput;
};
export type WhereInput_7AndWhereInput_8 = {
    id?: t.String;
    emailId?: t.String;
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    redirectUrl?: t.String;
    users?: UserListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    oAuthApps?: OAuthAppListRelationFilterInput;
};
export type EmailUncheckedCreateNestedOneWithoutUserInputInput = {
    create?: ObjectAndEmailUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: EmailCreateOrConnectWithoutUserInputInput;
    connect?: WhereInput_3AndWhereInput_4;
};
export type ObjectAndEmailUncheckedCreateWithoutUserInputInput = {
    id?: t.String;
    isEnabled?: t.Boolean;
    email: t.String;
    smtpConfig?: SMTPConfigUncheckedCreateNestedOneWithoutEmailInputInput;
    oauthConfig?: OAuthConfigUncheckedCreateNestedOneWithoutEmailInputInput;
    organization?: OrganizationUncheckedCreateNestedOneWithoutEmailInputInput;
};
export type OrganizationUncheckedCreateNestedOneWithoutEmailInputInput = {
    create?: ObjectAndOrganizationUncheckedCreateWithoutEmailInputInput;
    connectOrCreate?: OrganizationCreateOrConnectWithoutEmailInputInput;
    connect?: WhereInput_7AndWhereInput_8;
};
export type ObjectAndOrganizationUncheckedCreateWithoutEmailInputInput = {
    id: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInputInput;
    oAuthApps?: OAuthAppUncheckedCreateNestedManyWithoutOrganizationInputInput;
};
export type UserUncheckedCreateNestedManyWithoutOrganizationInputInput = {
    create?: ObjectAndUserUncheckedCreateWithoutOrganizationInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInputInput[];
    createMany?: UserCreateManyOrganizationInputEnvelopeInput;
    connect?: WhereInput_21AndWhereInput_20;
};
export type ObjectAndUserUncheckedCreateWithoutOrganizationInputInput = {
    id: t.String;
    emailTemplates?: EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputInput;
    email?: EmailUncheckedCreateNestedOneWithoutUserInputInput;
};
export type UserCreateOrConnectWithoutOrganizationInputInput = {
    where: WhereInput_19AndWhereInput_20;
    create: ObjectAndUserUncheckedCreateWithoutOrganizationInputInput;
};
export type UserCreateManyOrganizationInputEnvelopeInput = {
    data?: UserCreateManyOrganizationInputInput[];
    skipDuplicates?: t.Boolean;
};
export type UserCreateManyOrganizationInputInput = {
    id: t.String;
};
export type WhereInput_21AndWhereInput_20 = {
    id?: t.String;
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    organizationId?: t.String;
    emailTemplates?: EmailTemplateListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type OrganizationCreateOrConnectWithoutEmailInputInput = {
    where: WhereInput_7AndWhereInput_8;
    create: ObjectAndOrganizationUncheckedCreateWithoutEmailInputInput;
};
export type EmailCreateOrConnectWithoutUserInputInput = {
    where: WhereInput_3AndWhereInput_4;
    create: ObjectAndEmailUncheckedCreateWithoutUserInputInput;
};
export type UserCreateOrConnectWithoutEmailTemplatesInputInput = {
    where: WhereInput_19AndWhereInput_20;
    create: WithoutInput_42AndUserUncheckedCreateWithoutEmailTemplatesInputInput;
};
export type EmailTemplateCreateOrConnectWithoutLinksInputInput = {
    where: WhereInputAndWhereInput_1;
    create: WithoutInput_40AndEmailTemplateUncheckedCreateWithoutLinksInputInput;
};
export type WithoutInputAndEmailTemplateUncheckedUpdateInputInput = {
    parent?: EmailTemplateUpdateOneWithoutLinksNestedInputInput;
    creator?: UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedUpdateOneWithoutEmailTemplateNestedInputInput;
    links?: EmailTemplateUncheckedUpdateManyWithoutParentNestedInputInput;
    variables?: VariableDefinitionUncheckedUpdateManyWithoutEmailTemplateNestedInputInput;
};
export type EmailTemplateUpdateOneWithoutLinksNestedInputInput = {
    create?: WithoutInput_40AndEmailTemplateUncheckedCreateWithoutLinksInputInput;
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutLinksInputInput;
    upsert?: EmailTemplateUpsertWithoutLinksInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInputAndWhereInput_1;
    update?: WithoutInput_54AndEmailTemplateUncheckedUpdateWithoutLinksInputInput;
};
export type EmailTemplateUpsertWithoutLinksInputInput = {
    update: WithoutInput_60AndEmailTemplateUncheckedUpdateWithoutLinksInputInput;
    create: WithoutInput_40AndEmailTemplateUncheckedCreateWithoutLinksInputInput;
    where?: EmailTemplateWhereInputInput;
};
export type WithoutInput_60AndEmailTemplateUncheckedUpdateWithoutLinksInputInput = {
    parent?: EmailTemplateUpdateOneWithoutLinksNestedInputInput;
    creator?: UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedUpdateOneWithoutEmailTemplateNestedInputInput;
    variables?: VariableDefinitionUncheckedUpdateManyWithoutEmailTemplateNestedInputInput;
};
export type UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput = {
    create?: WithoutInput_42AndUserUncheckedCreateWithoutEmailTemplatesInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutEmailTemplatesInputInput;
    upsert?: UserUpsertWithoutEmailTemplatesInputInput;
    connect?: WhereInput_19AndWhereInput_20;
    update?: WithoutInput_62AndUserUncheckedUpdateWithoutEmailTemplatesInputInput;
};
export type UserUpsertWithoutEmailTemplatesInputInput = {
    update: WithoutInput_68AndUserUncheckedUpdateWithoutEmailTemplatesInputInput;
    create: WithoutInput_42AndUserUncheckedCreateWithoutEmailTemplatesInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_68AndUserUncheckedUpdateWithoutEmailTemplatesInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    email?: EmailUncheckedUpdateOneWithoutUserNestedInputInput;
};
export type OrganizationUpdateOneRequiredWithoutUsersNestedInputInput = {
    create?: WithoutInput_44AndOrganizationUncheckedCreateWithoutUsersInputInput;
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInputInput;
    upsert?: OrganizationUpsertWithoutUsersInputInput;
    connect?: WhereInput_7AndWhereInput_8;
    update?: WithoutInput_70AndOrganizationUncheckedUpdateWithoutUsersInputInput;
};
export type OrganizationUpsertWithoutUsersInputInput = {
    update: WithoutInput_76AndOrganizationUncheckedUpdateWithoutUsersInputInput;
    create: WithoutInput_44AndOrganizationUncheckedCreateWithoutUsersInputInput;
    where?: OrganizationWhereInputInput;
};
export type WithoutInput_76AndOrganizationUncheckedUpdateWithoutUsersInputInput = {
    email?: EmailUpdateOneWithoutOrganizationNestedInputInput;
    id?: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    oAuthApps?: OAuthAppUncheckedUpdateManyWithoutOrganizationNestedInputInput;
};
export type EmailUpdateOneWithoutOrganizationNestedInputInput = {
    create?: WithoutInput_46AndEmailUncheckedCreateWithoutOrganizationInputInput;
    connectOrCreate?: EmailCreateOrConnectWithoutOrganizationInputInput;
    upsert?: EmailUpsertWithoutOrganizationInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_3AndWhereInput_4;
    update?: WithoutInput_78AndEmailUncheckedUpdateWithoutOrganizationInputInput;
};
export type EmailUpsertWithoutOrganizationInputInput = {
    update: WithoutInput_84AndEmailUncheckedUpdateWithoutOrganizationInputInput;
    create: WithoutInput_46AndEmailUncheckedCreateWithoutOrganizationInputInput;
    where?: EmailWhereInputInput;
};
export type WithoutInput_84AndEmailUncheckedUpdateWithoutOrganizationInputInput = {
    user?: UserUpdateOneWithoutEmailNestedInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    smtpConfig?: SMTPConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    oauthConfig?: OAuthConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type UserUpdateOneWithoutEmailNestedInputInput = {
    create?: WithoutInput_48AndUserUncheckedCreateWithoutEmailInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutEmailInputInput;
    upsert?: UserUpsertWithoutEmailInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_19AndWhereInput_20;
    update?: WithoutInput_86AndUserUncheckedUpdateWithoutEmailInputInput;
};
export type UserUpsertWithoutEmailInputInput = {
    update: WithoutInput_92AndUserUncheckedUpdateWithoutEmailInputInput;
    create: WithoutInput_48AndUserUncheckedCreateWithoutEmailInputInput;
    where?: UserWhereInputInput;
};
export type WithoutInput_92AndUserUncheckedUpdateWithoutEmailInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    emailTemplates?: EmailTemplateUncheckedUpdateManyWithoutCreatorNestedInputInput;
};
export type EmailTemplateUncheckedUpdateManyWithoutCreatorNestedInputInput = {
    create?: WithoutInput_50AndEmailTemplateUncheckedCreateWithoutCreatorInputInput;
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutCreatorInputInput[];
    upsert?: EmailTemplateUpsertWithWhereUniqueWithoutCreatorInputInput[];
    createMany?: EmailTemplateCreateManyCreatorInputEnvelopeInput;
    set?: WhereInput_2AndWhereInput_1;
    disconnect?: WhereInput_2AndWhereInput_1;
    delete?: WhereInput_2AndWhereInput_1;
    connect?: WhereInput_2AndWhereInput_1;
    update?: EmailTemplateUpdateWithWhereUniqueWithoutCreatorInputInput[];
    updateMany?: EmailTemplateUpdateManyWithWhereWithoutCreatorInputInput[];
    deleteMany?: EmailTemplateScalarWhereInputInput[];
};
export type EmailTemplateUpsertWithWhereUniqueWithoutCreatorInputInput = {
    where: WhereInputAndWhereInput_1;
    update: WithoutInput_94AndEmailTemplateUncheckedUpdateWithoutCreatorInputInput;
    create: WithoutInput_50AndEmailTemplateUncheckedCreateWithoutCreatorInputInput;
};
export type WithoutInput_94AndEmailTemplateUncheckedUpdateWithoutCreatorInputInput = {
    parent?: EmailTemplateUpdateOneWithoutLinksNestedInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    envelope?: EmailEnvelopeUncheckedUpdateOneWithoutEmailTemplateNestedInputInput;
    links?: EmailTemplateUncheckedUpdateManyWithoutParentNestedInputInput;
    variables?: VariableDefinitionUncheckedUpdateManyWithoutEmailTemplateNestedInputInput;
};
export type EmailEnvelopeUncheckedUpdateOneWithoutEmailTemplateNestedInputInput = {
    create?: ObjectAndEmailEnvelopeUncheckedCreateWithoutEmailTemplateInputInput;
    connectOrCreate?: EmailEnvelopeCreateOrConnectWithoutEmailTemplateInputInput;
    upsert?: EmailEnvelopeUpsertWithoutEmailTemplateInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_11AndWhereInput_12;
    update?: WithoutInput_96AndEmailEnvelopeUncheckedUpdateWithoutEmailTemplateInputInput;
};
export type EmailEnvelopeUpsertWithoutEmailTemplateInputInput = {
    update: ObjectAndEmailEnvelopeUncheckedUpdateWithoutEmailTemplateInputInput;
    create: ObjectAndEmailEnvelopeUncheckedCreateWithoutEmailTemplateInputInput;
    where?: EmailEnvelopeWhereInputInput;
};
export type ObjectAndEmailEnvelopeUncheckedUpdateWithoutEmailTemplateInputInput = {
    id?: t.String;
    subject?: t.String;
    to?: t.String[];
    replyTo?: t.String;
};
export type WithoutInput_96AndEmailEnvelopeUncheckedUpdateWithoutEmailTemplateInputInput = {
    where?: EmailEnvelopeWhereInputInput;
    data?: ObjectAndEmailEnvelopeUncheckedUpdateWithoutEmailTemplateInputInput;
    id?: t.String;
    subject?: t.String;
    to?: t.String[];
    replyTo?: t.String;
};
export type EmailTemplateUncheckedUpdateManyWithoutParentNestedInputInput = {
    create?: WithoutInput_52AndEmailTemplateUncheckedCreateWithoutParentInputInput;
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutParentInputInput[];
    upsert?: EmailTemplateUpsertWithWhereUniqueWithoutParentInputInput[];
    createMany?: EmailTemplateCreateManyParentInputEnvelopeInput;
    set?: WhereInput_2AndWhereInput_1;
    disconnect?: WhereInput_2AndWhereInput_1;
    delete?: WhereInput_2AndWhereInput_1;
    connect?: WhereInput_2AndWhereInput_1;
    update?: EmailTemplateUpdateWithWhereUniqueWithoutParentInputInput[];
    updateMany?: EmailTemplateUpdateManyWithWhereWithoutParentInputInput[];
    deleteMany?: EmailTemplateScalarWhereInputInput[];
};
export type EmailTemplateUpsertWithWhereUniqueWithoutParentInputInput = {
    where: WhereInputAndWhereInput_1;
    update: WithoutInput_100AndEmailTemplateUncheckedUpdateWithoutParentInputInput;
    create: WithoutInput_52AndEmailTemplateUncheckedCreateWithoutParentInputInput;
};
export type WithoutInput_100AndEmailTemplateUncheckedUpdateWithoutParentInputInput = {
    creator?: UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedUpdateOneWithoutEmailTemplateNestedInputInput;
    links?: EmailTemplateUncheckedUpdateManyWithoutParentNestedInputInput;
    variables?: VariableDefinitionUncheckedUpdateManyWithoutEmailTemplateNestedInputInput;
};
export type VariableDefinitionUncheckedUpdateManyWithoutEmailTemplateNestedInputInput = {
    create?: ObjectAndVariableDefinitionUncheckedCreateWithoutEmailTemplateInputInput;
    connectOrCreate?: VariableDefinitionCreateOrConnectWithoutEmailTemplateInputInput[];
    upsert?: VariableDefinitionUpsertWithWhereUniqueWithoutEmailTemplateInputInput[];
    createMany?: VariableDefinitionCreateManyEmailTemplateInputEnvelopeInput;
    set?: WhereInput_17AndWhereInput_16;
    disconnect?: WhereInput_17AndWhereInput_16;
    delete?: WhereInput_17AndWhereInput_16;
    connect?: WhereInput_17AndWhereInput_16;
    update?: VariableDefinitionUpdateWithWhereUniqueWithoutEmailTemplateInputInput[];
    updateMany?: VariableDefinitionUpdateManyWithWhereWithoutEmailTemplateInputInput[];
    deleteMany?: VariableDefinitionScalarWhereInputInput[];
};
export type VariableDefinitionUpsertWithWhereUniqueWithoutEmailTemplateInputInput = {
    where: WhereInput_15AndWhereInput_16;
    update: ObjectAndVariableDefinitionUncheckedUpdateWithoutEmailTemplateInputInput;
    create: ObjectAndVariableDefinitionUncheckedCreateWithoutEmailTemplateInputInput;
};
export type ObjectAndVariableDefinitionUncheckedUpdateWithoutEmailTemplateInputInput = {
    id?: t.String;
    name?: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
};
export type VariableDefinitionUpdateWithWhereUniqueWithoutEmailTemplateInputInput = {
    where: WhereInput_15AndWhereInput_16;
    data: ObjectAndVariableDefinitionUncheckedUpdateWithoutEmailTemplateInputInput;
};
export type VariableDefinitionUpdateManyWithWhereWithoutEmailTemplateInputInput = {
    where: VariableDefinitionScalarWhereInputInput;
    data: ObjectAndVariableDefinitionUncheckedUpdateManyWithoutEmailTemplateInputInput;
};
export type VariableDefinitionScalarWhereInputInput = {
    AND?: VariableDefinitionScalarWhereInputInput[];
    OR?: VariableDefinitionScalarWhereInputInput[];
    NOT?: VariableDefinitionScalarWhereInputInput[];
    id?: t.String;
    name?: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
    emailTemplateId?: t.String;
};
export type ObjectAndVariableDefinitionUncheckedUpdateManyWithoutEmailTemplateInputInput = {
    id?: t.String;
    name?: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
};
export type EmailTemplateUpdateWithWhereUniqueWithoutParentInputInput = {
    where: WhereInputAndWhereInput_1;
    data: WithoutInput_100AndEmailTemplateUncheckedUpdateWithoutParentInputInput;
};
export type EmailTemplateUpdateManyWithWhereWithoutParentInputInput = {
    where: EmailTemplateScalarWhereInputInput;
    data: ObjectAndEmailTemplateUncheckedUpdateManyWithoutParentInputInput;
};
export type EmailTemplateScalarWhereInputInput = {
    AND?: EmailTemplateScalarWhereInputInput[];
    OR?: EmailTemplateScalarWhereInputInput[];
    NOT?: EmailTemplateScalarWhereInputInput[];
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
};
export type ObjectAndEmailTemplateUncheckedUpdateManyWithoutParentInputInput = {
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
};
export type EmailTemplateUpdateWithWhereUniqueWithoutCreatorInputInput = {
    where: WhereInputAndWhereInput_1;
    data: WithoutInput_94AndEmailTemplateUncheckedUpdateWithoutCreatorInputInput;
};
export type EmailTemplateUpdateManyWithWhereWithoutCreatorInputInput = {
    where: EmailTemplateScalarWhereInputInput;
    data: ObjectAndEmailTemplateUncheckedUpdateManyWithoutCreatorInputInput;
};
export type ObjectAndEmailTemplateUncheckedUpdateManyWithoutCreatorInputInput = {
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
};
export type WithoutInput_86AndUserUncheckedUpdateWithoutEmailInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_92AndUserUncheckedUpdateWithoutEmailInputInput;
    id?: t.String;
    organizationId?: t.String;
    emailTemplates?: EmailTemplateUncheckedUpdateManyWithoutCreatorNestedInputInput;
};
export type SMTPConfigUncheckedUpdateOneWithoutEmailNestedInputInput = {
    create?: ObjectAndSMTPConfigUncheckedCreateWithoutEmailInputInput;
    connectOrCreate?: SMTPConfigCreateOrConnectWithoutEmailInputInput;
    upsert?: SMTPConfigUpsertWithoutEmailInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_22AndWhereInput_23;
    update?: WithoutInput_104AndSMTPConfigUncheckedUpdateWithoutEmailInputInput;
};
export type SMTPConfigUpsertWithoutEmailInputInput = {
    update: ObjectAndSMTPConfigUncheckedUpdateWithoutEmailInputInput;
    create: ObjectAndSMTPConfigUncheckedCreateWithoutEmailInputInput;
    where?: SMTPConfigWhereInputInput;
};
export type ObjectAndSMTPConfigUncheckedUpdateWithoutEmailInputInput = {
    id?: t.String;
    host?: t.String;
    port?: t.Number;
    username?: t.String;
    password?: t.String;
    secure?: t.Boolean;
};
export type WithoutInput_104AndSMTPConfigUncheckedUpdateWithoutEmailInputInput = {
    where?: SMTPConfigWhereInputInput;
    data?: ObjectAndSMTPConfigUncheckedUpdateWithoutEmailInputInput;
    id?: t.String;
    host?: t.String;
    port?: t.Number;
    username?: t.String;
    password?: t.String;
    secure?: t.Boolean;
};
export type OAuthConfigUncheckedUpdateOneWithoutEmailNestedInputInput = {
    create?: ObjectAndOAuthConfigUncheckedCreateWithoutEmailInputInput;
    connectOrCreate?: OAuthConfigCreateOrConnectWithoutEmailInputInput;
    upsert?: OAuthConfigUpsertWithoutEmailInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_26AndWhereInput_27;
    update?: WithoutInput_108AndOAuthConfigUncheckedUpdateWithoutEmailInputInput;
};
export type OAuthConfigUpsertWithoutEmailInputInput = {
    update: ObjectAndOAuthConfigUncheckedUpdateWithoutEmailInputInput;
    create: ObjectAndOAuthConfigUncheckedCreateWithoutEmailInputInput;
    where?: OAuthConfigWhereInputInput;
};
export type ObjectAndOAuthConfigUncheckedUpdateWithoutEmailInputInput = {
    id?: t.String;
    provider?: t.String;
    accessToken?: t.String;
    accessTokenExpiresAt?: t.String;
    refreshToken?: t.String;
};
export type WithoutInput_108AndOAuthConfigUncheckedUpdateWithoutEmailInputInput = {
    where?: OAuthConfigWhereInputInput;
    data?: ObjectAndOAuthConfigUncheckedUpdateWithoutEmailInputInput;
    id?: t.String;
    provider?: t.String;
    accessToken?: t.String;
    accessTokenExpiresAt?: t.String;
    refreshToken?: t.String;
};
export type WithoutInput_78AndEmailUncheckedUpdateWithoutOrganizationInputInput = {
    where?: EmailWhereInputInput;
    user?: UserUpdateOneWithoutEmailNestedInputInput;
    data?: WithoutInput_84AndEmailUncheckedUpdateWithoutOrganizationInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    smtpConfig?: SMTPConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    oauthConfig?: OAuthConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type OAuthAppUncheckedUpdateManyWithoutOrganizationNestedInputInput = {
    create?: ObjectAndOAuthAppUncheckedCreateWithoutOrganizationInputInput;
    connectOrCreate?: OAuthAppCreateOrConnectWithoutOrganizationInputInput[];
    upsert?: OAuthAppUpsertWithWhereUniqueWithoutOrganizationInputInput[];
    createMany?: OAuthAppCreateManyOrganizationInputEnvelopeInput;
    set?: WhereInput_32AndWhereInput_31;
    disconnect?: WhereInput_32AndWhereInput_31;
    delete?: WhereInput_32AndWhereInput_31;
    connect?: WhereInput_32AndWhereInput_31;
    update?: OAuthAppUpdateWithWhereUniqueWithoutOrganizationInputInput[];
    updateMany?: OAuthAppUpdateManyWithWhereWithoutOrganizationInputInput[];
    deleteMany?: OAuthAppScalarWhereInputInput[];
};
export type OAuthAppUpsertWithWhereUniqueWithoutOrganizationInputInput = {
    where: WhereInput_30AndWhereInput_31;
    update: ObjectAndOAuthAppUncheckedUpdateWithoutOrganizationInputInput;
    create: ObjectAndOAuthAppUncheckedCreateWithoutOrganizationInputInput;
};
export type ObjectAndOAuthAppUncheckedUpdateWithoutOrganizationInputInput = {
    id?: t.String;
    clientId?: t.String;
    clientSecret?: t.String;
    type?: t.String;
};
export type OAuthAppUpdateWithWhereUniqueWithoutOrganizationInputInput = {
    where: WhereInput_30AndWhereInput_31;
    data: ObjectAndOAuthAppUncheckedUpdateWithoutOrganizationInputInput;
};
export type OAuthAppUpdateManyWithWhereWithoutOrganizationInputInput = {
    where: OAuthAppScalarWhereInputInput;
    data: ObjectAndOAuthAppUncheckedUpdateManyWithoutOrganizationInputInput;
};
export type OAuthAppScalarWhereInputInput = {
    AND?: OAuthAppScalarWhereInputInput[];
    OR?: OAuthAppScalarWhereInputInput[];
    NOT?: OAuthAppScalarWhereInputInput[];
    id?: t.String;
    clientId?: t.String;
    clientSecret?: t.String;
    type?: t.String;
    organizationId?: t.String;
};
export type ObjectAndOAuthAppUncheckedUpdateManyWithoutOrganizationInputInput = {
    id?: t.String;
    clientId?: t.String;
    clientSecret?: t.String;
    type?: t.String;
};
export type WithoutInput_70AndOrganizationUncheckedUpdateWithoutUsersInputInput = {
    where?: OrganizationWhereInputInput;
    email?: EmailUpdateOneWithoutOrganizationNestedInputInput;
    data?: WithoutInput_76AndOrganizationUncheckedUpdateWithoutUsersInputInput;
    id?: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    oAuthApps?: OAuthAppUncheckedUpdateManyWithoutOrganizationNestedInputInput;
};
export type EmailUncheckedUpdateOneWithoutUserNestedInputInput = {
    create?: ObjectAndEmailUncheckedCreateWithoutUserInputInput;
    connectOrCreate?: EmailCreateOrConnectWithoutUserInputInput;
    upsert?: EmailUpsertWithoutUserInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_3AndWhereInput_4;
    update?: WithoutInput_112AndEmailUncheckedUpdateWithoutUserInputInput;
};
export type EmailUpsertWithoutUserInputInput = {
    update: ObjectAndEmailUncheckedUpdateWithoutUserInputInput;
    create: ObjectAndEmailUncheckedCreateWithoutUserInputInput;
    where?: EmailWhereInputInput;
};
export type ObjectAndEmailUncheckedUpdateWithoutUserInputInput = {
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    smtpConfig?: SMTPConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    oauthConfig?: OAuthConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    organization?: OrganizationUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type OrganizationUncheckedUpdateOneWithoutEmailNestedInputInput = {
    create?: ObjectAndOrganizationUncheckedCreateWithoutEmailInputInput;
    connectOrCreate?: OrganizationCreateOrConnectWithoutEmailInputInput;
    upsert?: OrganizationUpsertWithoutEmailInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInput_7AndWhereInput_8;
    update?: WithoutInput_116AndOrganizationUncheckedUpdateWithoutEmailInputInput;
};
export type OrganizationUpsertWithoutEmailInputInput = {
    update: ObjectAndOrganizationUncheckedUpdateWithoutEmailInputInput;
    create: ObjectAndOrganizationUncheckedCreateWithoutEmailInputInput;
    where?: OrganizationWhereInputInput;
};
export type ObjectAndOrganizationUncheckedUpdateWithoutEmailInputInput = {
    id?: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInputInput;
    oAuthApps?: OAuthAppUncheckedUpdateManyWithoutOrganizationNestedInputInput;
};
export type UserUncheckedUpdateManyWithoutOrganizationNestedInputInput = {
    create?: ObjectAndUserUncheckedCreateWithoutOrganizationInputInput;
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInputInput[];
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInputInput[];
    createMany?: UserCreateManyOrganizationInputEnvelopeInput;
    set?: WhereInput_21AndWhereInput_20;
    disconnect?: WhereInput_21AndWhereInput_20;
    delete?: WhereInput_21AndWhereInput_20;
    connect?: WhereInput_21AndWhereInput_20;
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInputInput[];
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInputInput[];
    deleteMany?: UserScalarWhereInputInput[];
};
export type UserUpsertWithWhereUniqueWithoutOrganizationInputInput = {
    where: WhereInput_19AndWhereInput_20;
    update: ObjectAndUserUncheckedUpdateWithoutOrganizationInputInput;
    create: ObjectAndUserUncheckedCreateWithoutOrganizationInputInput;
};
export type ObjectAndUserUncheckedUpdateWithoutOrganizationInputInput = {
    id?: t.String;
    emailTemplates?: EmailTemplateUncheckedUpdateManyWithoutCreatorNestedInputInput;
    email?: EmailUncheckedUpdateOneWithoutUserNestedInputInput;
};
export type UserUpdateWithWhereUniqueWithoutOrganizationInputInput = {
    where: WhereInput_19AndWhereInput_20;
    data: ObjectAndUserUncheckedUpdateWithoutOrganizationInputInput;
};
export type UserUpdateManyWithWhereWithoutOrganizationInputInput = {
    where: UserScalarWhereInputInput;
    data: ObjectAndUserUncheckedUpdateManyWithoutOrganizationInputInput;
};
export type UserScalarWhereInputInput = {
    AND?: UserScalarWhereInputInput[];
    OR?: UserScalarWhereInputInput[];
    NOT?: UserScalarWhereInputInput[];
    id?: t.String;
    organizationId?: t.String;
};
export type ObjectAndUserUncheckedUpdateManyWithoutOrganizationInputInput = {
    id?: t.String;
};
export type WithoutInput_116AndOrganizationUncheckedUpdateWithoutEmailInputInput = {
    where?: OrganizationWhereInputInput;
    data?: ObjectAndOrganizationUncheckedUpdateWithoutEmailInputInput;
    id?: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInputInput;
    oAuthApps?: OAuthAppUncheckedUpdateManyWithoutOrganizationNestedInputInput;
};
export type WithoutInput_112AndEmailUncheckedUpdateWithoutUserInputInput = {
    where?: EmailWhereInputInput;
    data?: ObjectAndEmailUncheckedUpdateWithoutUserInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    smtpConfig?: SMTPConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    oauthConfig?: OAuthConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    organization?: OrganizationUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type WithoutInput_62AndUserUncheckedUpdateWithoutEmailTemplatesInputInput = {
    where?: UserWhereInputInput;
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    data?: WithoutInput_68AndUserUncheckedUpdateWithoutEmailTemplatesInputInput;
    id?: t.String;
    organizationId?: t.String;
    email?: EmailUncheckedUpdateOneWithoutUserNestedInputInput;
};
export type WithoutInput_54AndEmailTemplateUncheckedUpdateWithoutLinksInputInput = {
    where?: EmailTemplateWhereInputInput;
    parent?: EmailTemplateUpdateOneWithoutLinksNestedInputInput;
    creator?: UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput;
    data?: WithoutInput_60AndEmailTemplateUncheckedUpdateWithoutLinksInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedUpdateOneWithoutEmailTemplateNestedInputInput;
    variables?: VariableDefinitionUncheckedUpdateManyWithoutEmailTemplateNestedInputInput;
};
export type OmitInput_9 = {
    AND?: EmailTemplateWhereInputInput[];
    OR?: EmailTemplateWhereInputInput[];
    NOT?: EmailTemplateWhereInputInput[];
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: WithoutInput_18AndEmailEnvelopeWhereInputInput;
    parent?: WithoutInput_20AndEmailTemplateWhereInputInput;
    links?: EmailTemplateListRelationFilterInput;
    variables?: VariableDefinitionListRelationFilterInput;
    creator?: WithoutInput_22AndUserWhereInputInput;
};
export type OmitInput_6 = {
    id?: t.String;
    subject?: t.String;
    to?: t.String[];
    replyTo?: t.String;
};
export type WithoutInput_6AndEmailEnvelopeUncheckedUpdateInputInput = {
    emailTemplate?: EmailTemplateUpdateOneRequiredWithoutEnvelopeNestedInputInput;
    id?: t.String;
    subject?: t.String;
    to?: t.String[];
    replyTo?: t.String;
    emailTemplateId?: t.String;
};
export type EmailTemplateUpdateOneRequiredWithoutEnvelopeNestedInputInput = {
    create?: WithoutInput_120AndEmailTemplateUncheckedCreateWithoutEnvelopeInputInput;
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutEnvelopeInputInput;
    upsert?: EmailTemplateUpsertWithoutEnvelopeInputInput;
    connect?: WhereInputAndWhereInput_1;
    update?: WithoutInput_122AndEmailTemplateUncheckedUpdateWithoutEnvelopeInputInput;
};
export type WithoutInput_120AndEmailTemplateUncheckedCreateWithoutEnvelopeInputInput = {
    parent?: EmailTemplateCreateNestedOneWithoutLinksInputInput;
    creator?: UserCreateNestedOneWithoutEmailTemplatesInputInput;
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    links?: EmailTemplateUncheckedCreateNestedManyWithoutParentInputInput;
    variables?: VariableDefinitionUncheckedCreateNestedManyWithoutEmailTemplateInputInput;
};
export type EmailTemplateCreateOrConnectWithoutEnvelopeInputInput = {
    where: WhereInputAndWhereInput_1;
    create: WithoutInput_120AndEmailTemplateUncheckedCreateWithoutEnvelopeInputInput;
};
export type EmailTemplateUpsertWithoutEnvelopeInputInput = {
    update: WithoutInput_128AndEmailTemplateUncheckedUpdateWithoutEnvelopeInputInput;
    create: WithoutInput_120AndEmailTemplateUncheckedCreateWithoutEnvelopeInputInput;
    where?: EmailTemplateWhereInputInput;
};
export type WithoutInput_128AndEmailTemplateUncheckedUpdateWithoutEnvelopeInputInput = {
    parent?: EmailTemplateUpdateOneWithoutLinksNestedInputInput;
    creator?: UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    links?: EmailTemplateUncheckedUpdateManyWithoutParentNestedInputInput;
    variables?: VariableDefinitionUncheckedUpdateManyWithoutEmailTemplateNestedInputInput;
};
export type WithoutInput_122AndEmailTemplateUncheckedUpdateWithoutEnvelopeInputInput = {
    where?: EmailTemplateWhereInputInput;
    parent?: EmailTemplateUpdateOneWithoutLinksNestedInputInput;
    creator?: UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput;
    data?: WithoutInput_128AndEmailTemplateUncheckedUpdateWithoutEnvelopeInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    links?: EmailTemplateUncheckedUpdateManyWithoutParentNestedInputInput;
    variables?: VariableDefinitionUncheckedUpdateManyWithoutEmailTemplateNestedInputInput;
};
export type OmitInput_7 = {
    AND?: EmailEnvelopeWhereInputInput[];
    OR?: EmailEnvelopeWhereInputInput[];
    NOT?: EmailEnvelopeWhereInputInput[];
    id?: t.String;
    subject?: t.String;
    to?: StringNullableListFilterInput;
    replyTo?: t.String;
};
export type OmitInput_10 = {
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedCreateNestedOneWithoutEmailTemplateInputInput;
    links?: EmailTemplateUncheckedCreateNestedManyWithoutParentInputInput;
    variables?: VariableDefinitionUncheckedCreateNestedManyWithoutEmailTemplateInputInput;
    creator?: UserCreateNestedOneWithoutEmailTemplatesInputInput;
};
export type OmitInput_11 = {
    AND?: EmailTemplateWhereInputInput[];
    OR?: EmailTemplateWhereInputInput[];
    NOT?: EmailTemplateWhereInputInput[];
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: WithoutInput_18AndEmailEnvelopeWhereInputInput;
    links?: EmailTemplateListRelationFilterInput;
    variables?: VariableDefinitionListRelationFilterInput;
    creator?: WithoutInput_22AndUserWhereInputInput;
};
export type VariableDefinitionOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    name?: SortOrderInput;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.String;
    isConstant?: t.String;
    emailTemplateId?: t.String;
    emailTemplate?: EmailTemplateOrderByWithRelationInputInput;
};
export type OmitInput_12 = {
    id?: t.String;
    description?: t.String;
    name: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
};
export type WithoutInput_8AndVariableDefinitionUncheckedUpdateInputInput = {
    emailTemplate?: EmailTemplateUpdateOneWithoutVariablesNestedInputInput;
    id?: t.String;
    name?: t.String;
    description?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
    emailTemplateId?: t.String;
};
export type EmailTemplateUpdateOneWithoutVariablesNestedInputInput = {
    create?: WithoutInput_130AndEmailTemplateUncheckedCreateWithoutVariablesInputInput;
    connectOrCreate?: EmailTemplateCreateOrConnectWithoutVariablesInputInput;
    upsert?: EmailTemplateUpsertWithoutVariablesInputInput;
    disconnect?: t.Boolean;
    delete?: t.Boolean;
    connect?: WhereInputAndWhereInput_1;
    update?: WithoutInput_132AndEmailTemplateUncheckedUpdateWithoutVariablesInputInput;
};
export type WithoutInput_130AndEmailTemplateUncheckedCreateWithoutVariablesInputInput = {
    parent?: EmailTemplateCreateNestedOneWithoutLinksInputInput;
    creator?: UserCreateNestedOneWithoutEmailTemplatesInputInput;
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedCreateNestedOneWithoutEmailTemplateInputInput;
    links?: EmailTemplateUncheckedCreateNestedManyWithoutParentInputInput;
};
export type EmailTemplateCreateOrConnectWithoutVariablesInputInput = {
    where: WhereInputAndWhereInput_1;
    create: WithoutInput_130AndEmailTemplateUncheckedCreateWithoutVariablesInputInput;
};
export type EmailTemplateUpsertWithoutVariablesInputInput = {
    update: WithoutInput_138AndEmailTemplateUncheckedUpdateWithoutVariablesInputInput;
    create: WithoutInput_130AndEmailTemplateUncheckedCreateWithoutVariablesInputInput;
    where?: EmailTemplateWhereInputInput;
};
export type WithoutInput_138AndEmailTemplateUncheckedUpdateWithoutVariablesInputInput = {
    parent?: EmailTemplateUpdateOneWithoutLinksNestedInputInput;
    creator?: UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedUpdateOneWithoutEmailTemplateNestedInputInput;
    links?: EmailTemplateUncheckedUpdateManyWithoutParentNestedInputInput;
};
export type WithoutInput_132AndEmailTemplateUncheckedUpdateWithoutVariablesInputInput = {
    where?: EmailTemplateWhereInputInput;
    parent?: EmailTemplateUpdateOneWithoutLinksNestedInputInput;
    creator?: UserUpdateOneRequiredWithoutEmailTemplatesNestedInputInput;
    data?: WithoutInput_138AndEmailTemplateUncheckedUpdateWithoutVariablesInputInput;
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    creatorId?: t.String;
    envelope?: EmailEnvelopeUncheckedUpdateOneWithoutEmailTemplateNestedInputInput;
    links?: EmailTemplateUncheckedUpdateManyWithoutParentNestedInputInput;
};
export type OmitInput_13 = {
    AND?: VariableDefinitionWhereInputInput[];
    OR?: VariableDefinitionWhereInputInput[];
    NOT?: VariableDefinitionWhereInputInput[];
    id?: t.String;
    description?: t.String;
    name?: t.String;
    defaultValue?: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
    emailTemplateId_name?: VariableDefinitionEmailTemplateIdNameCompoundUniqueInputInput;
};
export type OmitInput_14 = {
    organizationId?: t.String;
    emailTemplates?: EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputInput;
    email?: EmailUncheckedCreateNestedOneWithoutUserInputInput;
    organization?: OrganizationCreateNestedOneWithoutUsersInputInput;
};
export type WithoutInput_10AndUserUncheckedUpdateInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInputInput;
    id?: t.String;
    organizationId?: t.String;
    emailTemplates?: EmailTemplateUncheckedUpdateManyWithoutCreatorNestedInputInput;
    email?: EmailUncheckedUpdateOneWithoutUserNestedInputInput;
};
export type OmitInput_15 = {
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    organizationId?: t.String;
    emailTemplates?: EmailTemplateListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
    organization?: WithoutInput_28AndOrganizationWhereInputInput;
};
export type OmitInput = {
    id?: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    envelope?: EmailEnvelopeUncheckedCreateNestedOneWithoutEmailTemplateInputInput;
    parent?: EmailTemplateCreateNestedOneWithoutLinksInputInput;
    links?: EmailTemplateUncheckedCreateNestedManyWithoutParentInputInput;
    variables?: VariableDefinitionUncheckedCreateNestedManyWithoutEmailTemplateInputInput;
};
export type OmitInput_1 = {
    AND?: EmailTemplateWhereInputInput[];
    OR?: EmailTemplateWhereInputInput[];
    NOT?: EmailTemplateWhereInputInput[];
    id?: t.String;
    description?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    transformer?: t.String;
    envelopeId?: t.String;
    parentId?: t.String;
    createdAt?: t.String;
    updatedAt?: t.String;
    envelope?: WithoutInput_18AndEmailEnvelopeWhereInputInput;
    parent?: WithoutInput_20AndEmailTemplateWhereInputInput;
    links?: EmailTemplateListRelationFilterInput;
    variables?: VariableDefinitionListRelationFilterInput;
};
export type OmitInput_22 = {
    email: t.String;
    organization?: OrganizationUncheckedCreateNestedOneWithoutEmailInputInput;
    isEnabled?: t.Boolean;
    userId?: t.String;
    smtpConfig?: SMTPConfigUncheckedCreateNestedOneWithoutEmailInputInput;
    oauthConfig?: OAuthConfigUncheckedCreateNestedOneWithoutEmailInputInput;
    user?: UserCreateNestedOneWithoutEmailInputInput;
};
export type WithoutInput_2AndEmailUncheckedUpdateInputInput = {
    user?: UserUpdateOneWithoutEmailNestedInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    smtpConfig?: SMTPConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    oauthConfig?: OAuthConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    organization?: OrganizationUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type OmitInput_23 = {
    AND?: EmailWhereInputInput[];
    OR?: EmailWhereInputInput[];
    NOT?: EmailWhereInputInput[];
    email?: t.String;
    organization?: WithoutInput_36AndOrganizationWhereInputInput;
    isEnabled?: t.Boolean;
    userId?: t.String;
    smtpConfig?: WithoutInput_30AndSMTPConfigWhereInputInput;
    oauthConfig?: WithoutInput_32AndOAuthConfigWhereInputInput;
    user?: WithoutInput_34AndUserWhereInputInput;
};
export type OmitInput_16 = {
    id?: t.String;
    host: t.String;
    port: t.Number;
    username: t.String;
    password: t.String;
    secure: t.Boolean;
};
export type WithoutInput_12AndSMTPConfigUncheckedUpdateInputInput = {
    email?: EmailUpdateOneRequiredWithoutSmtpConfigNestedInputInput;
    id?: t.String;
    host?: t.String;
    port?: t.Number;
    username?: t.String;
    password?: t.String;
    secure?: t.Boolean;
    emailId?: t.String;
};
export type EmailUpdateOneRequiredWithoutSmtpConfigNestedInputInput = {
    create?: WithoutInput_140AndEmailUncheckedCreateWithoutSmtpConfigInputInput;
    connectOrCreate?: EmailCreateOrConnectWithoutSmtpConfigInputInput;
    upsert?: EmailUpsertWithoutSmtpConfigInputInput;
    connect?: WhereInput_3AndWhereInput_4;
    update?: WithoutInput_142AndEmailUncheckedUpdateWithoutSmtpConfigInputInput;
};
export type WithoutInput_140AndEmailUncheckedCreateWithoutSmtpConfigInputInput = {
    user?: UserCreateNestedOneWithoutEmailInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email: t.String;
    userId?: t.String;
    oauthConfig?: OAuthConfigUncheckedCreateNestedOneWithoutEmailInputInput;
    organization?: OrganizationUncheckedCreateNestedOneWithoutEmailInputInput;
};
export type EmailCreateOrConnectWithoutSmtpConfigInputInput = {
    where: WhereInput_3AndWhereInput_4;
    create: WithoutInput_140AndEmailUncheckedCreateWithoutSmtpConfigInputInput;
};
export type EmailUpsertWithoutSmtpConfigInputInput = {
    update: WithoutInput_148AndEmailUncheckedUpdateWithoutSmtpConfigInputInput;
    create: WithoutInput_140AndEmailUncheckedCreateWithoutSmtpConfigInputInput;
    where?: EmailWhereInputInput;
};
export type WithoutInput_148AndEmailUncheckedUpdateWithoutSmtpConfigInputInput = {
    user?: UserUpdateOneWithoutEmailNestedInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    oauthConfig?: OAuthConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    organization?: OrganizationUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type WithoutInput_142AndEmailUncheckedUpdateWithoutSmtpConfigInputInput = {
    where?: EmailWhereInputInput;
    user?: UserUpdateOneWithoutEmailNestedInputInput;
    data?: WithoutInput_148AndEmailUncheckedUpdateWithoutSmtpConfigInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    oauthConfig?: OAuthConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    organization?: OrganizationUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type OmitInput_17 = {
    AND?: SMTPConfigWhereInputInput[];
    OR?: SMTPConfigWhereInputInput[];
    NOT?: SMTPConfigWhereInputInput[];
    id?: t.String;
    host?: t.String;
    port?: t.Number;
    username?: t.String;
    password?: t.String;
    secure?: t.Boolean;
};
export type OmitInput_18 = {
    id?: t.String;
    provider: OAuthProviderInput;
    accessToken: t.String;
    accessTokenExpiresAt: t.String;
    refreshToken: t.String;
};
export type WithoutInput_14AndOAuthConfigUncheckedUpdateInputInput = {
    email?: EmailUpdateOneRequiredWithoutOauthConfigNestedInputInput;
    id?: t.String;
    provider?: t.String;
    accessToken?: t.String;
    accessTokenExpiresAt?: t.String;
    refreshToken?: t.String;
    emailId?: t.String;
};
export type EmailUpdateOneRequiredWithoutOauthConfigNestedInputInput = {
    create?: WithoutInput_150AndEmailUncheckedCreateWithoutOauthConfigInputInput;
    connectOrCreate?: EmailCreateOrConnectWithoutOauthConfigInputInput;
    upsert?: EmailUpsertWithoutOauthConfigInputInput;
    connect?: WhereInput_3AndWhereInput_4;
    update?: WithoutInput_152AndEmailUncheckedUpdateWithoutOauthConfigInputInput;
};
export type WithoutInput_150AndEmailUncheckedCreateWithoutOauthConfigInputInput = {
    user?: UserCreateNestedOneWithoutEmailInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email: t.String;
    userId?: t.String;
    smtpConfig?: SMTPConfigUncheckedCreateNestedOneWithoutEmailInputInput;
    organization?: OrganizationUncheckedCreateNestedOneWithoutEmailInputInput;
};
export type EmailCreateOrConnectWithoutOauthConfigInputInput = {
    where: WhereInput_3AndWhereInput_4;
    create: WithoutInput_150AndEmailUncheckedCreateWithoutOauthConfigInputInput;
};
export type EmailUpsertWithoutOauthConfigInputInput = {
    update: WithoutInput_158AndEmailUncheckedUpdateWithoutOauthConfigInputInput;
    create: WithoutInput_150AndEmailUncheckedCreateWithoutOauthConfigInputInput;
    where?: EmailWhereInputInput;
};
export type WithoutInput_158AndEmailUncheckedUpdateWithoutOauthConfigInputInput = {
    user?: UserUpdateOneWithoutEmailNestedInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    smtpConfig?: SMTPConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    organization?: OrganizationUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type WithoutInput_152AndEmailUncheckedUpdateWithoutOauthConfigInputInput = {
    where?: EmailWhereInputInput;
    user?: UserUpdateOneWithoutEmailNestedInputInput;
    data?: WithoutInput_158AndEmailUncheckedUpdateWithoutOauthConfigInputInput;
    id?: t.String;
    isEnabled?: t.Boolean;
    email?: t.String;
    userId?: t.String;
    smtpConfig?: SMTPConfigUncheckedUpdateOneWithoutEmailNestedInputInput;
    organization?: OrganizationUncheckedUpdateOneWithoutEmailNestedInputInput;
};
export type OmitInput_19 = {
    AND?: OAuthConfigWhereInputInput[];
    OR?: OAuthConfigWhereInputInput[];
    NOT?: OAuthConfigWhereInputInput[];
    id?: t.String;
    provider?: EnumOAuthProviderFilterInput;
    accessToken?: t.String;
    accessTokenExpiresAt?: t.String;
    refreshToken?: t.String;
};
export type OmitInput_24 = {
    id: t.String;
    emailTemplates?: EmailTemplateUncheckedCreateNestedManyWithoutCreatorInputInput;
    email?: EmailUncheckedCreateNestedOneWithoutUserInputInput;
};
export type OmitInput_25 = {
    AND?: UserWhereInputInput[];
    OR?: UserWhereInputInput[];
    NOT?: UserWhereInputInput[];
    id?: t.String;
    emailTemplates?: EmailTemplateListRelationFilterInput;
    email?: WithoutInput_26AndEmailWhereInputInput;
};
export type OAuthAppOrderByWithRelationInputInput = {
    id?: SortOrderInput;
    clientId?: SortOrderInput;
    clientSecret?: SortOrderInput;
    type?: SortOrderInput;
    organizationId?: SortOrderInput;
    organization?: OrganizationOrderByWithRelationInputInput;
};
export type OmitInput_4 = {
    email?: EmailCreateNestedOneWithoutOrganizationInputInput;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInputInput;
    oAuthApps?: OAuthAppUncheckedCreateNestedManyWithoutOrganizationInputInput;
};
export type WithoutInput_4AndOrganizationUncheckedUpdateInputInput = {
    email?: EmailUpdateOneWithoutOrganizationNestedInputInput;
    id?: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInputInput;
    oAuthApps?: OAuthAppUncheckedUpdateManyWithoutOrganizationNestedInputInput;
};
export type OmitInput_5 = {
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    email?: WithoutInput_26AndEmailWhereInputInput;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserListRelationFilterInput;
    oAuthApps?: OAuthAppListRelationFilterInput;
};
export type OmitInput_26 = {
    id?: t.String;
    clientId: t.String;
    clientSecret: t.String;
    type: OAuthProviderInput;
};
export type WithoutInput_16AndOAuthAppUncheckedUpdateInputInput = {
    organization?: OrganizationUpdateOneRequiredWithoutOAuthAppsNestedInputInput;
    id?: t.String;
    clientId?: t.String;
    clientSecret?: t.String;
    type?: t.String;
    organizationId?: t.String;
};
export type OrganizationUpdateOneRequiredWithoutOAuthAppsNestedInputInput = {
    create?: WithoutInput_160AndOrganizationUncheckedCreateWithoutOAuthAppsInputInput;
    connectOrCreate?: OrganizationCreateOrConnectWithoutOAuthAppsInputInput;
    upsert?: OrganizationUpsertWithoutOAuthAppsInputInput;
    connect?: WhereInput_7AndWhereInput_8;
    update?: WithoutInput_162AndOrganizationUncheckedUpdateWithoutOAuthAppsInputInput;
};
export type WithoutInput_160AndOrganizationUncheckedCreateWithoutOAuthAppsInputInput = {
    email?: EmailCreateNestedOneWithoutOrganizationInputInput;
    id: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInputInput;
};
export type OrganizationCreateOrConnectWithoutOAuthAppsInputInput = {
    where: WhereInput_7AndWhereInput_8;
    create: WithoutInput_160AndOrganizationUncheckedCreateWithoutOAuthAppsInputInput;
};
export type OrganizationUpsertWithoutOAuthAppsInputInput = {
    update: WithoutInput_168AndOrganizationUncheckedUpdateWithoutOAuthAppsInputInput;
    create: WithoutInput_160AndOrganizationUncheckedCreateWithoutOAuthAppsInputInput;
    where?: OrganizationWhereInputInput;
};
export type WithoutInput_168AndOrganizationUncheckedUpdateWithoutOAuthAppsInputInput = {
    email?: EmailUpdateOneWithoutOrganizationNestedInputInput;
    id?: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInputInput;
};
export type WithoutInput_162AndOrganizationUncheckedUpdateWithoutOAuthAppsInputInput = {
    where?: OrganizationWhereInputInput;
    email?: EmailUpdateOneWithoutOrganizationNestedInputInput;
    data?: WithoutInput_168AndOrganizationUncheckedUpdateWithoutOAuthAppsInputInput;
    id?: t.String;
    emailId?: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInputInput;
};
export type OmitInput_27 = {
    AND?: OAuthAppWhereInputInput[];
    OR?: OAuthAppWhereInputInput[];
    NOT?: OAuthAppWhereInputInput[];
    id?: t.String;
    clientId?: t.String;
    clientSecret?: t.String;
    type?: t.String;
    organizationId_type?: OAuthAppOrganizationIdTypeCompoundUniqueInputInput;
};
export type OmitInput_20 = {
    id: t.String;
    redirectUrl?: t.String;
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInputInput;
    oAuthApps?: OAuthAppUncheckedCreateNestedManyWithoutOrganizationInputInput;
};
export type OmitInput_21 = {
    AND?: OrganizationWhereInputInput[];
    OR?: OrganizationWhereInputInput[];
    NOT?: OrganizationWhereInputInput[];
    id?: t.String;
    redirectUrl?: t.String;
    users?: UserListRelationFilterInput;
    oAuthApps?: OAuthAppListRelationFilterInput;
};
export type OmitInput_2 = {
    id?: t.String;
    email: t.String;
    organization?: OrganizationUncheckedCreateNestedOneWithoutEmailInputInput;
    isEnabled?: t.Boolean;
    smtpConfig?: SMTPConfigUncheckedCreateNestedOneWithoutEmailInputInput;
    oauthConfig?: OAuthConfigUncheckedCreateNestedOneWithoutEmailInputInput;
};
export type OmitInput_3 = {
    AND?: EmailWhereInputInput[];
    OR?: EmailWhereInputInput[];
    NOT?: EmailWhereInputInput[];
    id?: t.String;
    email?: t.String;
    organization?: WithoutInput_36AndOrganizationWhereInputInput;
    isEnabled?: t.Boolean;
    smtpConfig?: WithoutInput_30AndSMTPConfigWhereInputInput;
    oauthConfig?: WithoutInput_32AndOAuthConfigWhereInputInput;
};
export type DataInput = {
    content: t.String;
    description: t.String;
    variables: VariablesInput[];
    envelope: EnvelopeInput_2;
};
export type VariablesInput = {
    name: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
    description?: t.String;
    defaultValue?: t.String;
};
export type EnvelopeInput_2 = {
    subject?: t.String;
    to?: t.String[];
    replyTo?: t.String;
};
export type DataInput_1 = {
    parentId?: t.String;
    content?: t.String;
    verifyReplyTo?: t.Boolean;
    description?: t.String;
    variables: VariablesInput_1[];
    envelope: EnvelopeInput_3;
};
export type VariablesInput_1 = {
    name: t.String;
    isRequired?: t.Boolean;
    isConstant?: t.Boolean;
    description?: t.String;
    defaultValue?: t.String;
};
export type EnvelopeInput_3 = {
    subject?: t.String;
    to?: t.String[];
    replyTo?: t.String;
};
export type SmtpConfigInput = {
    host: t.String;
    port: t.Number;
    secure: t.Boolean;
    username: t.String;
    password: t.String;
};
export type DataInput_2 = {
    email?: t.String;
    smtpConfig?: SmtpConfigInput_2;
};
export type SmtpConfigInput_2 = {
    host?: t.String;
    port?: t.Number;
    secure?: t.Boolean;
    username?: t.String;
    password?: t.String;
};
export type SmtpConfigInput_1 = {
    host: t.String;
    port: t.Number;
    secure: t.Boolean;
    username: t.String;
    password: t.String;
};
export type EnvelopeInput = {
    subject: t.String;
    to: t.String[];
    replyTo?: t.String;
};
export type EnvelopeInput_1 = {
    subject?: t.String;
    to?: t.String[];
    replyTo?: t.String;
};

export class Query {
    __typename: t.String;
    me: t.Nullable<User>;
    template: (args: {
        id: t.String;
    }) => EmailTemplate;
    allTemplate: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: EmailTemplateWhereInputInput;
        orderBy?: EmailTemplateOrderByWithRelationInputInput[];
    }) => Connection;
    version: t.String;
    constructor() { this.__typename = ""; this.me = proxy(User); this.template = fnProxy(EmailTemplate); this.allTemplate = fnProxy(Connection); this.version = ""; }
}
export class User {
    __typename: t.String;
    id: t.String;
    emailTemplates: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: EmailTemplateWhereInputInput;
        orderBy?: EmailTemplateOrderByWithRelationInputInput[];
    }) => Connection;
    emailTemplate: (args?: {
        where?: EmailTemplateWhereInputInput;
    }) => EmailTemplate;
    email: (args?: {
        where?: EmailWhereInputInput;
        orderBy?: EmailOrderByWithRelationInputInput[];
    }) => t.Nullable<Email>;
    organization: (args?: {
        where?: OrganizationWhereInputInput;
        orderBy?: OrganizationOrderByWithRelationInputInput[];
    }) => Organization;
    constructor() { this.__typename = ""; this.id = ""; this.emailTemplates = fnProxy(Connection); this.emailTemplate = fnProxy(EmailTemplate); this.email = fnProxy(Email); this.organization = fnProxy(Organization); }
}
export class Connection {
    __typename: t.String;
    nodes: EmailTemplate[];
    edges: Edge[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(EmailTemplate); this.edges = arrayProxy(Edge); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class EmailTemplate {
    __typename: t.String;
    creator: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationInputInput[];
    }) => User;
    id: t.String;
    description: t.String;
    content: t.String;
    verifyReplyTo: t.Nullable<t.Boolean>;
    transformer: t.Nullable<t.String>;
    envelope: (args?: {
        where?: EmailEnvelopeWhereInputInput;
        orderBy?: EmailEnvelopeOrderByWithRelationInputInput[];
    }) => t.Nullable<EmailEnvelope>;
    envelopeId: t.Nullable<t.String>;
    parent: (args?: {
        where?: EmailTemplateWhereInputInput;
        orderBy?: EmailTemplateOrderByWithRelationInputInput[];
    }) => t.Nullable<EmailTemplate>;
    links: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: EmailTemplateWhereInputInput;
        orderBy?: EmailTemplateOrderByWithRelationInputInput[];
    }) => Connection;
    link: (args?: {
        where?: EmailTemplateWhereInputInput;
    }) => EmailTemplate;
    variables: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: VariableDefinitionWhereInputInput;
        orderBy?: VariableDefinitionOrderByWithRelationInputInput[];
    }) => Connection_1;
    variable: (args?: {
        where?: VariableDefinitionWhereInputInput;
    }) => VariableDefinition;
    createdAt: t.Date;
    updatedAt: t.Date;
    constructor() { this.__typename = ""; this.creator = fnProxy(User); this.id = ""; this.description = ""; this.content = ""; this.verifyReplyTo = null; this.transformer = null; this.envelope = fnProxy(EmailEnvelope); this.envelopeId = null; this.parent = fnProxy(EmailTemplate); this.links = fnProxy(Connection); this.link = fnProxy(EmailTemplate); this.variables = fnProxy(Connection_1); this.variable = fnProxy(VariableDefinition); this.createdAt = ""; this.updatedAt = ""; }
}
export class EmailEnvelope {
    __typename: t.String;
    id: t.String;
    subject: t.Nullable<t.String>;
    to: t.String[];
    replyTo: t.Nullable<t.String>;
    emailTemplate: (args?: {
        where?: EmailTemplateWhereInputInput;
        orderBy?: EmailTemplateOrderByWithRelationInputInput[];
    }) => EmailTemplate;
    constructor() { this.__typename = ""; this.id = ""; this.subject = null; this.to = []; this.replyTo = null; this.emailTemplate = fnProxy(EmailTemplate); }
}
export class Connection_1 {
    __typename: t.String;
    nodes: VariableDefinition[];
    edges: Edge_1[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(VariableDefinition); this.edges = arrayProxy(Edge_1); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class VariableDefinition {
    __typename: t.String;
    id: t.String;
    name: t.String;
    description: t.Nullable<t.String>;
    defaultValue: t.Nullable<t.String>;
    isRequired: t.Nullable<t.Boolean>;
    isConstant: t.Nullable<t.Boolean>;
    emailTemplate: (args?: {
        where?: EmailTemplateWhereInputInput;
        orderBy?: EmailTemplateOrderByWithRelationInputInput[];
    }) => t.Nullable<EmailTemplate>;
    constructor() { this.__typename = ""; this.id = ""; this.name = ""; this.description = null; this.defaultValue = null; this.isRequired = null; this.isConstant = null; this.emailTemplate = fnProxy(EmailTemplate); }
}
export class Edge_1 {
    __typename: t.String;
    cursor: t.String;
    node: VariableDefinition;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(VariableDefinition); }
}
export class PageInfo {
    __typename: t.String;
    hasNextPage: t.Boolean;
    hasPreviousPage: t.Boolean;
    startCursor: t.Nullable<t.String>;
    endCursor: t.Nullable<t.String>;
    constructor() { this.__typename = ""; this.hasNextPage = false; this.hasPreviousPage = false; this.startCursor = null; this.endCursor = null; }
}
export class Edge {
    __typename: t.String;
    cursor: t.String;
    node: EmailTemplate;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(EmailTemplate); }
}
export class Email {
    __typename: t.String;
    id: t.String;
    isEnabled: t.Boolean;
    email: t.String;
    smtpConfig: (args?: {
        where?: SMTPConfigWhereInputInput;
        orderBy?: SMTPConfigOrderByWithRelationInputInput[];
    }) => t.Nullable<SMTPConfig>;
    oauthConfig: (args?: {
        where?: OAuthConfigWhereInputInput;
        orderBy?: OAuthConfigOrderByWithRelationInputInput[];
    }) => t.Nullable<OAuthConfig>;
    user: (args?: {
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationInputInput[];
    }) => t.Nullable<User>;
    organization: (args?: {
        where?: OrganizationWhereInputInput;
        orderBy?: OrganizationOrderByWithRelationInputInput[];
    }) => t.Nullable<Organization>;
    constructor() { this.__typename = ""; this.id = ""; this.isEnabled = false; this.email = ""; this.smtpConfig = fnProxy(SMTPConfig); this.oauthConfig = fnProxy(OAuthConfig); this.user = fnProxy(User); this.organization = fnProxy(Organization); }
}
export class SMTPConfig {
    __typename: t.String;
    id: t.String;
    host: t.String;
    port: t.Number;
    username: t.String;
    password: t.String;
    secure: t.Boolean;
    email: (args?: {
        where?: EmailWhereInputInput;
        orderBy?: EmailOrderByWithRelationInputInput[];
    }) => Email;
    constructor() { this.__typename = ""; this.id = ""; this.host = ""; this.port = null; this.username = ""; this.password = ""; this.secure = false; this.email = fnProxy(Email); }
}
export class OAuthConfig {
    __typename: t.String;
    id: t.String;
    provider: t.Nullable<OAuthProvider>;
    accessTokenExpiresAt: t.Date;
    email: (args?: {
        where?: EmailWhereInputInput;
        orderBy?: EmailOrderByWithRelationInputInput[];
    }) => Email;
    constructor() { this.__typename = ""; this.id = ""; this.provider = null; this.accessTokenExpiresAt = ""; this.email = fnProxy(Email); }
}
export class Organization {
    __typename: t.String;
    id: t.String;
    users: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: UserWhereInputInput;
        orderBy?: UserOrderByWithRelationInputInput[];
    }) => Connection_2;
    user: (args?: {
        where?: UserWhereInputInput;
    }) => User;
    email: (args?: {
        where?: EmailWhereInputInput;
        orderBy?: EmailOrderByWithRelationInputInput[];
    }) => t.Nullable<Email>;
    oAuthApps: (args?: {
        pagination?: ConnectionArgumentsInput;
        where?: OAuthAppWhereInputInput;
        orderBy?: OAuthAppOrderByWithRelationInputInput[];
    }) => Connection_3;
    oAuthApp: (args?: {
        where?: OAuthAppWhereInputInput;
    }) => OAuthApp;
    redirectUrl: t.Nullable<t.String>;
    constructor() { this.__typename = ""; this.id = ""; this.users = fnProxy(Connection_2); this.user = fnProxy(User); this.email = fnProxy(Email); this.oAuthApps = fnProxy(Connection_3); this.oAuthApp = fnProxy(OAuthApp); this.redirectUrl = null; }
}
export class Connection_2 {
    __typename: t.String;
    nodes: User[];
    edges: Edge_2[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(User); this.edges = arrayProxy(Edge_2); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class Edge_2 {
    __typename: t.String;
    cursor: t.String;
    node: User;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(User); }
}
export class Connection_3 {
    __typename: t.String;
    nodes: OAuthApp[];
    edges: Edge_3[];
    pageInfo: PageInfo;
    totalCount: t.Number;
    constructor() { this.__typename = ""; this.nodes = arrayProxy(OAuthApp); this.edges = arrayProxy(Edge_3); this.pageInfo = proxy(PageInfo); this.totalCount = null; }
}
export class OAuthApp {
    __typename: t.String;
    id: t.String;
    clientId: t.String;
    type: t.Nullable<OAuthProvider>;
    organization: (args?: {
        where?: OrganizationWhereInputInput;
        orderBy?: OrganizationOrderByWithRelationInputInput[];
    }) => Organization;
    constructor() { this.__typename = ""; this.id = ""; this.clientId = ""; this.type = null; this.organization = fnProxy(Organization); }
}
export class Edge_3 {
    __typename: t.String;
    cursor: t.String;
    node: OAuthApp;
    constructor() { this.__typename = ""; this.cursor = ""; this.node = proxy(OAuthApp); }
}
export class Mutation {
    __typename: t.String;
    templateCreate: (args: {
        data: DataInput;
    }) => EmailTemplate;
    templateUpdate: (args: {
        id: t.String;
        data: DataInput_1;
    }) => EmailTemplate;
    templateDelete: (args: {
        id: t.String;
    }) => EmailTemplate;
    templateTransformer: (args: {
        id: t.String;
        transformer: t.String;
    }) => EmailTemplate;
    userEmailCreate: (args: {
        email: t.String;
        smtpConfig?: SmtpConfigInput;
    }) => Email;
    userEmailUpdate: (args: {
        id: t.String;
        data: DataInput_2;
    }) => Email;
    userEmailDelete: (args: {
        id: t.String;
    }) => Email;
    organizationSetSenderEmail: (args: {
        email: t.String;
        smtpConfig?: SmtpConfigInput_1;
    }) => Email;
    oauthAppCreate: (args: {
        clientId: t.String;
        clientSecret: t.String;
        type: OAuthProviderInput;
    }) => OAuthApp;
    oauthAppDelete: (args: {
        id: t.String;
    }) => OAuthApp;
    sendMail: (args: {
        envelope: EnvelopeInput;
        body?: t.String;
        bodyHTML?: t.String;
    }) => t.String;
    sendTemplateMail: (args: {
        id: t.String;
        envelope?: EnvelopeInput_1;
        values?: t.NotSupportedYet;
    }) => t.String;
    constructor() { this.__typename = ""; this.templateCreate = fnProxy(EmailTemplate); this.templateUpdate = fnProxy(EmailTemplate); this.templateDelete = fnProxy(EmailTemplate); this.templateTransformer = fnProxy(EmailTemplate); this.userEmailCreate = fnProxy(Email); this.userEmailUpdate = fnProxy(Email); this.userEmailDelete = fnProxy(Email); this.organizationSetSenderEmail = fnProxy(Email); this.oauthAppCreate = fnProxy(OAuthApp); this.oauthAppDelete = fnProxy(OAuthApp); this.sendMail = () => ""; this.sendTemplateMail = () => ""; }
}

