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
  handleClick: () => void;
}
export const ButtonCustomize: React.FC<Props> = (props) => {
  const { style, text, handleClick } = props;
  return (
    <div>
      <button style={style} onClick={handleClick}>
        {text}{" "}
      </button>
    </div>
  );
};
