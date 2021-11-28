export const Table = (props) => {
  return <table className="table-auto w-full">{props.children}</table>;
};

export const Thead = (props) => {
  return <thead className="bg-gray-800 text-white">{props.children}</thead>;
};

export const Tbody = (props) => {
  return <tbody className="text-gray-700">{props.children}</tbody>;
};

export const TableRow = (props) => {
  return (
    <tr
      className={`${
        props.striped ? (props.index % 2 ? "bg-gray-100" : "") : ""
      } text-left`}
    >
      {props.children}
    </tr>
  );
};

export const TableColHead = (props) => {
  return (
    <th
      className={`${
        props.className ?? ""
      } text-left py-3 px-4 uppercase font-semibold text-sm`}
    >
      {props.children}
    </th>
  );
};

export const TableCol = (props) => {
  return <td className="py-3 px-4">{props.children}</td>;
};
