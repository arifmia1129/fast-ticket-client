type ActionBarType = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
};

const ActionBar = ({ title, children }: ActionBarType) => {
  return (
    <div>
      <h1 style={{ margin: "5px" }}>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default ActionBar;
