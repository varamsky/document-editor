export type TDocument = {
  data?: unknown;
  userId: string;
  templateId?: string;
  title: string;
  margins: number[];
};

export type TDocuments = {
  id: string;
  data: unknown;
  userId: string;
  templateId?: string;
  margins: number[];
};

export type TVersionDocument = {
  documentId: string;
  data: unknown;
};

export type TError = {
  status: number;
  statusCode: number;
  message: string;
};

export type TUpdateDocument = {
  data: unknown;
  title?: string;
};

export type TUpdateDocumentBySocket = {
  id: string;
  data: unknown;
  title?: string;
};

export type TSaveDocument = {
  status: number | boolean;
  statusCode?: number;
  message?: string;
};

export type TRestoreVersion = {
  documentId: string;
  versionId: string;
};

export type TCreateTemplate = {
  data: unknown;
  userId: string;
  title: string;
};

export interface IColor {
  documentId: string;
  feature: string;
  color: string;
}
