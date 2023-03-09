export interface Props {
  headerTiltes: Record<string, string>;
}
export const TableHeader: React.FC<Props> = (props) => {
  const { headerTiltes } = props;
  const headers = Object.values(headerTiltes);
  return (
    <>
      <thead>
        <tr style={{ textAlign: "left" }}>
          <th>#</th>
          {headers.map((title) => {
            return <th>{title}</th>;
          })}
          <th></th>
        </tr>
      </thead>
    </>
  );
};
