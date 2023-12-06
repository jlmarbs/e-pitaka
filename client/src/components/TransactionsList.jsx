const TransactionList = ({ username, transactions, handleListItemClick }) => {
  return (
    <>
      <ul className="list-group list-group-flush transaction-list">
        {transactions.map((item) => (
          <li
            className="list-group-item transaction-container"
            key={item.id}
            onClick={() => handleListItemClick(item)}
          >
            <div className="d-flex w-100 justify-content-between">
              {item.Destination_username === username ||
              item.Transaction_type === "deposit" ? (
                <h5 className="mb-1 transaction-value add">
                  + ₱ {item.Amount}
                </h5>
              ) : (
                <h5 className="mb-1 transaction-value sub">
                  - ₱ {item.Amount}
                </h5>
              )}

              {item.Transaction_type == "deposit" ||
              item.Transaction_type === "withdraw" ? (
                <small>{item.Transaction_type}</small>
              ) : (
                <small>{item.Destination_username !== username? `sent to ${item.Destination_username}`: `sent from ${item.Source_username}`}</small>
              )}
            </div>
            <small>{item.Date}</small>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
