export interface Props {
  style: {
    border: number;
    width: string;
    height: string;
    borderRadius: string;
    backgroundColor: string;
    color: string;
    fontWeight: number;
    fontSize: string;
  };
  text: string;
}
export const AddButton: React.FC<Props> = (props) => {
  const { style, text } = props;
  return (
    <div>
      <button style={style}>{text} </button>
    </div>
  );
};
