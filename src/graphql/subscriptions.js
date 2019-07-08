// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePrinter = `subscription OnCreatePrinter(
  $id: ID
  $name: String
  $status: String
  $ip_address: String
) {
  onCreatePrinter(
    id: $id
    name: $name
    status: $status
    ip_address: $ip_address
  ) {
    id
    name
    status
    ip_address
  }
}
`;
export const onUpdatePrinter = `subscription OnUpdatePrinter(
  $id: ID
  $name: String
  $status: String
  $ip_address: String
) {
  onUpdatePrinter(
    id: $id
    name: $name
    status: $status
    ip_address: $ip_address
  ) {
    id
    name
    status
    ip_address
  }
}
`;
export const onDeletePrinter = `subscription OnDeletePrinter(
  $id: ID
  $name: String
  $status: String
  $ip_address: String
) {
  onDeletePrinter(
    id: $id
    name: $name
    status: $status
    ip_address: $ip_address
  ) {
    id
    name
    status
    ip_address
  }
}
`;
