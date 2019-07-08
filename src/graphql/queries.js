// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPrinter = `query GetPrinter($id: ID!) {
  getPrinter(id: $id) {
    id
    name
    status
    ip_address
  }
}
`;
export const listPrinters = `query ListPrinters(
  $filter: TablePrinterFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrinters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      status
      ip_address
    }
    nextToken
  }
}
`;
